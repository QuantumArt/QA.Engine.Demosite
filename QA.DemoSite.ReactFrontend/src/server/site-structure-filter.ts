import { BaseAbstractItem, TargetingFilter } from 'page-structure';

export class SiteStructureFilter implements TargetingFilter {
  match(item: BaseAbstractItem): boolean {
    return true;
  }
}
