import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";
import Music from "../components/music";
import CreatePlaylist from "../pages/create-playlist";
import { testItems } from "./jsonData/tracks";
// import { searchItems } from "./jsonData/search";
import { Provider } from "react-redux";
import store from "../core/redux/store";
import SearchBar from "../components/searchbar";
import userEvent from "@testing-library/user-event";
// import SignIn from "../components/signIn";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// import AxiosMockAdapter from "axios-mock-adapter";
// import axiosMock from "axios";

test("renders headers", () => {
	render(<App />);
	const headers = screen.getByText(/Reinardtify/i);
	expect(headers).toBeInTheDocument();
});

test("renders components in Create Playlist", () => {
	render(
		<Provider store={store}>
			<CreatePlaylist />
		</Provider>
	);
	const user = screen.getByText(/Hello,/i);
	const playlist = screen.getByText(/Create Playlist/i);
	const search = screen.getByText(/Search Tracks/i);
	expect(user).toBeInTheDocument();
	expect(playlist).toBeInTheDocument();
	expect(search).toBeInTheDocument();
});

test("tracks functionality", () => {
	render(<Music track={testItems} />);
	const image = screen.getByAltText(/album/i);
	const title = screen.getByText(/TEST DRIVE/i);
	const artist = screen.getByText(/Joji/i);
	const album = screen.getByText(/BALLADS 1/i);
	const duration = screen.getByText(/2:59/i);
	expect(image).toBeInTheDocument();
	expect(title).toBeInTheDocument();
	expect(artist).toBeInTheDocument();
	expect(album).toBeInTheDocument();
	expect(duration).toBeInTheDocument();
});

test("searchBar component", () => {
	const searchTrack = jest.fn();

	render(<SearchBar searchTrack={searchTrack} />);
	const input = screen.getByPlaceholderText("Search...");
	userEvent.type(input, "abc{enter}");

	expect(searchTrack).toHaveBeenCalled();
});

// test("user Profile", async () => {
// 	render(
// 		<Provider store={store}>
// 			<SignIn />
// 		</Provider>
// 	);
// });

// test("Seach Api", async () => {
// 	render(
// 		<Provider store={store}>
// 			<CreatePlaylist />
// 		</Provider>
// 	);

// 	const input = screen.getByPlaceholderText("Search...");
// 	userEvent.type(input, "abc{enter}");

// 	// await waitFor(() => screen.getByRole("alert"));
// 	// expect(screen.getByRole("alert")).toHaveTextContent("Search error");

// 	screen.debug();
// });

// test("Seach Api", async () => {
// 	render(<App />);
// });

// const searchTrack = rest.get(
// 	"https://api.spotify.com/v1/search?q=abc&type=track",
// 	(req, res, ctx) => {
// 		return res(ctx.json(testItems));
// 	}
// );

// const handlers = [searchTrack];

// const server = new setupServer(...handlers);

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// test("Seach Api", async () => {
// 	axiosMock.get.mockResolvedValueOnce();

// 	render(
// 		<Provider store={store}>
// 			<CreatePlaylist />
// 		</Provider>
// 	);

// 	const input = screen.getByPlaceholderText("Search...");
// 	userEvent.type(input, "abc{enter}");
// 	screen.debug();

// 	const title = await wait;
// 	expect(title).toBeInTheDocument();
// });
