import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from './state/jsonStore'
import { Provider } from 'react-redux'
import JsonEditorWrapper from './components/jsonEditor';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <JsonEditorWrapper json={{
          "wdwa": "2010-09-09",
          "dwa": "dwa"
        }}></JsonEditorWrapper>
      </Provider>
    </div>
  );
}

export default App;
