import React from 'react';
import { Route, Switch } from 'react-router-dom';

const LazyComponent = React.lazy(() =>
  import('./SomeComponent').then((module) => ({ default: module.SomeComponent }))
);

const OnboardingRoutes = () => (
  <Switch>
    <Route path="/some-path" component={LazyComponent} />
    {/* Add more routes as needed */}
  </Switch>
);

export default OnboardingRoutes;