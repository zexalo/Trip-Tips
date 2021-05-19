import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { IPicture } from 'app/shared/model/picture.model';
import { getEntities as getPictures } from 'app/entities/picture/picture.reducer';
import { getEntity, updateEntity, createEntity, reset } from './recommendation.reducer';
import { IRecommendation } from 'app/shared/model/recommendation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecommendationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecommendationUpdate = (props: IRecommendationUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { recommendationEntity, categories, countries, pictures, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/recommendation');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCategories();
    props.getCountries();
    props.getPictures();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...recommendationEntity,
        ...values,
        category: categories.find(it => it.id.toString() === values.categoryId.toString()),
        country: countries.find(it => it.id.toString() === values.countryId.toString()),
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
          <h2 id="backofficeApp.recommendation.home.createOrEditLabel" data-cy="RecommendationCreateUpdateHeading">
            Create or edit a Recommendation
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : recommendationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="recommendation-id">ID</Label>
                  <AvInput id="recommendation-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="recommendation-title">
                  Title
                </Label>
                <AvField
                  id="recommendation-title"
                  data-cy="title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="recommendation-content">
                  Content
                </Label>
                <AvField id="recommendation-content" data-cy="content" type="text" name="content" />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="recommendation-price">
                  Price
                </Label>
                <AvField id="recommendation-price" data-cy="price" type="string" className="form-control" name="price" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="recommendation-city">
                  City
                </Label>
                <AvField id="recommendation-city" data-cy="city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="globalRatingLabel" for="recommendation-globalRating">
                  Global Rating
                </Label>
                <AvField
                  id="recommendation-globalRating"
                  data-cy="globalRating"
                  type="string"
                  className="form-control"
                  name="globalRating"
                />
              </AvGroup>
              <AvGroup>
                <Label for="recommendation-category">Category</Label>
                <AvInput id="recommendation-category" data-cy="category" type="select" className="form-control" name="categoryId" required>
                  <option value="" key="0" />
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="recommendation-country">Country</Label>
                <AvInput id="recommendation-country" data-cy="country" type="select" className="form-control" name="countryId" required>
                  <option value="" key="0" />
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="recommendation-picture">Picture</Label>
                <AvInput id="recommendation-picture" data-cy="picture" type="select" className="form-control" name="pictureId">
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
              <Button tag={Link} id="cancel-save" to="/recommendation" replace color="info">
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
  categories: storeState.category.entities,
  countries: storeState.country.entities,
  pictures: storeState.picture.entities,
  recommendationEntity: storeState.recommendation.entity,
  loading: storeState.recommendation.loading,
  updating: storeState.recommendation.updating,
  updateSuccess: storeState.recommendation.updateSuccess,
});

const mapDispatchToProps = {
  getCategories,
  getCountries,
  getPictures,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationUpdate);
