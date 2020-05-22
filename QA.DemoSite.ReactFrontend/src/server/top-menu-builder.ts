import { BaseAbstractPageItem } from '../page-structure/models/abstract';
import { TopMenuWidgetItemViewModel, TopMenuWidgetViewModel } from '../common/models/widgets';
import { chain, some, sortBy } from 'lodash';

const MENU_DEPTH: number = 3;

const getVisibleChildPages = (page: BaseAbstractPageItem): BaseAbstractPageItem[] =>
  chain(page.childItems)
    .filter(x => x.isPage)
    .map(x => x as BaseAbstractPageItem)
    .filter(x => x.isVisible)
    .sortBy(x => x.sortOrder)
    .value() || [];

const buildMenu = (page: BaseAbstractPageItem, level: number, currentPageId: number): TopMenuWidgetItemViewModel[] => {
  if (level <= 0) {
    return [];
  }
  const items: TopMenuWidgetItemViewModel[] = [];
  const childItems = getVisibleChildPages(page);
  childItems.forEach(item => {
    const menu = buildMenu(item, level - 1, currentPageId);
    items.push({
      title: item.title || '',
      alias: item.alias || '',
      href: item.trail,
      children: menu,
      isActive: item.id === currentPageId || some(menu, x => x.isActive),
      order: item.sortOrder,
      hasActiveChild: some(menu, x => x.isActive),
    });
  });
  return items;
};

export const buildTopMenu = (
  startPage: BaseAbstractPageItem,
  currentPage?: BaseAbstractPageItem,
): TopMenuWidgetViewModel | undefined => {
  if (!startPage) {
    return undefined;
  }
  const items: TopMenuWidgetItemViewModel[] = [];

  const topLevelItems = getVisibleChildPages(startPage);

  const currentPageId = currentPage?.id || 0;
  topLevelItems.forEach(tlItem => {
    const menu = buildMenu(tlItem, MENU_DEPTH, currentPageId);
    items.push({
      title: tlItem.title || '',
      alias: tlItem.alias || '',
      href: tlItem.trail,
      children: menu,
      isActive: tlItem.id === currentPageId,
      hasActiveChild: some(menu, x => x.isActive),
      order: tlItem.sortOrder,
    });
  });

  return { items: sortBy(items, x => x.order) };
};
