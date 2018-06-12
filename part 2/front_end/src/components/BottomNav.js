import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import styled from 'styled-components';

const StyledBottomNav = styled(BottomNavigation) `
  width: 100vw;
  position: fixed;
  bottom: 0;
  color: #42cef4;
`;

class BottomNav extends Component {
  state = {
    value: ''
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.history.push(value);
  };

  componentDidMount() {
    this.setState({
      value: this.props.location.pathname
    });
  }

  render() {
    const { value } = this.state;

    return (
      <StyledBottomNav value={value} onChange={this.handleChange}>
        <BottomNavigationAction label='Home' value='' icon={<HomeIcon />} />
        <BottomNavigationAction label='Profile' value='/profile' icon={<PersonIcon />} />
      </StyledBottomNav>
    );
  }
}

export default withRouter(BottomNav);