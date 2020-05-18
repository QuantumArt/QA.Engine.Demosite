import { BaseAbstractPageModel } from 'page-structure/models';

export interface PageProps<T extends BaseAbstractPageModel> {
  page: T;
}
