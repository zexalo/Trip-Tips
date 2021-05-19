import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './recommendation.reducer';
import { IRecommendation } from 'app/shared/model/recommendation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecommendationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Recommendation = (props: IRecommendationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { recommendationList, match, loading } = props;
  return (
    <div>
      <h2 id="recommendation-heading" data-cy="RecommendationHeading">
        Recommendations
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Recommendation
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {recommendationList && recommendationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Price</th>
                <th>City</th>
                <th>Global Rating</th>
                <th>Category</th>
                <th>Country</th>
                <th>Picture</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {recommendationList.map((recommendation, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${recommendation.id}`} color="link" size="sm">
                      {recommendation.id}
                    </Button>
                  </td>
                  <td>{recommendation.title}</td>
                  <td>{recommendation.content}</td>
                  <td>{recommendation.price}</td>
                  <td>{recommendation.city}</td>
                  <td>{recommendation.globalRating}</td>
                  <td>
                    {recommendation.category ? <Link to={`category/${recommendation.category.id}`}>{recommendation.category.id}</Link> : ''}
                  </td>
                  <td>
                    {recommendation.country ? <Link to={`country/${recommendation.country.id}`}>{recommendation.country.id}</Link> : ''}
                  </td>
                  <td>
                    {recommendation.picture ? <Link to={`picture/${recommendation.picture.id}`}>{recommendation.picture.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${recommendation.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${recommendation.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${recommendation.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Recommendations found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ recommendation }: IRootState) => ({
  recommendationList: recommendation.entities,
  loading: recommendation.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);
