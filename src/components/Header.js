import React, { Component } from 'react'
import styled from 'styled-components'

export default class Header extends Component {
  render() {
    return (
      <Container>
        <Image alt="img" src={'CWS_Logo.png'} />
      </Container>
    )
  }
}

const Container = styled.div`
width: 100%;
background: #333639;
display: flex;
`;

const Image = styled.img`
width: 200px;
`;
