import React, { Component } from 'react'
import styled from 'styled-components'

export default class Button extends Component {
  render() {
    return (
      <ButtonMain>
        {this.props.label}
      </ButtonMain>
    )
  }
}

const ButtonMain = styled.div`
width: 369px;
height: 62px;
border-radius: 27px;
border: solid 1px #ffba12;
background-color: #212529;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
color: #ffba12;
`;
