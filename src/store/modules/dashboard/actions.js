import axios from "axios";

export default {
  async getCategories() {
    const response = await axios.get("/api/v1/cms/categories/");
    console.log(response);
  },
  async getLanguages(context) {
    const response = await axios.get("/api/v1/system/languages");
    console.log(response);
    context.commit("SET_LANGUAGES", response.data.items);
  },
  async getContent() {
    const response = await axios.get("/api/v1/cms/contents");
    console.log(response);
  },
};
