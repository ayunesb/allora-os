import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import DashboardBreadcrumb from "./components/DashboardBreadcrumb";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DashboardBreadcrumb rootPath="/vault" rootLabel="Vault" />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
