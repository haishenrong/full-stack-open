/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import {bmi, relations} from './bmiCalculator';
import { exerciseCalc } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;
  if(!isNaN(Number(weight)) && !isNaN(Number(height))) {
    const result = bmi(Number(height), Number(weight));
  let evaluation = 0;
  if(result >= 18.5 && result <= 24.9)
    evaluation = 1;
  if( result > 24.9)
    evaluation = 2;
    res.send(JSON.stringify({
      weight: weight,
      height: height,
      bmi: result,
      text: relations[evaluation]
    }));
  }
  else
  res.send(JSON.stringify({
    error: "malformatted parameters"
  }));
});

app.post('/exercises', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data : any = request.body;
  const exerciseLog : number[] = data.daily_exercises;
  const target : number = data.target;
  console.log(data);
  console.log(exerciseLog[0]);
  console.log(target);
  if(isNaN(target)&&isNaN(exerciseLog[0]))
  {
    response.json({
      error: "parameters missing or malformatted"
    });
  }
  else
    response.json(exerciseCalc(target, exerciseLog));
});
/*
app.get('/exercises', (req, res) => {

});*/

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});