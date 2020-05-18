import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from 'common/components/app';
import apiService from 'common/services/api-service';
import {
  getPageStructureContextScript,
  PageStructureContextInterface,
  ServerTestContextProvider,
} from 'page-structure/page-structure-context';

import { SiteStructureFilter } from './site-structure-filter';
import { buildPage, DefaultPageModelBuilder, PageModelBuilderInterface } from '../page-structure/page-model-builder';
import { WidgetFilter } from './widget-filter';
import { UniversalAbstractItem } from '../page-structure';
import { StartPageModelBuilder } from '../common/page-builders/start-page-model-builder';
import { BlogPageModelBuilder } from '../common/page-builders/blog-page-model-builder';
import { PageType } from '../common/enums/abstract-item-type';
import { mapAbstractItem } from '../common/models/mappers/map-abstract-item';
import { RedirectInterface } from '../common/models/pages/redirect-interface';
import { MOVED_PERMANENTLY, MOVED_TEMPORARILY } from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let assets: any;

const syncLoadAssets = (): void => {
  // eslint-disable-next-line import/no-dynamic-require,global-require
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable('x-powered-by')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', async (req: express.Request, res: express.Response) => {
    const siteStructure = await apiService.getSiteStructure(741114);

    const siteStructureFilter = new SiteStructureFilter();
    const widgetFilter = new WidgetFilter(req.path);
    const defaultPageModelBuilder = new DefaultPageModelBuilder(widgetFilter);
    const pageModelBuilders = {
      [PageType.StartPage]: new StartPageModelBuilder(),
      [PageType.BlogPage]: new BlogPageModelBuilder(defaultPageModelBuilder),
    };

    const pageModel = buildPage(
      siteStructure,
      req.path,
      defaultPageModelBuilder,
      pageModelBuilders,
      siteStructureFilter,
    );
    // console.log('pageModel', pageModel);
    const modelAsRedirect = (pageModel?.page as unknown) as RedirectInterface;
    if (modelAsRedirect?.redirectTo) {
      console.log('found redirect', modelAsRedirect.redirectTo);
      res.redirect(
        modelAsRedirect.permanentRedirect ? MOVED_PERMANENTLY : MOVED_TEMPORARILY,
        modelAsRedirect.redirectTo,
      );
      return;
    }

    const pageCtx: PageStructureContextInterface = {
      pageAbstractItem: pageModel?.page,
      remainingPath: pageModel?.remainingPath,
    };
    const markup = renderToString(
      <ServerTestContextProvider pageAbstractItem={pageCtx.pageAbstractItem}>
        <App />
      </ServerTestContextProvider>,
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
