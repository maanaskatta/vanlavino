import axios from "axios";

const getData = async (route) => {
  console.log(route);
  const res = await axios.get(`http://localhost:3002/${route}`).catch((err) => {
    console.log(err);
    return false;
  });
  return res.data;
};

export default getData;
