import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

export default function Recovereds() {

  const [lastTotalRecovereds, setLastTotalRecovered] = useState(null);
  const [lastTotalUpdate, setLastTotalUpdate] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': '0057623fafmsh56471cbcf2faa1ep108687jsndf01b733d902',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
      },
    };
    fetch("https://covid-19-data.p.rapidapi.com/totals", requestOptions)
    .then(response => response.json())
    .then(res => {
      console.log(res);
      setLastTotalRecovered(res[0].recovered);
      setLastTotalUpdate(res[0].lastUpdate);
    });
  }, [])
  return (
    <React.Fragment>
      <Title>Recovereds</Title>
      <Typography component="p" variant="h4">
        {lastTotalRecovereds}
      </Typography>
      <Typography component="p" variant="h4">
        Persons
      </Typography>
      <Typography color="textSecondary">
        last Update:
      </Typography>
      <Typography color="textSecondary1">
        {lastTotalUpdate}
      </Typography>
    </React.Fragment>
  );
}