<template>
  <footer>
    <div class="footer__top">
      <GoogleMap api-key="AIzaSyDzsvWr8eGPYF4RQqavfNmuMJuu0HpSbqw" style="width: 100%; height: 300px" :center="center" :zoom="15">
        <Marker :options="{ position: center }">
          <InfoWindow>
            <div id="content">
              <p>Penzión Harmónia</p>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </div>
    <div class="footer__bottom">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="pt-5">
            <p>{{ t("footer.about") }}</p>
          </v-col>
          <v-col cols="12" md="2" offset-md="2">
            <h2 class="mx-4">Odkazy</h2>
            <v-list nav bg-color="transparent" density="compact" color="white">
              <v-list-item v-for="(item, i) in menu" :key="i" :to="item.to" nuxt nav base-color="white" link color="#fff" exact>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="4" offset-md="0">
            <h2 class="mx-4">Kontakt</h2>
            <v-list bg-color="transparent" color="white" class="mb-6">
              <v-list-item base-color="white" color="#fff" density="comfortable">
                <template v-slot:prepend>
                  <v-icon color="#fff" class="mr-2">mdi-map-marker</v-icon>
                </template>
                <v-list-item-title
                  >{{ contact?.data.attributes.addressHome.address }}, {{ contact?.data.attributes.addressHome.zip }}
                  {{ contact?.data.attributes.addressHome.city }}
                  {{ contact?.data.attributes.addressHome.country }}</v-list-item-title
                >
              </v-list-item>
              <v-list-item
                base-color="white"
                color="#fff"
                density="comfortable"
                v-for="tel in contact?.data.attributes.telephones"
              >
                <template v-slot:prepend>
                  <v-icon color="#fff" class="mr-2">mdi-phone</v-icon>
                </template>
                <v-list-item-title>{{ tel.item }}</v-list-item-title>
              </v-list-item>
              <v-list-item base-color="white" color="#fff" density="comfortable">
                <template v-slot:prepend>
                  <v-icon color="#fff" class="mr-2">mdi-email</v-icon>
                </template>
                <v-list-item-title>{{ contact?.data.attributes.email }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <h2 class="mx-4">Informácie</h2>
            <v-list nav bg-color="transparent" density="compact" color="white">
              <v-list-item v-for="(item, i) in info" :key="i" nav base-color="white" link color="#fff">
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
const { locale, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
import type { Menu, Slider } from "~/types";
const center: any = reactive({ lat: 49.10315253556189, lng: 19.59352807900453 });

const { find } = useStrapi();
const { data: contact, refresh } = await useAsyncData("contact-information", () =>
  find<any>("contact-information", { populate: "*" })
);

const menu: Menu[] = reactive([
  { title: "Úvod", to: localePath(""), isReservation: false },
  { title: "Ubytovanie", to: localePath("apartmany"), isReservation: false },
  { title: "Cenník", to: localePath("cennik"), isReservation: false },
  { title: "Aktivity v okolí", to: localePath("okolie"), isReservation: false },
  { title: "Galéria", to: localePath("galeria"), isReservation: false },
  { title: "Kontakt", to: localePath("contact"), isReservation: false },
  { title: "Rezervácia", to: localePath("rezervacia"), isReservation: true },
]);

const info: Menu[] = reactive([
  { title: "Ochrana osobných údajov", to: localePath(""), isReservation: false },
  { title: "Cookies", to: localePath("apartmany"), isReservation: false },
]);
</script>

<style scoped lang="scss">
.footer__bottom {
  color: $white;
  background: $secondary-100;
  padding: 30px 0;

  h2 {
    color: $white;
  }
  .v-list-item-title {
    font-size: 14px;
    white-space: initial;
    text-overflow: none;
  }
}
</style>
