import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InfoUser from './info-user';
import InfoUserDetail from './info-user-detail';
import InfoUserUpdate from './info-user-update';
import InfoUserDeleteDialog from './info-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InfoUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InfoUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InfoUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={InfoUser} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InfoUserDeleteDialog} />
  </>
);

export default Routes;
