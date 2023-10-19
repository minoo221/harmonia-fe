<template>
  <section class="main-info text-center">
    <v-container>
      <v-row class="mb-6">
        <v-col cols="12" sm="6" md="4" v-for="item in prices?.data" :key="item.id">
          <v-card>
            <v-card-title class="primary white--text py-4"> {{ item.attributes.title }} </v-card-title>
            <v-card-subtitle>{{ item.attributes.dates }}</v-card-subtitle>
            <v-card-text>
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">Izba</th>
                    <th class="text-right">Apartmán/noc</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="priceItem in item.attributes?.price" :key="priceItem.key">
                    <td>{{ priceItem.room }}</td>
                    <td class="text-right">{{ priceItem.price }} €</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section class="price-info">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="mb-2">Platba</h3>
          <v-list density="compact" bgColor="transparent" class="pt-0">
            <v-list-item color="primary" class="pl-0" v-for="pay in accommodation.data?.attributes.pay">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>{{ pay.item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <h3 class="mb-2">Povinné poplatky</h3>
          <v-list density="compact" bgColor="transparent" class="pt-0">
            <v-list-item color="primary" class="pl-0" v-for="fee in accommodation.data?.attributes.fees">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>{{ fee.item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <h3 class="mb-2">Zľava z ubytovania</h3>
          <v-list density="compact" bgColor="transparent" class="pt-0">
            <v-list-item color="primary" class="pl-0" v-for="discount in accommodation.data?.attributes.discount">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>{{ discount.item }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <p>
            <strong>{{ accommodation.data?.attributes.bestPrice }}</strong>
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <h3 class="mb-2">Zľava z ubytovania</h3>
          <v-list density="compact" bgColor="transparent" class="pt-0">
            <v-list-item color="primary" class="pl-0" v-for="individualFee in accommodation.data?.attributes.individualFee">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>{{ individualFee.title }}</v-list-item-title>
              <template v-slot:append> {{ individualFee.val }}</template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section class="services">
    <v-container>
      <h2 class="h1 mb-4">Doplnkové služby</h2>
      <div class="price-info">
        <v-row>
          <v-col cols="12">
            <h3 class="mb-2">Štandardné služby zahrnuté v cene</h3>
            <v-list density="compact" bgColor="transparent" class="pt-0">
              <v-list-item color="primary" class="pl-0" v-for="freeService in accommodation.data?.attributes.freeServices">
                <template v-slot:prepend>
                  <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
                </template>
                <v-list-item-title>{{ freeService.item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-2">Individuálne služby na Vaše želanie za poplatok</h3>
            <v-list density="compact" bgColor="transparent" class="pt-0">
              <v-list-item color="primary" class="pl-0" v-for="freeService in accommodation.data?.attributes.freeServices">
                <template v-slot:prepend>
                  <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
                </template>
                <v-list-item-title>{{ freeService.item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
import type { Slider, Price } from "~/types";
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const isVisible: Ref<boolean> = ref(false);
const index: Ref<number> = ref(0);
const images: Ref<any> = ref([]);

const { find, findOne } = useStrapi();
const { data: prices, refresh } = await useAsyncData("prices", () =>
  find<Price>("prices", {
    populate: "*",
    sort: "id",
  })
);

const { data: accommodation, refresh: refreshAccomodation } = await useAsyncData("accommodation", () =>
  findOne<Price>("accommodation", {
    populate: "*",
  })
);

onMounted(() => {
  store.setTitle(t("priceList.title"));
});
</script>
<style scoped lang="scss">
.show-gallery {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
.price-info {
  .v-list-item-title {
    white-space: wrap;
    white-space: initial;
    text-overflow: none;
  }
}

.main-info {
  .v-card {
    .v-card-subtitle {
      white-space: pre-wrap;
    }
  }
}
</style>
