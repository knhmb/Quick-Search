<template>
  <GoogleMap
    api-key="AIzaSyABLR6Imh_WZSePiKKx5M34WwFjHlzOe0Y"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
// import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  components: { GoogleMap, Marker },
  data() {
    return {
      center: {
        lat: 40.689247,
        lng: -74.044502,
      },
    };
  },
  computed: {
    singleItem() {
      return this.$store.getters["search/singleItem"];
    },
  },
  created() {
    this.center.lat = this.singleItem.item.latitude;
    this.center.lng = this.singleItem.item.longitude;
  },
  //   setup() {
  //     const center = { lat: 40.689247, lng: -74.044502 };

  //     return { center };
  //   },
};
</script>