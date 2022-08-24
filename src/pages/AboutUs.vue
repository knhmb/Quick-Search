<template>
  <section class="about-us">
    <base-container>
      <template v-for="item in footerContent" :key="item">
        <div
          v-if="item.slug === 'cms-page-about-us'"
          v-html="item.content"
        ></div>
        <!-- <h5>關於我們</h5>
        <p>
          家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。奶道房母呀快家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。
          家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。奶道房母呀快家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。
        </p>
        <p>
          家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。奶道房母呀快家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。
          家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。奶道房母呀快家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。
        </p>
        <p>
          家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。奶道房母呀快家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。
          家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。奶道房母呀快家好的寸青里冬冬，步菜助北像頁主雪午，說結抱具犬話羊幾東學麻同、會裝拉頭布玉不別嗎笑今，原申春麼怕聲什耍花蝸都刀筆七松麻葉高掃送！跳扒風右羊枝幼院叫視皮尺着。
        </p> -->
      </template>
    </base-container>
  </section>
</template>

<script>
export default {
  computed: {
    footerContent() {
      return this.$store.getters["dashboard/footerContent"];
    },
  },
};
</script>

<style scoped>
.about-us {
  background: #ddd;
  padding: 1.5rem 0;
  height: 100vh;
}

.about-us h5 {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  font-feature-settings: "liga" off;
  color: #393939;
  margin-bottom: 1rem;
}

.about-us p {
  font-family: "PingFang HK";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  font-feature-settings: "liga" off;
  color: #393939;
}
</style>