import { selector, selectorFamily } from "recoil";
import axios from "axios";

export const fetchWordSelector = selector({
  key: "fetchWordSelector",
  get: async ({ get }) => {
    try {
      const response = await axios.get(`http://localhost:4000/words/today`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});

export const checkValidSelector = selectorFamily({
  key: "checkValidSelector",
  get: word=>async ({ get }) => {
    try {
      const response = await axios.post(`http://localhost:4000/validWords/isValid`, {
          word: word
      })
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});

