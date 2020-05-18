import React from 'react';
import { UniversalAbstractItem } from '../universal-abstract-item';

const PAGE_CONTEXT_KEY = '__PAGE_STRUCTURE_CONTEXT__';

export interface PageStructureContextInterface {
  pageAbstractItem?: UniversalAbstractItem;
  remainingPath?: string;
}

interface Props {
  children: React.ReactNode;
}

export const PageStructureContext = React.createContext<PageStructureContextInterface | undefined>(undefined);

export const PageStructureContextProvider = ({ children }: Props): JSX.Element => {
  const isClient = !!(typeof window !== 'undefined' && window.document);
  // console.log(`pagestructure context provider. isClient: ${isClient}`);
  if (isClient) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { pageAbstractItem, remainingPath } = window[PAGE_CONTEXT_KEY] as PageStructureContextInterface;
    // console.log('context from window: ', pageAbstractItem, remainingPath);

    return (
      <PageStructureContext.Provider value={{ pageAbstractItem, remainingPath }}>
        {children}
      </PageStructureContext.Provider>
    );
  }
  return (
    <PageStructureContext.Consumer>
      {ctx => {
        const pageAbstractItem = ctx ? ctx.pageAbstractItem : undefined;
        return <PageStructureContext.Provider value={{ pageAbstractItem }}>{children}</PageStructureContext.Provider>;
      }}
    </PageStructureContext.Consumer>
  );
};

export const ServerTestContextProvider: React.FC<PageStructureContextInterface> = ({ pageAbstractItem, children }) => (
  <PageStructureContext.Provider value={{ pageAbstractItem }}>{children}</PageStructureContext.Provider>
);

export const getPageStructureContextScript = (ctx: PageStructureContextInterface): string => {
  return `<script>window.${PAGE_CONTEXT_KEY} = ${JSON.stringify(ctx)};</script>`;
};
