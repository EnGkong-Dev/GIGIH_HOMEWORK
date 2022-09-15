import SignIn from "../../components/signIn";

function Home() {
	return (
		<>
			<SignIn />
			<h1 className="home-login">
				Please login to Search tracks and Create playlist
			</h1>
			<div className="home-grid">
				<div className="home-row home-left">
					<h2>MADE WITH ❤️ EnGkongDev qadawdaw </h2>
				</div>
			</div>
		</>
	);
}
export default Home;
