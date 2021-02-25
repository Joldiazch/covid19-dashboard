import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Title from './Title';

// Graphql query
const query = JSON.stringify({
  query: `
  {
    lastWeekTotal{
      date
      deaths
    }
  }`
});

export default function Chart(props) {

  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() =>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: props.query ? props.query : query
    };
    fetch("http://localhost:8000/graphql/", requestOptions)
    .then(response => response.json())
    .then(res => {
      console.log(res);
      const lastWeekTotal = res?.data?.lastWeekTotal;
      setData(lastWeekTotal);
    });
  }, []);

  return (
    <React.Fragment>
      <Title>Last Week</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} domain={['auto', 'auto']}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Deaths
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="deaths" stroke={theme.palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}