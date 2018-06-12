import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { serverUrl } from './../../config/serverConfig';

const ProfilePageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10vh;
`;

const HeaderSectionWrapper = styled.div`
  margin-top: 5vh;
  width: 85vw;
`;

const Header = styled.h1`
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;

const CollectionSectionWrapper = styled.main`
  width: 85vw;
`;

const CollectionInput = styled.input`
  width: 65vw;
  font-size: 1em;
  margin-top: 10px;
  border-bottom: 1px solid black;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  font-family: inherit;
`;

class ProfilePage extends Component {
  state = {
    firstName: '',
    lastName: '',
    userId: '',
    user: {},
    collections: [],
    dialogOpen: false,
    collectionName: ''
  }

  componentDidMount() {
    const auth = localStorage.getItem('jwt-token');
    if (!auth) {
      this.props.history.push('/login');
    }
    else {
      this.fetchUser()
      this.fetchUserCollections();
    }
  }

  fetchUser = () => {
    axios.get(serverUrl.url + `/api/user/fetchUserById`,
      {
        headers: { authorization: localStorage.getItem('jwt-token') }
      }
    )
      .then(res => {
        this.setState({
          user: res.data.result.user
        });
      }).catch(error => {
        console.log(error);

      })
  }

  // updates user collection whenever new collection is added
  fetchUserCollections = () => {
    axios.get(serverUrl.url + `/api/collection/fetchCollectionByUser`,
      {
        headers: { authorization: localStorage.getItem('jwt-token') }
      })
      .then(res => {
        this.setState({
          collections: res.data.result.collections
        });
      });
  }

  handleSignOut = () => {
    localStorage.clear();
    // this.props.trackSignOut();
    this.props.history.push('/logout/success');
  };

  openDialog = () => {
    this.setState({
      dialogOpen: true
    });
  }

  closeDialog = () => {
    this.setState({
      dialogOpen: false
    });
  }

  handleCollectionInput = event => {
    this.setState({
      collectionName: event.target.value
    });
  }

  handleAddCollection = () => {
    axios.post(serverUrl.url + `/api/collection/create`,
      { collection_name: this.state.collectionName },
      {
        headers: { authorization: localStorage.getItem('jwt-token') }
      })
      .then(res => {
        console.log(res.data.result);

        this.closeDialog();
        this.setState({ collectionName: '' });
      })
      .then(() => {
        this.fetchUserCollections(this.state.userId);
      });
  }

  render() {
    const {collections, collectionName, dialogOpen, user } = this.state;
    const renderCollections = collections.length > 0 ? collections.map((collection, index) => {
      return (
        <Link key={collection._id} to={`/collections/${collection._id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <div>
            <p>{index+1}. <span style={{ color: 'blue'}}>{collection.name}</span></p>
          </div>
        </Link>
      )
    }) : (
        <div>no collections</div>
      );
    return (
      <ProfilePageWrapper>
        <HeaderSectionWrapper>
          <Header>Hi, {user.user_name}</Header>
          <ButtonWrapper>
            <Button onClick={this.handleSignOut}><LogoutIcon/></Button>
          </ButtonWrapper>
        </HeaderSectionWrapper>
        <CollectionSectionWrapper>
          <h1>Collections</h1>
          {renderCollections}
        </CollectionSectionWrapper>
        <Button onClick={this.openDialog} variant='fab' style={{
          position: 'relatvie',
          left: '30vw',
          bottom: '16vh',
          backgroundColor: 'white'
        }}><AddIcon /></Button>
        <Dialog
          open={dialogOpen}
          onClose={this.closeDialog}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>New Collection</DialogTitle>
          <DialogContent>
            <DialogContentText>Add new collection.</DialogContentText>
            <CollectionInput placeholder='Collection Name' type='text' onChange={this.handleCollectionInput} value={collectionName} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAddCollection}>Add</Button>
          </DialogActions>
        </Dialog>
      </ProfilePageWrapper>
    );
  }
}

export default withRouter(ProfilePage);