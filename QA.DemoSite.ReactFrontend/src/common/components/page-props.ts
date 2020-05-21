import { BasePageModel } from 'page-structure';

export interface PageProps<T extends BasePageModel> {
  page: T;
}
