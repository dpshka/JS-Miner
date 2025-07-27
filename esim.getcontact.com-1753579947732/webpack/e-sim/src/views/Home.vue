<template>
  <div class="home pb-15">
    <h1 class="text-center font-bold md:mb-7.5 mb-8 px-2">
      {{
        $t(
          "Data without border at yourfingertips {quantity} Travel destinations",
          { quantity: countries.length }
        )
      }}
    </h1>
    <Modal identifier="esimio" :show="esimioModal">
      <div class="modal-content max-w-[400px]">
        <img
          src="@/assets/images/esimio-banner.svg"
          alt=""
          class="w-[80%] m-auto" />
        <h2
          class="text-center text-xl font-semibold mt-4 w-2/3 m-auto"
          v-html="
            $t(
              'This plan can only be purchased through the <b>eSIM io<\/b> mobile application.'
            )
          " />
        <div
          class="text-center my-3 p-2 rounded-lg text-sm bg-[#F5F8FB] text-secondary"
          v-html="
            $t(
              '<b>eSIM.getcontact.com<\/b> service is available in the <b>eSIM.io<\/b> application.'
            )
          " />
        <p
          class="text-center text-sm font-bold"
          v-html="$t('Scan the code to download the eSIM.io application.')" />
        <img
          src="@/assets/images/esimio-QR.png"
          alt=""
          class="w-[150px] m-auto" />
        <button
          @click="go2Application"
          class="bg-primary block w-full font-bold text-white rounded-lg px-4 py-4 mt-3">
          {{ $t("Go to the application") }}
        </button>
      </div>
    </Modal>
    <div class="max-w-default mx-auto">
      <Banner v-if="bannerConfig" :data="bannerConfig" />
      <SearchCountry :countries="countries" @select-country="sendEvent" />
      <div class="countries-box">
        <h2 class="md:mb-5 mb-6 font-bold">
          {{ $t("Countries") }}
        </h2>
        <Transition name="fade" mode="out-in">
          <div v-if="!loading" class="list-box">
            <router-link
              v-for="(country, key) in countries"
              :to="{
                name: 'Country Packages',
                params: { country: country.id },
              }"
              :key="key"
              class="item"
              @click="sendEvent(country)">
              <CountryItem :country="country.id" />
              <ArrowRightIcon />
            </router-link>
          </div>
          <Loading v-else :loading="loading" class="loading-box" />
        </Transition>
      </div>
      <div class="download-app-box">
        <div class="md:py-12.5 pt-8.5">
          <h2 class="title">
            {{
              $t(
                "Download Getcontact to manage and top up your eSIM anytime, anywhere"
              )
            }}
          </h2>
          <div
            class="flex justify-center items-center md:space-x-[15px] space-x-2">
            <a
              href="https://itunes.apple.com/app/getcontact-app/id1010631459?mt=8"
              target="_blank"
              rel="nofollow">
              <img src="../assets/images/apple-store.svg" alt="" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=app.source.getcontact"
              target="_blank"
              rel="nofollow">
              <img src="../assets/images/play-store.svg" alt="" />
            </a>
            <a
              href="https://appgallery.cloud.huawei.com/marketshare/app/C100903721"
              target="_blank"
              rel="nofollow">
              <img src="../assets/images/app-gallery.svg" alt="" />
            </a>
          </div>
        </div>
        <picture class="download-app-picture">
          <source
            srcset="../assets/images/download-app-vector.webp"
            type="image/webp" />
          <img src="../assets/images/download-app-vector.png" alt="" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Common/Modal"
import SearchCountry from "@/components/Home/SearchCountry"
import Banner from "@/components/Home/Banner"
import CountryItem from "@/components/Common/CountryItem"
import ArrowRightIcon from "@/components/Common/ArrowRightIcon"
import CountryAction from "@/mixins/CountryAction"
import Loading from "@/components/Common/Loading"
import useHelpers from "@/utils/useHelpers"

export default {
  name: "Home",
  mixins: [CountryAction],
  components: {
    Loading,
    ArrowRightIcon,
    CountryItem,
    SearchCountry,
    Banner,
    Modal,
  },
  data() {
    return {
      loading: true,
      esimioModal: false,
    }
  },
  async mounted() {
    this.esimioModal = true
    let locale = this.$route.params.locale
    const languages = this.$store.state.languages
    if (locale) {
      if (!languages.find(item => item.id === locale)) {
        locale = "en"

        this.$router.push("/en")
      }

      localStorage.setItem("language", locale)

      this.$root.$i18n.locale = locale
    }

    await this.getCountries()

    this.loading = false
  },
  methods: {
    sendEvent(country) {
      if (process.env.VUE_APP_GTM_ENABLED) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "GAEvent",
          eventCategory: "Click",
          eventAction: "Selected Country",
          eventLabel: country.code,
        })

        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "countryClick",
          countryName: country.code,
        })
      }
    },
    go2Application() {
      const { isMobile, isAndroid, isHuawei, isIOS } = useHelpers

      if (!isMobile) {
        window.location.href = "https://esim.io"
      } else {
        let redirectUrl

        switch (true) {
          case isAndroid:
            redirectUrl =
              "https://play.google.com/store/apps/details?id=io.esim"
            break
          case isIOS:
            redirectUrl = "https://apps.apple.com/us/app/esimio/id6473276045"
            break
          case isHuawei:
            redirectUrl = "https://esim.io"
            break
        }

        window.location.href = redirectUrl
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  @apply mx-auto mt-15 max-w-container md:px-0 px-4;

  .countries-box {
    @apply relative mb-15;

    .loading-box {
      @apply relative md:h-[520px] h-[380px];
    }

    .list-box {
      .item {
        @apply flex items-center justify-between bg-white rounded-lg md:py-5 px-5 py-2.5;

        &:not(:last-child) {
          @apply md:mb-15px mb-3.5;
        }
      }
    }
  }

  .download-app-box {
    @apply flex md:flex-row flex-col-reverse items-center rounded-lg bg-white md:pl-10 md:pr-5 md:pb-0 pt-5 pb-5 md:px-6.5 px-4;

    [dir="rtl"] & {
      @apply md:pl-5 md:pr-10;
    }

    .title {
      @apply font-bold md:mb-15px md:mr-15px mb-12;

      [dir="rtl"] & {
        @apply md:mr-0 md:ml-15px;
      }
    }

    .download-app-picture {
      @apply w-full;

      max-width: 268px;
    }
  }
  .modal-content {
    @apply p-5 pb-7 pr-2.5 max-w-[540px] min-h-[354px];

    .close-btn {
      @apply absolute top-7 right-5;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
