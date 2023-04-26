import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import i18n from "../../../i18n";
console.log(i18n);

export default {
  namespaced: true,
  state() {
    return {
      searchItems: [],
      singleItem: [],
      compareArr: [],
      checkList: {},
      // checkList: [],
      searchValue: "",
      selectedMainCategory: "",
      discount: [],
      paymentMethod: [],
      priceRange: [0, 1000000],
      selectedSubCategory: "",
      defaultProps: {
        children: "children",
        label: "label",
        disabled: "disabled",
      },
      selectedSubCategorySlug: "",
      // data: [
      //   {
      //     id: 1,
      //     label: i18n.locale === "zh-Hant-HK" ? "港島區" : "Hong Kong Island",
      //     children: [
      //       {
      //         id: 2,
      //         label: "堅尼地城站",
      //       },
      //       {
      //         id: 3,
      //         label: "香港大學站",
      //         disabled: false,
      //       },
      //       {
      //         id: 4,
      //         label: "西營盤站",
      //         disabled: false,
      //       },
      //       {
      //         id: 5,
      //         label: "上環站",
      //         disabled: false,
      //       },
      //       {
      //         id: 6,
      //         label: "中環站",
      //         disabled: false,
      //       },
      //       {
      //         id: 7,
      //         label: "金鐘站",
      //         disabled: false,
      //       },
      //     ],
      //   },
      //   {
      //     id: 2,
      //     label: "九龍區",
      //     children: [
      //       {
      //         id: 2,
      //         label: "藍田站",
      //       },
      //       {
      //         id: 3,
      //         label: "觀塘站",
      //         disabled: false,
      //       },
      //       {
      //         id: 4,
      //         label: "牛頭角站",
      //         disabled: false,
      //       },
      //       {
      //         id: 5,
      //         label: "九龍灣站",
      //         disabled: false,
      //       },
      //       {
      //         id: 6,
      //         label: "彩虹站",
      //         disabled: false,
      //       },
      //       {
      //         id: 7,
      //         label: "鑽石山站",
      //         disabled: false,
      //       },
      //     ],
      //   },
      //   {
      //     id: 3,
      //     label: "新界區",
      //     children: [
      //       {
      //         id: 2,
      //         label: "荃灣站",
      //       },
      //       {
      //         id: 3,
      //         label: "大窩口站",
      //         disabled: false,
      //       },
      //       {
      //         id: 4,
      //         label: "葵興站",
      //         disabled: false,
      //       },
      //       {
      //         id: 5,
      //         label: "葵芳站",
      //         disabled: false,
      //       },
      //       {
      //         id: 6,
      //         label: "康城站",
      //         disabled: false,
      //       },
      //       {
      //         id: 7,
      //         label: "寶琳站",
      //         disabled: false,
      //       },
      //     ],
      //   },
      //   {
      //     id: 4,
      //     label: "離島區",
      //     children: [
      //       {
      //         id: 2,
      //         label: "青衣站",
      //       },
      //       {
      //         id: 3,
      //         label: "欣澳站",
      //         disabled: false,
      //       },
      //       {
      //         id: 4,
      //         label: "迪士尼站",
      //         disabled: false,
      //       },
      //       {
      //         id: 5,
      //         label: "東涌站",
      //         disabled: false,
      //       },
      //       {
      //         id: 6,
      //         label: "機場站",
      //         disabled: false,
      //       },
      //       {
      //         id: 7,
      //         label: "博覽館站",
      //         disabled: false,
      //       },
      //     ],
      //   },
      // ],
      storeRef: [],
      selectedAreas: [],
    };
  },
  getters,
  mutations,
  actions,
};
