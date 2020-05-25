import {
  BaseAbstractItem,
  BaseAbstractPageItem,
  BaseAbstractWidgetItem,
  BaseItemModel,
  UniversalAbstractItem,
} from './models';
import { PathData, TargetingFilter } from './pathfinder';
import { chain } from 'lodash';

const isRecursiveZone = (zoneName: string): boolean => zoneName.toLowerCase().startsWith('recursive');

const isGlobalZone = (zoneName: string): boolean => zoneName.toLowerCase().startsWith('site');

const matchingWidget = (item: BaseAbstractItem, widgetFilter?: TargetingFilter): boolean =>
  item instanceof BaseAbstractWidgetItem && (!widgetFilter || widgetFilter.match(item));

export interface PageModel {
  page?: UniversalAbstractItem;
  remainingPath?: string;
}

export const getPageWidgets = (
  page: BaseAbstractPageItem,
  widgetFilter?: TargetingFilter,
): BaseAbstractWidgetItem[] => {
  const currentPageWidgets: BaseAbstractWidgetItem[] =
    page.childItems
      ?.filter(x => x instanceof BaseAbstractWidgetItem && (!widgetFilter || widgetFilter.match(x)))
      .map(x => x as BaseAbstractWidgetItem) || [];

  const recursiveZonesWidgets: BaseAbstractWidgetItem[] = [];
  const globalZonesWidgets: BaseAbstractWidgetItem[] = [];

  let current: BaseAbstractPageItem = page.parent as BaseAbstractPageItem;
  while (current) {
    const recursiveZoneNames = chain(current.childItems)
      .filter(x => matchingWidget(x))
      .map(x => (x as BaseAbstractWidgetItem).zoneName)
      .filter(x => isRecursiveZone(x))
      .uniq()
      .value();

    if (recursiveZoneNames) {
      // eslint-disable-next-line no-loop-func
      recursiveZoneNames.forEach(zoneName => {
        const widgets =
          current?.childItems
            ?.filter(x => matchingWidget(x) && (x as BaseAbstractWidgetItem).zoneName === zoneName)
            .map(x => x as BaseAbstractWidgetItem) || [];
        if (widgets) {
          recursiveZonesWidgets.push(...widgets);
        }
      });
    }

    if (current.isStartPage) {
      const globalZoneNames = chain(current.childItems)
        .filter(x => matchingWidget(x))
        .map(x => (x as BaseAbstractWidgetItem).zoneName)
        .filter(x => isGlobalZone(x))
        .uniq()
        .value();

      if (globalZoneNames) {
        // eslint-disable-next-line no-loop-func
        globalZoneNames.forEach(zoneName => {
          const widgets =
            current?.childItems
              ?.filter(x => matchingWidget(x) && (x as BaseAbstractWidgetItem).zoneName === zoneName)
              .map(x => x as BaseAbstractWidgetItem) || [];
          if (widgets) {
            globalZonesWidgets.push(...widgets);
          }
        });
      }
    }
    current = current.parent as BaseAbstractPageItem;
  }

  const result: BaseAbstractWidgetItem[] = [];
  result.push(...currentPageWidgets);
  result.push(...recursiveZonesWidgets);
  result.push(...globalZonesWidgets);
  return result;
};

export interface PageModelBuilderInterface<T extends BaseAbstractPageItem> {
  buildModel: (pathData: PathData) => T | undefined;
}

export const mapBaseItemToModel = (item: BaseAbstractItem): BaseItemModel => ({
  alias: item.alias || '',
  cultureId: item.cultureId,
  id: item.id,
  type: item.type,
  regionIds: item.regionIds,
  sortOrder: item.sortOrder,
  title: item.title || '',
  isPage: item.isPage,
});
