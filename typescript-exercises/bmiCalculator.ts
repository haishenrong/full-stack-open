interface BMIValues {
    value1: number;
    value2: number;
  }


  const parseBMIArguments = (args: Array<string>): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

const bmi = (height: number, weight: number) => {
    console.log(weight/(height*height)*10000);
}

try {
    const { value1, value2 } = parseBMIArguments(process.argv);
    bmi(value1, value2);
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }
