// function makes a single call to faker api
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
  try {
    const response = await fetch(fullurl.href);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

// function makes parrallel calls to faker api
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

/* ------- Test single and Parrallel api calls ------ */
// param object for the getFaker function
const single_params = {
  _gender: "female",
  _quantity: 12,
};

// parameters for the callFakerMultiple function
const multi_params = [
  {
    params: {
      _taxes: 10,
      _price_min: 20.5,
      _quantity: 6,
    },
    resource: "products",
    baseurl: "",
  },
  {
    params: {
      _gender: "male",
      _quantity: 5,
    },
    resource: "persons",
  },
  {
    params: {},
    resource: "places",
  },
];

// lets see the results down here||
async function testFunctions() {
  const single_result = await getFaker(undefined, "users", single_params);
  const parrallel_result = await callFakerMultiple(multi_params);

  // since faker api returns an array of object, the callFakerMultiple function joins the arrays into a single array.

  console.log(parrallel_result);
  // console.log(single_result);
}
testFunctions();

// PS..... to join objects we do
// obja = {..}
// objb = {...}
// objc = {...obja,objb}

// check the react folder for a react hook that returns the result of multiple calls and single calls with loading state, errror and data
