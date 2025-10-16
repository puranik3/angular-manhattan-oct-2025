// We can values as data types!

const quantity = 10;
// quantity = 11; // error
let x : 1 = 1;
// x = 2; // error

let rating : 1 | 2 | 3 | 4 | 5;
rating = 1;
rating = 3;
rating = 5;
// rating = 6; // error

export {}