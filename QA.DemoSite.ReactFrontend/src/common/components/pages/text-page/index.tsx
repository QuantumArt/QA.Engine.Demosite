import React from 'react';

import { PageProps } from '../../page-props';
import { Layout } from '../../layout';
import { WidgetZone } from '../../widget-zone';
import { TextPageModel } from 'common/models/pages';
import { HtmlWithZones } from '../../html-with-zones';
import { PageTitle } from '../../page-title';

export const TextPage: React.FunctionComponent<PageProps<TextPageModel>> = ({ page }: PageProps<TextPageModel>) => (
  <Layout page={page}>
    {!page.hideTitle && <PageTitle title={page.title} />}
    <WidgetZone abstractItem={page} zoneName={'Content'} />
    <HtmlWithZones html={page.text} abstractItem={page} />
    <WidgetZone abstractItem={page} zoneName={'ContentBelow'} />
  </Layout>
);
