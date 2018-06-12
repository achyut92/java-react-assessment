import React from 'react';
import styled from 'styled-components';
import ResultCard from './ResultCard';

const SearchResultWrapper = styled.div`
  margin-top: 20vh;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchResult = (props) => {
  
  const renderResults = props.restaurants.map((restaurant, index)=>{
    return (
      <ResultCard collections={props.collections} restaurant={restaurant} key={index} isLoggedIn={props.isLoggedIn} />
    );
  })
  return (
    <SearchResultWrapper style={{
      display: 'block',
      padding: 20
    }}>
      {(props.restaurants.length > 0 ) ? renderResults : <p>No results</p>}
    </SearchResultWrapper>
  );
}

export default SearchResult;