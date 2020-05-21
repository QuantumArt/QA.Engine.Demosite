import { BaseAbstractPageItem } from 'page-structure';

export class TextPageItem extends BaseAbstractPageItem {
  readonly isStartPage: boolean = false;
  get text(): string {
    return this.getField<string>('TEXT', '');
  }

  get hideTitle(): boolean {
    return this.getField<boolean>('HIDETITLE', false);
  }
}
