import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './review.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReviewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReviewDetail = (props: IReviewDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { reviewEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="reviewDetailsHeading">Review</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{reviewEntity.id}</dd>
          <dt>
            <span id="rating">Rating</span>
          </dt>
          <dd>{reviewEntity.rating}</dd>
          <dt>
            <span id="content">Content</span>
          </dt>
          <dd>{reviewEntity.content}</dd>
          <dt>
            <span id="createdAt">Created At</span>
          </dt>
          <dd>{reviewEntity.createdAt ? <TextFormat value={reviewEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>User</dt>
          <dd>{reviewEntity.user ? reviewEntity.user.login : ''}</dd>
          <dt>Recommendation</dt>
          <dd>{reviewEntity.recommendation ? reviewEntity.recommendation.id : ''}</dd>
          <dt>Picture</dt>
          <dd>{reviewEntity.picture ? reviewEntity.picture.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/review" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/review/${reviewEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ review }: IRootState) => ({
  reviewEntity: review.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetail);
