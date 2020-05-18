import React from 'react';
import { TopMenuWidgetModel } from '../../../models/widgets';
import { WidgetProps } from '../../widget-props';

export const TopMenuWidget: React.FunctionComponent<WidgetProps<TopMenuWidgetModel>> = ({ widget }) => (
  <div>This is top menu widget</div>
);
