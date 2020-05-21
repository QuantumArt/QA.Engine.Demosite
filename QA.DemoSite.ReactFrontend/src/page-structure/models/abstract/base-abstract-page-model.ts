import { BaseAbstractItemModel } from './base-abstract-item-model';
import { trimEnd } from 'lodash';

export abstract class BaseAbstractPageModel extends BaseAbstractItemModel {
  abstract readonly isStartPage: boolean;

  private _trail?: string;

  get trail(): string {
    if (!this._trail) {
      let sb = '';
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let currentPage: BaseAbstractPageModel = this;
      while (currentPage && !currentPage.isStartPage) {
        sb = `${currentPage.alias}/${sb}`;
        currentPage = currentPage.parent as BaseAbstractPageModel;
      }
      this._trail = `/${trimEnd(sb, '/')}`;
    }
    return this._trail;
  }
}
