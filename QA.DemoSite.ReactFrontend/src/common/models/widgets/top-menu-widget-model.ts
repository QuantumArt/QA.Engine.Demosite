import { BaseWidgetModel } from 'page-structure';


export interface TopMenuWidgetItemViewModel {
  id: number;
  title: string;
  alias: string;
  href: string;
  children: TopMenuWidgetItemViewModel[];
  order: number;
  isActive: boolean;
  hasActiveChild: boolean;
}

export interface TopMenuWidgetViewModel {
  items: TopMenuWidgetItemViewModel[];
}

export interface TopMenuWidgetModel extends BaseWidgetModel {}
