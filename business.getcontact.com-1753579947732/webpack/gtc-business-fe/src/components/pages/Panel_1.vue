<template>
  <main class="flex min-h-screen">
    <Sidebar :items="items" v-bind="$attrs" :status="companyStatus" />
    <div
      :class="[
        'w-full md:pl-72 flex flex-col flex-1',
        { 'bg-white-100': wizard },
      ]"
    >
      <template v-if="wizard">
        <GtcWizard v-model="step" :goNext="props.goNext">
          <template #steps="stepper">
            <slot name="steps" v-bind="stepper" />
          </template>
        </GtcWizard>
      </template>
      <template v-else>
        <PanelNav v-bind="$attrs" :alerts="alerts" :alertMin="alertMin">
          <slot name="nav" />
          <template #home>
            <slot name="home" />
          </template>
        </PanelNav>
        <slot name="info" />
        <GtcLoading v-if="!visible" class="bg-white-100" />
        <GtcPage
          v-bind="$attrs"
          :title="title || ''"
          :description="description || ''"
          :class="['flex-1', { 'hide-elements': !visible }]"
          :alerts="alerts"
          :alertMin="alertMin"
        >
          <slot />
        </GtcPage>
      </template>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { computed, defineComponent, onMounted, useAttrs } from "vue";

import GtcLoading from "@/components/Loading.vue";
import GtcPage from "@/components/pages/Page.vue";
import GtcWizard from "@/components/Wizard.vue";
import { useAlert } from "@/composables/useAlert";
import {
  convertMainMenuToSidebarMenu,
  useInitialize,
} from "@/composables/useInitialize";
import { useLogin } from "@/composables/useLogin";

import Sidebar from "../layout/Sidebar.vue";
import PanelNav from "../pages/PanelNav.vue";

const attrs = useAttrs();
const { isLoggedIn } = useLogin();

const { fetchSiteData, siteData } = useInitialize();
const { alerts } = useAlert();

const items = computed(() => [
  ...convertMainMenuToSidebarMenu(siteData.value?.mainMenu),
  ...(Array.isArray(attrs.items) ? attrs.items : []),
]);

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  goNext: {
    type: Boolean,
    default: false,
  },
  wizard: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String as () => string | null,
    default: null,
  },
  description: {
    type: String as () => string | null,
    default: null,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  alertMin: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const step = useVModel(props, "modelValue", emit);

const companyStatus = computed(() => {
  if (isLoggedIn.value) {
    return siteData.value.businessCompany?.status;
  } else {
    return false;
  }
});

onMounted(async () => {
  fetchSiteData();

  // Project management team wanted this part to work like this. We should improve this code block later.
  if (companyStatus.value !== 1) {
    const time = 600000; // 10 Minutes
    setInterval(() => window.location.reload(), time);
  }
});

defineComponent({
  name: "GtcPanel",
  components: {
    GtcPage,
    Sidebar,
    PanelNav,
  },
});
</script>
<style>
article.hide-elements * {
  @apply opacity-0;
}
</style>
