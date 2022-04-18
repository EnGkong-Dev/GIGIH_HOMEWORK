import { useEffect, useState, FC } from "react";
import axios from "axios";
import Playlist from "../../components/playlist";
import SearchBar from "../../components/searchbar";
import Music from "../../components/music";
import SignIn from "../../components/signIn";
import { useSelector } from "react-redux";
import "./create-playlist.css";
import { Avatar } from "@mui/material";
import { Item } from "../../core/tsx-module/tracks";
import { tokenState, userProfileState } from "../../core/tsx-module/reduxState";

const CreatePlaylist: FC = () => {
	const token = useSelector((state: tokenState) => state.token.value);
	const userName = useSelector(
		(state: userProfileState) => state.userProfile.name
	);
	const userImage = useSelector(
		(state: userProfileState) => state.userProfile.image
	);
	const userId = useSelector((state: userProfileState) => state.userProfile.id);
	const [searchKey, setSearchKey] = useState("");
	const [tracks, setTrack] = useState([]);
	const [playlist, setPlaylist] = useState({
		title: "",
		description: "",
	});

	const [selectedTracks, setSelectedTracks] = useState<Item[]>([]);
	const [combinedTracks, setCombinedTracks] = useState<Item[]>([]);

	const HeaderToken = () => {
		return {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
	};

	const handleSelectedTrack = (track: Item) => {
		const alreadySelected = selectedTracks.find(
			(t: Item) => t.uri === track.uri
		);
		alreadySelected
			? setSelectedTracks(
					selectedTracks.filter((t: Item) => t.uri !== track.uri)
			  )
			: setSelectedTracks((selectedTracks: Item[]) => [
					...selectedTracks,
					track,
			  ]);
	};

	useEffect(() => {
		const combinedTrackWithSelectedTrack = tracks.map((track: Item) => ({
			...track,
			isSelected: selectedTracks.find((t: Item) => t.uri === track.uri),
		}));
		setCombinedTracks(combinedTrackWithSelectedTrack);
	}, [selectedTracks, tracks]);

	const renderSearchItems = () =>
		combinedTracks.map((item: Item) => {
			const { uri } = item;
			return (
				<Music
					key={uri}
					track={item}
					onSelectedTrack={handleSelectedTrack}
					selectedList={false}
				/>
			);
		});

	const renderSelectedItems = () =>
		selectedTracks.map((item: Item) => {
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

	const playlistAdd = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const uris = selectedTracks.map((item: Item) => item.uri);
		axios
			.post(
				`https://api.spotify.com/v1/users/${userId}/playlists`,
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
				alert("Playlist added");
			})
			.catch(() => {
				alert("Playlist add failed");
			});
	};

	const searchTrack = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		axios
			.get(
				`https://api.spotify.com/v1/search?q=${searchKey}&type=track`,
				HeaderToken()
			)
			.then(function (response) {
				setTrack(response.data.tracks.items);
			})
			.catch(() => {
				alert("Search error");
			});
	};

	const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSearchKey(e.currentTarget.value);
	};

	const handlePlaylistChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setPlaylist({ ...playlist, [name]: value });
	};

	return (
		<>
			<div className="account">
				<h1>Hello, {userName ? userName : "user"}</h1>
				<Avatar
					src={userImage}
					sx={{
						mx: "auto",
						height: 70,
						width: 70,
						bgcolor: "#323031",
						"@media(max-width: 670px)": {
							height: 60,
							width: 60,
						},
					}}
				/>
				<SignIn />
			</div>

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
};

export default CreatePlaylist;
