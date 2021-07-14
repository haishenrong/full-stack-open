interface ExerciseValues {
    periodLength: number,
    trainingDays: number,
    sucess: boolean,
    rating: number,
    ratingDescription: String,
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
]

const parseExerciseArguments = (args: Array<string>): ArgumentValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      var trainingDays = new Array(args.length-3)
      for(var i = 0; i<trainingDays.length;i++)
      {
          trainingDays[i]=Number(args[i+3])
      }
      return {
        value1: Number(args[2]),
        value2: trainingDays
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
}
  
const exerciseCalc = (target: number, hours: Array<number>) => {
    var zeroDays = 0;
    var sum = 0;
    hours.map(day => {
        day === 0 ?
        zeroDays++ :
        sum+=day
    })
    var avg = sum/hours.length;
    var evaluation = 0;
    if(sum === 0)
        evaluation = 0;
    else if(avg<target)
        evaluation = 1;
    else if (avg === target)
        evaluation = 2;
    else
        evaluation = 3;
    console.log({
            periodLength: hours.length,
            trainingDays: hours.length-zeroDays,
            sucess: evaluation >= 2,
            rating: evaluation,
            ratingDescription: ratings[evaluation],
            target: target,
            average: avg
    })
}
try {
    const { value1, value2 } = parseExerciseArguments(process.argv);
    exerciseCalc(value1, value2);
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }