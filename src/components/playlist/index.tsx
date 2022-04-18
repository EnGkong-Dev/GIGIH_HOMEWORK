import { Button } from "@mui/material";
import "./playlist.css";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

interface Props {
	handleSubmit(e: React.FormEvent<HTMLFormElement>): void;
	handleChange(e: React.FormEvent<HTMLInputElement>): void;
	playlist: {
		title: string;
		description: string;
	};
}

function Playlist({ playlist, handleChange, handleSubmit }: Props) {
	return (
		<>
			<h1>Create Playlist</h1>
			<div className="playlist">
				<form onSubmit={handleSubmit}>
					<label htmlFor="playlist-title">
						<h2>Title</h2>
					</label>
					<input
						type="text"
						id="playlist-title"
						className="playlist-title"
						placeholder="Insert Playlist Title"
						name="title"
						minLength={10}
						value={playlist.title}
						onChange={handleChange}
					/>
					<h3>minimum 10 characters</h3>
					<label htmlFor="playlist-desc">
						<h2>Description</h2>
					</label>
					<input
						type="text"
						id="playlist-desc"
						className="playlist-desc"
						placeholder="Insert Playlist Description"
						name="description"
						value={playlist.description}
						onChange={handleChange}
					/>
					<br />
					<Button
						style={{
							borderRadius: 3,
							backgroundColor: "#323031",
							color: "#bbd1ea",
							padding: "6px 20px",
							marginBottom: "4px",
							marginTop: "6px",
							fontSize: "18px",
							fontWeight: 500,
						}}
						variant="contained"
						endIcon={<PlaylistAddIcon />}
						type="submit"
					>
						Add Playlist
					</Button>
				</form>
			</div>
		</>
	);
}

export default Playlist;
