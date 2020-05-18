import React from 'react';
import { HtmlWidgetModel } from '../../../models/widgets';
import { WidgetProps } from '../../widget-props';

export const HtmlWidget: React.FunctionComponent<WidgetProps<HtmlWidgetModel>> = ({ widget }) => (
  <div>This is html widget</div>
);
