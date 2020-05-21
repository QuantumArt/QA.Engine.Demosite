import { BaseAbstractPageItem } from 'page-structure';

export class StartPageItem extends BaseAbstractPageItem {
  get bindings(): string {
    return this.getField<string>('BINDINGS', '');
  }

  readonly isStartPage: boolean = true;
}
