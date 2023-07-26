<template>
  <section class="reservation">
    <v-container>
      <v-row>
        <v-col cols="12">
          <iframe
            frameborder="0"
            scrolling="yes"
            width="100%"
            height="650px"
            style="background: #edf2f4"
            src="https://www.megaubytovanie.sk/Widget/CreateReservation?ObjectId=4224&PrimaryColor=rgba(239%2C35%2C60%2C1)&BgColor=rgba(237%2C242%2C244%2C1)&TextColor=rgba(0%2C0%2C0%2C0.8)"
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
  </section>
  >
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();

onMounted(() => {
  store.setTitle(t("reservation.title"));
});
</script>
<style scoped lang="scss">
.show-gallery {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.contact {
  .v-list-item-title {
    font-size: 18px;
    white-space: initial;
    text-overflow: none;
  }
}

iframe {
  background: $white;
}
</style>
