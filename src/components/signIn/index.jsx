import { useEffect, useState } from "react";
import { login } from "../../core/redux/token-slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

function SignIn() {
	const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
	const REDIRECT_URI = "http://localhost:3000/home";
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const RESPONSE_TYPE = "token";
	const SCOPE = "playlist-modify-private";

	const dispatch = useDispatch();
	const [token, setToken] = useState("");

	useEffect(() => {
		var now = new Date().getTime();
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find(elem => elem.startsWith("access_token"))
				.split("=")[1];
			window.localStorage.setItem("setupTime", now);
		}
		window.location.hash = "";
		setToken(token);
		dispatch(login(token));
		window.localStorage.setItem("token", token);

		var setupTime = localStorage.getItem("setupTime");
		if (now - setupTime > 3600 * 1000) {
			window.localStorage.clear();
			dispatch(login(""));
		}
	}, [dispatch, token]);

	const logout = () => {
		setToken("");
		window.localStorage.setItem("token", "");
		dispatch(login(""));
	};
	return (
		<>
			{!token ? (
				<Button
					style={{
						borderRadius: 10,
						backgroundColor: "#1ED760",
						color: "white",
						padding: "5px 15px",
						margin: "10px 10px",
						fontSize: "22px",
						fontWeight: 900,
					}}
					startIcon={<LoginIcon />}
					href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
				>
					Login to Spotify
				</Button>
			) : (
				<Link to="/">
					<Button
						style={{
							borderRadius: 15,
							backgroundColor: "#323031",
							color: "#bbd1ea",
							padding: "7px 20px",
							margin: "10px 10px",
							fontSize: "22px",
							fontWeight: 900,
						}}
						onClick={logout}
						endIcon={<LogoutIcon />}
					>
						Logout
					</Button>
				</Link>
			)}
		</>
	);
}

export default SignIn;
