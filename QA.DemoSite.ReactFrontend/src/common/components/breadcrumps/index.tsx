import React from 'react';
import { PageStructureContext, PageStructureContextInterface } from '../../../page-structure/page-structure-context';
import { PageContext } from '../../models';
import { Breadcrumb, BreadcrumbItem, Col } from 'react-bootstrap';

import './styles.scss';
import { clone } from 'lodash';

interface Props {
  additional?: string;
}

export const Breadcrumps: React.FunctionComponent<Props> = ({ additional }: Props) => (
  <PageStructureContext.Consumer>
    {(context?: PageStructureContextInterface) => {
      const model = clone((context as PageContext).breadcrumps);
      if (!additional && (!model || !model.breadcrumps)) {
        return null;
      }

      // console.log('breadcrumbs', elements);

      return (
        <Col md={6}>
          <span>Вы находитесь здесь: </span>
          <Breadcrumb listProps={{ className: 'breadcrumps' }}>
            {/*<li key={'breadrumbsTitle'}>*/}
            {/*  <span>Вы находитесь здесь:&nbsp;</span>*/}
            {/*</li>*/}
            {model?.breadcrumps.map((b, index) => (
              <BreadcrumbItem
                key={index}
                href={b.url}
                active={!additional && index === model.breadcrumps.length - 1}
                className={'bc-item'}
              >
                {b.title}
              </BreadcrumbItem>
            ))}
            {!!additional && (
              <BreadcrumbItem key={'additionalBreadcrumb'} active className={'bc-item'}>
                {additional}
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Col>
      );
    }}
  </PageStructureContext.Consumer>
);
