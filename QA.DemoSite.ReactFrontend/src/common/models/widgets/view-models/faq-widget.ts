export interface FaqWidgetItemViewModel {
  id: number;
  question: string;
  answer: string;
  published: boolean;
}

export interface FaqWidgetViewModel {
  id: number;
  header: string;
  items?: FaqWidgetItemViewModel[];
}
