import "./App.css";
import Routing from "./pages/routing";
import { Provider } from "react-redux";
import store from "./core/redux/store.js";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<header>
				<h1>GIGIH HOMEWORK 2</h1>
			</header>
			<Provider store={store}>
				<Router>
					<Routing />
				</Router>
			</Provider>
		</div>
	);
}

export default App;
