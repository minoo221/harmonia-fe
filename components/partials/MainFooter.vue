<template>
  <footer class="footer">
    <!-- <div class="footer__top">
      <GoogleMap api-key="AIzaSyDzsvWr8eGPYF4RQqavfNmuMJuu0HpSbqw" style="width: 100%; height: 300px" :center="center" :zoom="15">
        <Marker :options="{ position: center }">
          <InfoWindow>
            <div id="content">
              <p>Penzión Harmónia</p>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </div> -->
    <!-- <div class="footer__bottom">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="pt-5">
            <p>{{ t("footer.about") }}</p>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2" offset-lg="2">
            <h2 class="mx-4">Odkazy</h2>
            <v-list nav bg-color="transparent" density="compact" color="white">
              <v-list-item v-for="(item, i) in menu" :key="i" :to="item.to" nuxt nav base-color="white" link color="#fff" exact>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" sm="6" md="4" offset-md="0">
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
    </div> -->
    <div class="footer_top">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <h2 class="mx-4">Prevádzkovateľ</h2>
            <h4 class="mx-4">Meno</h4>
            <v-list bg-color="transparent" color="white" class="pt-0 mb-0">
              <v-list-item density="comfortable" class="py-0">
                <v-list-item-title>{{ contact?.data.attributes.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <h4 class="mx-4">IČO</h4>
            <v-list bg-color="transparent" color="white" class="pt-0 mb-0">
              <v-list-item density="comfortable" class="py-0">
                <v-list-item-title>{{ contact?.data.attributes.ico }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <h4 class="mx-4">DIČ</h4>
            <v-list bg-color="transparent" color="white" class="pt-0 mb-0">
              <v-list-item density="comfortable" class="py-0">
                <v-list-item-title>{{ contact?.data.attributes.dic }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="3">
            <h3 class="mx-4">Sídlo</h3>
            <v-list bg-color="transparent" color="white" class="mb-6">
              <v-list-item density="comfortable">
                <template v-slot:prepend>
                  <v-icon color="primary" class="mr-2">mdi-map-marker</v-icon>
                </template>
                <v-list-item-title
                  >{{ contact?.data.attributes.addressCompany.address }}, <br />{{ contact?.data.attributes.addressCompany.zip }}
                  {{ contact?.data.attributes.addressCompany.city }}
                  <br />
                  {{ contact?.data.attributes.addressCompany.country }}</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="mx-4">Adresa</h2>
            <v-list bg-color="transparent" class="mb-1">
              <v-list-item density="comfortable">
                <template v-slot:prepend>
                  <v-icon class="mr-2">mdi-map-marker</v-icon>
                </template>
                <v-list-item-title
                  >{{ contact?.data.attributes.addressHome.address }}, <br />
                  {{ contact?.data.attributes.addressHome.zip }}
                  {{ contact?.data.attributes.addressHome.city }} <br />
                  {{ contact?.data.attributes.addressHome.country }}</v-list-item-title
                >
              </v-list-item>
            </v-list>
            <v-list bg-color="transparent" color="white" class="pt-0 mb-0">
              <v-list-item density="compact" class="py-0" min-height="24">
                <v-list-item-title>{{ contact?.data.attributes.long }} {{ contact?.data.attributes.lat }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-btn
              variant="plain"
              class="text-subtitle-2 text-decoration-underline"
              link
              href="https://maps.app.goo.gl/geJQ3Yqf1Ue7absZ6"
              target="_blank"
              color="primary"
              >Zobraziť na mape</v-btn
            >
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <h2 class="mx-4">Kontaktné informácie</h2>
            <v-list bg-color="transparent" class="mb-6">
              <v-list-item density="comfortable" v-for="tel in contact?.data.attributes.telephones">
                <template v-slot:prepend>
                  <v-icon class="mr-2">mdi-phone</v-icon>
                </template>
                <v-list-item-title>{{ tel.item }}</v-list-item-title>
              </v-list-item>
              <v-list-item color="#fff" density="comfortable">
                <template v-slot:prepend>
                  <v-icon class="mr-2">mdi-email</v-icon>
                </template>
                <v-list-item-title>{{ contact?.data.attributes.email }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="footer__bottom">
      <v-container class="text-center">
        <NuxtLink to="/" class="logo-cover">
          <v-img src="/images/penzion_harmonia_logo.png" class="img-logo" width="120px"></v-img>
        </NuxtLink>

        <p>© 2023 Penzión Harmónia.</p>
        <p class="mb-0">
          <v-btn
            variant="plain"
            class="text-subtitle-1 text-decoration-underline"
            link
            :to="localePath({ name: 'sukromie-slug', params: { slug: item.attributes?.slug } })"
            v-for="(item, i) in privacy?.data"
            :key="i"
            >{{ item.attributes.title }}</v-btn
          >
        </p>
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
const route = useRoute();

const { find } = useStrapi();
const { data: contact, refresh: refreshContact } = await useAsyncData("contact-information", () =>
  find<any>("contact-information", { populate: "*" })
);

const { data: privacy, refresh: refreshPrivacy } = await useAsyncData("privacies", () =>
  find<any>("privacies", { populate: "*" })
);

const menu: Menu[] = reactive([
  { title: "Úvod", to: localePath("/"), isReservation: false },
  { title: "Ubytovanie", to: localePath("apartmany"), isReservation: false },
  { title: "Cenník", to: localePath("cennik"), isReservation: false },
  { title: "Aktivity v okolí", to: localePath("okolie"), isReservation: false },
  { title: "Galéria", to: localePath("galeria"), isReservation: false },
  { title: "Kontakt", to: localePath("contact"), isReservation: false },
  { title: "Rezervácia", to: localePath("rezervacia"), isReservation: true },
]);

const info: Menu[] = reactive([
  { title: "Reklamačný poriadok", to: localePath(""), isReservation: false },
  { title: "Ochrana osobných údajov", to: localePath(""), isReservation: false },
  { title: "Cookies", to: localePath("apartmany"), isReservation: false },
]);

onMounted(() => {
  console.log(route);
});
</script>

<style scoped lang="scss">
.footer {
  border-top: 1px solid $secondary-80;
  .v-list-item-title {
    font-size: 14px;
    white-space: initial;
    text-overflow: none;
  }

  &__bottom {
    padding: 20px 0;
    border-top: 1px solid $secondary-80;
  }
}
</style>
