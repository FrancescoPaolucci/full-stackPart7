import { useState } from "react";

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

export const useAnotherHook = () => {};
