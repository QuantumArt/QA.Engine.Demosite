import { BaseAbstractItemModel, BaseAbstractWidgetModel, UniversalAbstractItem } from 'page-structure';
import { FaqWidgetViewModel } from './view-models';

export class FaqWidgetModel extends BaseAbstractWidgetModel {
  constructor(
    abstractItem: UniversalAbstractItem,
    mapper: (universalItem: UniversalAbstractItem) => BaseAbstractItemModel,
  ) {
    super(abstractItem, mapper);
    // если уже построена вью-модель - повторно не нужно. на клиенте этого запроса не должно происходить
    if (!abstractItem.viewModel) {
      console.log('тут должен быть запрос в апи за моделями для виджета faq. не должно вызываться на клиенте.');
      this.viewModel = {
        id: this.id,
        header: 'faq widget',
        items: this.questions?.map(x => ({ id: x, question: `вопрос ${x}`, answer: `ответ ${x}`, published: true })),
      };
    }
  }

  viewModel?: FaqWidgetViewModel;

  get header(): string {
    return this.getField<string>('HEADER', '');
  }

  get questions(): number[] {
    return this.getField<number[]>('QUESTIONS', []);
  }
}
