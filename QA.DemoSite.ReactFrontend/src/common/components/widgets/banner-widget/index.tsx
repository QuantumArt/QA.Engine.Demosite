import React from 'react';
import { BannerWidgetModel } from '../../../models/widgets';
import { WidgetProps } from '../../widget-props';

export const BannerWidget: React.FunctionComponent<WidgetProps<BannerWidgetModel>> = ({ widget }) => (
  <div>This is banner widget</div>
);
