import React from 'react';
import { WidgetProps } from 'common/components/widget-props';
import { BannerItemWidgetModel } from 'common/models';
import { Button, Carousel } from 'react-bootstrap';

export const BannerItemWidget: React.FunctionComponent<WidgetProps<BannerItemWidgetModel>> = ({
  widget,
}: WidgetProps<BannerItemWidgetModel>) => (
  <React.Fragment>
    <div className={'d-block w-100 text-center'} style={{ backgroundColor: 'gray', height: '153px' }}>
      {widget.image && <img src={widget.image} alt="" />}
      {/*<Carousel.Caption>sjfdn</Carousel.Caption>*/}
      <div>{widget.description}</div>
      {widget.showButton && <Button href={widget.detailsButtonUrl}>{widget.detailsButtonText}</Button>}
    </div>
  </React.Fragment>
);
