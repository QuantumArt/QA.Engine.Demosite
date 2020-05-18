import { TargetingFilter } from 'page-structure/pathfinder';
import { UniversalAbstractItem } from 'page-structure/universal-abstract-item';

export class SiteStructureFilter implements TargetingFilter {
  match(item: UniversalAbstractItem): boolean {
    return true;
  }
}
