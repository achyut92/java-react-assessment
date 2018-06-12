import React from 'react';
import styled from 'styled-components';

const LoginInputs = styled.input`
  font-size: 1.2em;
  font-weight: 300;
  border-bottom: 1px solid rgba(0,0,0,0.6);
  border-left: 0px;
  border-right: 0px;
  border-top: 2px;
  padding-top: 5px;
  margin-top: 30px;
  border-left
  &:focus {
    outline: none;
  }
`;

const LoginRegisterInput = (props) => {
  const { placeholder, type, value, handleInput, changeType } = props;
  return (
    <LoginInputs placeholder={placeholder} type={type} value={value} onChange={handleInput(changeType)} />
  );
}

export default LoginRegisterInput;