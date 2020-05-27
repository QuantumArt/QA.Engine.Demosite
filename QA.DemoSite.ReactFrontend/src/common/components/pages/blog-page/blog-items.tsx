import React from 'react';
import { BlogPageIndexViewModel, BlogPageModel } from '../../../models/pages';
import { PageProps } from '../../page-props';
import { Layout } from '../../layout';
import { PageTitle } from '../../page-title';
import { Button, Col, Container, NavLink, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import parse from 'react-html-parser';
import { WidgetZone } from '../../widget-zone';
import YouTube from 'react-youtube';

export const BlogItemsPage: React.FunctionComponent<PageProps<BlogPageModel>> = ({
  page,
}: PageProps<BlogPageModel>) => {
  const model = page.viewModel as BlogPageIndexViewModel;

  return (
    <Layout page={page}>
      <PageTitle title={model.header} />
      <Container>
        <Row>
          <Col md={8} className="blog-page-content">
            {model.items?.map(item => (
              <div className="blog-item" key={item.id}>
                {item.youtubeVideoCode ? (
                  <div className="blog-page-post-video">
                    <YouTube videoId={item.youtubeVideoCode} />
                  </div>
                ) : item.image ? (
                  <div className="blog-item-img">
                    <a href={item.url}>
                      <img src={item.image} alt="" />
                    </a>
                  </div>
                ) : null}

                <div className="blog-item-content">
                  <h2>
                    <a href={item.url}>{item.title}</a>
                  </h2>
                  <div className="metadata">
                    <FontAwesomeIcon icon={faCalendar} /> {item.date}
                    <span className="separator">|</span>
                    <FontAwesomeIcon icon={faUser} /> {item.categoryName}
                  </div>
                  <p>{parse(item.brief)}</p>
                  <Button href={item.url}>Читать дальше</Button>
                </div>
              </div>
            ))}
          </Col>
          <Col md={4} className="blog-page-sidebar">
            <WidgetZone abstractItem={page} zoneName={'Sidebar'} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
