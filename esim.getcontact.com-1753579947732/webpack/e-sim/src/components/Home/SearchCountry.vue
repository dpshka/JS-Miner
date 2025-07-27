<template>
  <div
    v-click-outside="hideDropdownMenu"
    class="search-box"
    :class="{ 'show-result': showDropdown && searchCountries.length }">
    <SearchInput
      placeholder="Search your destination"
      @update="filterCountries($event, true)"
      @focus="focusInput" />
    <div v-show="showDropdown && searchCountries.length" class="search-result">
      <div v-show="filteredCountries.length" class="search-result-box">
        <TransitionGroup name="list">
          <router-link
            v-for="(country, key) in filteredCountries"
            :to="{
              name: 'Country Packages',
              params: { country: country.id },
            }"
            :key="key"
            @click="$emit('select-country', country)"
            class="item">
            <CountryItem :country="country.id" class="w-full" />
          </router-link>
        </TransitionGroup>
      </div>

      <div
        v-show="!filteredCountries.length && searchCountries.length"
        class="empty-state">
        <img
          src="../../assets/icons/empty-state-icon.svg"
          alt=""
          class="icon" />
        <div class="text">{{ $t("search-country.empty-state-text") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CountryItem from "@/components/Common/CountryItem"
import DropdownAction from "@/mixins/DropdownAction"
import SearchInput from "@/components/Common/SearchInput"
import FilterCountries from "@/mixins/FilterCountries"
export default {
  name: "SearchCountry",
  mixins: [DropdownAction, FilterCountries],
  components: { SearchInput, CountryItem },
  data() {
    return {
      inputElement: ".search-input",
    }
  },
  methods: {
    focusInput() {
      if (window.innerWidth < 768) {
        window.scrollTo(0, 100)
      }

      this.showDropdownMenu()
    },
  },
}
</script>

<style lang="scss" scoped>
.search-box {
  @apply relative bg-white md:mb-15 mb-8;

  &:not(.show-result) {
    @apply rounded-100px;
  }
  &.show-result {
    @apply rounded-t-22px;

    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }

  .search-result {
    @apply absolute z-10 bg-white border-t border-anti-flash md:pt-5 md:pb-7 py-15px w-full rounded-b-22px;

    transition: max-height 0.3s ease-in-out;
    border-radius: 0 0 22px 22px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    .search-result-box {
      .item {
        @apply block px-5;

        &:not(:last-child) {
          @apply pb-4 mb-4 border-b border-anti-flash;
        }
      }
    }

    .empty-state {
      @apply flex items-center md:px-7 px-5 md:-mt-1 md:-mb-3 -my-2.5;

      .icon {
        @apply mr-4;
      }

      .text {
        @apply text-base leading-5 text-secondary;
      }
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-to {
  transform: translateX(-40px);
}

.list-enter-from {
  transform: translateY(40px);
}
</style>
