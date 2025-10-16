// number | string is a union type
let chequeAmount : number | string = 1000;
chequeAmount = 'One thousand';

// chequeAmount = true; // error

// don't export anything - file is compiled on its own (and not combined with other files during compilation)
export {}