
export interface ExerciseValues {
    periodLength: number,
    trainingDays: number,
    sucess: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ArgumentValues {
    value1: number;
    value2: Array<number>;
}

const ratings = [
    "No effort was made",
    "A small amount of effor was made",
    "Sufficient progress",
    "Overachiever"
];

const parseExerciseArguments = (args: Array<string>): ArgumentValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
      const trainingDays : number[] = new Array(args.length-3);
      // ^ args will be confirmed to be non Nan and number
      for(let i = 0; i<trainingDays.length;i++)
      {
          trainingDays[i]=Number(args[i+3]);
      }
      return {
        value1: Number(args[2]),
        value2: trainingDays
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};
  
export const exerciseCalc = (target: number, hours: Array<number>): ExerciseValues => {
    let zeroDays = 0;
    let sum = 0;
    hours.map(day => {
        day === 0 ?
        zeroDays++ :
        sum+=day;
    });
    const avg = sum/hours.length;
    let evaluation = 0;
    if(sum === 0)
        evaluation = 0;
    else if(avg<target)
        evaluation = 1;
    else if (avg === target)
        evaluation = 2;
    else
        evaluation = 3;
    return {
            periodLength: hours.length,
            trainingDays: hours.length-zeroDays,
            sucess: evaluation >= 2,
            rating: evaluation,
            ratingDescription: ratings[evaluation],
            target: target,
            average: avg
    };
};
try {
    const { value1, value2 } = parseExerciseArguments(process.argv);
    exerciseCalc(value1, value2);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
  }