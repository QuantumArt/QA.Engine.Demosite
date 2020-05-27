import React from 'react';
import { PageProps } from '../../page-props';
import { BlogPageDetailsViewModel, BlogPageModel } from '../../../models/pages';
import { Layout } from '../../layout';
import { PageTitle } from '../../page-title';
import { Button, Col, Container, Row } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import parse from 'react-html-parser';

export const BlogDetailsPage: React.FunctionComponent<PageProps<BlogPageModel>> = ({
  page,
}: PageProps<BlogPageModel>) => {
  const model = page.viewModel as BlogPageDetailsViewModel;
  return (
    <Layout page={page}>
      <PageTitle title={model.title} additionalBreadcrump={model.title} />
      <Container>
        <Row>
          <Col md={8} className="blog-page-content">
            <div className="blog-item full-post">
              {model.youtubeVideoCode ? (
                <div className="blog-page-post-video">
                  <YouTube videoId={model.youtubeVideoCode} />
                </div>
              ) : model.image ? (
                <div className="blog-item-img">
                  <img src={model.image} alt="" />
                </div>
              ) : null}
              <div className="blog-item-content">
                <h2>{model.title}</h2>
                <div className="metadata">
                  <FontAwesomeIcon icon={faCalendar} /> {model.date}
                  <span className="separator">|</span>
                  <FontAwesomeIcon icon={faUser} /> {model.categoryName}
                </div>
                {parse(model.text)}
              </div>
              <p>
                <span className="post-category-text">КАТЕГОРИЯ:</span>
                <a href="#" className="category-link">
                  {model.categoryName}
                </a>
              </p>
              {model.tags && (
                <div className="tags">
                  <ul>
                    <li>
                      <strong>Tags:</strong>
                    </li>
                    {model.tags.map(tag => (
                      <li key={tag}>
                        <Button href="#">{tag}</Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
