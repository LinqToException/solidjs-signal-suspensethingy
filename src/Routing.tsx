import { Route, Router } from "@solidjs/router";
import App from "./App";
import { lazy } from "solid-js";

export default () => {
    return (
        <Router root={App}>
            <Route path="/" component={lazy(() => import('./Home'))} />
            <Route path="/bork" component={lazy(() => import('./Bork'))} />
        </Router>
    );
};