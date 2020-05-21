import React from 'react';
import { BaseAbstractPageModel } from '../../../page-structure/models/abstract';
import { WidgetZone } from '../widget-zone';

interface Props {
  page: BaseAbstractPageModel;
  children?: React.ReactNode;
}

export const Layout: React.FunctionComponent<Props> = ({ page, children }: Props) => (
  <React.Fragment>
    <WidgetZone abstractItem={page} zoneName={'SiteHeaderZone'} />
    {children}
    <WidgetZone abstractItem={page} zoneName={'SiteFooterZone'} />
  </React.Fragment>
);
