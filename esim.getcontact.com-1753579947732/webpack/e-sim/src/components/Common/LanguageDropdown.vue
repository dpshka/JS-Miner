<template>
  <div class="dropdown" v-click-outside="hideDropdownMenu">
    <div
      class="flex items-center locale cursor-pointer"
      :class="{ 'flex-row-reverse': reverse }"
      @click="toggleDropdownMenu">
      <div
        class="title uppercase"
        :class="{
          'ltr:mr-2.5 rtl:ml-2.5': !reverse,
          'ltr:ml-2.5 rtl:mr-2.5': reverse,
          'text-raisin-black': !titleWhite,
          'text-white': titleWhite,
        }">
        {{ $i18n.locale }}
      </div>
      <LanguageIcon
        :fill-color="
          showDropdown
            ? 'fill-primary'
            : titleWhite
            ? 'fill-white'
            : 'fill-raisin-black'
        " />
    </div>
    <DropdownTransition>
      <div
        v-show="showDropdown"
        class="dropdown-menu"
        :class="dropdownMenuPositionClass">
        <CountryLanguageList />
      </div>
    </DropdownTransition>
  </div>
</template>

<script>
import DropdownAction from "@/mixins/DropdownAction"
import DropdownTransition from "@/components/Common/DropdownTransition"
import LanguageIcon from "@/components/Common/LanguageIcon"
import CountryLanguageList from "@/components/Navbar/CountryLanguageList"

export default {
  name: "LanguageDropdown",
  components: { CountryLanguageList, LanguageIcon, DropdownTransition },
  mixins: [DropdownAction],
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
    titleWhite: {
      type: Boolean,
      default: false,
    },
    dropdownMenuPositionClass: {
      type: String,
      default: "origin-top-right ltr:-right-4 rtl:-right-12 top-4",
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  @apply relative;

  .title {
    @apply text-15px leading-6;

    letter-spacing: -0.01px;
  }

  .dropdown-menu {
    @apply absolute mt-3 bg-white rounded-lg border border-azureish-secondary z-10 pt-5 pb-4 pl-2.5 pr-4;

    width: 154px;
  }

  &.show-triangle {
    .dropdown-menu {
      &:after,
      &:before {
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-top: 12px solid #ffffff;
        bottom: -12px;
        content: "";
        left: 32px;
        margin-left: -12px;
        position: absolute;

        [dir="rtl"] & {
          left: unset;
          right: 48px;
          margin-left: unset;
          margin-right: -12px;
        }
      }

      /* Styling for second triangle (border) */

      &:before {
        border-left: 14px solid transparent;
        border-right: 14px solid transparent;
        border-top: 14px solid;
        border-top-color: inherit; /* Can't be included in the shorthand to work */
        bottom: -14px;
        margin-left: -14px;

        [dir="rtl"] & {
          margin-left: unset;
          margin-right: -14px;
        }
      }
    }
  }
}
</style>
