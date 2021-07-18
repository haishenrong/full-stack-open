interface BMIValues {
    value1: number;
    value2: number;
  }

  export const relations = [
    'Not healthy, put meat on bones',
    'Normal (healthy weight)',
    'Not healthy, remove meat from bones'
  ];

const parseBMIArguments = (args: Array<string>): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

export const bmi = (height: number, weight: number): number => {
    return weight/(height*height)*10000;
};

try {
    const { value1, value2 } = parseBMIArguments(process.argv);
    bmi(value1, value2);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
  }
