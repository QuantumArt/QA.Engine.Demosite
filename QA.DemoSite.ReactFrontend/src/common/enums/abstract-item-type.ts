export enum WidgetType {
  BannerItemWidget = 'banner_item_widget',
  BannerWidget = 'banner_widget',
  FaqWidget = 'faq_widget',
  HtmlWidget = 'html_widget',
  TopMenuWidget = 'top_menu_widget',
}

export enum PageType {
  RootPage = 'root_page',
  StartPage = 'start_page',
  TextPage = 'text_page',
  BlogPage = 'blog_page',
  RedirectPage = 'redirect_page',
}

export const AbstractItemType = {
  ...WidgetType,
  ...PageType,
};

export type AbstractItemType = WidgetType | PageType;
