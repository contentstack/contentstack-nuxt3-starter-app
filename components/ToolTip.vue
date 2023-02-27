<template>
  <div class="Tooltip-Wrapper" :onmouseenter="showTip" :onmouseleave="hideTip">
    <slot />
    <div ref="toolTipRef" class="Tooltip-Tip top none">{{ content }}</div>
  </div>
</template>

<script setup></script>

<script setup lang="ts">
const props = defineProps(["content"]);
const toolTipRef = ref(null);
const showTip = () => {
  toolTipRef.value.style.display = "block";
};
const hideTip = () => {
  toolTipRef.value.style.display = "none";
};

</script>

<style></style>
