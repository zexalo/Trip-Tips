import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './picture.reducer';
import { IPicture } from 'app/shared/model/picture.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPictureUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PictureUpdate = (props: IPictureUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { pictureEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/picture');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...pictureEntity,
        ...values,
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
          <h2 id="backofficeApp.picture.home.createOrEditLabel" data-cy="PictureCreateUpdateHeading">
            Create or edit a Picture
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pictureEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="picture-id">ID</Label>
                  <AvInput id="picture-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="pathLabel" for="picture-path">
                  Path
                </Label>
                <AvField id="picture-path" data-cy="path" type="text" name="path" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/picture" replace color="info">
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
  pictureEntity: storeState.picture.entity,
  loading: storeState.picture.loading,
  updating: storeState.picture.updating,
  updateSuccess: storeState.picture.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PictureUpdate);
