<template>
  <footer class="footer-container">
    <div class="footer-box">
      <a
        href="https://www.getcontact.com"
        target="_blank"
        rel="nofollow"
        class="block md:mb-6.5 mb-14.5">
        <img
          src="../../assets/images/logo-white.svg"
          class="md:mx-0 mx-auto"
          loading="lazy"
          alt="" />
      </a>
      <div
        class="md:mb-10 flex md:flex-row flex-col items-start md:justify-between justify-center">
        <div class="item">
          <div class="title">
            {{ $t("Getcontact") }}
          </div>
          <div class="list">
            <a
              href="https://www.getcontact.com/features"
              target="_blank"
              rel="nofollow">
              {{ $t("Features") }}
            </a>
            <a
              href="https://premium.getcontact.com/"
              target="_blank"
              rel="nofollow">
              {{ $t("Premium ve Tariffs") }}
            </a>
            <a
              href="https://web.getcontact.com/"
              target="_blank"
              rel="nofollow">
              {{ $t("Getcontact Web") }}
            </a>
            <a
              href="https://www.getcontact.com/stories"
              target="_blank"
              rel="nofollow">
              {{ $t("Success Story") }}
            </a>
            <a
              href="https://www.getcontact.com/about"
              target="_blank"
              rel="nofollow">
              {{ $t("About Us") }}
            </a>
            <a
              href="https://www.getcontact.com/career"
              target="_blank"
              rel="nofollow">
              {{ $t("Career") }}
            </a>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("Help") }}
          </div>
          <div class="list">
            <a
              href="https://gtcesim.faq.desk360.com/"
              target="_blank"
              rel="nofollow">
              {{ $t("Support Center") }}
            </a>
            <a
              href="https://www.getcontact.com/manage"
              target="_blank"
              rel="nofollow">
              {{ $t("Manage Profile Privacy") }}
            </a>
            <a
              href="https://www.getcontact.com/send-report"
              target="_blank"
              rel="nofollow">
              {{ $t("Report a Problem") }}
            </a>
            <a
              href="https://www.getcontact.com/contact"
              target="_blank"
              rel="nofollow">
              {{ $t("Contact Us") }}
            </a>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("Legal Terms") }}
          </div>
          <div class="list">
            <a
              href="https://www.getcontact.com/privacy-overview"
              target="_blank"
              rel="nofollow">
              {{ $t("Privacy Policy / GDPR") }}
            </a>
            <a
              href="https://www.getcontact.com/terms"
              target="_blank"
              rel="nofollow">
              {{ $t("Terms of Service") }}
            </a>
            <a
              href="https://www.getcontact.com/purchases-policy"
              target="_blank"
              rel="nofollow">
              {{ $t("Purchasing Policy") }}
            </a>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("Email") }}
          </div>
          <div class="list">
            <a href="mailto:info@getcontact.com">info@getcontact.com</a>
            <a href="mailto:sales@getcontact.com">sales@getcontact.com</a>
          </div>
        </div>
        <div class="item md:block hidden">
          <div class="title">
            {{ $t("Follow") }}
          </div>
          <div class="flex items-center">
            <a
              href="https://www.facebook.com/getcontactapp"
              target="_blank"
              rel="nofollow"
              class="social-icon">
              <img
                src="../../assets/icons/facebook-tertiary-icon.svg"
                loading="lazy"
                alt="" />
            </a>
            <a
              href="https://twitter.com/getcontact"
              target="_blank"
              rel="nofollow"
              class="social-icon">
              <img
                src="../../assets/icons/twitter-tertiary-icon.svg"
                loading="lazy"
                alt="" />
            </a>
            <a
              href="https://www.instagram.com/getcontact/"
              target="_blank"
              rel="nofollow"
              class="social-icon">
              <img
                src="../../assets/icons/instagram-tertiary-icon.svg"
                loading="lazy"
                alt="" />
            </a>
            <a
              href="https://www.linkedin.com/company/getcontact/"
              target="_blank"
              rel="nofollow"
              class="social-icon">
              <img
                src="../../assets/icons/linkedin-tertiary-icon.svg"
                loading="lazy"
                alt="" />
            </a>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <LanguageDropdown
          reverse
          title-white
          dropdown-menu-position-class="origin-top-right bottom-8 -left-4"
          class="md:flex hidden" />
        <div class="copyright-text">
          {{ $t("footer.copyright") }}
        </div>
      </div>
    </div>
  </footer>
  <div
      class="flex bg-white-100 justify-center align-middle py-1"
      v-if="cardLogo"
    >
      <img
        alt="Visa"
        :src="require('@/assets/images/footer-logos/visa-logo.svg')"
      />
      <img
        alt="Mastercard"
        :src="require('@/assets/images/footer-logos/mastercard-logo.svg')"
      /><img
        alt="MNP"
        :src="require('@/assets/images/footer-logos/mnp-logo.svg')"
      />
    </div>
</template>

<script>
import LanguageDropdown from "@/components/Common/LanguageDropdown"

export default {
  name: "Footer",
  components: { LanguageDropdown },
  props: {
    cardLogo: {
      type: Boolean,
      default: false,
    },
  },
}

</script>

<style lang="scss" scoped>
.footer-container {
  @apply bg-tertiary md:pb-15 pb-7.5 md:pt-12 pt-10;

  .footer-box {
    @apply pt-1.5 max-w-screen-xl mx-auto lg:px-10 px-5;

    .item {
      @apply md:text-left text-center w-full md:mb-0 mb-7.5;

      &:not(:last-child) {
        @apply md:pr-4 xl:pr-0;
      }

      [dir="rtl"] & {
        @apply md:text-right;
      }

      .title {
        @apply font-bold text-base leading-6 text-white mb-17px;
      }

      .list {
        @apply text-sm leading-8 text-white;

        a {
          @apply block;
        }
      }

      .social-icon {
        &:not(:last-child) {
          @apply ltr:mr-3.5 rtl:ml-3.5;
        }
      }
    }

    .footer-copyright {
      @apply flex items-center justify-between pt-17px border-t border-dim-gray-secondary;

      .copyright-text {
        @apply text-sm text-metallic-silver opacity-50 md:text-left text-center;

        letter-spacing: 0.75px;
      }
    }
  }
}
</style>
