import React, { Component } from 'react';
import styled from 'styled-components';

export default class Button extends Component {
	render() {
		const { fontSize, handleOnClick, width } = this.props;
		return (
			<ButtonMain width={width} onClick={handleOnClick}>
				<Text fontSize={fontSize}>{this.props.label}</Text>
			</ButtonMain>
		);
	}
}

const ButtonMain = styled.div`
	box-sizing: border-box;
	margin: 0px 10px;
	width: 100%;
	max-width: ${(props) => (props.width ? `${props.width}px` : '320px')};
	height: 55px;
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
	@media (max-width: 480px) {
		width: 100%;
	}
`;
const Text = styled.div`font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};`;
