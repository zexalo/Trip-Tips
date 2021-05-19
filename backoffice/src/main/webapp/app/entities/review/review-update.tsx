import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IRecommendation } from 'app/shared/model/recommendation.model';
import { getEntities as getRecommendations } from 'app/entities/recommendation/recommendation.reducer';
import { IPicture } from 'app/shared/model/picture.model';
import { getEntities as getPictures } from 'app/entities/picture/picture.reducer';
import { getEntity, updateEntity, createEntity, reset } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReviewUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReviewUpdate = (props: IReviewUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { reviewEntity, users, recommendations, pictures, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/review');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getRecommendations();
    props.getPictures();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);

    if (errors.length === 0) {
      const entity = {
        ...reviewEntity,
        ...values,
        user: users.find(it => it.id.toString() === values.userId.toString()),
        recommendation: recommendations.find(it => it.id.toString() === values.recommendationId.toString()),
        picture: pictures.find(it => it.id.toString() === values.pictureId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="backofficeApp.review.home.createOrEditLabel" data-cy="ReviewCreateUpdateHeading">
            Create or edit a Review
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : reviewEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="review-id">ID</Label>
                  <AvInput id="review-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="ratingLabel" for="review-rating">
                  Rating
                </Label>
                <AvField
                  id="review-rating"
                  data-cy="rating"
                  type="string"
                  className="form-control"
                  name="rating"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="review-content">
                  Content
                </Label>
                <AvField id="review-content" data-cy="content" type="text" name="content" />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="review-createdAt">
                  Created At
                </Label>
                <AvInput
                  id="review-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.reviewEntity.createdAt)}
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="review-user">User</Label>
                <AvInput id="review-user" data-cy="user" type="select" className="form-control" name="userId" required>
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="review-recommendation">Recommendation</Label>
                <AvInput
                  id="review-recommendation"
                  data-cy="recommendation"
                  type="select"
                  className="form-control"
                  name="recommendationId"
                  required
                >
                  <option value="" key="0" />
                  {recommendations
                    ? recommendations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="review-picture">Picture</Label>
                <AvInput id="review-picture" data-cy="picture" type="select" className="form-control" name="pictureId">
                  <option value="" key="0" />
                  {pictures
                    ? pictures.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/review" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  recommendations: storeState.recommendation.entities,
  pictures: storeState.picture.entities,
  reviewEntity: storeState.review.entity,
  loading: storeState.review.loading,
  updating: storeState.review.updating,
  updateSuccess: storeState.review.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getRecommendations,
  getPictures,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewUpdate);
