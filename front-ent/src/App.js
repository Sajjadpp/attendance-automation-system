
// src/App.js
import createRouter from './routers/index';
import './App.css'
import routes from './routers/routes';

function App() {
  return createRouter(routes);
}

export default App;
