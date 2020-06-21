import React from 'react';
import Hooks from './demo/Hooks'

import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div>
      <Provider store={store}>
        <Hooks />
      </Provider>
    </div>
  );
}

export default App;
