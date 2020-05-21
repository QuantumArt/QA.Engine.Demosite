import React from 'react';
import { WidgetType } from 'common/enums';
import { BannerItemWidget, BannerWidget, FaqWidget, HtmlWidget, TopMenuWidget } from '../widgets';
import { WidgetProps } from '../widget-props';
import { BaseWidgetModel } from 'page-structure';
import {
  BannerItemWidgetModel,
  BannerWidgetModel,
  FaqWidgetModel,
  HtmlWidgetModel,
  TopMenuWidgetModel,
} from 'common/models';

export const Widget: React.FunctionComponent<WidgetProps<BaseWidgetModel>> = ({
  widget,
}: WidgetProps<BaseWidgetModel>) => {
  const widgetType = widget.type as WidgetType;
  switch (widgetType) {
    case WidgetType.BannerItemWidget:
      return <BannerItemWidget widget={widget as BannerItemWidgetModel} />;

    case WidgetType.BannerWidget:
      return <BannerWidget widget={widget as BannerWidgetModel} />;

    case WidgetType.FaqWidget:
      return <FaqWidget widget={widget as FaqWidgetModel} />;

    case WidgetType.HtmlWidget:
      return <HtmlWidget widget={widget as HtmlWidgetModel} />;

    case WidgetType.TopMenuWidget:
      return <TopMenuWidget widget={widget as TopMenuWidgetModel} />;

    default:
      return null;
  }
};
