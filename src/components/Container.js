import React, { Component } from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT } from './Header';

export default class Container extends Component {
	render() {
		return <ContainerMain>{this.props.children}</ContainerMain>;
	}
}

const ContainerMain = styled.div`
	height: calc(100% - ${HEADER_HEIGHT}px);
	width: 100%;
	background: #333639;
	position: absolute;
	align-items: center;
	display: flex;
	justify-content: center;
`;
