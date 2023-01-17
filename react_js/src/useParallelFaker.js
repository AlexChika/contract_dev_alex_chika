// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { getFaker } from "./useSingleFaker";

const useParallelFaker = (array) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    async function call() {
      try {
        setLoading(true);
        setError(false);
        setData(null);

        const result = await callFakerMultiple(array);

        if (isSubscribed) setData(result); //unmount check
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        setData(null);

        console.log(error);
      }
    }

    call();

    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { loading, error, data };
};

export default useParallelFaker;

async function callFakerMultiple(array) {
  let results = [];

  // getting an arra of promises
  const calls = array.map(
    async (query) => await getFaker(undefined, query.resource, query.params)
  );

  // parrallel api calls
  return Promise.all(calls).then((result) => {
    results = result.flat();
    return results;
  });
}
