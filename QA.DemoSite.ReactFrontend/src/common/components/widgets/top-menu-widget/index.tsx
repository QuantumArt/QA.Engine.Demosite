import React from 'react';
import { WidgetProps } from 'common/components/widget-props';
import { TopMenuWidgetModel } from 'common/models';

export const TopMenuWidget: React.FunctionComponent<WidgetProps<TopMenuWidgetModel>> = ({ widget }) => (
  <div>This is top menu widget</div>
);
