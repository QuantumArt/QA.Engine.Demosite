import React from 'react';
import { BannerItemWidgetModel } from '../../../models/widgets';
import { WidgetProps } from '../../widget-props';

export const BannerItemWidget: React.FunctionComponent<WidgetProps<BannerItemWidgetModel>> = ({ widget }) => (
  <div>This is banner item widget</div>
);
