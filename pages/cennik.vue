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
        <v-col cols="12" sm="6" md="4">
          <h3 class="mb-4">Ubytovacie podmienky</h3>
          <p>Check in (nástup na pobyt) - 14:<sup>00</sup> - 22:<sup>00</sup> - neskorší čas po nahlásení za extra príplatok</p>
          <p>Check out (odhlásenie z pobytu) - do 10:<sup>00</sup> hod. - neskorší odchod len po dohode za extra príplatok</p>
          <p>Domáce zvieratá - po dohode za príplatok</p>
          <p>Všetky apartmány sú nefajčiarske, fajčenie je možné na terase.</p>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <p></p>
          <h3 class="mb-4">Platba</h3>
          <p></p>
          <p>Platba je možná hotovosti v EUR mene</p>
          <p>Kreditnou kartou akceptujeme karty : Visa , Mastercard , Maestro</p>
          <h3 class="my-4">Povinné poplatky</h3>
          <p></p>
          <p>daň z ubytovania 1 €/os/noc (neplatia deti do 10 rokov)</p>
        </v-col>
        <v-col cols="12" md="4">
          <p></p>
          <h3 class="mb-4">Cena zahŕňa</h3>
          <v-list density="compact" bgColor="transparent" class="pt-0">
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Nájom</v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>celodenné parkovanie Vášho automobilu</v-list-item-title>
            </v-list-item>

            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>posteľné prádlo, uteráky, osušky (výmena na požiadanie), tekuté mydlo</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="4">
          <p></p>
          <h3 class="mb-4">Stravovanie</h3>
          <p>Stravovanie umožňuje penzión v jedálni.</p>
          <p>Rozšírené kontinentálne raňajky, večere pre skupiny.</p>
          <v-list density="compact" bgColor="transparent">
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Raňajky</v-list-item-title>
              <template v-slot:append> 10&euro; / 1 os </template>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Raňajky dieťa 4 - 9 rokov</v-list-item-title>
              <template v-slot:append> 6&euro; / os</template>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Raňajky dieťa 4 - 9 rokov</v-list-item-title>
              <template v-slot:append> 6&euro; / os</template> </v-list-item
            ><v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Večera</v-list-item-title>
              <template v-slot:append> 12&euro; / os</template>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Večera dieťa 4 - 9 rokov</v-list-item-title>
              <template v-slot:append> 8&euro; / os</template>
            </v-list-item>
          </v-list>
          <p>Príprava vlastnej stravy</p>
          <v-list-item color="primary" class="pl-0">
            <template v-slot:prepend>
              <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
            </template>
            <v-list-item-title
              >v kuchynskom kúte -vybaveným sklo keramickou doskou a potrebným kuchynským inventárom</v-list-item-title
            >
          </v-list-item>
          <v-list-item color="primary" class="pl-0">
            <template v-slot:prepend>
              <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
            </template>
            <v-list-item-title>na letnej terase – záhradný gril</v-list-item-title>
          </v-list-item>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <h3 class="mb-4">Doplnkové vybvenie zariadenia</h3>
          <p>
            Spoločenská miestnosť s kapacitou cca 30 miest, ktorá je zároveň stravovacou miestnosťou s barom, štýlovým krbom,
            salónik s kapacitou 6 miest , vybavený kuchynským kútom letná terasa so záhradným grilom parkovisko s kapacitou 10 áut
          </p>
          <v-list density="compact" bgColor="transparent">
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Rozkladacia detská postieľka</v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Letná terasa so záhradným nábytkom</v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Objekt monitorovaný kamerovým systémom</v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>WIFI</v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Záhradný gril</v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Stolný tenis</v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Parkovisko</v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Detské hračky</v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Úschovňa bicyklov a lyží</v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Informačný materiál </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <h3 class="mb-4">Individuálne služby</h3>
          <v-list density="compact" bgColor="transparent">
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>KTX - od 10 roko </v-list-item-title>
              <template v-slot:append> 1&euro; </template>
            </v-list-item>
            <v-list-item color="primary" class="pl-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-square" size="x-small" color="primary" class="mr-1"></v-icon>
              </template>
              <v-list-item-title>Návšteva so psom – max. strednej výšky, jedno-rázový poplatok 15 EUR </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
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

const { find } = useStrapi();
const { data: prices, refresh } = await useAsyncData("prices", () =>
  find<Price>("prices", {
    populate: "*",
    sort: "id",
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
