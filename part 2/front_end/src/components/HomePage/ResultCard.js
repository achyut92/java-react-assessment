import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import axios from 'axios';
import { serverUrl } from '../../config/serverConfig';

const ResultTitleSection = styled.div`
  display: flex;
`;

const ResultTitle = styled.p`
  margin-bottom: 1px;
`;

class ResultCard extends Component {
  state = {
    anchorEl: null
  };

  openMenu = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  closeMenu = () => {
    this.setState({
      anchorEl: null
    });
  }

  addRestaurantToCollection = (collectionId, restaurantId) => {
    axios.post(serverUrl.url + `/api/collection/addRestaurantToCollection`,
      { collection_id: collectionId, restaurant_id: restaurantId },
      { headers: { authorization: localStorage.getItem('jwt-token') } })
      .then(res => console.log());
    this.closeMenu();
  }

  render() {
    const { restaurant, collections, isLoggedIn } = this.props;
    const { anchorEl } = this.state;
    const renderMenuItems = collections.length > 0 ? collections.map(collection => {
      return (
        <MenuItem onClick={
          () => this.addRestaurantToCollection(collection.collectionId, restaurant._id)} key={collection.collectionId}>Add to &nbsp;<b>{collection.name}</b></MenuItem>
      )
    }) : <MenuItem>No collection created</MenuItem>

    return (
      <div key={restaurant._id}>
        
        <ResultTitleSection>
          <ResultTitle>{restaurant.name}</ResultTitle>
          {isLoggedIn &&
            <div>
              <Button
                onClick={this.openMenu}
                aria-owns={anchorEl ? 'menu' : null}
                style={{
                  position: 'absolute',
                  right: '4vw',
                  padding: 0,
                  marginTop: 7
                }}><AddIcon /></Button>
              <Menu
                id='menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.closeMenu}
              >
                {renderMenuItems}
              </Menu>
            </div>
          }
        </ResultTitleSection>
      </div>
    )
  }
}

export default ResultCard;