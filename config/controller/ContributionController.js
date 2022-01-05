import axios from "axios";
const config = require("../config.json");
const BASE_URL = config.baseUri + "/api/contribution";

export const getContributions = async (customerNo) => {
  try {
    let results = [];

    const formData = new FormData();
    formData.append("customerNo", customerNo);

    await axios
      .post(BASE_URL + "/get_contributions.php", formData).then((res) => {
        results = res.data;
      });

    return results;
  } catch (e) {
    console.log(e);
    return false;
  }
};
