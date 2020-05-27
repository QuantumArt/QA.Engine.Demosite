import React from 'react';
import { WidgetProps } from 'common/components/widget-props';
import { BannerItemWidgetModel, BannerWidgetModel } from 'common/models';
import { WidgetZone } from 'common/components/widget-zone';
import { Button, Carousel } from 'react-bootstrap';
import { WidgetType } from '../../../enums';
import { BannerItemWidget } from '../banner-item-widget';

export const BannerWidget: React.FunctionComponent<WidgetProps<BannerWidgetModel>> = ({
  widget,
}: WidgetProps<BannerWidgetModel>) => {
  const carouselItems = widget.children?.filter(
    x => x.type === WidgetType.BannerItemWidget && x.zoneName === 'Content',
  );
  if (!carouselItems) {
    return null;
  }
  return (
    <React.Fragment>
      <Carousel>
        {/*<WidgetZone abstractItem={widget} zoneName={'Content'} />*/}
        {carouselItems.map(x => (
          <Carousel.Item key={x.id}>
            <BannerItemWidget widget={x as BannerItemWidgetModel} />
          </Carousel.Item>
          // <Carousel.Item key={x.id}>
          //   {/*<img*/}
          //   {/*  className={'d-block w-100'}*/}
          //   {/*  data-src={'holder.js/800x400?text=First slide&bg=373940'}*/}
          //   {/*  alt=""*/}
          //   {/*  width={500}*/}
          //   {/*  height={100}*/}
          //   {/*/>*/}
          //   {/*<Carousel.Caption>{(x as BannerItemWidgetModel).description}</Carousel.Caption>*/}
          //   <div>{(x as BannerItemWidgetModel).description}</div>
          //   <Button href={'#'}>Кнопка</Button>
          // </Carousel.Item>
        ))}
      </Carousel>
    </React.Fragment>
  );
};
