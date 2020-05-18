import { BaseAbstractWidgetModel } from 'page-structure';

export class FaqWidgetModel extends BaseAbstractWidgetModel {
  get header(): string {
    return this.getField<string>('HEADER', '');
  }

  get questions(): number[] {
    return this.getField<number[]>('QUESTIONS', []);
  }
}
