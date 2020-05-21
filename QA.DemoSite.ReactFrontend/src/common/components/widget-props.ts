import { BaseWidgetModel } from 'page-structure';

export interface WidgetProps<T extends BaseWidgetModel> {
  widget: T;
}
