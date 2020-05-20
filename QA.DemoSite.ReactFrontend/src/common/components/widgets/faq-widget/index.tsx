import React from 'react';
import { FaqWidgetModel } from '../../../models/widgets';
import { WidgetProps } from '../../widget-props';

export const FaqWidget: React.FunctionComponent<WidgetProps<FaqWidgetModel>> = ({
  widget,
}: WidgetProps<FaqWidgetModel>) => (
  <div>
    <div>This is faq widget</div>
    <h3>{widget.viewModel?.header}</h3>
    {widget.viewModel?.items?.map(x => (
      <div key={x.id}>
        <div>Вопрос: {x.question}</div>
        <div>Ответ: {x.answer}</div>
      </div>
    ))}
  </div>
);
