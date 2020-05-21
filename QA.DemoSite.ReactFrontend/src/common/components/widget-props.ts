import { BaseAbstractWidgetModel } from '../../page-structure/models/abstract';

export interface WidgetProps<T extends BaseAbstractWidgetModel> {
  widget: T;
}
