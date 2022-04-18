import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import CreatePlaylist from "./create-playlist";
import Home from "./home";
import { tokenState } from "../core/tsx-module/reduxState";

function Routing() {
	const token = useSelector((state: tokenState) => state.token.value);

	return (
		<div className="container">
			<Switch>
				<Route exact path="/sepotify">
					{token && <Redirect to="/create-playlist" />}
					<Home />
				</Route>

				<Route exact path="/create-playlist">
					{!token && <Redirect to="/sepotify" />}
					<CreatePlaylist />
				</Route>

				<Redirect from="*" to="/sepotify" />
			</Switch>
		</div>
	);
}

export default Routing;
