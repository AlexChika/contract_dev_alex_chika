// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

const useSingleFaker = (baseUrl, resource, params) => {
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

        const result = await getFaker(baseUrl, resource, params);

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

export default useSingleFaker;

async function getFaker(
  baseurl = "https://fakerapi.it/api/v1",
  resource,
  params = {}
) {
  if (!resource) throw new Error("Resource string missing");
  if (!params || typeof params != "object" || Array.isArray(params))
    throw new Error("param object missing");

  let url = `${baseurl}/${resource}`;

  // get full url with query parameters
  let fullurl = new URL(url);
  fullurl.search = new URLSearchParams(params);

  // call faker api
  const response = await fetch(fullurl.href);
  const data = await response.json();
  return data.data;
}
export { getFaker };
