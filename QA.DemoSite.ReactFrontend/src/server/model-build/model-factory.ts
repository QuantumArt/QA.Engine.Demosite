import apiService from 'common/services/api-service';
import {
  BaseAbstractItem,
  BaseAbstractPageItem,
  BaseAbstractWidgetItem,
  BasePageModel,
  BaseWidgetModel,
  getPageWidgets,
  PathData,
  TargetingFilter,
} from 'page-structure';
import { PageType, WidgetType } from 'common/enums';
import {
  BannerItemWidgetModel,
  BannerWidgetModel,
  FaqWidgetModel,
  HtmlWidgetModel,
  TopMenuWidgetModel,
} from 'common/models/widgets';
import { BannerItemWidgetItem, FaqWidgetItem, HtmlWidgetItem, TopMenuWidgetItem } from 'server/models/widgets';
import { RedirectPageItem, TextPageItem } from 'server/models/pages';
import { BlogPageModel, BlogPageType, TextPageModel } from 'common/models/pages';
import { chain, isFinite, trimStart } from 'lodash';

export interface PageModelResult {
  notFound?: boolean;
  redirectTo?: string;
  permanentRedirect?: boolean;
  pageModel?: BasePageModel;
}

export class ModelFactory {
  private readonly _widgetFilter?: TargetingFilter;
  constructor(widgetFilter?: TargetingFilter) {
    this._widgetFilter = widgetFilter;
  }

  private isMatchingWidget(item: BaseAbstractItem): boolean {
    return item instanceof BaseAbstractWidgetItem && (!this._widgetFilter || this._widgetFilter.match(item));
  }

  private mapBaseWidget(widget: BaseAbstractWidgetItem): BaseWidgetModel {
    return {
      id: widget.id,
      title: widget.title || '',
      type: widget.type,
      alias: widget.alias || '',
      zoneName: widget.zoneName,
      cultureId: widget.cultureId,
      regionIds: widget.regionIds,
      sortOrder: widget.sortOrder,
      isPage: false,
      children: widget.childItems
        ?.filter(x => this.isMatchingWidget(x))
        .map(x => this.mapWidget(x as BaseAbstractWidgetItem) as BaseWidgetModel),
    };
  }

  private mapBasePage(page: BaseAbstractPageItem): BasePageModel {
    return {
      id: page.id,
      title: page.title || '',
      type: page.type,
      alias: page.alias || '',
      cultureId: page.cultureId,
      regionIds: page.regionIds,
      sortOrder: page.sortOrder,
      isPage: true,
      widgets: getPageWidgets(page, this._widgetFilter)?.map(x => this.mapWidget(x) as BaseWidgetModel),
    };
  }

  private mapWidget(widget: BaseAbstractWidgetItem): BaseWidgetModel {
    console.log('mapping widget');
    const type = widget.type as WidgetType;
    switch (type) {
      case WidgetType.BannerItemWidget: {
        console.log('mapping banner item widget');
        const item = widget as BannerItemWidgetItem;
        // noinspection UnnecessaryLocalVariableJS
        const result: BannerItemWidgetModel = {
          ...this.mapBaseWidget(item),
          header: item.header,
          description: item.description,
          backgroundImage: item.backgroundImage,
          detailsButtonText: item.detailsButtonText,
          detailsButtonUrl: item.detailsButtonUrl,
          showButton: item.showButton,
          image: item.image,
        };
        return result;
      }
      case WidgetType.BannerWidget: {
        console.log('mapping banner widget');
        // noinspection UnnecessaryLocalVariableJS
        const result: BannerWidgetModel = {
          ...this.mapBaseWidget(widget as BaseAbstractWidgetItem),
        };
        return result;
      }

      case WidgetType.FaqWidget: {
        const item = widget as FaqWidgetItem;

        // noinspection UnnecessaryLocalVariableJS
        const result: FaqWidgetModel = {
          ...this.mapBaseWidget(item),
          header: item.header,
          questions: apiService.getFaqQuestions(item.questions),
        };
        return result;
      }
      case WidgetType.HtmlWidget: {
        const item = widget as HtmlWidgetItem;
        const result: HtmlWidgetModel = {
          ...this.mapBaseWidget(item),
          html: item.html,
        };
        return result;
      }

      case WidgetType.TopMenuWidget: {
        const result: TopMenuWidgetModel = {
          ...this.mapBaseWidget(widget as TopMenuWidgetItem),
        };
        return result;
      }
      default:
        console.error(`unknown widget type: ${type}`);
        return this.mapBaseWidget(widget);
    }
  }

  buildPageModel(pathData?: PathData): PageModelResult {
    if (!pathData) {
      return { notFound: true };
    }
    const page = pathData.abstractItem as BaseAbstractPageItem;
    const pageType = page.type as PageType;
    switch (pageType) {
      case PageType.RootPage:
        return { notFound: true };
      case PageType.StartPage: {
        if (pathData.remainingPath && pathData.remainingPath !== '/') {
          return { notFound: true };
        }
        const firstChildPage = chain(page.childItems)
          .filter(x => x.isPage)
          .sortBy(x => x.sortOrder)
          .head()
          .value();

        if (firstChildPage) {
          const redirectTo = `/${firstChildPage.alias}`;
          return { redirectTo, permanentRedirect: false };
        }
        return { notFound: true };
      }
      case PageType.TextPage: {
        if (pathData.remainingPath && pathData.remainingPath !== '/') {
          return { notFound: true };
        }
        const textPage = page as TextPageItem;
        const result: TextPageModel = {
          ...this.mapBasePage(textPage),
          text: textPage.text,
          hideTitle: textPage.hideTitle,
        };
        return { pageModel: result };
      }
      case PageType.BlogPage: {
        const strippedRemainingPath = trimStart(pathData.remainingPath, '/') || '';
        if (!strippedRemainingPath) {
          // страница списка записей в блоге
          const baseModel = this.mapBasePage(page);
          const result: BlogPageModel = {
            ...baseModel,
            blogPageType: BlogPageType.Index,
            viewModel: apiService.getBlogItems(),
          };
          return { pageModel: result };
        }
        const splittedPath = strippedRemainingPath?.split('/').filter(x => !!x);
        if (
          splittedPath?.length === 2 &&
          splittedPath[0].toLowerCase() === 'details' &&
          isFinite(Number(splittedPath[1]))
        ) {
          const baseModel = this.mapBasePage(page);
          const details = apiService.getBlogItemDetails(Number(splittedPath[1]));
          if (!details) {
            return { notFound: true };
          }
          const result: BlogPageModel = {
            ...baseModel,
            blogPageType: BlogPageType.Details,
            viewModel: details,
          };

          return { pageModel: result };
        }
        return { notFound: true };
      }
      case PageType.RedirectPage: {
        const redirectPage = page as RedirectPageItem;
        return { redirectTo: redirectPage.redirectTo, permanentRedirect: true };
      }
      default:
        return { notFound: true };
    }
    // const type = abstractItem.type as AbstractItemType;
  }
}
