import React, { useEffect } from 'react';
import { useStateValue } from "../state";
import { Header, Container, Icon } from "semantic-ui-react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Gender, Patient} from "../types";

const SinglePatient = () => {
  const [{ patients }, dispatch] = useStateValue();
  const {id} = useParams<{ id: string }>();

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
          <div>
            entries: {patient?.entries}
          </div>
          <div>
            id: {patient?.id}
          </div>
        </Container>
      </Router>
    </div>
  );
};

export default SinglePatient;
