import { PageStructureContextInterface } from '../../page-structure/page-structure-context';
import { BreadcrumpsModel } from './breadcrumps-model';

export interface PageContext extends PageStructureContextInterface {
  breadcrumps: BreadcrumpsModel;
}
