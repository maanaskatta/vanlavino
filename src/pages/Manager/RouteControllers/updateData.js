import axios from "axios";

const updateData = async (route, data) => {
  console.log(route);
  const res = await axios
    .post(`https://vanlavino.herokuapp.com/${route}`, data)
    .catch((err) => {
      console.log(err);
      return false;
    });
  return res;
};

export default updateData;
