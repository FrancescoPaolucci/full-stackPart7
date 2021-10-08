import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCountry } from "./hooks";
const api_key = process.env.REACT_APP_API_KEY;
console.log("YA KEY", api_key);
const OneComp = (props) => {
  return (
    <div>
      <h1> {props.name} </h1>
      <p> Capital: {props.capital} </p>
      <p> population: {props.population}</p>
      <h2> languages: </h2>
      <ul>
        {props.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={props.flag} alt={props.name} height="100px" />
    </div>
  );
};

function App() {
  const value = useCountry("text");

  console.log("############", value.filteredData);

  return (
    <div className="App">
      <div style={{ margin: "0 auto", marginTop: "10%" }}>
        <label>Search:</label>
        <input {...value} />
        <p>{value.value}</p>
        <p>{value.message}</p>
      </div>
      <div style={{ padding: 10 }}>
        {value.filteredData.map((data, index) => {
          console.log("######", value.filteredData.length);

          if (value.filteredData.length !== 1) {
            return (
              <div style={styles} key={data.callingCodes}>
                <div style={styles}>{data.name}</div>
              </div>
            );
          } else {
            return (
              <div>
                <OneComp
                  name={data.name}
                  capital={data.capital}
                  population={data.population}
                  languages={data.languages}
                  flag={data.flags[0]}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
const styles = {
  display: "inline",
  width: "30%",
  height: 50,
  float: "left",
  padding: 5,
  border: "0.5px solid black",
  marginBottom: 10,
  marginRight: 10,
};
export default App;
