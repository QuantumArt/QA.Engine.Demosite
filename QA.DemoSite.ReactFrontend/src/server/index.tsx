import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from 'common/components/app';
import apiService from 'common/services/api-service';
import {
  getPageStructureContextScript,
  PageStructureContextInterface,
  ServerPageStructureContextProvider,
} from 'page-structure/page-structure-context';

import { SiteStructureFilter } from './site-structure-filter';
import { buildPage, DefaultPageModelBuilder, getStartPage } from '../page-structure/page-model-builder';
import { WidgetFilter } from './widget-filter';
import { StartPageModelBuilder } from './page-builders/start-page-model-builder';
import { BlogPageModelBuilder } from './page-builders/blog-page-model-builder';
import { PageType } from '../common/enums/abstract-item-type';
import { RedirectInterface } from '../common/models/pages/redirect-interface';
import { MOVED_PERMANENTLY, MOVED_TEMPORARILY, NOT_FOUND } from 'http-status-codes';
import {mapAbstractItem} from "../common/models/mappers/map-abstract-item";
import {PageContext} from "../common/models/page-context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let assets: any;

const syncLoadAssets = (): void => {
  // eslint-disable-next-line import/no-dynamic-require,global-require,@typescript-eslint/no-non-null-assertion
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable('x-powered-by')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', async (req: express.Request, res: express.Response) => {
    const siteStructure = await apiService.getSiteStructure();
    const startPage = getStartPage(siteStructure, PageType.StartPage, req.headers.host || '');
    if (!startPage) {
      res.status(NOT_FOUND).send('Page not found');
      return;
    }

    const siteStructureFilter = new SiteStructureFilter();
    const widgetFilter = new WidgetFilter(req.path);
    const defaultPageModelBuilder = new DefaultPageModelBuilder(widgetFilter);
    const pageModelBuilders = {
      [PageType.StartPage]: new StartPageModelBuilder(),
      [PageType.BlogPage]: new BlogPageModelBuilder(defaultPageModelBuilder),
    };

    const pageModel = buildPage(startPage, req.path, defaultPageModelBuilder, pageModelBuilders, siteStructureFilter);
    if (!pageModel?.page) {
      res.status(NOT_FOUND).send('Page not found');
      return;
    }
    // запускаем маппинг, чтоб отработали получения вью-моделей в виджетах
    const mappedPageModel = mapAbstractItem(pageModel.page);
    // console.log('pageModel', pageModel);
    const modelAsRedirect = (pageModel.page as unknown) as RedirectInterface;
    if (modelAsRedirect?.redirectTo) {
      res.redirect(
        modelAsRedirect.permanentRedirect ? MOVED_PERMANENTLY : MOVED_TEMPORARILY,
        modelAsRedirect.redirectTo,
      );
      return;
    }

    const pageCtx: PageContext = {
      pageAbstractItem: mappedPageModel,
      remainingPath: pageModel?.remainingPath,
      testContextExtensionField: 'test test test',
    };
    const markup = renderToString(
      <ServerPageStructureContextProvider context={pageCtx}>
        <App />
      </ServerPageStructureContextProvider>,
    );

    res.send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Razzle TypeScript</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
          ${getPageStructureContextScript(pageCtx)}
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`,
    );
  });

export default server;
