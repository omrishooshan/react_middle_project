import axios from "axios";

const getUsers = async () => {
  let values = await axios.get("https://jsonplaceholder.typicode.com/users");
  let objArray = [];
  let obj = { name: "", id: "", email: "", zipcode: "", city: "", street: "" };
  values.data.forEach((x) => {
    obj = {
      name: x.name,
      id: x.id,
      email: x.email,
      zipcode: x.address.zipcode,
      city: x.address.city,
      street: x.address.street,
    };
    objArray.push(obj);
  });
  return objArray;
};

export default { getUsers };

/*
  "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
*/
