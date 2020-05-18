import { BaseAbstractWidgetModel } from 'page-structure';

export class HtmlWidgetModel extends BaseAbstractWidgetModel {
  get html(): string {
    return this.getField<string>('HTML', '');
  }
}
