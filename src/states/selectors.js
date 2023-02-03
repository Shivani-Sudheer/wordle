import { selector, selectorFamily } from "recoil";
import axios from "axios";

export const fetchWordSelector = selector({
  key: "fetchWordSelector",
  get: async ({ get }) => {
    try {
      const response = await axios.get(`https://wordlenot-production.up.railway.app/words/today`);
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
      const response = await axios.post(`https://wordlenot-production.up.railway.app/validWords/isValid`, {
          word: word
      })
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});

