import AuthStatus from './authStatus'

import {
    Link,
    Outlet,
  } from "react-router-dom";

export default function Layout() {
    return (
      <div>
        <AuthStatus />
  
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/list">List</Link>
          </li>
        </ul>
  
        <Outlet />
      </div>
    );
  }