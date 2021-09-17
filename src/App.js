import { BrowserRouter, Switch } from "react-router-dom";
import "./index.css";
import PublicRoute from "./routes/publicRoutes";
import PrivateRoute from "./routes/privateRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={false} component={Home} path="/home" exact />
        <PrivateRoute component={Dashboard} path="/dashboard" exact />
      </Switch>
    </BrowserRouter>
  );
}

const Home = () => (
  <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
    <div className="flex-shrink-0">
      <img className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
    </div>
    <div>
      <div className="text-xl font-medium text-black">ChitChat</div>
      <p className="text-gray-500">You have a new message!</p>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="App">
    <header className="App-header">
      <p>Hello World from Dashboard</p>
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
