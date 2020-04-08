import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home/HomePage";
import FavPage from "./components/favs/FavPage";
import LoginPage from "./components/login/LoginPage";

function PrivateRoute({ path, component, ...rest }) {
	let user = localStorage.getItem("user");
	user = JSON.parse(user);

	if (user && user.user) {
		return <Route path={path} component={component} {...rest} />;
	} else {
		return <Redirect to="/account" {...rest} />;
	}
}

export default function Routes() {
	return (
		<Switch>
			<PrivateRoute exact path="/" component={Home} />
			<PrivateRoute path="/favs" component={FavPage} />
			<Route path="/account" component={LoginPage} />
		</Switch>
	);
}
