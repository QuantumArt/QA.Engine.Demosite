import { PageStructureContextInterface } from 'page-structure';
import { BreadcrumpsModel } from './breadcrumps-model';
import { TopMenuWidgetViewModel } from './widgets';

export interface PageContext extends PageStructureContextInterface {
  breadcrumps?: BreadcrumpsModel;
  topMenuModel?: TopMenuWidgetViewModel;
}
