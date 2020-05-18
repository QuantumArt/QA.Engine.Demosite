import { BaseAbstractWidgetModel } from '../../page-structure/models';

export interface WidgetProps<T extends BaseAbstractWidgetModel> {
  widget: T;
}
