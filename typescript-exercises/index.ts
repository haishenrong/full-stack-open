import express from 'express';
import {bmi, relations} from './bmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;
  if(!isNaN(Number(weight)) && !isNaN(Number(height))) {
    const result = bmi(Number(height), Number(weight));
  var evaluation = 0;
  if(result >= 18.5 && result <= 24.9)
    evaluation = 1;
  if( result > 24.9)
    evaluation = 2;
    res.send(JSON.stringify({
      weight: weight,
      height: height,
      bmi: result,
      text: relations[evaluation]
    }))
  }
  else
  res.send(JSON.stringify({
    error: "malformatted parameters"
  }))
});
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});