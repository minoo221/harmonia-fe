<template>
  <section class="privacy">
    <v-container>
      <v-row>
        <v-col cols="12"> </v-col>
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

const { findOne, find } = useStrapi();
const { data: gallery, refresh } = await useAsyncData("galleries", () =>
  findOne<Privacy>("galleries", 6, {
    populate: "*",
  })
);

onMounted(() => {
  store.setTitle(t("reservation.title"));
});
</script>
<style scoped lang="scss"></style>
