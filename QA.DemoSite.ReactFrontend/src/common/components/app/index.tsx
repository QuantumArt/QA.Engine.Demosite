import './styles.css';

import React from 'react';
import {
  BasePageModel,
  PageStructureContext,
  PageStructureContextInterface,
  PageStructureContextProvider,
} from 'page-structure';
import { Page } from '../page';
import { PageContext } from 'common/models';

const App = (): JSX.Element => (
  <PageStructureContextProvider>
    <PageStructureContext.Consumer>
      {(context?: PageStructureContextInterface) => {
        const ctx = context as PageContext;
        console.log('consumed context', ctx);
        // console.log(ctx.testContextExtensionField);
        if (ctx?.pageModel) {
          const mappedPage = ctx.pageModel as BasePageModel;
          // console.log('consumed and mapped page:', mappedPage);
          // console.log('remaining path:', context.remainingPath);
          return <Page page={mappedPage} />;
        }
        return <div>Error</div>;
      }}
    </PageStructureContext.Consumer>
  </PageStructureContextProvider>
);

export default App;
