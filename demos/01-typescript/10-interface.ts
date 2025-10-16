// Explore: Declaration merging in interface

interface IPerson {
    name: string,
    age: number,
    spouse?: string,
    celebrateBirthday: ( by : number ) => number
}

// Use-case 1: Provide data type for object
const john : IPerson = {
    name: 'John Doe',
    age: 32,
    celebrateBirthday( by: number = 1 ) {
        this.age += by;
        return this.age;
    }
}

// Use-case 2: Define "contract" in the class
class Person implements IPerson {
    // name: string = 'JOhn Doe';
    name: string;
    age: number;
    spouse?: string;
    readonly emails: string[] = [];
    private aadhaarNumber = 'xxxx-xxx-xxx';

    // spouse being optional argument, will be assigned undefined if not passed
    constructor( name : string, age : number, spouse? : string ) {
        this.name = name;
        this.age = age;

        if ( spouse ) { // if not undefined...
            this.spouse = spouse
        }
    }

    celebrateBirthday( by : number ) {
        this.age += by;
        return this.age;
    }
}

const jane = new Person( 'Jane Doe', 28 );

// jane.emails = [ 'jane@example.com' ]; // assignment not allowed for readonly
jane.emails.push( 'jane@example.com' ); // you CAN add to an existing array

console.log( john );
console.log( jane );