import "./searchbar.css";

interface Props {
	searchTrack(e: React.FormEvent<HTMLFormElement>): void;
	handleSearchChange(e: React.FormEvent<HTMLInputElement>): void;
}

function SearchBar({ searchTrack, handleSearchChange }: Props) {
	return (
		<form className="searching" onSubmit={searchTrack}>
			<input
				id="search-bar"
				type="search"
				className="searching-input"
				placeholder="Search..."
				onChange={handleSearchChange}
				onKeyPress={e => e.key === "Enter"}
				required
			/>
			<i className="fa fa-search"></i>
		</form>
	);
}

export default SearchBar;
