import React from 'react';

import { PageProps } from '../../page-props';
import { Layout } from '../../layout';
import { TextPageModel } from '../../../models/pages';
import { WidgetZone } from '../../widget-zone';

export const TextPage: React.FunctionComponent<PageProps<TextPageModel>> = ({ page }: PageProps<TextPageModel>) => (
  <Layout page={page}>
    <div>This is text page</div>
    <div>{page.title}</div>
    <WidgetZone abstractItem={page} zoneName={'Content'} />
  </Layout>
);
