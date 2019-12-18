import { type, linearSearh, letters, number, validateNmemonic, validateLength } from '../Utils/bip39Utils';

it('returns type number when input type is number', () => {
	expect(type(123)).toEqual('number');
	expect(type('123')).toEqual('number');
	expect(type('123 2342')).toEqual('number');
});

it('returns type mixed when input type is invalid', () => {
	expect(type('abc123')).toEqual('mixed');
	expect(type('abc123')).toEqual('mixed');
	expect(type('abc123^&*_+%#@')).toEqual('mixed');
});

it('returns type letters when input type is letters', () => {
	expect(type('abc')).toEqual('letters');
	expect(type('abc hsdhsf')).toEqual('letters');
});

it('returns true importing valid mnemonic word in English', () => {
	expect(linearSearh('ability', letters)).toEqual(true);
	expect(linearSearh('zoo', letters)).toEqual(true);
});

it('returns false importing invalid mnemonic word in English', () => {
	expect(linearSearh('aaaaa', letters)).toEqual(false);
	expect(linearSearh('aaaaabb', letters)).toEqual(false);
});

it('returns true importing valid mnemonic number', () => {
	expect(linearSearh('00001', number)).toEqual(true);
	expect(linearSearh('59953', number)).toEqual(true);
});

it('returns false importing valid mnemonic number', () => {
	expect(linearSearh('00000', number)).toEqual(false);
	expect(linearSearh('99999', number)).toEqual(false);
});

it('returns false importing a serious invalid mnemonic number', () => {
	expect(validateNmemonic('12345', number)).toEqual(false);
	expect(validateNmemonic('12345 12345', number)).toEqual(false);
});

it('returns true importing a serious valid mnemonic number', () => {
	expect(validateNmemonic('00001', number)).toEqual(true);
	expect(validateNmemonic('00001 59905', number)).toEqual(true);
	expect(validateNmemonic('00001 59905 59905 00001 59905 59905 00001 59905 59905 00001 59905 59905', number)).toEqual(
		true
	);
});

it('returns true the length of mnemonic is greater or equal than 12', () => {
	expect(validateLength('00001 59905 59905 00001 59905 59905 00001 59905 59905 00001 59905 59905')).toEqual(true);
	expect(validateLength('00001 59905 59905 00001 59905 59905 00001 59905 59905 00001 59905 59905 59905')).toEqual(
		true
	);
	expect(validateLength('wrist wrist wrist wrist wrist wrist wrist wrist wrist wrist wrist wrist')).toEqual(true);
});

it('returns false the length of mnemonic is less than 12', () => {
	expect(validateLength('00001 ')).toEqual(false);
	expect(validateLength('00001 59905 59905 00001')).toEqual(false);
});
