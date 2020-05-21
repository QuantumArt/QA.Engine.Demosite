import { BaseAbstractItem } from './base-abstract-item';

export abstract class BaseAbstractWidgetItem extends BaseAbstractItem {
  get zoneName(): string {
    return this.getField('ZONENAME', '');
  }
}
