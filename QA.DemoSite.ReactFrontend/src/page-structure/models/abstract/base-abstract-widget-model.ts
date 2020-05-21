import { BaseAbstractItemModel } from './base-abstract-item-model';
import { UniversalAbstractItem } from '../../universal-abstract-item';

export abstract class BaseAbstractWidgetModel extends BaseAbstractItemModel {
  constructor(
    abstractItem: UniversalAbstractItem,
    mapper: (universalItem: UniversalAbstractItem) => BaseAbstractItemModel,
  ) {
    super(abstractItem, mapper);
    this.isPage = false;
  }

  get zoneName(): string {
    return this.getField('ZONENAME', '');
  }
}
