import { BaseItemModel } from './base-item-model';

export interface BaseWidgetModel extends BaseItemModel {
  zoneName: string;
  children?: BaseWidgetModel[];
}
