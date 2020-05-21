import { BaseAbstractItemModel, BaseAbstractPageModel } from '../page-structure/models/abstract';
import { BreadcrumpModel, BreadcrumpsModel } from '../common/models/breadcrumps-model';

export const getBreadcrumpsModel = (page?: BaseAbstractPageModel, additional?: string): BreadcrumpsModel => {
  const breadcrumps: BreadcrumpModel[] = [];
  if (additional) {
    breadcrumps.push({ title: additional });
  }
  let currentPage: BaseAbstractItemModel | undefined = page;
  if (currentPage) {
    // console.log('breadcrumps current page', currentPage);
    while (currentPage && (currentPage.isPage ? !(currentPage as BaseAbstractPageModel).isStartPage : true)) {
      if (currentPage.isPage) {
        breadcrumps.push({ title: currentPage.title || '', url: (currentPage as BaseAbstractPageModel).trail });
      }

      currentPage = currentPage.parent;
    }
  }
  if (breadcrumps) {
    breadcrumps[0].url = undefined;
  }
  return { breadcrumps: breadcrumps.reverse() };
};
