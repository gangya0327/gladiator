import React from 'react';
// import Hooks from './demo/Hooks'
import GaodeMap from './demo/GaodeMap'

import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div>
      {/* <Provider store={store}>
        <Hooks />
      </Provider> */}
      <GaodeMap />
    </div>
  );
}

export default App;
