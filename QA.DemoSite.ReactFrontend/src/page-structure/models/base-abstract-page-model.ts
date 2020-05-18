import { BaseAbstractItemModel } from './base-abstract-item-model';
import { UniversalAbstractItem } from '../universal-abstract-item';

export abstract class BaseAbstractPageModel extends BaseAbstractItemModel {
  constructor(
    abstractItem: UniversalAbstractItem,
    mapper: (universalItem: UniversalAbstractItem) => BaseAbstractItemModel,
  ) {
    super(abstractItem, mapper);
    this.isPage = true;
  }
}
