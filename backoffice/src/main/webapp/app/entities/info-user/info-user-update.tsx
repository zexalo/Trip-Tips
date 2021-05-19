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
import { getEntity, updateEntity, createEntity, reset } from './info-user.reducer';
import { IInfoUser } from 'app/shared/model/info-user.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInfoUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InfoUserUpdate = (props: IInfoUserUpdateProps) => {
  const [idsrecommendation, setIdsrecommendation] = useState([]);
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { infoUserEntity, users, recommendations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/info-user');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getRecommendations();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...infoUserEntity,
        ...values,
        recommendations: mapIdList(values.recommendations),
        user: users.find(it => it.id.toString() === values.userId.toString()),
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
          <h2 id="backofficeApp.infoUser.home.createOrEditLabel" data-cy="InfoUserCreateUpdateHeading">
            Create or edit a InfoUser
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : infoUserEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="info-user-id">ID</Label>
                  <AvInput id="info-user-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="info-user-user">User</Label>
                <AvInput id="info-user-user" data-cy="user" type="select" className="form-control" name="userId" required>
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
                <Label for="info-user-recommendation">Recommendation</Label>
                <AvInput
                  id="info-user-recommendation"
                  data-cy="recommendation"
                  type="select"
                  multiple
                  className="form-control"
                  name="recommendations"
                  value={!isNew && infoUserEntity.recommendations && infoUserEntity.recommendations.map(e => e.id)}
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
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/info-user" replace color="info">
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
  infoUserEntity: storeState.infoUser.entity,
  loading: storeState.infoUser.loading,
  updating: storeState.infoUser.updating,
  updateSuccess: storeState.infoUser.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getRecommendations,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InfoUserUpdate);
