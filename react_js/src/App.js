import useParallelFaker from "./useParallelFaker";
import useSingleFaker from "./useSingleFaker";

/* ------- Test single and Parrallel api calls ------ */
const single_params = {
  _gender: "female",
  _quantity: 12,
};

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

// since faker api returns an array of object, the useParallelFaker hook joins the arrays into a single array.

// PS..... to join objects we do
// obja = {..}
// objb = {...}
// objc = {...obja,objb}

function App() {
  // EXAMPLE .... api calls in PARALLEL
  const { loading, error, data } = useParallelFaker(multi_params);

  console.log(loading, error, data);

  /*
  ... Notes...
   the useParallelFaker hook takes an array of object WHERE

    1, resource field is compulsory and takes a string.
    2, param field is compulsory and takes an empty object or an object of params and values as shown.
  */

  /* ------------ useSingleFaker ----------- */
  // SINGLE api call
  const baseurl = "https://fakerapi.it/api/v1";
  const resource = "users";
  const params = single_params;
  const {
    loading: _loading,
    error: _error,
    data: _data,
  } = useSingleFaker(baseurl, resource, params);
  // console.log(_loading, _error, _data);

  return (
    <>
      <h1>Contract Dev Application</h1>
      <h3>Alex Chika</h3>
      <p>A mid level Next/React web developer</p>
      <h2>Please Open the console to inspect results</h2>
    </>
  );
}

export default App;
