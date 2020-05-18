import { BaseAbstractPageModel } from 'page-structure';
import { RedirectInterface } from './redirect-interface';

export class StartPageModel extends BaseAbstractPageModel implements RedirectInterface {
  get redirectTo(): string {
    return this._redirectTo;
  }

  set redirectTo(value: string) {
    this._redirectTo = value;
  }

  get bindings(): string {
    return this.getField<string>('BINDINGS', '');
  }

  permanentRedirect: boolean = false;
  private _redirectTo: string = '';
}
