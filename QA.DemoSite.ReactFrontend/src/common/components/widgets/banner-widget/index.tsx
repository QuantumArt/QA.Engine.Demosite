import React from 'react';
import { WidgetProps } from 'common/components/widget-props';
import { BannerWidgetModel } from 'common/models';
import { WidgetZone } from 'common/components/widget-zone';

export const BannerWidget: React.FunctionComponent<WidgetProps<BannerWidgetModel>> = ({
  widget,
}: WidgetProps<BannerWidgetModel>) => (
  <React.Fragment>
    <div id={'banner'}>
      <div className={'banner-slider'}>
        <WidgetZone abstractItem={widget} zoneName={'Content'} />
      </div>
    </div>
  </React.Fragment>
);
