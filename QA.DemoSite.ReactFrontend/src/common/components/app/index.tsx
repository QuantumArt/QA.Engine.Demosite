import './styles.css';

import React from 'react';
import {
  PageStructureContext,
  PageStructureContextInterface,
  PageStructureContextProvider,
} from 'page-structure/page-structure-context';
import { mapAbstractItem } from '../../models/mappers/map-abstract-item';
import { Page } from '../page';
import { PageContext } from '../../models/page-context';

const App = (): JSX.Element => (
  <PageStructureContextProvider>
    <PageStructureContext.Consumer>
      {(context?: PageStructureContextInterface) => {
        const ctx = context as PageContext;
        console.log('consumed context', ctx);
        console.log(ctx.testContextExtensionField);
        if (context?.pageAbstractItem) {
          const mappedPage = mapAbstractItem(context.pageAbstractItem);
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
