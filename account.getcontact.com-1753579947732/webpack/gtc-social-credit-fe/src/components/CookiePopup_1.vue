<template>
  <div class="cookies" v-if="cookies" data-test="cookie">
    <p v-if="!consent">
      {{ $t("home.cookies.description") }}
      <a
        href="https://getcontact.com/privacy"
        target="_blank"
        class="underline"
      >
        {{ $t("menu.footer.cookie") }}
      </a>
    </p>
    <i18n-t v-else keypath="landing.cookies.description" tag="p">
      <template #cookie>
        <a href="https://getcontact.com/privacy" target="_blank">
          {{ $t("landing.cookies.policy") }}
        </a>
      </template>
    </i18n-t>

    <div v-if="consent" class="buttons">
      <button @click="manageCookies(false)">
        {{ $t("landing.cookies.reject") }}
      </button>
      <button @click="manageCookies(true)">
        {{ $t("landing.cookies.accept") }}
      </button>
    </div>
    <span @click="manageCookies(false)">  </span>
  </div>
</template>

<script lang="ts" setup>
import { useCookies } from "@vueuse/integrations/useCookies";
import { onMounted, ref } from "vue";

import { useTemplateStore } from "@/stores/template.store";
const { set, get } = useCookies();
const templateStore = useTemplateStore();
const cookies = ref(false);
const consent = ref(false);

function manageCookies(value: boolean) {
  const expireDate = new Date();
  // Since there is no defined gtag, the consent declaration has not been made.
  if (value) {
    expireDate.setTime(expireDate.getTime() + 6 * 30 * 24 * 60 * 60 * 1000); // 6 months
  } else {
    expireDate.setTime(expireDate.getTime() + 259200000); // 3 days
  }

  set("cookieInform", value ? "accept" : "reject", {
    expires: expireDate,
    path: "/",
    secure: true,
  });
  cookies.value = false;
}

async function getConsent() {
  const data = await templateStore.getConsentMode();

  if (data) {
    consent.value = data;
  }

  cookies.value = !get("cookieInform");
}

onMounted(() => {
  getConsent();
});
</script>

<style lang="postcss">
.cookies {
  @apply fixed flex w-[calc(100%_-_30px)] m-[15px] justify-between items-start sm:items-center flex-col sm:flex-row bottom-0 rounded-md bg-black-pure/80 text-white-100 text-[12px] p-[16px] pr-[30px] z-[90] left-0;

  .buttons {
    @apply space-x-1 pt-3 sm:pt-0 whitespace-nowrap;

    button {
      @apply bg-white-100 text-black-pure rounded-full py-[4px] px-[8px];
    }
  }

  span {
    @apply absolute cursor-pointer w-4 h-4 leading-4 text-center right-2 top-2;
  }
}
</style>
