import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import CreatePlaylist from "./create-playlist";
import Home from "./home";

function Routing() {
	const token = useSelector(state => state.token.value);

	return (
		<div className="container">
			<Switch>
				<Route exact path="/home">
					{token && <Redirect to="/create-playlist" />}
					<Home />
				</Route>

				<Route exact path="/create-playlist">
					{!token && <Redirect to="/home" />}
					<CreatePlaylist />
				</Route>

				<Redirect from="*" to="/home" />
			</Switch>
		</div>
	);
}

export default Routing;
