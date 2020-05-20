import { chain } from 'lodash';
import { UniversalAbstractItem } from 'page-structure/universal-abstract-item';

export interface PathData {
  abstractItem: UniversalAbstractItem;
  remainingPath?: string;
}

export interface TargetingFilter {
  match: (item: UniversalAbstractItem) => boolean;
}

export const findPath = (
  root: UniversalAbstractItem,
  path: string,
  targetingFilter?: TargetingFilter,
): PathData | null => {
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
  let node: UniversalAbstractItem | undefined = root;
  let remainingPath = path;
  let index = 0;

  for (const token of tokens) {
    const lowerCaseToken = token.toLowerCase();

    node = node?.childItems?.find(
      child => child?.alias?.toLowerCase() === lowerCaseToken && (!targetingFilter || targetingFilter.match(child)),
    );
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
