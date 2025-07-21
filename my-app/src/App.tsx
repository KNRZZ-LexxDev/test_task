import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ComparisonPage from './components/ComparisonPage';

const App: React.FC = () => (
  <Provider store={store}>
    <ComparisonPage />
  </Provider>
);

export default App;