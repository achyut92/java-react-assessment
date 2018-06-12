import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import LoginInput from '../LoginRegisterInput';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { serverUrl } from './../../config/serverConfig';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

const SignupPageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderSectionWrapper = styled.div`
  margin-top: 5vh;
  width: 85vw;
`;

const Header = styled.h1`
  margin-bottom: 5px;
`;

const InputSection = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Open Sans', sans-serif;
  width: 75vw;
`;

class SignupPage extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    loading: false,
    dialogOpen: false,
    closeDialog: false
  }

  handleInput = props => event => {
    this.setState({ [props]: event.target.value });
  };

  handleSubmit = () => {
    const { firstName, email, password } = this.state;
    this.setState({ loading: true });
    if (firstName !== '' || email !== '' || password !== '') {
      axios.post(serverUrl.url + '/api/auth/register', {
        user: {
          user_name: firstName,
          email: email,
          password: password
        }
      })
        .then(res => {
          if (res.data) {
            const response = res.data
            if (response.success) {
              this.setState({ loading: false });
              this.props.history.push('/register/success');
            } else {
              console.log(response.result.error);
              this.openDialog()
              this.setState({ loading: false });
              this.props.history.push('/register');
            }
          }
        })
    } else {
      this.openDialog()
    }
  }

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

  render() {
    return (
      <SignupPageWrapper>
        <HeaderSectionWrapper>
          <Header>Sign up!</Header>
        </HeaderSectionWrapper>
        <InputSection>
          <LoginInput handleInput={this.handleInput} placeholder='Email' type='text' value={this.state.email} changeType='email' />
          <LoginInput handleInput={this.handleInput} placeholder='First Name' type='text' value={this.state.firstName} changeType='firstName' />
          <LoginInput handleInput={this.handleInput} placeholder='Password' type='password' value={this.state.password} changeType='password' />
          <Button onClick={this.handleSubmit} style={{
            backgroundColor: '#42cef4',
            width: '60vw',
            alignSelf: 'center',
            marginTop: 26,
            fontFamily: 'inherit',
            fontWeight: 600
          }}>SIGN UP</Button>
          {this.state.loading && <LinearProgress value={0} style={{ width: '60vw', alignSelf: 'center' }} />}
        </InputSection>
        <Dialog
          open={this.state.dialogOpen}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Error signing you.</DialogTitle>
          <DialogActions>
            <Button onClick={this.closeDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </SignupPageWrapper>
    );
  }
}

export default withRouter(SignupPage);