export const validatePairingPassword = (number) => {
	if (number.toString().length < 6 || number.toString().length > 8) {
		return 'Invalid Input';
	} else {
		return '';
	}
};

export const removeInvalidChar = (text, type = 'both') => {
	if (type === 'both') {
		return text.toLowerCase().replace(/[^0-9a-z]/g, '');
	} else if (type === 'number') {
		return text.replace(/[^0-9]/g, '');
	} else {
		return text.replace(/[^a-z]/g, '');
	}
};

export const addSpace = (seed) => {
	let newSeed = [];
	for (let i = 0; i < seed.length; i++) {
		if ((i + 1) % 5 === 0) {
			newSeed.push(seed[i] + ' ');
		} else {
			newSeed.push(seed[i]);
		}
	}
	return newSeed.join('');
};

export const makeMnemonicArray = (str) => {
	return str.toLowerCase().split(' ');
};
