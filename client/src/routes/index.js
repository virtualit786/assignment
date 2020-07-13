import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Loadable from "react-loadable";
import "bootstrap/dist/css/bootstrap.min.css";

const Loading = () => <div>...loading</div>;

const AsyncRegister = Loadable({
  loader: () => import("../pages/subscription"),
  loading: Loading,
});

export default () => (
  <BrowserRouter>
    <Route path="/" exact component={AsyncRegister} />
  </BrowserRouter>
);
