import { type } from '../Utils/bip39Utils';

it('return seed type', () => {
	expect(type(123)).toEqual('number');
});
