import React from 'react';
import { WidgetProps } from 'common/components/widget-props';
import { FaqWidgetModel } from 'common/models';

export const FaqWidget: React.FunctionComponent<WidgetProps<FaqWidgetModel>> = ({
  widget,
}: WidgetProps<FaqWidgetModel>) => (
  <div>
    <div>This is faq widget</div>
    <h3>{widget.header}</h3>
    {widget.questions?.map(x => (
      <div key={x.id}>
        <div>Вопрос: {x.question}</div>
        <div>Ответ: {x.answer}</div>
      </div>
    ))}
  </div>
);
