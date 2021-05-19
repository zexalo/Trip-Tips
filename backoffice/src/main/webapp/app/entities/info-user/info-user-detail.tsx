import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './info-user.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInfoUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InfoUserDetail = (props: IInfoUserDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { infoUserEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="infoUserDetailsHeading">InfoUser</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{infoUserEntity.id}</dd>
          <dt>User</dt>
          <dd>{infoUserEntity.user ? infoUserEntity.user.login : ''}</dd>
          <dt>Recommendation</dt>
          <dd>
            {infoUserEntity.recommendations
              ? infoUserEntity.recommendations.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {infoUserEntity.recommendations && i === infoUserEntity.recommendations.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/info-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/info-user/${infoUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ infoUser }: IRootState) => ({
  infoUserEntity: infoUser.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InfoUserDetail);
