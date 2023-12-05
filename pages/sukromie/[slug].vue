<template>
  <section class="privacy">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="privacy-text">
            <h1>{{ privaciesD?.data.attributes.title }}</h1>
            <client-only>
              <div v-html="privaciesD?.data.attributes.body"></div>
            </client-only>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
import type { Privacy } from "~/types";
import { useIndexStore } from "@/stores/";
const store = useIndexStore();
const route = useRoute();

const { findOne, find } = useStrapi();
const { data: privaciesD, refresh: refreshPrices } = await useAsyncData(
  "privaciesD",
  () => findOne<any>("privacies", route.params.slug),
  {
    locale: locale.value,
  }
);

onMounted(() => {
  /* store.setTitle(privacies?.data.attributes.title); */
  console.log("privaciesD", privaciesD.value);
});
</script>
<style scoped lang="scss">
.privacy-text {
  max-width: 840px;
  margin: 0 auto;
}
</style>
