

//import {  useState, useEffect } from "react"
import React, { useState, useEffect } from "react"


function App() {

  const [data, setData] = useState({ discipline: [], opponent: [], result: [] });

  useEffect(() => {
    fetch("discipline/football/opponent/${country}")
    .then( response => {
      if(!response.ok){
        throw new Error('HTTP error! Status: ${response.status}');
      }
      return response.json();
    })
    .then(data => {
      console.log("Received data:", data);
      setData(data);
    })
    .catch(error => {
      console.error('Error: ', error);
    });
  }, [])


  return (
    <div>
      <h2>Discipline</h2>
      <p>{data.discipline}</p>

      <h2>Opponent</h2>
      <p>{data.opponent}</p>

      <h2>Result</h2>
      <p>{data.result}</p>
    </div>
  );
};

export default App