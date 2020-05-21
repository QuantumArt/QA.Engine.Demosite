import { chain, some } from 'lodash';
import { BaseAbstractItem, BaseAbstractPageItem } from '../models/abstract';

export interface PathData {
  abstractItem: BaseAbstractPageItem;
  remainingPath?: string;
}

export interface TargetingFilter {
  match: (item: BaseAbstractItem) => boolean;
}

export const getStartPage = (
  rootPage: BaseAbstractPageItem,
  startPageDiscriminator: string,
  host: string,
): BaseAbstractPageItem | undefined => {
  const startPages = rootPage.childItems
    ?.filter(x => x.isPage && x.type === startPageDiscriminator)
    .map(x => x as BaseAbstractPageItem);
  if (!startPages) {
    return undefined;
  }
  for (const x of startPages) {
    const bindings = (x.untypedFields?.BINDINGS as string)?.split(/,|\r\n|\n|\r/).filter(binding => !!binding);
    if (bindings && some(bindings, binding => binding === '*' || binding.toLowerCase() === host.toLowerCase())) {
      return x;
    }
  }
  return undefined;
};

export const findPath = (
  root: BaseAbstractPageItem,
  path: string,
  targetingFilter?: TargetingFilter,
): PathData | undefined => {
  const tokens = chain(path)
    .split('/')
    .filter(x => !!x)
    .value();

  if (tokens.length === 0) {
    return {
      abstractItem: root,
    };
  }

  let stopItem = root;
  let node: BaseAbstractPageItem | undefined = root;
  let remainingPath = path;
  let index = 0;

  for (const token of tokens) {
    const lowerCaseToken = token.toLowerCase();

    node = node?.childItems?.find(
      child => child?.alias?.toLowerCase() === lowerCaseToken && (!targetingFilter || targetingFilter.match(child)),
    ) as BaseAbstractPageItem;
    // console.log('pathfinder step', { token, node });

    if (!node) {
      break;
    }
    index++;
    stopItem = node;

    // eslint-disable-next-line no-loop-func
    remainingPath = `/${tokens.filter((value, i) => (i < index ? '' : value)).join('/')}`;
  }

  return {
    abstractItem: stopItem,
    remainingPath,
  };
};
