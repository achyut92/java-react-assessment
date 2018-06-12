import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const StyledToolbar = styled(Toolbar) `
  flex-direction: column;
  background-color: #42cef4;
`;

const SearchBarTitle = styled.h1`
  font-size: 1.2em;
  font-weight: 400;
`;

const InputSection = styled.form`
  display: flex;
  margin-bottom: 15px;
`

const SearchBar = (props) => {
  return (
    <div>
      <AppBar position='fixed' >
        <StyledToolbar>
          <SearchBarTitle>Restaurants opened during</SearchBarTitle>
          <InputSection>
            <TextField
              id='datetime-local'
              type='datetime-local'
              value={props.dateTime}
              onChange={props.handleDateChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          </InputSection>
          <Button onClick={props.handleSearch}>Search</Button>
        </StyledToolbar>
      </AppBar>
    </div>
  )
}

export default SearchBar;