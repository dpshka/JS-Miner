<template>
  <div class="user-content-box">
    <div class="img-box ltr:mr-2.5 rtl:ml-2.5">
      <UserAvatar />
    </div>

    <div>
      <div class="title">
        <span v-if="auth.user.name">
          {{ auth.user.name }} {{ auth.user.surname }}
        </span>
        <span v-else>
          {{ auth.user.email.split("@")[0] }}
        </span>
      </div>
      <div class="email">
        {{ auth.user.email }}
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/Common/UserAvatar"
export default {
  name: "UserBox",
  components: { UserAvatar },
}
</script>

<style lang="scss" scoped>
.user-content-box {
  @apply flex items-center md:p-5 md:border-b md:border-anti-flash-secondary;

  .img-box {
    @apply min-w-[24px] max-w-[34px];
  }

  .title {
    @apply font-medium text-primary text-sm leading-3.5 mb-1;

    @media (max-width: 768px) {
      word-break: break-word;
    }
  }

  .email {
    @apply text-10px leading-10px text-secondary-text;

    @media (max-width: 768px) {
      word-break: break-word;
    }
  }
}
</style>
