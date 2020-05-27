import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Breadcrumps } from '../breadcrumps';

import './styles.scss';

interface Props {
  title: string;
  additionalBreadcrump?: string;
}

export const PageTitle: React.FunctionComponent<Props> = ({ title, additionalBreadcrump }: Props) => (
  <Container className={'page-title'}>
    <Row>
      <Col md={6}>
        <div className="section-title">
          <h2>{title}</h2>
        </div>
      </Col>
      <Breadcrumps additional={additionalBreadcrump} />
    </Row>
  </Container>
);
