import { useEffect, useState } from "react";
import axios from "axios";
import Playlist from "../../components/playlist";
import SearchBar from "../../components/searchbar";
import Music from "../../components/music";
import SignIn from "../../components/signIn";
import { useSelector } from "react-redux";
import "./create-playlist.css";

function CreatePlaylist() {
	const token = useSelector(state => state.token.value);

	const [searchKey, setSearchKey] = useState("");
	const [tracks, setTrack] = useState([]);
	const [playlist, setPlaylist] = useState({
		title: "",
		description: "",
	});

	const [selectedTracks, setSelectedTracks] = useState([]);
	const [combinedTracks, setCombinedTracks] = useState([]);

	const HeaderToken = () => {
		return {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
	};

	const handleSelectedTrack = track => {
		const alreadySelected = selectedTracks.find(t => t.uri === track.uri);
		alreadySelected
			? setSelectedTracks(selectedTracks.filter(t => t.uri !== track.uri))
			: setSelectedTracks(selectedTracks => [...selectedTracks, track]);
		console.log(selectedTracks);
	};

	useEffect(() => {
		const combinedTrackWithSelectedTrack = tracks.map(track => ({
			...track,
			isSelected: selectedTracks.find(t => t.uri === track.uri),
		}));
		setCombinedTracks(combinedTrackWithSelectedTrack);
	}, [selectedTracks, tracks]);

	const renderSearchItems = () =>
		combinedTracks.map(item => {
			const { uri } = item;
			return (
				<Music key={uri} track={item} onSelectedTrack={handleSelectedTrack} />
			);
		});

	const renderSelectedItems = () =>
		selectedTracks.map(item => {
			const { uri } = item;
			return (
				<Music
					key={uri}
					track={item}
					onSelectedTrack={handleSelectedTrack}
					selectedList={true}
				/>
			);
		});

	const playlistAdd = async e => {
		e.preventDefault();
		const uris = selectedTracks.map(item => item.uri);
		axios
			.get("https://api.spotify.com/v1/me", HeaderToken())
			.then(function (response) {
				axios
					.post(
						`https://api.spotify.com/v1/users/${response.data.id}/playlists`,
						{
							name: playlist.title,
							description: playlist.description,
							public: false,
						},
						HeaderToken()
					)
					.then(function (response) {
						axios.post(
							`https://api.spotify.com/v1/playlists/${response.data.id}/tracks`,
							{ uris: uris },
							HeaderToken()
						);
						alert("Playlist Added");
					});
			})
			.catch(() => {
				alert("Playlist add failed");
			});
	};

	const searchTrack = async e => {
		e.preventDefault();
		const { data } = await axios
			.get(
				`https://api.spotify.com/v1/search?q=${searchKey}&type=track`,
				HeaderToken()
			)
			.catch(() => {
				alert("Search error");
			});

		setTrack(data.tracks.items);
	};

	const handleSearchChange = e => {
		setSearchKey(e.target.value);
	};

	const handlePlaylistChange = e => {
		const { name, value } = e.target;
		setPlaylist({ ...playlist, [name]: value });
	};

	return (
		<>
			<SignIn />
			<div className="grid-container">
				<div className="grid-item">
					<Playlist
						playlist={playlist}
						handleChange={handlePlaylistChange}
						handleSubmit={playlistAdd}
					/>
					{selectedTracks.length > 0 && (
						<h1 className="title">Selected tracks</h1>
					)}
					<div className="music-selectedlist renderItems">
						{renderSelectedItems()}
					</div>
				</div>
				<div className="grid-item">
					<h1 className="title">Search tracks</h1>

					<SearchBar
						searchTrack={searchTrack}
						handleSearchChange={handleSearchChange}
					/>
					<div className="music-searchlist renderItems">
						{renderSearchItems()}
					</div>
				</div>
			</div>
		</>
	);
}

export default CreatePlaylist;
