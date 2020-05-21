import { PageStructureContextInterface } from 'page-structure';
import { BreadcrumpsModel } from './breadcrumps-model';

export interface PageContext extends PageStructureContextInterface {
  breadcrumps: BreadcrumpsModel;
}
