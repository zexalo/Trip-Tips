import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './recommendation.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecommendationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecommendationDetail = (props: IRecommendationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { recommendationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="recommendationDetailsHeading">Recommendation</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{recommendationEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{recommendationEntity.title}</dd>
          <dt>
            <span id="content">Content</span>
          </dt>
          <dd>{recommendationEntity.content}</dd>
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{recommendationEntity.price}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{recommendationEntity.city}</dd>
          <dt>
            <span id="globalRating">Global Rating</span>
          </dt>
          <dd>{recommendationEntity.globalRating}</dd>
          <dt>Category</dt>
          <dd>{recommendationEntity.category ? recommendationEntity.category.id : ''}</dd>
          <dt>Country</dt>
          <dd>{recommendationEntity.country ? recommendationEntity.country.id : ''}</dd>
          <dt>Picture</dt>
          <dd>{recommendationEntity.picture ? recommendationEntity.picture.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/recommendation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/recommendation/${recommendationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ recommendation }: IRootState) => ({
  recommendationEntity: recommendation.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationDetail);
