import React, { Component } from 'react';
import styled from 'styled-components';

export default class Button extends Component {
	render() {
		const { fontSize } = this.props;
		return (
			<ButtonMain>
				<Text fontSize={fontSize}>{this.props.label}</Text>
			</ButtonMain>
		);
	}
}

const ButtonMain = styled.div`
	width: 320px;
	height: 62px;
	border-radius: 30px;
	border: solid 1px #ffba12;
	background-color: #212529;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	color: #ffba12;
	&:hover {
		border-color: #f09307;
	}
`;
const Text = styled.div`font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};`;
