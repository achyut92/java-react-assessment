import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import LoginInput from '../LoginRegisterInput';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from './../../config/serverConfig';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

const LoginPageWrapper = styled.div`
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

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    loading: false
  }

  handleInput = props => event => {
    this.setState({ [props]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.state.email !== '' || this.state.password !== '') {
      axios.post(serverUrl.url + '/api/auth/login', {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
        .then(res => {
          if (res.data) {
            const response = res.data
            if (response.success) {
              localStorage.setItem('jwt-token', response.result.token);
              this.setState({ loading: false });
              this.props.history.push('/login/success');
              this.props.trackSignIn();
            } else {
              console.log(response.result.error);
              this.setState({ loading: false });
              this.props.history.push('/login');
            }
          }
        })
        .catch(error => {
          this.setState({ loading: false });
          this.openDialog()
        });
    }else{
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
      <LoginPageWrapper>
        <HeaderSectionWrapper>
          <Header>Login..</Header>
        </HeaderSectionWrapper>
        <InputSection>
          <LoginInput handleInput={this.handleInput} placeholder='Email' type='text' value={this.state.email} changeType='email' />
          <LoginInput handleInput={this.handleInput} placeholder='Password' type='password' value={this.state.password} changeType='password' />
          <Button onClick={this.handleSubmit} style={{
            backgroundColor: '#42cef4',
            width: '60vw',
            alignSelf: 'center',
            marginTop: 26,
            fontFamily: 'inherit',
            fontWeight: 600
          }}>SIGN IN</Button>
          {this.state.loading && <LinearProgress value={0} style={{ width: '60vw', alignSelf: 'center' }} />}
          <Link to='/register' style={{
            textDecoration: 'none',
            textAlign: 'center',
            fontFamily: '"Open Sans", sans-serif',
            marginTop: 20
          }}>Sign up <span style={{ color: '#42cef4', fontWeight: 700 }}>here!</span></Link>
        </InputSection>
        <Dialog
          open={this.state.dialogOpen}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Error logging in you.</DialogTitle>
          <DialogActions>
            <Button onClick={this.closeDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </LoginPageWrapper>
    );
  }
}

export default withRouter(LoginPage);