<script lang="ts" setup>
useHead({
  titleTemplate: (title?: string) => title ? `${title} ${APP_TITLE_SEPARATOR} ${APP_NAME}` : APP_NAME,
})
</script>

<template>
  <reka-config-provider :scroll-body="false" :use-id="() => useId()" dir="ltr" locale="ko">
    <slot />
  </reka-config-provider>
</template>
