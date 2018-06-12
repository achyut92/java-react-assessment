import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const SuccessPageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

class SuccessPage extends Component {
  constructor() {
    super();
    this.state = {
      timer: 5
    }
  }

  componentDidMount() {    
    this.interval = setInterval(() => this.decreaseTimer(), 1000);
    // redirect to designated page after 1.5s
    setTimeout(() => {
      switch (this.props.type) {
        case this.props.type === 'logout':
          this.props.history.push('/');
          break;
        case this.props.type === 'login':
          window.history.go(-2);
          break;
        case this.props.type === 'register':
          window.history.go(-3);
          break;
        default:
          this.props.history.push('/');
      }
    }, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  decreaseTimer = () => {
    this.setState(prevState => ({
      timer: prevState.timer - 1
    }));
  };

  render() {
    const { type } = this.props;
    return (
      <SuccessPageWrapper>
        {type === 'register' && <h4>Thank you for signing up!</h4>}
        {type === 'login' && <h4>Successfully logged in!</h4>}
        {type === 'logout' && <h4>You have logged out.</h4>}
      </SuccessPageWrapper>
    );
  }
}

export default withRouter(SuccessPage);