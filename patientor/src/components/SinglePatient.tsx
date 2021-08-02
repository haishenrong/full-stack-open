import React, { useEffect } from 'react';
import { useStateValue } from "../state";
import { Header, Container, Icon } from "semantic-ui-react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Gender, Patient, Diagnosis} from "../types";

const SinglePatient = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const {id} = useParams<{ id: string }>();
  console.log(diagnoses);
  const lookFor = async (id:string): Promise<Patient> => {
      const { data: foundPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch({ type: "ADD_PATIENT", payload: foundPatient });
      return foundPatient;
  };

  useEffect(() => {
    lookFor(id).then(val => {
      return val;
      })
      .catch(()=> console.log('error'));
    }, []
  );

  const patient = Object.values(patients).find(pat => pat.id === id);
  const diagnosesList:Diagnosis[] = Object.values(diagnoses);
  //console.log(patient);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h2">
            {patient?.name}
            {patient?.gender === Gender.Male ?
              <Icon enabled name = 'mars' size = 'small'/> :
              <Icon enabled name = 'venus' size = 'small'/> 
            }
          </Header>
          <div>
            ssn: {patient?.ssn}
          </div>
          <div>
            occupation: {patient?.occupation}
          </div>
          <div>
            DOB: {patient?.dateOfBirth}
          </div>
          <div>
            gender: {patient?.gender}
          </div>
          
            <Header as="h3">
              entries 
            </Header>
            <Container>
            {patient?.entries.map(entry => (
                <div key={entry.id}>
                  <h4>
                    {entry.date} {entry.type}
                  </h4>
                  <div>
                    {entry.description}
                  </div>
                  {entry.diagnosisCodes ?
                  <ul>
                    {entry.diagnosisCodes?.map(code => (
                      <li key={code}>
                        {code}: {diagnosesList.find(
                          (diagnosis:Diagnosis)=> diagnosis.code === code)?.name}
                      </li>
                    ))}
                  </ul> : ''}
                  {
                     "discharge" in entry ?
                      <div>
                        <div>Discharged {entry.discharge.date}</div>
                        <div>Criteria: {entry.discharge.criteria}</div>
                      </div> :
                      "healthCheckRating" in entry ?
                      <div>Health Rating: {entry.healthCheckRating}</div> :
                      <div>  
                        <div>Employer: {entry.employerName}</div>
                        <div>Sick Leave: {entry.sickLeave}</div>
                      </div>
                  }
                  <pre> {''}</pre>
                </div>
              )
            )} 
            </Container>
          <div>
            id: {patient?.id}
          </div>
        </Container>
      </Router>
    </div>
  );
};

export default SinglePatient;
