import React from 'react';
import { WidgetProps } from 'common/components/widget-props';
import { HtmlWidgetModel } from 'common/models';

export const HtmlWidget: React.FunctionComponent<WidgetProps<HtmlWidgetModel>> = ({ widget }) => (
  <div>This is html widget</div>
);
