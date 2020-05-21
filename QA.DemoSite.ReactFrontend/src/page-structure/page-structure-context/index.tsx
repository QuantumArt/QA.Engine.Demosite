import React from 'react';
import isNode from 'detect-node';
import { cloneDeep } from 'lodash';
import { BasePageModel } from '../models/widgets-and-pages';

const PAGE_CONTEXT_KEY = '__PAGE_STRUCTURE_CONTEXT__';

interface PageStructureContextProps {
  context: PageStructureContextInterface;
  children?: React.ReactNode;
}

export interface PageStructureContextInterface {
  pageModel?: BasePageModel;
  remainingPath?: string;
}

interface Props {
  children: React.ReactNode;
}

export const PageStructureContext = React.createContext<PageStructureContextInterface | undefined>(undefined);

export const PageStructureContextProvider = ({ children }: Props): JSX.Element => {
  const isClient = !isNode;
  // console.log('isClient', isClient);
  if (isClient) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const context = window[PAGE_CONTEXT_KEY] as PageStructureContextInterface;
    // console.log('context from window: ', pageAbstractItem, remainingPath);

    return <PageStructureContext.Provider value={context}>{children}</PageStructureContext.Provider>;
  }
  return (
    <PageStructureContext.Consumer>
      {ctx => <PageStructureContext.Provider value={ctx}>{children}</PageStructureContext.Provider>}
    </PageStructureContext.Consumer>
  );
};

export const ServerPageStructureContextProvider: React.FC<PageStructureContextProps> = ({
  context,
  children,
}: PageStructureContextProps) => (
  <PageStructureContext.Provider value={context}>{children}</PageStructureContext.Provider>
);

export const getPageStructureContextScript = (ctx: PageStructureContextInterface): string => {
  const ctxClone = cloneDeep(ctx);
  // abstractItemTreeRemoveParents(ctxClone.pageAbstractItem);
  return `<script>window.${PAGE_CONTEXT_KEY} = ${JSON.stringify(ctxClone)};</script>`;
};
