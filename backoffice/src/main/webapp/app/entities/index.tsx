import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Country from './country';
import Picture from './picture';
import Category from './category';
import Recommendation from './recommendation';
import InfoUser from './info-user';
import Review from './review';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}picture`} component={Picture} />
      <ErrorBoundaryRoute path={`${match.url}category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}recommendation`} component={Recommendation} />
      <ErrorBoundaryRoute path={`${match.url}info-user`} component={InfoUser} />
      <ErrorBoundaryRoute path={`${match.url}review`} component={Review} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
