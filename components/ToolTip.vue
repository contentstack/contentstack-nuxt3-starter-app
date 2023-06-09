<template>
  <div class="Tooltip-Wrapper" :onmouseenter="showTip" :onmouseleave="hideTip">
    <slot />
    <div ref="toolTipRef" class="Tooltip-Tip top none">{{ toolTipContext }}</div>
  </div>
</template>

<script setup lang="tsx">
const toolTipContext = ref<String>("");
const props = defineProps(["content"]);
const toolTipRef = ref<HTMLDivElement>();
const showTip = () => {
  toolTipRef.value && (toolTipRef.value.style.display = "block");
};
const hideTip = () => {
  toolTipRef.value && (toolTipRef.value.style.display = "none");
};
watchEffect(()=>{
  toolTipContext.value = props.content
})
</script>
