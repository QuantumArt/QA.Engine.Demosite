import { BaseAbstractItem, UniversalAbstractItem } from 'page-structure';
import { AbstractItemType } from 'common/enums';
import { BlogPageItem, RedirectPageItem, RootPageItem, StartPageItem, TextPageItem } from 'server/models/pages';
import {
  BannerItemWidgetItem,
  BannerWidgetItem,
  FaqWidgetItem,
  HtmlWidgetItem,
  TopMenuWidgetItem,
} from 'server/models/widgets';

export const mapAbstractItem = (universalItem: UniversalAbstractItem, parent?: BaseAbstractItem): BaseAbstractItem => {
  if (universalItem instanceof BaseAbstractItem) {
    return <BaseAbstractItem>universalItem;
  }
  const itemType = universalItem.type as AbstractItemType;
  switch (itemType) {
    case AbstractItemType.RootPage:
      return new RootPageItem(universalItem, mapAbstractItem, parent);
    case AbstractItemType.StartPage:
      return new StartPageItem(universalItem, mapAbstractItem, parent);
    case AbstractItemType.TextPage:
      return new TextPageItem(universalItem, mapAbstractItem, parent);
    case AbstractItemType.BlogPage:
      return new BlogPageItem(universalItem, mapAbstractItem, parent);
    case AbstractItemType.RedirectPage:
      return new RedirectPageItem(universalItem, mapAbstractItem, parent);
    case AbstractItemType.BannerItemWidget:
      return new BannerItemWidgetItem(universalItem, mapAbstractItem, parent);
    case AbstractItemType.BannerWidget:
      return new BannerWidgetItem(universalItem, mapAbstractItem, parent);
    case AbstractItemType.FaqWidget:
      return new FaqWidgetItem(universalItem, mapAbstractItem, parent);
    case AbstractItemType.HtmlWidget:
      return new HtmlWidgetItem(universalItem, mapAbstractItem, parent);
    case AbstractItemType.TopMenuWidget:
      return new TopMenuWidgetItem(universalItem, mapAbstractItem, parent);

    default:
      throw new Error(`Unknown abstract item type: ${itemType}`);
  }
};
