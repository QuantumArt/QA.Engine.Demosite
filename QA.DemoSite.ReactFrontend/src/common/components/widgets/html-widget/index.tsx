import React from 'react';
import { WidgetProps } from 'common/components/widget-props';
import { HtmlWidgetModel } from 'common/models';
import parse from 'react-html-parser';

export const HtmlWidget: React.FunctionComponent<WidgetProps<HtmlWidgetModel>> = ({
  widget,
}: WidgetProps<HtmlWidgetModel>) => (widget.html ? <React.Fragment>{parse(widget.html)}</React.Fragment> : null);
