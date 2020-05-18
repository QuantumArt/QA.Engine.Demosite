import { BaseAbstractPageModel } from 'page-structure';

export class TextPageModel extends BaseAbstractPageModel {
  get text(): string {
    return this.getField<string>('TEXT', '');
  }

  get hideTitle(): boolean {
    return this.getField<boolean>('HIDETITLE', false);
  }
}
