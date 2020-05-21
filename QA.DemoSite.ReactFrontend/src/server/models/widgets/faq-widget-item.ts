import { BaseAbstractWidgetItem } from 'page-structure';

export class FaqWidgetItem extends BaseAbstractWidgetItem {
  get header(): string {
    return this.getField<string>('HEADER', '');
  }

  get questions(): number[] {
    return this.getField<number[]>('QUESTIONS', []);
  }
}
