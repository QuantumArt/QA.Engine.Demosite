import { UniversalAbstractItem } from 'page-structure/universal-abstract-item';

export const abstractItemTreeSetParents = (root: UniversalAbstractItem): void => {
  if (root.childItems) {
    root.childItems.forEach(x => {
      x.parent = root;
      abstractItemTreeSetParents(x);
    });
  }
};

export const abstractItemTreeRemoveParents = (root: UniversalAbstractItem): void => {
  if (root.childItems) {
    root.childItems.forEach(x => {
      abstractItemTreeRemoveParents(x);
      x.parent = undefined;
    });
  }
  root.parent = undefined;
};
