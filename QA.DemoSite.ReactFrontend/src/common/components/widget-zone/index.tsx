import React from 'react';
import { sortBy } from 'lodash';
import { Widget } from '../widget';
import { BaseItemModel, BasePageModel, BaseWidgetModel } from 'page-structure';

interface Props {
  abstractItem: BaseItemModel;
  zoneName: string;
}

export const WidgetZone: React.FunctionComponent<Props> = ({ abstractItem, zoneName }: Props) => {
  const children = abstractItem.isPage
    ? (abstractItem as BasePageModel).widgets
    : (abstractItem as BaseWidgetModel).children;
  const childWidgets = children?.filter(x => x.zoneName.toLowerCase() === zoneName.toLowerCase());

  if (childWidgets?.length) {
    const sortedWidgets = sortBy(childWidgets, x => x.sortOrder);
    return (
      <React.Fragment>
        {/*<div>{`Widget zone: ${zoneName}`}</div>*/}
        {sortedWidgets.map(x => (
          <Widget widget={x} key={x.id} />
        ))}
        {/*<div>{`End widget zone: ${zoneName}`}</div>*/}
      </React.Fragment>
    );
  }
  return null;
};
