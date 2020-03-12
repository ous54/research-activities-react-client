import { useState, useEffect } from "react";
import axios from "axios";
import { authHeader } from "../helpers";

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(url, {
        headers: {
          ...authHeader()
        }
      })
      .then(response => {
        return response.data;
      })
      .then(data => {
        setIsLoading(false);
        setFetchedData(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, dependencies);

  return [isLoading, fetchedData];
};

export const useInputForm = callback => {
  const [inputs, setInputs] = useState({});
  const handleSubmit = event => {
    
    if (event) {
      event.preventDefault();
      callback();
    }
  };
  const handleInputChange = event => {
    console.log(event);

    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setInputs
  };
};
