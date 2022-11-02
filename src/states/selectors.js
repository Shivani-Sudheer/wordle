import { selector } from "recoil";
import { urlAtom } from "./atoms";
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
