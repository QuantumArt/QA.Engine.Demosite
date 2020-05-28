import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from 'common/components/app';
import apiService from 'common/services/api-service';
import {
  getPageStructureContextScript,
  ServerPageStructureContextProvider,
} from 'page-structure/page-structure-context';

import { SiteStructureFilter } from './site-structure-filter';
import { WidgetFilter } from './widget-filter';
import { PageType } from 'common/enums';
import { MOVED_PERMANENTLY, MOVED_TEMPORARILY, NOT_FOUND } from 'http-status-codes';
import { mapAbstractItem } from './models/mappers/map-abstract-item';
import { PageContext } from 'common/models';
import { getBreadcrumpsModel } from './breadcrumps-builder';
import { BaseAbstractPageItem } from '../page-structure/models/abstract';
import { findPath, getStartPage } from '../page-structure/pathfinder';
import { ModelFactory } from './model-build/model-factory';
import { buildTopMenu } from './top-menu-builder';
import { runtimeConfig } from 'common/config';

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
    const rawSiteStructure = await apiService.getSiteStructure();
    // вот это можно закэшировать
    const siteStructure = mapAbstractItem(rawSiteStructure);

    const startPage = getStartPage(siteStructure as BaseAbstractPageItem, PageType.StartPage, req.headers.host || '');
    if (!startPage) {
      res.status(NOT_FOUND).send('Page not found');
      return;
    }
    const siteStructureFilter = new SiteStructureFilter();
    const path = findPath(startPage, req.path, siteStructureFilter);
    // console.log('Found path: ', path);

    const widgetFilter = new WidgetFilter(req.path);

    const modelFactory = new ModelFactory(widgetFilter);
    const pageModel = await modelFactory.buildPageModel(path);
    if (pageModel.redirectTo) {
      res.redirect(pageModel.permanentRedirect ? MOVED_PERMANENTLY : MOVED_TEMPORARILY, pageModel.redirectTo);
      return;
    }
    if (pageModel.notFound) {
      res.status(NOT_FOUND).send('Page not found');
      return;
    }

    const pageCtx: PageContext = {
      pageModel: pageModel.pageModel,
      remainingPath: path?.remainingPath,
      breadcrumps: getBreadcrumpsModel(path?.abstractItem),
      topMenuModel: buildTopMenu(startPage, path?.abstractItem),
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
          <script src="holder.js"></script>
          ${getPageStructureContextScript(pageCtx)}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>window['env'] = ${JSON.stringify(runtimeConfig)};</script>
    </body>
</html>`,
    );
  });

export default server;
