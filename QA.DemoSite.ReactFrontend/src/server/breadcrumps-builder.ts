import { BaseAbstractItem, BaseAbstractPageItem } from '../page-structure';
import { BreadcrumpModel, BreadcrumpsModel } from 'common/models/breadcrumps-model';

export const getBreadcrumpsModel = (page?: BaseAbstractPageItem, additional?: string): BreadcrumpsModel => {
  const breadcrumps: BreadcrumpModel[] = [];
  if (additional) {
    breadcrumps.push({ title: additional });
  }
  let currentPage: BaseAbstractItem | undefined = page;
  if (currentPage) {
    // console.log('breadcrumps current page', currentPage);
    while (currentPage && (currentPage.isPage ? !(currentPage as BaseAbstractPageItem).isStartPage : true)) {
      if (currentPage.isPage) {
        breadcrumps.push({ title: currentPage.title || '', url: (currentPage as BaseAbstractPageItem).trail });
      }

      currentPage = currentPage.parent;
    }
  }
  // if (breadcrumps) {
  //   breadcrumps[0].url = undefined;
  // }
  return { breadcrumps: breadcrumps.reverse() };
};
