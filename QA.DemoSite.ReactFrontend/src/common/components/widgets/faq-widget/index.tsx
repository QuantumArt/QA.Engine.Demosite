import React from 'react';
import { FaqWidgetModel } from '../../../models/widgets';
import { WidgetProps } from '../../widget-props';

export const FaqWidget: React.FunctionComponent<WidgetProps<FaqWidgetModel>> = ({ widget }) => (
  <div>This is faq widget</div>
);
