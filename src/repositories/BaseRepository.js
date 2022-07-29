import axios from "axios";
import { API_BASE_URL } from "../config/apiBaseUrl";

class BaseRepository {
  get(requestUrl, config = {}, includeAuthHeader = true) {
    console.log(`GET: url -> ${API_BASE_URL + requestUrl}`);
    console.log(`     config -> ${config}`);
    console.log(`     includeAuthHeader -> ${includeAuthHeader}`);
    if (includeAuthHeader) {
      config.headers = {
        Authorization: `Bearer ${
          localStorage.getItem("CelestialFrontierAuthToken") || ""
        }`,
        "Content-type": "application/json",
      };
    }
    return axios.get(API_BASE_URL + requestUrl, config);
  }

  post(requestUrl, data, config = {}, includeAuthHeader = true) {
    console.log(`POST: url -> ${API_BASE_URL + requestUrl}`);
    console.log(`      data -> ${JSON.stringify(data)}`);
    console.log(`      config -> ${config}`);
    console.log(`      includeAuthHeader -> ${includeAuthHeader}`);
    if (includeAuthHeader) {
      config.headers = {
        Authorization: `Bearer ${
          localStorage.getItem("CelestialFrontierAuthToken") || ""
        }`,
        "Content-type": "application/json",
      };
    }
    return axios.post(API_BASE_URL + requestUrl, data, config);
  }

  put(requestUrl, data, config = {}, includeAuthHeader = true) {
    console.log(`PUT: url -> ${API_BASE_URL + requestUrl}`);
    console.log(`      data -> ${JSON.stringify(data)}`);
    console.log(`      config -> ${config}`);
    console.log(`      includeAuthHeader -> ${includeAuthHeader}`);
    if (includeAuthHeader) {
      config.headers = {
        Authorization: `Bearer ${
          localStorage.getItem("CelestialFrontierAuthToken") || ""
        }`,
        "Content-type": "application/json",
      };
    }
    return axios.put(API_BASE_URL + requestUrl, data, config);
  }

  delete(requestUrl, config = {}, includeAuthHeader = true) {
    console.log(`DELETE: url -> ${API_BASE_URL + requestUrl}`);
    console.log(`     config -> ${config}`);
    console.log(`     includeAuthHeader -> ${includeAuthHeader}`);
    if (includeAuthHeader) {
      config.headers = {
        Authorization: `Bearer ${
          localStorage.getItem("CelestialFrontierAuthToken") || ""
        }`,
        "Content-type": "application/json",
      };
    }
    return axios.delete(API_BASE_URL + requestUrl, config);
  }
}

export default BaseRepository;
