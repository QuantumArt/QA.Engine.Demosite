import React from 'react';
import { WidgetProps } from 'common/components/widget-props';
import { FaqWidgetModel } from 'common/models';
import { Accordion, Card, Container } from 'react-bootstrap';
import parse from 'react-html-parser';

export const FaqWidget: React.FunctionComponent<WidgetProps<FaqWidgetModel>> = ({
  widget,
}: WidgetProps<FaqWidgetModel>) =>
  widget.questions ? (
    <Container>
      <div className={'text-center'}>
        <h2>{widget.header}</h2>
      </div>
      <Accordion>
        {widget.questions.map(q => {
          return (
            <Card key={q.id}>
              <Accordion.Toggle as={Card.Header} eventKey={q.id.toString()}>
                {q.question}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={q.id.toString()}>
                <Card.Body>{parse(q.answer)}</Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </Container>
  ) : null;
