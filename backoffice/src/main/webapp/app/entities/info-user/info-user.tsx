import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './info-user.reducer';
import { IInfoUser } from 'app/shared/model/info-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInfoUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const InfoUser = (props: IInfoUserProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { infoUserList, match, loading } = props;
  return (
    <div>
      <h2 id="info-user-heading" data-cy="InfoUserHeading">
        Info Users
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Info User
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {infoUserList && infoUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Recommendation</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {infoUserList.map((infoUser, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${infoUser.id}`} color="link" size="sm">
                      {infoUser.id}
                    </Button>
                  </td>
                  <td>{infoUser.user ? infoUser.user.login : ''}</td>
                  <td>
                    {infoUser.recommendations
                      ? infoUser.recommendations.map((val, j) => (
                          <span key={j}>
                            <Link to={`recommendation/${val.id}`}>{val.id}</Link>
                            {j === infoUser.recommendations.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${infoUser.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${infoUser.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${infoUser.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Info Users found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ infoUser }: IRootState) => ({
  infoUserList: infoUser.entities,
  loading: infoUser.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InfoUser);
