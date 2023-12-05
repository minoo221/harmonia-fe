<template>
  <div>
    <section class="main-info text-center">
      <h1 class="mb-8 title-bordered">{{ accommodation?.data.attributes.titleHome }}</h1>
      <p class="mb-8">{{ accommodation?.data.attributes.infoHome }}</p>
      <p class="mb-8">
        <a href="https://www.megaubytovanie.sk/penzion-harmonia-liptovsky-mikulas">Penzión Harmónia</a> prezentuje svoje služby aj
        na ubytovacom portáli <a href="https://www.megaubytovanie.sk/">MegaUbytovanie</a>.
      </p>
      <v-btn
        exact
        class="mx-2"
        color="primary"
        link
        :to="localePath('rezervacia')"
        nuxt
        prepend-icon="mdi-calendar-month-outline"
      >
        Rezervácia
      </v-btn>
    </section>
    <section class="gallery text-center">
      <h2 class="mb-4 title-bordered h1">{{ t("home.fromGallery") }}</h2>

      <Swiper
        :modules="[SwiperAutoplay]"
        slides-per-view="auto"
        :loop="true"
        :navigation="true"
        :autoplay="{
          delay: 8000,
          disableOnInteraction: true,
        }"
        :creative-effect="{
          prev: {
            shadow: false,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }"
      >
        <SwiperSlide v-for="item in gallery?.data.attributes.gallery?.data" :key="item.id">
          <div class="img-cover">
            <img :src="item.attributes.formats.small.url" />
          </div>
        </SwiperSlide>
      </Swiper>
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
  </div>
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

const { data: accommodation, refresh: refreshAccomodation } = await useAsyncData("accommodation", () =>
  findOne<any>("accommodation", {
    populate: "*",
  })
);

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
  console.log("acccomodation", accommodation);
});
</script>
<style scoped lang="scss">
.main-info {
  max-width: 740px;
  margin: 0 auto;
  margin-bottom: 80px;
  p {
    font-size: 18px;
    line-height: 38px;
  }
}

.gallery {
  padding: 45px 0;
  background-color: $white;
  /*   border-top: 1px solid rgba($primary-80, 0.6);
  border-bottom: 1px solid rgba($primary-80, 0.6); */
  .swiper-slide {
    cursor: pointer;
    overflow: hidden;
    width: 33.333%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 980px) {
      width: 50%;
    }
    @media (max-width: 580px) {
      width: 100%;
    }
    .img-cover {
      position: relative;
      border: 1px solid rgba($primary-80, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% - 30px);
      height: calc(100% - 30px);
      object-fit: cover;
    }
    img {
      width: calc(100% - 30px);
      height: calc(100% - 30px);
      object-fit: cover;
      @media (max-width: 600px) {
        img {
          height: 100%;
        }
      }
    }
    &:deep {
      .slide-item {
        cursor: pointer;
        padding: 20px;
        border: 1px solid rgba($primary-80, 0.6);
        overflow: hidden;
        width: 33.333%;
        margin: 0 20px;
        @media (max-width: 600px) {
          img {
            height: 100%;
          }
        }
      }
    }
  }
  &:deep {
    .swiper-button-prev,
    .swiper-button-next {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: $white;
      &:after {
        font-size: 18px;
      }
    }
  }
}
.reviews {
  padding: 45px 0;
}
</style>
