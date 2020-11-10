// currently not working as it is deprecated

import { AsyncStorage } from "react-native";
import moment from "moment";

const prefix = "cache";
const expiryInMinutes = 5;

const isExpired = (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timeestamp);
  return now.diff(storedTime, "minutes") > expiryInMinutes;
};
const store = async (key, value) => {
  try {
    const item = {
      value,
      timeestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      // Command Query Separation (CQS)
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
