import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import axios from 'axios';
import moment from 'moment';
import { serverUrl } from './../../config/serverConfig';

class HomePage extends Component {

  state = {
    time: '',
    date: '2018-02-21',
    dateTime: '',
    restaurants: [],
    searchStatus: true,
    filteredRestaurants: [],
    imgs: [],
    isLoggedIn: false,
    collections: []
  };

  componentDidMount() {
    axios.get(serverUrl.url + '/api/restaurant/fetchAllRestaurants')
      .then(res => {
        this.setState({
          restaurants: res.data,
          filteredRestaurants: res.data
        });
      });
    const currentTime = new Date();
    this.setState({
      time: currentTime.toLocaleTimeString({ hour12: false }),
      date: currentTime.toISOString().split('T')[0],
      dateTime: moment().format('YYYY-MM-DDThh:mm')
    });
    // checks if user is logged in
    const auth = localStorage.getItem('jwt-token');
    if (auth) {
      this.fetchUserCollections();
      this.setState({ isLoggedIn: true });
    }
    else {
      this.setState({ isLoggedIn: false });
    }
  }

  fetchUserCollections = () => {
    axios.get(serverUrl.url + `/api/collection/fetchCollectionByUser`,
      {headers: { authorization: localStorage.getItem('jwt-token') }})
      .then(res => {
        let collectionsNameArr = res.data.result.collections.map(collection => {
          let collectionObj = {};
          collectionObj['collectionId'] = collection._id;
          collectionObj['name'] = collection.name;
          return collectionObj;
        });
        this.setState({
          collections: collectionsNameArr
        })
      });
  }

  handleInputChange = props => event => {
    console.log(event.target.value);
    // this.setState({ [props]: moment(event.target.value });
  }

  handleDateChange = event => {
    this.setState({
      dateTime: event.target.value,
    });
  }

  handleSearch = () => {
    const day = moment(this.state.dateTime).day();
    const hour = moment(this.state.dateTime).hour() * 60;
    axios.get(serverUrl.url + `/api/restaurant/test?day=` + day + '&time=' + hour)
      .then(res => {
        this.setState({ restaurants: res.data, searchStatus: true });
        console.log(this.state.restaurants);

      });
  }

  render() {
    return (
      <div>
        <SearchBar handleInputChange={this.handleInputChange} handleDateChange={e => this.handleDateChange(e)} date={this.state.date} time={this.state.time} handleSearch={this.handleSearch} dateTime={this.state.dateTime} />
        
        <SearchResults collections={this.state.collections} restaurants={this.state.restaurants} isLoggedIn={this.state.isLoggedIn} />
      </div>
    )
  };
}

export default HomePage;