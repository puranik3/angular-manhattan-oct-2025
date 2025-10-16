type NS = number | string;

// let primes : number[];
let primes : Array<number>;
primes = [ 2, 3, 5, 7 ];

// define the data type to be an array with number or string items
// then assign an array with numbers and strings as items
let chequeAmounts : (number | string)[];
chequeAmounts = [ 1000, 2000, 'Three thousand' ];

let chequeAmounts2 : number[] | string[];
chequeAmounts2 = [] as number[]; // type assertion
chequeAmounts2.push( 1000 );