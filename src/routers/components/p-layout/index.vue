<template lang="pug">
p-nav
.p-container
	el-main.p-layout.pos-r
		slot
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PNav from '@/routers/components/p-nav/index.vue'
export default defineComponent({
	name: 'p-layout',
	components: { PNav },
})
</script>
<style lang="scss" scoped>
.p-container {
	padding-top: 60px;
}
.p-layout {
	min-height: 900px;
	padding: 20px 0;
	width: 840px;
	background-color: #e9e9e9;
	margin: 0 auto;
}
</style>
