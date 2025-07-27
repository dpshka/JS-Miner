<template>
  <footer>
    <div class="bg-secondary-1000 flex">
      <div class="container mx-auto md:px-20 md:px-6">
        <img
          :src="require('@/assets/images/svg/gtc-logo.svg')"
          :alt="$t('site.title')"
          class="w-28 mt-12 mx-auto md:mx-0"
        />
        <div
          class="grid grid-rows-5 md:grid-rows-1 grid-flow-col gap-5 mt-3 text-center md:text-left"
        >
          <div class="footer-block">
            <h1>{{ $t("menu.footer.getcontact") }}</h1>
            <ul>
              <li>
                <a href="https://web.getcontact.com/" target="_blank">{{
                  $t("menu.footer.getcontactWeb")
                }}</a>
              </li>
              <li>
                <a href="https://premium.getcontact.com/" target="_blank">{{
                  $t("menu.footer.premiumAndTariffs")
                }}</a>
              </li>
              <li>
                <a href="https://www.getcontact.com/features" target="_blank">{{
                  $t("menu.footer.features")
                }}</a>
              </li>
              <li>
                <a href="https://www.getcontact.com/stories" target="_blank">{{
                  $t("menu.footer.successStories")
                }}</a>
              </li>
              <li>
                <router-link to="/">{{
                  $t("menu.footer.aboutUs")
                }}</router-link>
              </li>
              <li>
                <a href="https://www.getcontact.com/career" target="_blank">{{
                  $t("menu.footer.career")
                }}</a>
              </li>
            </ul>
          </div>
          <div class="footer-block">
            <h1>{{ $t("menu.footer.help") }}</h1>
            <ul>
              <li>
                <a
                  href="https://getcontactforbusiness.faq.desk360.com/"
                  target="_blank"
                  >{{ $t("menu.footer.helpCenter") }}</a
                >
              </li>
              <li>
                <router-link to="/contact-us">{{
                  $t("menu.footer.contactUs")
                }}</router-link>
              </li>
            </ul>
          </div>
          <div class="footer-block">
            <h1>{{ $t("menu.footer.legacy") }}</h1>
            <ul>
              <li>
                <router-link to="/privacy" target="_blank">{{
                  $t("menu.footer.privacy")
                }}</router-link>
              </li>
              <li>
                <router-link to="/terms" target="_blank">{{
                  $t("menu.footer.terms")
                }}</router-link>
              </li>
              <li>
                <router-link to="/purchases-policy" target="_blank">{{
                  $t("menu.footer.purchase")
                }}</router-link>
              </li>
              <li>
                <router-link to="/cookies-policy" target="_blank">{{
                  $t("menu.footer.cookie")
                }}</router-link>
              </li>
            </ul>
          </div>

          <div class="footer-block">
            <h1>{{ $t("menu.footer.email") }}</h1>
            <ul>
              <li>
                <a href="mailto:info-business@getcontact.com"
                  >info-business@getcontact.com</a
                >
              </li>
              <li>
                <a href="mailto:business@getcontact.com"
                  >business@getcontact.com</a
                >
              </li>
            </ul>
          </div>

          <div class="footer-block">
            <h1>{{ $t("menu.footer.follow") }}</h1>
            <a
              href="https://www.facebook.com/getcontactapp/"
              target="_blank"
              aria-label="Facebook"
            >
              <img
                alt="Facebook"
                :src="require('@/assets/images/svg/icons/follow/facebook.svg')"
            /></a>
            <a href="https://x.com/getcontact/" target="_blank" aria-label="X">
              <img
                alt="X"
                :src="require('@/assets/images/svg/icons/follow/x.svg')"
            /></a>
            <a
              href="https://www.instagram.com/getcontact/"
              target="_blank"
              aria-label="Instagram"
            >
              <img
                alt="Instagram"
                :src="
                  require('@/assets/images/svg/icons/follow/instagram.svg')
                "
            /></a>
            <a
              href="https://www.linkedin.com/company/getcontact/"
              target="_blank"
              aria-label="Linkedin"
            >
              <img
                alt="LinkedIn"
                :src="require('@/assets/images/svg/icons/follow/linkedin.svg')"
            /></a>
          </div>
        </div>
        <div
          class="border-t border-blue-border mt-10 text-xs text-secondary-100"
        >
          <LanguageSwitcher dark class="py-4 hidden md:inline-block" />
          <span
            class="opacity-50 md:float-right block md:inline text-center md:text-right py-4"
            >{{ $t("menu.footer.copyright", { year: year }) }}</span
          >
        </div>
      </div>
    </div>
    <div
      class="flex bg-white-100 justify-center align-middle py-1"
      v-if="cardLogo"
    >
      <img
        alt="Visa"
        :src="require('@/assets/images/svg/footer-logos/visa-logo.svg')"
      />
      <img
        alt="Mastercard"
        :src="require('@/assets/images/svg/footer-logos/mastercard-logo.svg')"
      /><img
        alt="MNP"
        :src="require('@/assets/images/svg/footer-logos/mnp-logo.svg')"
      />
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";

import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const year = ref(new Date().getFullYear());

defineProps({
  cardLogo: {
    type: Boolean,
    default: false,
  },
});

defineComponent({
  name: "GtcFooter",
  components: { LanguageSwitcher },
});
</script>

<style>
footer .footer-block h1 {
  @apply text-base text-white-100 font-bold py-2;
}
footer .footer-block ul li {
  @apply text-sm text-white-100 font-normal py-1;
}
footer .footer-block img {
  @apply inline mr-2;
}
</style>
