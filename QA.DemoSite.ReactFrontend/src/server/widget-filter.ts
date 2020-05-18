import { TargetingFilter } from '../page-structure/pathfinder';
import { UniversalAbstractItem } from '../page-structure';

export class WidgetFilter implements TargetingFilter {
  private _url: string;
  constructor(url: string) {
    this._url = url;
  }

  match(item: UniversalAbstractItem): boolean {
    return true;
  }
}
