<template>
  <section class="main-info text-center">
    <h1 class="mb-4 title-bordered">{{ t("home.welcomeTitle") }}</h1>
    <h3 class="mb-4">{{ t("home.homeInfo") }}</h3>
    <v-btn exact class="mx-2" color="primary" link :to="localePath('rezervacia')" nuxt prepend-icon="mdi-calendar-month-outline">
      Rezervácia
    </v-btn>
  </section>
  <section class="gallery text-center">
    <h2 class="mb-4">{{ t("home.fromGallery") }}</h2>
    <v-slide-group class="pa-4" show-arrows>
      <!-- your additional content -->
      <!-- <template v-slot:silentbox-item="{ silentboxItem }">
          <img :src="silentboxItem.url" />
        </template> -->
      <v-slide-group-item v-for="(item, index) in gallery?.data.attributes.gallery?.data">
        <div class="slide-item" @click="showGallery(index)">
          <img :src="item.attributes.formats.small.url" />
        </div>
      </v-slide-group-item>
    </v-slide-group>
    <!-- <v-slide-group class="pa-4" show-arrows>
      <lightgallery :settings="{ speed: 300, controls: true }">
        <v-slide-group-item v-for="(slide, i) in slides" :key="i">
          <a class="gallery-item" :data-src="slide.src">
            <img class="img-responsive" :src="slide.src" />
          </a>
        </v-slide-group-item>
      </lightgallery>
    </v-slide-group> -->
  </section>
  <section class="reviews">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" v-for="item in reviews?.data" :key="item.id">
          <v-card rounded="xl" elevation="8">
            <v-card-title>{{ item.attributes.title }}</v-card-title>
            <v-card-item class="py-0">
              <v-rating
                :model-value="item.attributes.rating"
                color="amber"
                density="compact"
                half-increments
                readonly
                size="small"
              ></v-rating>
            </v-card-item>
            <v-card-text class="py-2"> "{{ item.attributes.reviewText }}" </v-card-text>

            <v-card-actions>
              <v-list-item class="w-100">
                <template v-slot:prepend>
                  <v-icon class="mr-2" size="x-large" color="secondary" icon="mdi-account-circle"></v-icon>
                </template>

                <v-list-item-title>{{ item.attributes.name }}</v-list-item-title>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <client-only>
      <vue-easy-lightbox :visible="isVisible" :imgs="images" :index="imgIndex" @hide="onHide"></vue-easy-lightbox>
    </client-only>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
import type { Slider, Gallery, Review } from "~/types";
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const isVisible: Ref<boolean> = ref(false);
const imgIndex: Ref<number> = ref(0);
const images: Ref<any> = ref([]);

const { findOne, find } = useStrapi();
const { data: gallery, refresh: refreshGalleries } = await useAsyncData("galleries", () =>
  findOne<Gallery>("galleries", 6, {
    populate: "*",
  })
);

const { data: reviews, refresh: refreshReviews } = await useAsyncData("reviews", () => find<Review>("reviews"));

const slides: any[] = reactive([
  { title: "Jasná", src: "/images/jasna_leto_3.jpg" },
  { title: "Jasná 2", src: "/images/jasna_leto_3.jpg" },
  { title: "Jasná 2", src: "/images/lipt-mara.jpg" },
  { title: "Jasná 2", src: "/images/jasna_leto_3.jpg" },
  { title: "Jasná 2", src: "/images/jasna_leto_3.jpg" },
  { title: "Jasná 2", src: "/images/jasna_leto_3.jpg" },
  { title: "Jasná 2", src: "/images/jasna_leto_3.jpg" },
]);

function showGallery(index: number) {
  /* images.value = apartments[index].value.gallery; */
  console.log(images.value);
  console.log(gallery.value?.data.attributes.gallery.data);

  const result = gallery.value?.data.attributes.gallery?.data.map((obj: any) => {
    console.log(obj);

    return {
      text: obj.id,
      src: obj.attributes.url,
    };
  });

  images.value = result;

  imgIndex.value = index;

  console.log("result", result);
  console.log("result", result);

  onShow();
  /* gallery.silentbox.openOverlay(item, index); */
}

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};

onMounted(() => {
  store.setTitle(t("home.title"));
  console.log(store.title);
  console.log(gallery);
});
</script>
<style scoped lang="scss">
.main-info {
  max-width: 740px;
  margin: 0 auto;
  margin-bottom: 80px;
}

.gallery {
  padding: 45px 0;
  color: $white;
  background: $secondary-100;
  h2 {
    color: $white;
  }
  .v-slide-group {
    &:deep {
      .slide-item {
        cursor: pointer;
        padding: 0 20px;
        height: 250px;
        overflow: hidden;
        @media (max-width: 600px) {
          height: 150px;
          img {
            height: 100%;
          }
        }
        .v-img {
          width: 450px;
        }
      }
    }
  }
}
.reviews {
  padding: 45px 0;
}
</style>
