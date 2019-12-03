import React, { Component } from 'react';
import styled from 'styled-components';
import { ORANGEY_YELLOW, GREYISH_BROWN, BROWN_GREY, DARK_GREY } from '../constant';

export default class Button extends Component {
	render() {
		const { fontSize, handleOnClick, width, buttonStyle } = this.props;
		return (
			<ButtonMain buttonStyle={buttonStyle} width={width} onClick={handleOnClick}>
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
	border: ${(props) => (props.buttonStyle === 'gray' ? 'none' : 'solid 1px #ffba12')};
	background-color: #212529;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	color: ${(props) => (props.buttonStyle === 'gray' ? GREYISH_BROWN : ORANGEY_YELLOW)};
	&:hover {
		border-color: #f09307;
		background-color: ${(props) => (props.buttonStyle === 'gray' ? DARK_GREY : '#212529')};
		color: ${(props) => (props.buttonStyle === 'gray' ? BROWN_GREY : ORANGEY_YELLOW)};
	}
	@media (max-width: 480px) {
		width: 100%;
	}
`;
const Text = styled.div`font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};`;
