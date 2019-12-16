import { validatePairingPassword, removeInvalidChar, addSpace, makeMnemonicArray } from '../Utils/validateInput';

it('should return null when the pairing password is valid', () => {
	expect(validatePairingPassword(12345678)).toEqual('');
	expect(validatePairingPassword(123456)).toEqual('');
});

it('should return "Invalid Input" when the pairing password is invalid', () => {
	expect(validatePairingPassword(1234567890)).toEqual('Invalid Input');
	expect(validatePairingPassword(12345)).toEqual('Invalid Input');
});

it('should only return numbers', () => {
	expect(removeInvalidChar('1234567890', 'number')).toEqual('1234567890');
	expect(removeInvalidChar('1234567890&*&_)', 'number')).toEqual('1234567890');
});

it('should only return numbers', () => {
	expect(removeInvalidChar('abc', 'letters')).toEqual('abc');
	expect(removeInvalidChar('abc&*&_)', 'letters')).toEqual('abc');
});

it('should only number and letter ', () => {
	expect(removeInvalidChar('1234567890', 'both')).toEqual('1234567890');
	expect(removeInvalidChar('1234567890&*&_)', 'both')).toEqual('1234567890');
	expect(removeInvalidChar('1234567890abc&*&_)', 'both')).toEqual('1234567890abc');
});

it('should add space every 5 chars', () => {
	expect(addSpace('1234567890')).toEqual('12345 67890 ');
	expect(addSpace('12345')).toEqual('12345 ');
	expect(addSpace('123456789012345')).toEqual('12345 67890 12345 ');
});

it('should return an array of lowercase words', () => {
	expect(makeMnemonicArray('abc abc')).toEqual([ 'abc', 'abc' ]);
	expect(makeMnemonicArray('ABC ABC')).toEqual([ 'abc', 'abc' ]);
	expect(makeMnemonicArray('ABC ABC')).toEqual([ 'abc', 'abc' ]);
});
