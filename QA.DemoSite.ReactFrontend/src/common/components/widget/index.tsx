import React from 'react';
import { BaseAbstractWidgetModel } from '../../../page-structure/models/abstract';
import { WidgetType } from '../../enums/abstract-item-type';
import { BannerItemWidget } from '../widgets/banner-item-widget';
import {
  BannerItemWidgetModel,
  BannerWidgetModel,
  FaqWidgetModel,
  HtmlWidgetModel,
  TopMenuWidgetModel,
} from '../../models/widgets';
import { BannerWidget } from '../widgets/banner-widget';
import { FaqWidget } from '../widgets/faq-widget';
import { HtmlWidget } from '../widgets/html-widget';
import { TopMenuWidget } from '../widgets/top-menu-widget';
import { WidgetProps } from '../widget-props';

export const Widget: React.FunctionComponent<WidgetProps<BaseAbstractWidgetModel>> = ({
  widget,
}: WidgetProps<BaseAbstractWidgetModel>) => {
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
