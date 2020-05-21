import React from 'react';
import { WidgetProps } from 'common/components/widget-props';
import { BannerItemWidgetModel } from 'common/models';

export const BannerItemWidget: React.FunctionComponent<WidgetProps<BannerItemWidgetModel>> = ({ widget }) => (
  <div>This is banner item widget</div>
);
