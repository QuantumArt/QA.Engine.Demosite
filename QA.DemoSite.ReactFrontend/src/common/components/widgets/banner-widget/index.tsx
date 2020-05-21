import React from 'react';
import { WidgetProps } from 'common/components/widget-props';
import { BannerWidgetModel } from 'common/models';

export const BannerWidget: React.FunctionComponent<WidgetProps<BannerWidgetModel>> = ({ widget }) => (
  <div>This is banner widget</div>
);
