import "./music.css";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

const Music = ({ track, onSelectedTrack, selectedList }) => {
	const { album, name, artists, isSelected } = track;

	return (
		<div className="music">
			<div className="music-left">
				<img src={album.images[0].url} alt="album" />
				<div className="music-name">
					<h2>{name}</h2>
					<h3>{artists[0].name}</h3>
					<h4>{album.name}</h4>
				</div>
			</div>

			<div className="select-align">
				{isSelected || selectedList ? (
					<Tooltip title="Remove Selected Tracks" followCursor>
						<IconButton onClick={() => onSelectedTrack(track)} size="large">
							<DoDisturbIcon />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Add to Selected Tracks" followCursor>
						<IconButton onClick={() => onSelectedTrack(track)} size="large">
							<AddIcon />
						</IconButton>
					</Tooltip>
				)}
			</div>
		</div>
	);
};

export default Music;
