import axios from "axios";

const insertData = async (route, data) => {
  console.log(route);
  const res = await axios
    .post(`http://localhost:3002/${route}`, data)
    .catch((err) => {
      console.log(err);
      return false;
    });
  return res;
};

export default insertData;
