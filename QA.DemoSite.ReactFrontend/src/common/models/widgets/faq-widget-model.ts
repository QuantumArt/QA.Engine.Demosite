import { BaseAbstractWidgetModel } from 'page-structure';
import { FaqWidgetViewModel } from './view-models';

export class FaqWidgetModel extends BaseAbstractWidgetModel {
  viewModel?: FaqWidgetViewModel;

  get header(): string {
    return this.getField<string>('HEADER', '');
  }

  get questions(): number[] {
    return this.getField<number[]>('QUESTIONS', []);
  }

  initViewModel(): void {
    console.log('тут должен быть запрос в апи за моделями для виджета faq. не должно вызываться на клиенте.');
    this.viewModel = {
      id: this.id,
      header: 'faq widget',
      items: this.questions?.map(x => ({ id: x, question: `вопрос ${x}`, answer: `ответ ${x}`, published: true })),
    };
  }
}
