import React from 'react';
import { WidgetZone } from '../widget-zone';
import { BasePageModel } from 'page-structure';

interface Props {
  page: BasePageModel;
  children?: React.ReactNode;
}

export const Layout: React.FunctionComponent<Props> = ({ page, children }: Props) => (
  <React.Fragment>
    <WidgetZone abstractItem={page} zoneName={'SiteHeaderZone'} />
    {children}
    <WidgetZone abstractItem={page} zoneName={'SiteFooterZone'} />
  </React.Fragment>
);
