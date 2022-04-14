import "./searchbar.css";

function SearchBar({ searchTrack, handleSearchChange }: any) {
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
