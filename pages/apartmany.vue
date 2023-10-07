<template>
  <section class="main-info text-center">
    <v-container>
      <div class="nav">
        <v-list nav density="compact" color="white">
          <v-list-item
            link
            nuxt
            v-for="link in links"
            :to="{ hash: '#' + link.href }"
            @click="setActive(link.href)"
            :ariaCurrentValue="link.href === activeId"
            :class="{ 'sidebar-link--active': link.href === activeId }"
            :active="false"
          >
            <v-list-item-title>{{ link.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>

      <div class="content-cover" ref="container">
        <div class="info" id="info">
          <h2 class="link-text">Informácie</h2>
          <h2 class="h1">Rodinný penzión Harmónia** Vám ponúka kvalitné celoročné ubytovanie v srdci Liptova.</h2>
          <p>
            Ctení hostia , ponúkame Vám širokú škálu izieb, aby sme vyhoveli Vašim individuálnym potrebám. Nech už ste tu na
            romantickú dovolenku pre dvoch , rodinný výlet alebo na služobnej ceste , nájdete u nás vhodnú možnosť ubytovania.
          </p>
          <p>
            Kapacita penziónu je 9 izieb - 23 pevných lôžok s možnosťou 7 prístelky . Na prízemí sa nachádzajú štandardne vybavené
            2/2 - lôžkové izby s možnosťou prístelky. Na prvom poschodí sa nachádza 1/2 - lôžková štandardne vybavená izba s
            možnosťou prístelky, 1 rodinná izba - 2 samostatné štandardne vybavené dvoj - lôžkové izby - medzi sebou prepojené so
            spoločnou kúpeľňou s možnosťou prístelky , 1/2 - lôžková izba nadštandardne vybavená s balkónom s možnosťou prístelky
            a 2/2 - lôžkové izby s rozlohou 9 -11 m2 štandardne vybavené. Na druhom poschodí sa nachádzajú priestrannejšie ,
            štandardne vybavené izby s možnosťou prístelky.
          </p>
          <p>
            Všetky ubytovacie jednotky sú vybavené TV so satelitným príjmom s bohatým výberom programov , chladničkou, s
            bezplatným WiFi pripojením na internet , vlastnou kúpeľňou so sprchovacím kútom a toaletou. V cene izby je zahrnuté
            bezplatné parkovisko. Pre všetkých hostí je v penzióne k dispozícii spoločná kuchynka na prípravu jednoduchých jedál
            so základným vybavením a spoločenská miestnosť so štýlovým krbom a posedením, slúžiaca zároveň aj ako jedáleň, kde sú
            hosťom servírované chutné "rozšírené" kontinentálne raňajky.
          </p>
          <p>
            V príjemnom počasí si môžete vychutnať šálku kávy v záhrade nášho penziónu. Máme pre Vás pripravenú letnú terasu s
            posedením pre 12 osôb a záhradným krbom/ grilom s možnosťou grilovania. Pre našich hostí aj tých najmenších je k
            dispozícii trampolína, stolný tenis a šípky a rôzne hry s ktorými si môžete spestriť voľný čas.
          </p>
          <v-row>
            <v-col cols="6">
              <h2>Check in</h2>
              <p>od 14:00 hod</p>
            </v-col>
            <v-col cols="6">
              <h2>Check out</h2>
              <p>do 10:00 hod</p>
            </v-col>
          </v-row>
        </div>
        <div class="accommodation" id="accommodation">
          <h2 class="link-text">Ponuka ubytovania</h2>
          <v-row class="mb-6">
            <v-col cols="12" v-for="(item, index) in apartments?.data">
              <v-card elevation="0" color="transparent">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-img
                      :src="item.attributes.titleImg.data?.attributes.url"
                      class="text-left align-end rounded-md"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="100%"
                      cover
                    >
                      <v-btn
                        class="show-gallery"
                        variant="text"
                        icon="mdi-image-multiple"
                        color="white"
                        @click="showGallery(index)"
                      ></v-btn>
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-col>
                  <v-col md="8">
                    <v-card-title class="text-left" v-text="item.attributes.title"></v-card-title>
                    <v-card-subtitle class="text-left">
                      <v-chip color="primary" label>
                        <v-icon start icon="mdi-image-size-select-small"></v-icon>
                        {{ item.attributes.size }} m<sup>2</sup>
                      </v-chip>
                    </v-card-subtitle>

                    <v-card-text>
                      <p class="mb-4" v-if="item.attributes.info">{{ item.attributes.info }}</p>
                      <div class="d-flex justify-flex-start">
                        <v-tooltip
                          location="top"
                          v-for="equipment in item.attributes.Vybavenie"
                          :key="equipment.id"
                          :text="equipment.title"
                        >
                          <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="mx-2" size="x-large" color="primary"> mdi-{{ equipment.icon }} </v-icon>
                          </template>
                        </v-tooltip>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        class="mx-2"
                        color="primary"
                        link
                        to="/rezervacia"
                        variant="text"
                        prepend-icon="mdi-calendar-month-outline"
                      >
                        {{ t("apartments.reservation") }}
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div class="prices">
          <h2 class="link-text">Cenník</h2>

          <v-expansion-panels class="mb-6" variant="accordion">
            <v-expansion-panel v-for="item in prices?.data" :key="item.id">
              <v-expansion-panel-title>
                <div>
                  <h2>{{ item.attributes.title }}</h2>
                  <h4>{{ item.attributes.dates }}</h4>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
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
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>

        <div class="services">
          <h2 class="link-text">Doplnkové služby</h2>
          <h2 class="h1 mb-4">Doplnkové služby</h2>
          <div class="price-info">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <h3 class="mb-4">Ubytovacie podmienky</h3>
                <p>
                  Check in (nástup na pobyt) - 14:<sup>00</sup> - 22:<sup>00</sup> - neskorší čas po nahlásení za extra príplatok
                </p>
                <p>
                  Check out (odhlásenie z pobytu) - do 10:<sup>00</sup> hod. - neskorší odchod len po dohode za extra príplatok
                </p>
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
                <h3 class="mb-4">Doplnkové vybavenie zariadenia</h3>
                <p>
                  Spoločenská miestnosť s kapacitou cca 30 miest, ktorá je zároveň stravovacou miestnosťou s barom, štýlovým
                  krbom, salónik s kapacitou 6 miest , vybavený kuchynským kútom letná terasa so záhradným grilom parkovisko s
                  kapacitou 10 áut
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
          </div>
        </div>

        <!-- <v-row>
          <v-col cols="12" class="text-left">
            <h2>Vybavenie izieb</h2>
          </v-col>
          <v-col cols="12" md="3">
            <v-list bg-color="transparent">
              <v-list-item class="pl-0">
                <template v-slot:prepend>
                  <v-icon size="large" color="secondary" icon="mdi-bed-king-outline" class="mr-2"></v-icon>
                </template>

                <v-list-item-title class="text-left">Manželské postele</v-list-item-title>
              </v-list-item>
              <v-list-item class="pl-0">
                <template v-slot:prepend>
                  <v-icon size="large" color="secondary" icon="mdi-bed-queen" class="mr-2"></v-icon>
                </template>

                <v-list-item-title class="text-left">Oddelené postele</v-list-item-title>
              </v-list-item>
              <v-list-item class="pl-0">
                <template v-slot:prepend>
                  <v-icon size="large" color="secondary" icon="mdi-wifi" class="mr-2"></v-icon>
                </template>

                <v-list-item-title class="text-left">Wifi</v-list-item-title>
              </v-list-item>
              <v-list-item class="pl-0">
                <template v-slot:prepend>
                  <v-icon size="large" color="secondary" icon="mdi-television" class="mr-2"></v-icon>
                </template>

                <v-list-item-title class="text-left">TV</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="3">
            <v-list bg-color="transparent">
              <v-list-item class="pl-0">
                <template v-slot:prepend>
                  <v-icon size="large" color="secondary" icon="mdi-fridge" class="mr-2"></v-icon>
                </template>

                <v-list-item-title class="text-left">Chladnička</v-list-item-title>
              </v-list-item>
              <v-list-item class="pl-0">
                <template v-slot:prepend>
                  <v-icon size="large" color="secondary" icon="mdi-receipt-outline" class="mr-2"></v-icon>
                </template>

                <v-list-item-title class="text-left">Osušky a uteráky</v-list-item-title>
              </v-list-item>
              <v-list-item class="pl-0">
                <template v-slot:prepend>
                  <v-icon size="large" color="secondary" icon="mdi-hair-dryer" class="mr-2"></v-icon>
                </template>

                <v-list-item-title class="text-left">Bezplatné zapožičanie sušica na vlasy na recepcií</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row> -->
      </div>
    </v-container>
    <vue-easy-lightbox :visible="isVisible" :imgs="images" :index="index" @hide="onHide"></vue-easy-lightbox>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
import type { Slider, Apartment, Price } from "~/types";
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();
import { useActiveScroll } from "vue-use-active-scroll";

const isVisible: Ref<boolean> = ref(false);
const index: Ref<number> = ref(0);
const images: Ref<any> = ref([]);

const { find } = useStrapi();
const { data: apartments, refresh: refreshApartments } = await useAsyncData("apartments", () =>
  find<Apartment>("apartments", { populate: "*", sort: "sort" })
);

const { data: prices, refresh: refreshPrices } = await useAsyncData("prices", () =>
  find<Price>("prices", {
    populate: "*",
    sort: "id",
  })
);

const container: Ref<any> = ref(null);
const targets: Ref<any> = ref([]);
const links: Ref<any> = ref([]);

/* const links = reactive([
  { href: "info", label: "Informácie" },
  { href: "accommodation", label: "Ponuka ubytovania" }, // ...
]);

const container = ref(null);
const targets: Ref<any> = ref([
  { id: "info", textContent: "Informácie" },
  { id: "accommodation", textContent: "Ponuka ubytovania" }, // ...
]); */

/* function resetTargets() {
  targets.value = [];
} */

/* watch(container, (c) => (c ? setTargets(c) : resetTargets()), {
  immediate: true,
  flush: "post",
}); */

function resetTargets() {
  targets.value = [];
  links.value = [];
}

function setTargets(container: any) {
  const _targets: any[] = [];
  const _links: any[] = [];
  console.log(container);

  container.querySelectorAll(".link-text").forEach((h2: any) => {
    h2.id = h2.textContent
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");

    _targets.push(h2);
    _links.push({ href: h2.id, label: h2.textContent });
  });

  links.value = _links;
  targets.value = _targets;
}

watch(container, (c) => (c ? setTargets(c) : resetTargets()), {
  immediate: true,
  flush: "post",
});

const { setActive, activeId } = useActiveScroll(targets);

const onShow = () => {
  isVisible.value = true;
};

const onHide = () => {
  isVisible.value = false;
};

function showGallery(index: number) {
  /* images.value = apartments[index].value.gallery; */
  console.log(images.value);
  console.log(apartments.value?.data[index].attributes.gallery.data);

  const result = apartments.value?.data[index].attributes.gallery.data.map((obj: any) => {
    console.log(obj);

    return {
      text: obj.id,
      src: obj.attributes.url,
    };
  });

  images.value = result;

  console.log("result", result);

  onShow();
  /* gallery.silentbox.openOverlay(item, index); */
}

onMounted(() => {
  store.setTitle(t("apartments.title"));
  console.log("apartments", apartments);
  console.log("container", container);
});
</script>
<style scoped lang="scss">
.main-info {
  > .v-container {
    max-width: 1640px;
  }
  .info {
    margin-bottom: 80px;
    .h1 {
      margin-bottom: 25px;
    }
    p {
      margin-bottom: 25px;
    }
  }
  .content-cover {
    max-width: 980px;
    margin-left: 340px;
    @media (max-width: 780px) {
      width: 100%;
      margin-left: 0;
    }
  }
  .link-text {
    height: 20px;
    font-size: 0;
  }

  .price-info {
    text-align: left;
    .v-list-item-title {
      white-space: wrap;
      white-space: initial;
      text-overflow: none;
    }
  }
}
.nav {
  position: sticky;
  left: 10px;
  top: 110px;
  width: 320px;
  text-align: left;
  @media (max-width: 780px) {
    position: initial;
    width: 100%;
  }
  .v-list-item-title {
    font-size: 18px;
  }
  .sidebar-link--active {
    color: $primary-80;
  }
}
.show-gallery {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.v-card {
  text-align: left;
  .v-card-title {
    white-space: initial;
    word-wrap: break-word;
    padding-right: 35px;
    font-size: 28px;
    font-weight: 700;
    font-family: $secondary-font;
    @media (max-width: 1200px) {
      font-size: 18px;
      line-height: 21px;
      padding-right: 45px;
    }
  }
  .v-card-subtitle {
    opacity: 1;
  }
  .v-card-actions {
    .v-btn {
      position: absolute;
      right: 15px;
      bottom: 15px;
    }
  }
}
</style>
