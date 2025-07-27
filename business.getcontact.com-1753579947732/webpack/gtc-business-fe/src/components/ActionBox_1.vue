<template>
  <div
    data-test="action-box"
    :class="[
      'action-box',
      isVertical ? 'vertical' : 'horizontal',
      {
        'bg-blue-200': color === 'blue',
        'bg-purple-100': color === 'purple',
        'bg-green-100': color === 'green',
        'bg-yellow-300': color === 'yellow',
        'md:p-14': !dense,
        dense,
        reversed: isReversed,
        disabled,
      },
    ]"
  >
    <div v-if="disabled" class="disabled-cover">
      <div>
        <img src="@/assets/images/svg/icons/alarm-clock-time.svg" />
        <h4>{{ disabledText }}</h4>
      </div>
    </div>
    <div class="action-box-inside">
      <div class="text-content">
        <div class="flex-2">
          <h3
            v-if="title"
            :class="[
              'text-[18px] font-bold mb-4 leading-[1.14]',
              {
                'text-blue-300': color === 'blue',
                'text-purple-500': color === 'purple',
                'text-green-500': color === 'green',
              },
            ]"
          >
            {{ title }}
          </h3>
          <div
            v-if="$slots.text"
            class="font-normal text-neutral-600 mb-0 text-sm"
          >
            <slot name="text" />
          </div>
        </div>

        <!-- DISABLED: User registration and package upgrade functionality -->
        <!-- <div
          v-if="Object.keys(button).length"
          class="action-button w-full mt-auto"
        >
          <GtcButton
            :disabled="!button.status"
            :theme="button.theme"
            class="mt-3 w-full lg:w-[320px] max-w-full"
            v-text="button.text"
            @click="button?.link ? $router.push(button.link) : button.click()"
          />
        </div> -->
      </div>
      <template v-if="$slots.image">
        <slot name="image" />
      </template>
      <!-- DISABLED: User registration and package upgrade functionality -->
      <!-- <div v-if="Object.keys(button).length" class="action-button w-full">
        <GtcButton
          :disabled="!button.status"
          :theme="button.theme"
          class="mt-1 w-full break-all !h-auto"
          v-text="button.text"
          @click="button?.link ? $router.push(button.link) : button.click()"
        />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import GtcButton from "./Button.vue";

defineProps({
  isVertical: {
    type: Boolean,
    default: true,
  },
  isReversed: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  disabledText: {
    type: String,
  },
  dense: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: "blue",
  },
  button: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style>
.action-box {
  @apply rounded-3xl relative flex p-[24px];
}
.action-box .disabled-cover {
  @apply absolute flex top-0 left-0 h-full w-full z-10;
}
.action-box .disabled-cover > div {
  @apply m-auto flex items-center flex-col;
}
.action-box .disabled-cover img {
  @apply w-14 pb-2;
}
.action-box .action-box-inside {
  @apply flex-1 flex justify-between flex-col;
}
.action-box.vertical .action-box-inside {
  @apply justify-between items-start;
}
.action-box.horizontal .action-box-inside {
  @apply lg:flex-row;
}
.action-box.disabled .action-box-inside {
  @apply blur-sm select-none opacity-30;
}
.action-box.reversed .action-box-inside {
  @apply flex-col-reverse lg:flex-row;
}
.action-box .action-box-inside > .text-content {
  @apply flex flex-col flex-nowrap;
}
.action-box.horizontal .action-box-inside > .text-content {
  @apply flex-1 md:pr-6;
}
.action-box.vertical .action-box-inside > .text-content > .action-button {
  @apply hidden;
}
.action-box.horizontal .action-box-inside > .text-content > .action-button {
  @apply block;
}
.action-box.vertical .action-box-inside > .action-button {
  @apply block;
}
.action-box.horizontal .action-box-inside > .action-button {
  @apply hidden;
}
</style>
