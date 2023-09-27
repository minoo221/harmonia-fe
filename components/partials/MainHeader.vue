<template>
  <header class="header">
    <div class="header__top" :class="{ isScrolled: isScrolled, 'elevation-4': isScrolled }">
      <div class="header-info d-none d-md-block">
        <v-container class="py-0">
          <v-row height="100%" align="center" justify="end" no-gutters>
            <v-col col="12" md="auto" class="p-0">
              <v-btn
                class="mx-2"
                color="white"
                link
                :href="'tel:' + tel.item"
                nuxt
                prepend-icon="mdi-phone"
                variant="plain"
                size="small"
                v-for="tel in contact?.data.attributes.telephones"
              >
                {{ tel.item }}
              </v-btn>
              <v-btn
                class="mx-2"
                color="white"
                link
                :href="'mailto:' + contact?.data.attributes.email"
                variant="plain"
                nuxt
                prepend-icon="mdi-email"
                size="small"
                >{{ contact?.data.attributes.email }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="header-menu">
        <v-container>
          <NuxtLink to="/" class="d-block logo-cover">
            <v-img contain src="/images/penzion_harmonia_logo.png" class="img-logo" width="380px"></v-img>
          </NuxtLink>
          <v-row class="align-center" justify="space-between">
            <!-- <v-col col="12" md="2" class="py-0">
              <NuxtLink to="/" class="d-block">
                <v-img contain src="/images/penzion_harmonia_logo.png" class="img-logo"></v-img>
              </NuxtLink>
            </v-col> -->
            <v-spacer></v-spacer>
            <v-col cols="12" md="auto" class="d-none d-md-block">
              <div class="d-flex">
                <div>
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
                  <!-- <v-btn v-else exact class="mx-0 px-2 mx-lg-2 px-lg-4" color="white" link :to="item.to" variant="plain" nuxt>
                    {{ item.title }}
                  </v-btn> -->
                </div>
              </div>
            </v-col>
            <v-col cols="auto">
              <v-btn icon="mdi-menu" density="default" color="primary" @click="drawer = true"></v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <div class="header__bottom">
      <!-- <div class="title-cover align-center justify-center">
        <h1>{{ title }}</h1>
      </div> -->
      <v-carousel height="520" hide-delimiters :show-arrows="false">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet color="rgba(0,0,0, 1)" width="100%" height="100%" position="absolute">
            <div class="d-flex fill-height fill-width">
              <v-img contain src="/images/main-img.jpg" cover gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"></v-img>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <v-navigation-drawer v-model="drawer" temporary location="right" color="secondary">
      <div class="d-flex justify-end">
        <v-btn class="ml-auto" variant="text" size="x-large" icon="mdi-close" color="primary" @click="drawer = false"></v-btn>
      </div>
      <v-list nav bg-color="transparent" density="compact" color="white">
        <v-list-item v-for="(item, i) in menu" :key="i" :to="item.to" nuxt nav base-color="white" link color="#fff" exact>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script setup lang="ts">
import { useLocalePath, useSwitchLocalePath, useLocaleHead, useBrowserLocale } from "#i18n";
import type { Menu, Slider } from "~/types";
const { locale, t } = useI18n();
import { storeToRefs } from "pinia";

import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const { title } = storeToRefs(store);

const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const overlay: Ref<boolean> = ref(true);

/* const isScrolled: Ref<boolean> = ref(false); */

/* const header = ref<any>(null); */

const drawer: Ref<boolean> = ref(false);

const { find } = useStrapi();
const { data: contact, refresh } = await useAsyncData("contact-information", () =>
  find<any>("contact-information", { populate: "*" })
);

const menu: Menu[] = reactive([
  { title: "Úvod", to: localePath("/"), isReservation: false },
  { title: "Ubytovanie", to: localePath("apartmany"), isReservation: false },
  { title: "Cenník", to: localePath("cennik"), isReservation: false },
  { title: "Aktivity v okolí", to: localePath("okolie"), isReservation: false },
  /* { title: "Galéria", to: localePath("galeria"), isReservation: false }, */
  { title: "Kontakt", to: localePath("kontakt"), isReservation: false },
  /* { title: "Rezervácia", to: localePath("rezervacia"), isReservation: true }, */
]);

const slides: Slider[] = reactive([
  { title: "Jasná", img: "/images/jasna_leto_3.jpg" },
  { title: "Jasná 2", img: "/images/jasna_leto_3.jpg" },
]);

/* function onScroll(e: any) {
  console.log("scroll", header.value.children[0].clientHeight, window.scrollY);
  if (window.scrollY >= header.value.children[0].clientHeight) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
} */

onMounted(() => {
  console.log(store.title);
});
</script>

<style scoped lang="scss">
.header {
  position: relative;
  &__top {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    transition: all 0.3s ease;
    &.isScrolled {
      transform: translateY(-50px);
      background: $secondary-100;
      @media (max-width: 960px) {
        transform: translateY(0px);
      }
    }
    .header-info {
      /* background: $secondary-80; */
      height: 50px;
    }
    .logo-cover {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .header-menu {
      /* background: $white; */
      @media (max-width: 1250px) {
        .v-btn {
          font-size: 12px;
        }
      }
    }
    .v-container {
      height: 100%;
    }
    .v-row {
      height: 100%;
    }
  }
  &__bottom {
    position: relative;
    .title-cover {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 12;
    }
    h1 {
      color: $white;
    }
  }
}
.header__bottom {
  position: relative;
}
.v-carousel {
  &:deep {
    .v-window__controls {
      z-index: 10;
    }
  }
}
</style>
