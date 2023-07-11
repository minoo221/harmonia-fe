<template>
  <section class="gallery">
    <div class="gallery-item mb-12" v-for="(item, index) in gallery?.data">
      <v-container>
        <h2 class="text-left mb-4">{{ item.attributes.title }}</h2>
      </v-container>
      <v-slide-group class="pa-4" show-arrows="always">
        <!-- your additional content -->
        <!-- <template v-slot:silentbox-item="{ silentboxItem }">
          <img :src="silentboxItem.url" />
        </template> -->
        <v-slide-group-item v-for="(img, itemIndex) in item.attributes.gallery?.data">
          <div class="slide-item" @click="showGallery(index, itemIndex)">
            <v-img :src="img.attributes.fromats.small.url" cover />
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </section>
  <client-only>
    <vue-easy-lightbox :visible="isVisible" :imgs="images" :index="imgIndex" @hide="onHide"></vue-easy-lightbox>
  </client-only>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
import type { Gallery } from "~/types";
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const isVisible: Ref<boolean> = ref(false);
const imgIndex: Ref<number> = ref(0);
const images: Ref<any> = ref([]);

const { find } = useStrapi();
const { data: gallery, refresh } = await useAsyncData("galleries", () =>
  find<Gallery>("galleries", {
    populate: "*",
    filters: {
      title: {
        $ne: "Home",
      },
    },
  })
);

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};

/* function showGallery(index: number, itemIndex: number) {
  images.value = galleries[index].gallery;
  imgIndex.value = itemIndex;
  console.log(images.value);

  onShow();
  console.log(gallery.value);
} */

function showGallery(index: number, itemIndex: number) {
  /* images.value = apartments[index].value.gallery; */
  console.log(images.value);
  console.log(gallery.value?.data[index].attributes.gallery.data);

  const result = gallery.value?.data[index].attributes.gallery.data.map((obj: any) => {
    console.log(obj);

    return {
      text: obj.id,
      src: obj.attributes.url,
    };
  });

  images.value = result;

  imgIndex.value = itemIndex;

  console.log("result", result);

  onShow();
  /* gallery.silentbox.openOverlay(item, index); */
}

onMounted(() => {
  store.setTitle(t("gallery.title"));
});
</script>
<style scoped lang="scss">
.show-gallery {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.gallery {
  padding: 45px 0;
  color: $white;
  h2 {
    font-size: 42px;
  }
  .v-slide-group {
    &:deep {
      .slide-item {
        cursor: pointer;
        padding: 0 20px;
        height: 250px;
        overflow: hidden;
        img {
          width: 450px;
        }
      }
      .v-icon {
        color: $secondary-100;
      }
    }
  }
}
</style>
