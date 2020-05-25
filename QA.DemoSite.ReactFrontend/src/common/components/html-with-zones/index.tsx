import React, { ReactElement } from 'react';
import { BaseItemModel } from '../../../page-structure/models/widgets-and-pages';
import ReactHtmlParser, { Transform } from 'react-html-parser';
import { DomElement } from 'htmlparser2';
import { WidgetZone } from '../widget-zone';

interface Props {
  html: string;
  abstractItem: BaseItemModel;
}

export class HtmlWithZones extends React.Component<Props> {
  private zonePattern = /\[\[zone=(\w+)]]/gim;

  transform: Transform = (node: DomElement, index: number): ReactElement | void | null => {
    if (node.name === 'wz' && node.children && node.children[0].type === 'text') {
      return <WidgetZone zoneName={node.children[0].data} abstractItem={this.props.abstractItem} key={index} />;
    }
    return undefined;
  };

  render(): JSX.Element {
    const { html } = this.props;
    const preparedHtml = html.replace(this.zonePattern, '<wz>$1</wz>');

    return <React.Fragment>{ReactHtmlParser(preparedHtml, { transform: this.transform })}</React.Fragment>;
  }
}
