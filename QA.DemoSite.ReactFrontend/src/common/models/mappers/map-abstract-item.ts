import { BaseAbstractItemModel, UniversalAbstractItem } from 'page-structure';
import { AbstractItemType } from 'common/enums/abstract-item-type';
import { BlogPageModel, RedirectPageModel, RootPageModel, StartPageModel, TextPageModel } from '../pages';
import { BannerItemWidgetModel, BannerWidgetModel, FaqWidgetModel, HtmlWidgetModel, TopMenuWidgetModel } from '../widgets';

export const mapAbstractItem = (universalItem: UniversalAbstractItem): BaseAbstractItemModel => {
  if (universalItem instanceof BaseAbstractItemModel) {
    return <BaseAbstractItemModel>universalItem;
  }
  const itemType = universalItem.type as AbstractItemType;
  switch (itemType) {
    case AbstractItemType.RootPage:
      return new RootPageModel(universalItem, mapAbstractItem);
    case AbstractItemType.StartPage:
      return new StartPageModel(universalItem, mapAbstractItem);
    case AbstractItemType.TextPage:
      return new TextPageModel(universalItem, mapAbstractItem);
    case AbstractItemType.BlogPage:
      return new BlogPageModel(universalItem, mapAbstractItem);
    case AbstractItemType.RedirectPage:
      return new RedirectPageModel(universalItem, mapAbstractItem);
    case AbstractItemType.BannerItemWidget:
      return new BannerItemWidgetModel(universalItem, mapAbstractItem);
    case AbstractItemType.BannerWidget:
      return new BannerWidgetModel(universalItem, mapAbstractItem);
    case AbstractItemType.FaqWidget:
      return new FaqWidgetModel(universalItem, mapAbstractItem);
    case AbstractItemType.HtmlWidget:
      return new HtmlWidgetModel(universalItem, mapAbstractItem);
    case AbstractItemType.TopMenuWidget:
      return new TopMenuWidgetModel(universalItem, mapAbstractItem);

    default:
      throw new Error(`Unknown abstract item type: ${itemType}`);
  }
};
