import { UniversalAbstractItem } from './universal-abstract-item';
import { findPath, PathData, TargetingFilter } from './pathfinder';
import { chain, cloneDeep, some } from 'lodash';
import { abstractItemTreeRemoveParents, abstractItemTreeSetParents } from './abstract-item-tree-parent-utils';

const getZoneName = (item: UniversalAbstractItem): string =>
  item.untypedFields?.hasOwnProperty('ZONENAME') ? (item.untypedFields.ZONENAME as string) : '';

const isRecursiveZone = (zoneName: string): boolean => zoneName.toLowerCase().startsWith('recursive');

const isGlobalZone = (zoneName: string): boolean => zoneName.toLowerCase().startsWith('site');

const matchingWidget = (item: UniversalAbstractItem, widgetFilter?: TargetingFilter): boolean =>
  !item.isPage && (!widgetFilter || widgetFilter.match(item));

export interface PageModel {
  page?: UniversalAbstractItem;
  remainingPath?: string;
}

export interface PageModelBuilderInterface<T extends UniversalAbstractItem> {
  buildModelFromPathData: (pathData: PathData) => T | undefined;
  buildModelFromAbstractItem?: (universalItem: UniversalAbstractItem) => T | undefined;
}

export class DefaultPageModelBuilder implements PageModelBuilderInterface<UniversalAbstractItem> {
  private widgetFilter?: TargetingFilter;

  constructor(widgetFilter?: TargetingFilter) {
    this.widgetFilter = widgetFilter;
  }

  buildModelFromPathData(pathData: PathData): UniversalAbstractItem | undefined {
    return this.buildModelFromAbstractItem(pathData.abstractItem);
  }

  buildModelFromAbstractItem(universalItem: UniversalAbstractItem): UniversalAbstractItem | undefined {
    const pageClone = cloneDeep(universalItem);
    // console.log('buildPageModel start', page);
    const currentPageWidgets: UniversalAbstractItem[] =
      pageClone.childItems?.filter(x => !x.isPage && (!this.widgetFilter || this.widgetFilter.match(x))) || [];

    const recursiveZonesWidgets: UniversalAbstractItem[] = [];
    const globalZonesWidgets: UniversalAbstractItem[] = [];

    let current = pageClone.parent;
    while (current) {
      const recursiveZoneNames = chain(current.childItems)
        .filter(x => matchingWidget(x))
        .map(x => getZoneName(x))
        .filter(x => isRecursiveZone(x))
        .uniq()
        .value();

      if (recursiveZoneNames) {
        // eslint-disable-next-line no-loop-func
        recursiveZoneNames.forEach(zoneName => {
          const widgets = current?.childItems?.filter(x => matchingWidget(x) && getZoneName(x) === zoneName) || [];
          if (widgets) {
            recursiveZonesWidgets.push(...widgets);
          }
        });
      }

      if (!current.parent) {
        // предполагаем, что это стартовая страница
        const globalZoneNames = chain(current.childItems)
          .filter(x => matchingWidget(x))
          .map(x => getZoneName(x))
          .filter(x => isGlobalZone(x))
          .uniq()
          .value();

        if (globalZoneNames) {
          // eslint-disable-next-line no-loop-func
          globalZoneNames.forEach(zoneName => {
            const widgets = current?.childItems?.filter(x => matchingWidget(x) && getZoneName(x) === zoneName) || [];
            if (widgets) {
              globalZonesWidgets.push(...widgets);
            }
          });
        }
      }
      current = current.parent;
    }

    const result: UniversalAbstractItem[] = [];
    result.push(...currentPageWidgets);
    result.push(...recursiveZonesWidgets);
    result.push(...globalZonesWidgets);

    pageClone.childItems = result;

    // abstractItemTreeRemoveParents(pageClone);
    // console.log('pageClone', pageClone);
    return pageClone;
  }
}

export const getStartPage = (
  rootPage: UniversalAbstractItem,
  startPageDiscriminator: string,
  host: string,
): UniversalAbstractItem | undefined => {
  const startPages = rootPage.childItems?.filter(x => x.isPage && x.type === startPageDiscriminator);
  if (!startPages) {
    return undefined;
  }
  for (const x of startPages) {
    const bindings = (x.untypedFields?.BINDINGS as string)?.split(/,|\r\n|\n|\r/).filter(x => !!x);
    if (bindings && some(bindings, binding => binding === '*' || binding.toLowerCase() === host.toLowerCase())) {
      return x;
    }
  }
  return undefined;
};

export const buildPage = (
  startPage: UniversalAbstractItem,
  path: string,
  defaultPageModelBuilder: PageModelBuilderInterface<UniversalAbstractItem>,
  pageModelBuilders?: { [key: string]: PageModelBuilderInterface<UniversalAbstractItem> },
  siteStructureFilter?: TargetingFilter,
): PageModel | null => {
  const startPageClone = cloneDeep(startPage);
  abstractItemTreeSetParents(startPageClone);
  const pathData = findPath(startPageClone, path, siteStructureFilter);
  if (pathData?.abstractItem) {
    const pageModelBuilder = pageModelBuilders?.[pathData.abstractItem.type];
    const pageModel = pageModelBuilder
      ? pageModelBuilder.buildModelFromPathData(pathData)
      : defaultPageModelBuilder.buildModelFromPathData(pathData);
    // const pageModel = buildPageModel(pathData.abstractItem, widgetFilter);
    if (pageModel) {
      abstractItemTreeRemoveParents(pageModel);
    }

    return {
      page: pageModel,
      remainingPath: pathData.remainingPath,
    };
  }
  return null;
};
