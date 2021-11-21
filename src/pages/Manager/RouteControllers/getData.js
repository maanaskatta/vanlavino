import axios from "axios";

const getData = async (route) => {
  console.log(route);
  const res = await axios
    .get(`https://vanlavino.herokuapp.com/${route}`)
    .catch((err) => {
      console.log(err);
      return false;
    });
  return res.data;
};

export default getData;
