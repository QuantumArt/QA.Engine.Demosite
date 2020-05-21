import { BaseAbstractItem } from './base-abstract-item';
import { trimEnd } from 'lodash';

export abstract class BaseAbstractPageItem extends BaseAbstractItem {
  abstract readonly isStartPage: boolean;

  private _trail?: string;

  get trail(): string {
    if (!this._trail) {
      let sb = '';
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let currentPage: BaseAbstractPageItem = this;
      while (currentPage && !currentPage.isStartPage) {
        sb = `${currentPage.alias}/${sb}`;
        currentPage = currentPage.parent as BaseAbstractPageItem;
      }
      this._trail = `/${trimEnd(sb, '/')}`;
    }
    return this._trail;
  }
}
