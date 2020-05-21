import { BaseAbstractWidgetItem } from 'page-structure';

export class HtmlWidgetItem extends BaseAbstractWidgetItem {
  get html(): string {
    return this.getField<string>('HTML', '');
  }
}
