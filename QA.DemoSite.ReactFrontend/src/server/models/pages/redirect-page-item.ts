import { BaseAbstractPageItem } from 'page-structure';

export class RedirectPageItem extends BaseAbstractPageItem {
  get redirectTo(): string {
    return this.getField<string>('REDIRECTTO', '');
  }

  permanentRedirect: boolean = true;
  readonly isStartPage: boolean = false;
}
