<template>
  <div class="language-switcher">
    <GtcPopover placement="bottom-end">
      <button class="inline-flex items-center" data-test="language-switcher">
        <span class="mr-2">
          {{ `${locale}`.toUpperCase() }}
        </span>
        <img
          :src="
            dark
              ? require('../assets/images/svg/icons/locale-icon.svg')
              : require('../assets/images/svg/icons/locale-icon-dark.svg')
          "
          alt="Locale icon"
        />
      </button>
      <template #content="{ hide }">
        <div class="languages">
          <ul data-test="language-list">
            <li
              v-for="availableLocale in availableLocales"
              :key="availableLocale.locale"
              @click="
                changeLocale(availableLocale.locale);
                hide();
              "
            >
              <span
                :class="[
                  'fi fis mr-3',
                  `fi-${getFlagOfLocale(availableLocale.locale)}`,
                ]"
              ></span>
              {{ availableLocale.localeName }}
            </li>
          </ul>
        </div>
      </template>
    </GtcPopover>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted } from "vue";

import GtcPopover from "@/components/Popover.vue";
import { useLocale } from "@/composables/useLocale";
import { getFlagOfLocale } from "@/utils";

const { locale, watchLocale, availableLocales } = useLocale();

function changeLocale(newLocale: string) {
  locale.value = newLocale;
}

onMounted(watchLocale);

defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
});

defineComponent({
  name: "LanguageSwitcher",
});
</script>

<style>
.language-switcher {
  .languages {
    @apply bg-white-100 rounded-lg shadow-lg overflow-hidden;

    ul {
      @apply max-h-60 overflow-y-auto;

      li {
        @apply cursor-pointer py-2 px-4 whitespace-nowrap hover:text-black-pure text-neutral-1000 hover:bg-gray-100 flex text-base;
      }
    }
  }
}
</style>
