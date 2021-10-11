import { useState, useEffect } from "react";
import axios from "axios";
export const useCountry = (type) => {
  const [value, setValue] = useState("");
  const [countries, SetCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("effect");
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        console.log("promise fulfilled");
        SetCountries(response.data);
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }, []);

  const onChange = (event) => {
    setValue(event.target.value.toLowerCase());
    let result = [];
    result = countries.filter((data) => {
      return data.name.toLowerCase().indexOf(value) !== -1;
    });

    if (result.length > 10) {
      console.log("Ghawad");
      setMessage("Too many matches, specify another filter");
      setFilteredData([]);
    } else if (result.length < 10 && result.length > 1) {
      console.log("Not Ghawad");
      setFilteredData(result);
      setMessage("Your filtered results");
    } else if (result.length === 1) {
      setMessage("only one:");
      setFilteredData(result);
    } else if (result.length === 0) {
      setMessage("No results sry");
      setFilteredData([]);
    }
  };

  return {
    type,
    value,
    onChange,
    countries,
    filteredData,
    message,
  };
};

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
};
