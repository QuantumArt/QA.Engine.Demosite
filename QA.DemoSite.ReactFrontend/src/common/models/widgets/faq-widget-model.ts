import { BaseWidgetModel } from 'page-structure';

export interface FaqWidgetItemViewModel {
  id: number;
  question: string;
  answer: string;
  published: boolean;
}

export interface FaqWidgetModel extends BaseWidgetModel {
  header: string;
  questions?: FaqWidgetItemViewModel[];
}
