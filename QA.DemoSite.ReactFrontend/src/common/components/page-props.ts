import { BaseAbstractPageModel } from 'page-structure/models/abstract';

export interface PageProps<T extends BaseAbstractPageModel> {
  page: T;
}
