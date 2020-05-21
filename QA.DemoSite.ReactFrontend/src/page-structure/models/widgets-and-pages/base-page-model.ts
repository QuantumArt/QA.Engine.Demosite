import { BaseWidgetModel } from './base-widget-model';
import { BaseItemModel } from './base-item-model';

export interface BasePageModel extends BaseItemModel {
  widgets?: BaseWidgetModel[];
}
