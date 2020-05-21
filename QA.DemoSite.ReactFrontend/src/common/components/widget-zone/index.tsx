import React from 'react';
import { BaseAbstractItemModel, BaseAbstractWidgetModel } from 'page-structure/models/abstract';
import { sortBy } from 'lodash';
import { Widget } from '../widget';

interface Props {
  abstractItem: BaseAbstractItemModel;
  zoneName: string;
}

export const WidgetZone: React.FunctionComponent<Props> = ({ abstractItem, zoneName }: Props) => {
  const childWidgets = abstractItem.childItems
    ?.filter(x => x instanceof BaseAbstractWidgetModel)
    .map(x => x as BaseAbstractWidgetModel)
    .filter(x => x.zoneName.toLowerCase() === zoneName.toLowerCase());

  if (childWidgets?.length) {
    const sortedWidgets = sortBy(childWidgets, x => x.sortOrder);
    return (
      <React.Fragment>
        <div>{`Widget zone: ${zoneName}`}</div>
        {sortedWidgets.map(x => (
          <Widget widget={x} key={x.id} />
        ))}
        <div>{`End widget zone: ${zoneName}`}</div>
      </React.Fragment>
    );
  }
  return <div>Empty widget zone {zoneName}</div>;
};
