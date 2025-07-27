<template>
  <div class="language-switcher">
    <GtcPopover placement="bottom-end">
      <button class="inline-flex items-center" data-test="language-switcher">
        <img
          :src="
            dark
              ? require('../assets/images/svg/locale-icon-dark.svg')
              : require('../assets/images/svg/locale-icon.svg')
          "
          alt="Locale icon"
        />
        <span class="ml-1 text-neutral-600 font-medium text-sm">
          {{ `${locale}`.toUpperCase() }}
        </span>
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
              <img
                :src="
                  require(`@/assets/images/svg/flags/${getFlagOfLocale(
                    availableLocale.locale
                  )}.svg`)
                "
              />
              <span>{{ availableLocale.localeName }}</span>
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
import { getFlagOfLocale } from "@/utils";
import { useLocale } from "@/utils/locale";

const { locale, watchLocale, availableLocales } = useLocale();

onMounted(watchLocale);

function changeLocale(newLocale: string) {
  locale.value = newLocale;
}

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

<style lang="postcss">
.language-switcher {
  .languages {
    @apply bg-white-100 rounded-lg shadow-lg overflow-hidden;

    ul {
      @apply max-h-60 overflow-y-auto;

      li {
        @apply block cursor-pointer py-2 px-4 whitespace-nowrap hover:text-black-pure text-neutral-1000 hover:bg-gray-100 text-base;

        img {
          @apply w-5 mr-3 inline align-middle;
        }
      }
    }
  }
}
</style>
