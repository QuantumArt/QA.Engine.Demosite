import { BaseAbstractItem, TargetingFilter } from 'page-structure';

export class WidgetFilter implements TargetingFilter {
  private _url: string;
  constructor(url: string) {
    this._url = url;
  }

  match(item: BaseAbstractItem): boolean {
    return true;
  }
}
