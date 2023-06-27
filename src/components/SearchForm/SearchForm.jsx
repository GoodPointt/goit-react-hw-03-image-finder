export const SearchForm = ({ onSearch }) => {
  return (
    <div className="Searchbar">
      <form className="SearchForm" onSubmit={onSearch}>
        <button
          type="submit"
          className="SearchForm-button"
          name="query"
        ></button>
        <input
          type="text"
          className="SearchForm-input"
          placeholder="Search images and photos..."
        />
      </form>
    </div>
  );
};
