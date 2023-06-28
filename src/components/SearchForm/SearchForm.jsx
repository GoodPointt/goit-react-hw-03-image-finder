import {
  SearchBar,
  SearchBtnLable,
  SearchFormBtn,
  SearchFormInput,
  StyledSearchForm,
} from 'components/Styled';
import { ReactComponent as SearchIcon } from 'img/search.svg';
import PropTypes from 'prop-types';

export const SearchForm = ({ onSearch }) => {
  return (
    <SearchBar>
      <StyledSearchForm onSubmit={onSearch}>
        <SearchFormBtn type="submit" className="SearchForm-button" name="query">
          <SearchBtnLable>Search</SearchBtnLable>
          <SearchIcon width="35 " height="35" />
        </SearchFormBtn>
        <SearchFormInput
          type="text"
          placeholder="Search images and photos..."
          autoComplete="off"
          autoFocus
        />
      </StyledSearchForm>
    </SearchBar>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
