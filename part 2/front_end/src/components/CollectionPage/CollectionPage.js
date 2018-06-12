import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import styled from 'styled-components';
import { serverUrl } from '../../config/serverConfig';
import openSocket from 'socket.io-client';

const socket = openSocket(serverUrl.url);

const CollectionTitle = styled.h1`
  font-size: 1.5em;
  margin-left: 4vw;
`;

const HeaderSectionWrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
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

const HeaderButtonSection = styled.div`
  display: flex;
`;

const FavouriteListSection = styled.div`
  margin: 0 0 10vh 7vw;
`;

class CollectionPage extends Component {
  /* constructor(props) {
    super(props)
    this.handleSocketOn = this.handleSocketOn.bind(this)
  } */
  state = {
    restaurants: [],
    collectionName: '',
    collectionId: null,
    dialogOpen: false,
    shareDialogOpen: false,
    userEmail: '',
    clientSockId: null
  };

  componentDidMount() {
    const { collectionId } = this.props.match.params;
    const search = this.props.location.search;
    this.setState({
      collectionId: collectionId,
      clientSockId: search.split('=')[1]
    });
    this.fetchCollectionById(collectionId);
    this.subscribeToSocket()

    socket.on('collectionUpdated', function (data) {
      let collectionId = data.collectionId
      console.log(' on collectionUpdated ' + collectionId);
      // this.handleData(data)
      // this.fetchCollectionById(collectionId)
      axios.get(serverUrl.url + `/api/collection/fetchCollectionById?collectionId=` + collectionId,
      /* { headers: { authorization: localStorage.getItem('jwt-token') } }*/)
        .then(res => {
          const response = res.data.result.collection;
          console.log(response);

          this.setState({
            collectionName: response.name,
            restaurants: response.restaurants
          });
        });
    }.bind(this))

    socket.on('collectionDeleted', function (data) {
      let collectionId = data.collectionId
      console.log(' on collectionDeleted ' + collectionId);
      axios.post(serverUrl.url + `/api/collection/deleteCollectionById?collectionId=` + collectionId,
      )
        .then(res => {
          this.props.history.push('/profile');
        });
    }.bind(this))
  }

  fetchCollectionById = (collectionId) => {
    axios.get(serverUrl.url + `/api/collection/fetchCollectionById?collectionId=` + collectionId,
      /* { headers: { authorization: localStorage.getItem('jwt-token') } }*/)
      .then(res => {
        const response = res.data.result.collection;
        this.setState({
          collectionName: response.name,
          restaurants: response.restaurants
        });
      });
  }

  openDialog = () => {
    this.setState({
      dialogOpen: true
    });
  }

  openShareDialog = () => {
    this.setState({
      shareDialogOpen: true
    });
  }

  closeDialog = () => {
    this.setState({
      shareDialogOpen: false
    });
  }

  closeShareDialog = () => {
    this.setState({
      shareDialogOpen: false
    });
  }

  handleCollectionInput = event => {
    this.setState({
      collectionName: event.target.value
    });
  }

  handleEmailInput = event => {
    this.setState({
      userEmail: event.target.value
    });
  }

  deleteCollection = () => {
    const { collectionId, clientSockId } = this.state;
    axios.post(serverUrl.url + `/api/collection/deleteCollectionById?collectionId=` + collectionId,
      { headers: { authorization: localStorage.getItem('jwt-token') } })
      .then(res => {
        socket.emit('collectionDelete', { sockId: clientSockId, collectionId: collectionId })
        this.props.history.push('/profile');
      });
  }

  updateCollectionName = () => {
    const { collectionId, collectionName, clientSockId } = this.state;
    axios.post(serverUrl.url + `/api/collection/updateCollectionById?collectionId=` + collectionId,
      {
        headers: { authorization: localStorage.getItem('jwt-token') },
        collection: { name: collectionName }
      })
      .then(res => {
        socket.emit('collectionUpdate', { sockId: clientSockId, collectionId: collectionId })
        this.fetchCollectionById(collectionId);
        this.closeDialog();
      });
  }

  shareCollection = () => {
    const { userEmail, collectionId } = this.state;
    axios.post(serverUrl.url + '/api/collection/sendEmail',
      { to: userEmail, url: '192.168.1.127:4000/collections/' + collectionId + '?clientSockId=' + socket.id })
      .then(res => {
        this.closeShareDialog()
      }).catch(error => {
        console.log(error);
        this.closeShareDialog()

      })
  }

  subscribeToSocket = () => {
    socket.emit('storeClientInfo', { customId: localStorage.getItem('jwt-token') });
  }
  render() {
    const { collectionName, restaurants, dialogOpen, userEmail, shareDialogOpen } = this.state;
    const renderFavouritedRestaurants = restaurants.map((restaurant, index) => {
      return (
        <div key={index}>
          <p>{index+1}. {restaurant.name}</p>
        </div>
      )
    });
    return (
      <div>
       
        <HeaderSectionWrapper>
          <CollectionTitle>Collection: {collectionName}</CollectionTitle>
          <HeaderButtonSection>
            <Button onClick={this.openDialog} style={{ position: 'relative', left: 40 }}><EditIcon /></Button>
            <Button onClick={this.deleteCollection} style={{ marginLeft: 40 }}><DeleteIcon /></Button>
            <Button onClick={this.openShareDialog}><ShareIcon /></Button>
          </HeaderButtonSection>
        </HeaderSectionWrapper>
        <Dialog
          open={dialogOpen}
          onClose={this.closeDialog}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Edit Collection</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit collection.</DialogContentText>
            <CollectionInput placeholder='Collection Name' type='text' onChange={this.handleCollectionInput} value={collectionName} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.updateCollectionName}>Update</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={shareDialogOpen}
          onClose={this.closeShareDialog}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Share Collection</DialogTitle>
          <DialogContent>
            <DialogContentText>Share collection.</DialogContentText>
            <CollectionInput placeholder='Share with (email)' type='email' onChange={this.handleEmailInput} value={userEmail} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.shareCollection}>Share</Button>
          </DialogActions>
        </Dialog>
        <FavouriteListSection>
        <p>Restaurants under this collection:</p>
          {renderFavouritedRestaurants}
        </FavouriteListSection>
      </div >
    );
  }
}

export default withRouter(CollectionPage);