import axios from "axios";
import moment from "moment";
const config = require("../config.json");
const BASE_URL = config.baseUri + "/api/life_plan_customer";

export const getUser = async (contactNo, password) => {
  try {
    let results = [];

    const formData = new FormData();
    formData.append("contactNo", contactNo);
    formData.append("password", password);

    console.log("POST RESULT",contactNo);
    console.log("POST RESULT",password);

    await axios.post(BASE_URL + "/login.php", formData).then((res) => {
      results = res.data;
      console.log("POST RESULT",results);
    });

    if (results && results.length > 0) {
      return results[0];
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getUserByUuid = async (uuid) => {
  try {
    let results = [];

    const formData = new FormData();
    formData.append("uuid", uuid);

    await axios.post(BASE_URL + "/get_customer.php", formData).then((res) => {
      results = res.data;
    });

    if (results) {
      return results[0];
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

//Update informations of user
export const updateInformation = async (
  uuid,
  lname,
  fname,
  mname,
  dateOfBirth,
  contactNo,
  gender,
  email,
  landlineNo,
  birthplace,
  lotNo,
  street,
  province,
  city,
  barangay,
  zipcode,
  occupation,
  employmentStatus,
  taxNo,
  sourceOfFund
) => {
  try {
    let results = [];

    let bday = moment(dateOfBirth).format("MM/DD/yyyy");

    const formData = new FormData();
    formData.append("uuid", uuid);
    formData.append("lname", lname);
    formData.append("fname", fname);
    formData.append("mname", mname);
    formData.append("dateOfBirth", bday);
    formData.append("contactNo", contactNo);
    formData.append("gender", gender);
    formData.append("address", '');
    
    formData.append("email", email);
    formData.append("landlineNo", landlineNo);
    formData.append("birthplace", birthplace);
    formData.append("lotNo", lotNo);
    formData.append("street", street);
    formData.append("province", province);
    formData.append("city", city);
    formData.append("barangay", barangay);
    formData.append("zipcode", zipcode);
    formData.append("occupation", occupation);
    formData.append("employmentStatus", employmentStatus);
    formData.append("taxNo", taxNo);
    formData.append("sourceOfFund", sourceOfFund);

    await axios.post(BASE_URL + "/update_by_app.php", formData).then((res) => {
      results = res.data;
    });

    return results;
  } catch (e) {
    console.log(e);
    return false;
  }
};

//Update password of user
export const updatePassword = async (uuid, newPassword) => {
  try {
    let results = [];

    const formData = new FormData();
    formData.append("uuid", uuid);
    formData.append("password", newPassword);

    await axios
      .post(BASE_URL + "/update_password.php", formData)
      .then((res) => {
        results = res.data;
      });

    return results;
  } catch (e) {
    console.log(e);
    return false;
  }
};

//Update profile picture
export const updateProfilePicture = async (uuid, image, bucketName) => {
  try {
    let results = [];

    const formData = new FormData();
    formData.append("uuid", uuid);
    formData.append("file", image);
    formData.append("bucketName", bucketName);

    await axios.post(BASE_URL + "/update_profile.php", formData).then((res) => {
      results = res.data;
    });

    return results;
  } catch (e) {
    console.log(e);
    return false;
  }
};
