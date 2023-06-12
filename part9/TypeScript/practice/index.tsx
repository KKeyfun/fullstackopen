const multiplier = (a:number, b:number, printString: string) => {
    console.log(printString, a*b);
}

// multiplier('a',5,'beef') // error
multiplier(3, 5, "printing ");

type Operation = 'multiply' | 'add' | 'divide';

type calcResult = number | Error | void;

const calculator = (a: number, b: number, o: Operation): calcResult => {
    if(o === 'multiply'){
        return a*b;
    }
    if(o === 'add'){
        return a+b;
    }
    if(o === 'divide'){
        if(b===0) throw new Error('Cant divide by 0');
        return a/b;
    }
    throw new Error('Operation not supported');
}

try {
    calculator(2,3,'divide');
} catch(error:unknown){
    let errMsg = 'Something went wrong: ';
    if(error instanceof Error){
        errMsg += error.message;
    }
    console.log(errMsg);
}

const numArr: number[];
const numArr2: Array<number>;