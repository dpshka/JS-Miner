<template>
  <img
    v-if="!auth.loggedIn || !auth.user.profileImage"
    src="../../assets/icons/avatar-icon.svg"
    class="rounded-full"
    alt="" />
  <img v-else :src="auth.user.profileImage" class="rounded-full" alt="" />
</template>
