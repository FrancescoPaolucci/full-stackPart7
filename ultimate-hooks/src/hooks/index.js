/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
export const useResource = (baseUrl) => {
  const [data, SetData] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios
      .get(baseUrl)
      .then((response) => {
        console.log("promise fulfilled");
        SetData(response.data);
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }, []);

  const dataService = {
    create: async (newObject) => {
      const response = await axios.post(baseUrl, newObject);
      SetData(data.concat(newObject));
      return response.data;
    },
    update: async (id, newObject) => {
      const response = await axios.put(`${baseUrl} /${id}`, newObject);
      return response.data;
    },
  };

  return [data, dataService];
};

export const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const resetfield = () => {
    setValue("");
  };
  return {
    type,
    value,
    onChange,
    resetfield,
  };
};
