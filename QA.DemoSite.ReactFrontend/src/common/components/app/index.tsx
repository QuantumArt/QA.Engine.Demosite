import './styles.css';

import React from 'react';
import {
  PageStructureContext,
  PageStructureContextInterface,
  PageStructureContextProvider,
} from 'page-structure/page-structure-context';
import { mapAbstractItem } from '../../models/mappers/map-abstract-item';
import { Page } from '../page';

const App = (): JSX.Element => (
  <PageStructureContextProvider>
    <PageStructureContext.Consumer>
      {(context?: PageStructureContextInterface) => {
        // console.log('consumed context: ', context);
        if (context?.pageAbstractItem) {
          const mappedPage = mapAbstractItem(context.pageAbstractItem);
          // console.log(mappedPage);
          return <Page page={mappedPage} />;
        }
        return <div>{context?.pageAbstractItem?.alias}</div>;
      }}
    </PageStructureContext.Consumer>
  </PageStructureContextProvider>
);

export default App;
