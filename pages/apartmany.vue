<template>
  <section class="main-info text-center">
    <v-container>
      <v-row class="mb-6">
        <v-col cols="12" md="4" v-for="(item, index) in apartments?.data">
          <v-card rounded="xl" elevation="8">
            <v-img
              :src="item.attributes.titleImg.data?.attributes.url"
              class="text-left align-end rounded-md"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="text-white" v-text="item.attributes.title"></v-card-title>

              <v-btn
                class="show-gallery"
                variant="text"
                icon="mdi-image-multiple"
                color="white"
                @click="showGallery(index)"
              ></v-btn>
            </v-img>

            <v-card-text>
              <v-row>
                <v-col cols="auto">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon size="large" color="secondary" icon="mdi-door" class="mr-2"></v-icon>
                    </template>

                    <v-list-item-title class="text-left">{{ item.attributes.rooms }}</v-list-item-title>
                  </v-list-item>
                </v-col>
                <v-col cols="auto">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon size="large" color="secondary" icon="mdi-account-group" class="mr-2"></v-icon>
                    </template>

                    <v-list-item-title class="text-left">{{ item.attributes.people }}</v-list-item-title>
                  </v-list-item>
                </v-col>
                <v-col cols="auto">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon size="large" color="secondary" icon="mdi-shower" class="mr-2"></v-icon>
                    </template>

                    <v-list-item-title class="text-left">{{ item.attributes.bathroom }}</v-list-item-title>
                  </v-list-item>
                </v-col>

                <v-col cols="auto">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon size="large" color="secondary" icon="mdi-bed-king-outline" class="mr-2"></v-icon>
                    </template>

                    <v-list-item-title class="text-left">{{ item.attributes.kitchen }}</v-list-item-title>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn class="mx-2" color="primary" link to="/rezervacia" variant="text" prepend-icon="mdi-calendar-month-outline">
                {{ t("apartments.reservation") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-left">
          <h2>Vybavenie izieb</h2>
        </v-col>
        <v-col cols="12" md="3">
          <v-list bg-color="transparent">
            <v-list-item class="pl-0">
              <template v-slot:prepend>
                <v-icon size="large" color="secondary" icon="mdi-pot-mix" class="mr-2"></v-icon>
              </template>

              <v-list-item-title class="text-left">Kuchyňa</v-list-item-title>
            </v-list-item>
            <v-list-item class="pl-0">
              <template v-slot:prepend>
                <v-icon size="large" color="secondary" icon="mdi-bed-king-outline" class="mr-2"></v-icon>
              </template>

              <v-list-item-title class="text-left">Manželská posteľ</v-list-item-title>
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

              <v-list-item-title class="text-left">LCD TV</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="3">
          <v-list bg-color="transparent">
            <v-list-item class="pl-0">
              <template v-slot:prepend>
                <v-icon size="large" color="secondary" icon="mdi-kettle" class="mr-2"></v-icon>
              </template>

              <v-list-item-title class="text-left">Rychlovárna kanvica</v-list-item-title>
            </v-list-item>
            <v-list-item class="pl-0">
              <template v-slot:prepend>
                <v-icon size="large" color="secondary" icon="mdi-cup" class="mr-2"></v-icon>
              </template>

              <v-list-item-title class="text-left">Poháre a šálky</v-list-item-title>
            </v-list-item>
            <v-list-item class="pl-0">
              <template v-slot:prepend>
                <v-icon size="large" color="secondary" icon="mdi-fridge" class="mr-2"></v-icon>
              </template>

              <v-list-item-title class="text-left">Chladnička</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
    <vue-easy-lightbox :visible="isVisible" :imgs="images" :index="index" @hide="onHide"></vue-easy-lightbox>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
import type { Slider, Apartment } from "~/types";
const emit = defineEmits(["title"]);
import { useIndexStore } from "@/stores/";
const store = useIndexStore();

const isVisible: Ref<boolean> = ref(false);
const index: Ref<number> = ref(0);
const images: Ref<any> = ref([]);

const { find } = useStrapi();
const { data: apartments, refresh } = await useAsyncData("apartments", () => find<Apartment>("apartments", { populate: "*" }));

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
});
</script>
<style scoped lang="scss">
.show-gallery {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
