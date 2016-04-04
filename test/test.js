var assert = require( 'assert' );
var buble = require( '../dist/buble.umd.js' );

require( 'source-map-support' ).install();

describe( 'buble', () => {
	describe( 'arrow functions', () => {
		it( 'transpiles an arrow function', () => {
			var source = `var answer = () => 42`;
			var result = buble.transform( source ).code;

			assert.equal( result, `var answer = function () { return 42; }` );
		});

		it( 'transpiles an arrow function with a naked parameter', () => {
			var source = `var double = x => x * 2`;
			var result = buble.transform( source ).code;

			assert.equal( result, `var double = function ( x ) { return x * 2; }` );
		});

		it( 'transpiles an arrow function with parenthesised parameters', () => {
			var source = `var add = ( a, b ) => a + b`;
			var result = buble.transform( source ).code;

			assert.equal( result, `var add = function ( a, b ) { return a + b; }` );
		});

		it( 'transpiles an arrow function with a body', () => {
			var source = `
				var add = ( a, b ) => {
					return a + b;
				};`;

			var result = buble.transform( source ).code;

			assert.equal( result, `
				var add = function ( a, b ) {
					return a + b;
				};` );
		});

		it( 'replaces `this` inside an arrow function', () => {
			var source = `
				this.foo = 'bar';
				var lexicallyScoped = () => this.foo;`;

			var result = buble.transform( source ).code;

			assert.equal( result, `
				var this$1 = this;
				this.foo = 'bar';
				var lexicallyScoped = function () { return this$1.foo; };` );
		});

		it( 'replaces `arguments` inside an arrow function', () => {
			var source = `
				function firstArgument () {
					return () => arguments[0];
				}
				assert.equal( firstArgument( 1, 2, 3 )(), 1 )`;

			var result = buble.transform( source ).code;

			assert.equal( result, `
				function firstArgument () {
					var arguments$1 = arguments;
					return function () { return arguments$1[0]; };
				}
				assert.equal( firstArgument( 1, 2, 3 )(), 1 )` );
		});

		it( 'only adds one `this` or `arguments` per context', () => {
			var source = `
				function multiply () {
					return () => {
						return () => this * arguments[0];
					};
				}
				assert.equal( multiply.call( 2, 3 )()(), 6 )`;

			var result = buble.transform( source ).code;

			assert.equal( result, `
				function multiply () {
					var arguments$1 = arguments;
					var this$1 = this;
					return function () {
						return function () { return this$1 * arguments$1[0]; };
					};
				}
				assert.equal( multiply.call( 2, 3 )()(), 6 )` );
		});
	});

	describe( 'object properties', () => {
		it( 'transpiles shorthand properties', () => {
			var source = `obj = { x, y }`;
			var result = buble.transform( source ).code;

			assert.equal( result, `obj = { x: x, y: y }` );
		});

		it( 'transpiles shorthand methods', () => {
			var source = `obj = {
				foo () { return 42; }
			}`;
			var result = buble.transform( source ).code;

			assert.equal( result, `obj = {
				foo: function () { return 42; }
			}` );
		});

		it( 'does not transpile computed properties', () => {
			assert.throws( () => {
				buble.transform( `obj = {
					[x]: 'x'
				}` );
			}, /Computed properties are not supported/ );
		});
	});

	describe( 'template strings', () => {
		it( 'transpiles an untagged template literal', () => {
			var source = 'var str = `foo${bar}baz`;';
			var result = buble.transform( source ).code;

			assert.equal( result, `var str = 'foo' + bar + 'baz';` );
		});

		it( 'transpiles an untagged template literal containing complex expressions', () => {
			var source = 'var str = `foo${bar + baz}qux`;';
			var result = buble.transform( source ).code;

			assert.equal( result, `var str = 'foo' + (bar + baz) + 'qux';` );
		});

		it( 'does not transpile tagged template literals', () => {
			assert.throws( () => {
				buble.transform( 'var str = x`y`' );
			}, /Tagged template expressions are not supported/ );
		});
	});
});