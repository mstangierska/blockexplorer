import { Utils, Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Row, Card, Collapse, List, MenuProps, Menu, Button, Flex } from "antd";
import {
  BrowserRouter,
  Route,
  Router,
  Link,
  Switch,
  createRoutesFromElements,
  createBrowserRouter, 
  RouterProvider,
  Redirect
} from "react-router-dom";
import Home from "./pages/index";
import adresses from "./pages/adresses";

import './App.css';
import Adresses from './pages/adresses';
import Navbar from "./components/Navbar";


// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// type MenuItem = Required<MenuProps>['items'][number];

// const items: MenuItem[] = [
//   {
//     label: 'Navigation One',
//     key: <Route element={Home} />
//   }
// ]

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function Navigation() {
  return (
    <nav>
      <Card>
        <Flex gap="small" align="center" wrap="wrap">
          <Button type="primary" size="large" style={{paddingInline:"10px"}}><Link to="/home">Home</Link></Button>
          <Button type="primary" size="large"><Link to="/adresses">Adresses</Link></Button>
        </Flex>
      </Card>
    </nav>
  );
}
function App() {
  return (
    // <Home/>
    <div>
    <Navigation/>
    <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/adresses" component={Adresses} />
    <Route path="/home" component={Home} />
    </Switch>
    </div>
  );
}

export default App;

// const App = () => {
//   return (
//     <BrowserRouter>
//         <Routing />
//     </BrowserRouter>
//     // <p>
//     // {Home}
//     // </p>
//   );
// };
// export default App;