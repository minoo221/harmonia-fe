<template>
  <section class="activities">
    <v-container>
      <div v-for="(item, index) in activities?.data" :key="item.id">
        <h2 class="text-left mb-6">{{ item.attributes.title }}</h2>
        <p class="mb-6">{{ item.attributes.desc }}</p>
        <v-row class="mb-6">
          <v-col cols="12" sm="4" md="4" lg="3" v-for="activity in item.attributes.okolies?.data">
            <v-card :href="activity.attributes.url" target="_blank">
              <v-img
                :src="activity.attributes.titleImg?.data.attributes.url"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="280px"
                cover
              >
                <v-card-title class="text-white text-left pr-8">{{ activity.attributes.title }}</v-card-title>
                <div class="distance" v-if="activity.attributes.distance !== null">
                  <v-icon size="large" color="white" icon="mdi-map-marker-distance"></v-icon>
                  <span class="mr-2">{{ activity.attributes.distance }}km</span>
                </div>
                <v-btn
                  class="show-info"
                  variant="text"
                  icon="mdi-information-slab-circle"
                  color="white"
                  @click.prevent="showDialog(activity.attributes.info)"
                ></v-btn>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div>
        <h2 class="text-left mb-6">Poloha</h2>
        <p class="mb-4">
          Penzion Harmonia, s 2 hviezdičkami, sa nachadza v srdci Liptova, v Liptovskom Mikuláši – časť Ondrašová iba 2 km od
          Aquaparku Tatralandia. Ponúka ubytovanie v 9 štandardne vybavených izbach s gaučom, ktorý je využívaný na prístelky.
          Kapacita penzionu je 23 pevnych ložok, 7 prísteliek
        </p>
        <p>
          V izbe sa nachádza chladnička, WI-Fi pripojenie. Vybavenie kúpelne – sprchovací kút, a toaleta, kúpelk.nábytok . Pre
          vlastnú prípravu stravu zo strany hosti, je k dispozícii vybavený kuchynský kút s dvojplatničkou a kuchynskym
          inventárom.
        </p>
      </div>
    </v-container>
    <v-dialog v-model="dialog" width="auto" max-width="480px">
      <v-card>
        <v-card-text>
          {{ infoText }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Zatvoriť</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
import type { Activity } from "~/types";
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const { find } = useStrapi();
const { data: activities, refresh } = await useAsyncData("activity-categories", () =>
  find<Activity>("activity-categories", {
    sort: "rank",
    populate: {
      okolies: {
        populate: "*",
      },
    },
  })
);

const dialog: Ref<boolean> = ref(false);
const infoText: Ref<string> = ref("");

const apartments: any[] = reactive([
  {
    title: "Apartmán č. 1",
    src: "/images/jasna_leto_3.jpg",
    gallery: [{ src: "/images/jasna_leto_3.jpg" }, { src: "/images/jasna_leto_3.jpg" }, { src: "/images/jasna_leto_3.jpg" }],
    rooms: "2 izby",
    persons: "4+1 osoby",
    bathrooms: "1 kupeľňa",
    kitchen: "Obývačka s kuchynským kútom",
  },
  {
    title: "Apartmán č. 1",
    src: "/images/jasna_leto_3.jpg",
    gallery: [{ src: "/images/jasna_leto_3.jpg" }, { src: "/images/jasna_leto_3.jpg" }, { src: "/images/jasna_leto_3.jpg" }],
    rooms: "2 izby",
    persons: "4+1 osoby",
    bathrooms: "1 kupeľňa",
    kitchen: "Obývačka s kuchynským kútom",
  },
]);

function showDialog(text: string) {
  infoText.value = text;
  dialog.value = true;
}

onMounted(() => {
  store.setTitle(t("activities.title"));
  console.log(activities);
});
</script>
<style scoped lang="scss">
.show-gallery {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.activities {
  h2 {
    font-size: 42px;
  }
  .v-card-title {
    white-space: initial;
    line-height: 21px;
    min-height: 52px;
    display: flex;
    align-items: center;
  }
  .distance {
    position: absolute;
    bottom: 5px;
    right: 5px;
    text-align: center;
    span {
      font-weight: 700;
      color: $white;
      display: block;
    }
  }
  .show-info {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 10;
  }
}
</style>
