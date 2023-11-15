import React, { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState({ discipline: "", opponent: "", result: "" });
  const [inputDiscipline, setInputDiscipline] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("football");
  const [selectedCountry, setSelectedCountry] = useState("France");

  useEffect(() => {
  const fetchData = () => {
    fetch(`discipline/${selectedDiscipline}/opponent/${selectedCountry}`)
    .then((response) => {
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received data:", data);
      setData(data);
    })
    .catch((error) => {
      console.error('Error: ', error);
      setData({
        discipline: "N/A",
        opponent: "N/A",
        result: "There is no such discipline or country in the database!",
      });
    });
  } 

    fetchData();
  }, [selectedCountry, selectedDiscipline]);

  const handleDisciplineClick = (discipline) => {
    setInputDiscipline(discipline);
    setInputCountry("France");
 };

  const handleCountryChange= (event) => {
    setInputCountry(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSelectedDiscipline(inputDiscipline);
    setSelectedCountry(inputCountry);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
      <h2>Enter a Discipline</h2>
        {/* <input
          type="text"
          value={inputDiscipline}
          onChange={handleDisciplineChange}
          placeholder="Enter a discipline"
        /> */}
        <button onClick={() => handleDisciplineClick("football")}>Football</button>
        <button onClick={() => handleDisciplineClick("basketball")}>Basketball</button>

      <h2>Enter a Country</h2>
        <input
          type="text"
          value={inputCountry}
          onChange={handleCountryChange}
          placeholder="Enter a country"
        />
        <button type="submit">Submit</button>
      </form>
      
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