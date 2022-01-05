import axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
const config = require("../config.json");
const BASE_URL = config.baseUri + "/api/beneficiary";

export const getBeneficiaries = async (customerNo) => {
  try {
    let results = [];

    const formData = new FormData();
    formData.append("lifePlanCustomer", customerNo);

    await axios
      .post(BASE_URL + "/get.php", formData).then((res) => {
        results = res.data;
      });

    return results;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const addBeneficiary = async (customerNo, lname, fname, mname, dateOfBirth, relationship, address) => {
    try {
      let results = false;

      let uuid = uuidv4();
      let date = moment(dateOfBirth).format("MMM DD, yyyy");
  
      const formData = new FormData();

      formData.append("uuid", uuid);
      formData.append("lifePlanCustomer", customerNo);
      formData.append("lname", lname);
      formData.append("fname", fname);
      formData.append("mname", mname);
      formData.append("dateOfBirth", date);
      formData.append("relationship", relationship);
      formData.append("address", address);

      let res = await getBeneficiaries(customerNo);
      if(res.length > 0) {
        await axios
        .post(BASE_URL + "/update.php", formData).then((res) => {
          results = res.data;
        });
      }
      else {
        await axios
        .post(BASE_URL + "/add.php", formData).then((res) => {
          results = res.data;
        });
      }
  
      
  
      return results;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
