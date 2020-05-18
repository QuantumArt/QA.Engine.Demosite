import { BaseAbstractPageModel } from 'page-structure';
import { RedirectInterface } from './redirect-interface';

export class RedirectPageModel extends BaseAbstractPageModel implements RedirectInterface {
  get redirectTo(): string {
    return this.getField<string>('REDIRECTTO', '');
  }

  permanentRedirect: boolean = true;
}
