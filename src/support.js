export const matrix = {
	chrome: {
		    48: 0b010010101000110011111,
		    49: 0b010011111001111111111,
		    50: 0b010111111001111111111,
		    51: 0b010111111001111111111,
		    52: 0b011111111001111111111,
		    53: 0b011111111001111111111,
		    54: 0b011111111001111111111,
		    55: 0b011111111001111111111,
		    56: 0b011111111001111111111,
		    57: 0b011111111001111111111,
		    58: 0b111111111001111111111,
		    59: 0b111111111001111111111,
		    60: 0b111111111001111111111,
		    61: 0b111111111001111111111,
		    62: 0b111111111001111111111,
		    63: 0b111111111001111111111
	},
	firefox: {
		    43: 0b010011101000110111011,
		    44: 0b010011101000110111011,
		    45: 0b010011101000110111111,
		    46: 0b010111101000110111111,
		    47: 0b010111101000111111111,
		    48: 0b010111101000111111111,
		    49: 0b010111101000111111111,
		    50: 0b010111101000111111111,
		    51: 0b010111101001111111111,
		    52: 0b111111111001111111111,
		    53: 0b111111111001111111111,
		    54: 0b111111111001111111111,
		    55: 0b111111111001111111111,
		    56: 0b111111111001111111111,
		    57: 0b111111111001111111111,
		    58: 0b111111111001111111111
	},
	safari: {
		     8: 0b010000000000000001001,
		     9: 0b010010001000011011101,
		    10: 0b110111111001111111111,
		'10.1': 0b111111111001111111111,
		    11: 0b111111111001111111111
	},
	ie: {
		     8: 0b000000000000000000000,
		     9: 0b010000000000000000001,
		    10: 0b010000000000000000001,
		    11: 0b010000000000000000001 // no let/const in for loops
	},
	edge: {
		    12: 0b010010101000010011011,
		    13: 0b010111101000110011111,
		    14: 0b111111101001111111111,
		    15: 0b111111101001111111111,
		    16: 0b111111101001111111111
	},
	node: {
		'0.10': 0b010000000000000000001,
		'0.12': 0b010000000000010000001,
		     4: 0b010010001000110011111,
		     5: 0b010010001000110011111,
		     6: 0b010111111001111111111,
		     8: 0b111111111001111111111,
		 '8.3': 0b111111111001111111111,
		 '8.7': 0b111111111001111111111
	}
};

export const features = [
	'getterSetter',
	'arrow',
	'classes',
	'computedProperty',
	'conciseMethodProperty',
	'defaultParameter',
	'destructuring',
	'forOf',
	'generator',
	'letConst',
	'moduleExport',
	'moduleImport',
	'numericLiteral',
	'parameterDestructuring',
	'spreadRest',
	'stickyRegExp',
	'templateString',
	'unicodeRegExp',

	// ES2016
	'exponentiation',

	// additional transforms, not from
	// https://featuretests.io
	'reservedProperties',

	'trailingFunctionCommas'
];
