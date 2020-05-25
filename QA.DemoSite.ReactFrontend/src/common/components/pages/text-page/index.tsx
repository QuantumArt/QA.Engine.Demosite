import React from 'react';

import { PageProps } from '../../page-props';
import { Layout } from '../../layout';
import { WidgetZone } from '../../widget-zone';
import { TextPageModel } from 'common/models/pages';
import { HtmlWithZones } from '../../html-with-zones';

export const TextPage: React.FunctionComponent<PageProps<TextPageModel>> = ({ page }: PageProps<TextPageModel>) => (
  <Layout page={page}>
    <div>This is text page</div>
    <div>{page.title}</div>
    <WidgetZone abstractItem={page} zoneName={'Content'} />
    <HtmlWithZones html={'<div>[[zone=customZone1]]<div>[[zone=customZone2]]</div></div>'} abstractItem={page} />
  </Layout>
);
