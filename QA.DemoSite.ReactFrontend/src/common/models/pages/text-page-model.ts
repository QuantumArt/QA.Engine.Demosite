import { BaseAbstractPageModel } from 'page-structure';

export class TextPageModel extends BaseAbstractPageModel {
  readonly isStartPage: boolean = false;
  get text(): string {
    return this.getField<string>('TEXT', '');
  }

  get hideTitle(): boolean {
    return this.getField<boolean>('HIDETITLE', false);
  }
}
