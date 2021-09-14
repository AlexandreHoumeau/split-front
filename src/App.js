import { BrowserRouter, Switch } from 'react-router-dom';
import "./App.css";
import PublicRoute from './routes/publicRoutes';


export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={false} component={Home} path="/" exact />
        {/* <PrivateRoute component={Dashboard} path="/dashboard" exact /> */}
      </Switch>
    </BrowserRouter>
  );
}

const Home = () => (
  <div className="App">
    <header className="App-header">
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);
