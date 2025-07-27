<template>
  <button class="user-title" @click="$emit('clicked')">
    <UserAvatar class="avatar" />
    <span class="title" v-if="auth.user.name">
      {{ auth.user.name }}
      {{
        auth.user.surname && auth.user.surname.length
          ? auth.user.surname.charAt(0)
          : ""
      }}.
    </span>
    <span class="title" v-else>
      {{ auth.user.email.split("@")[0] }}
    </span>
  </button>
</template>

<script>
import UserAvatar from "@/components/Common/UserAvatar"
export default {
  name: "UserTitle",
  components: { UserAvatar },
}
</script>

<style lang="scss" scoped>
.user-title {
  @apply flex items-center md:text-15px md:leading-4 text-xl leading-6 text-primary font-bold;

  .avatar {
    @apply ltr:mr-2.5 rtl:ml-2.5;

    @media (max-width: 768px) {
      @apply w-6 h-6;
    }
  }

  .title {
    @media (max-width: 768px) {
      word-break: break-word;
    }
  }
}
</style>
