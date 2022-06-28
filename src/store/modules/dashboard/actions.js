import axios from "axios";

export default {
  async getCategories() {
    const response = await axios.get("/api/v1/cms/categories/");
    console.log(response);
  },
};
