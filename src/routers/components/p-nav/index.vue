<template lang="pug">
el-menu.pos-f.p-nav.z-index-999(mode="horizontal" :router="true" :default-active="active")
	el-menu-item(index="/url2qrcode") 生成二维码
	el-menu-item(index="/img2base64") 图片转base64
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'

export default defineComponent({
	name: 'p-nav',
	setup() {
		const state = reactive({ active: '' })
		onMounted(() => {
			state.active = location.hash.replace('#', '')
		})
		return { ...toRefs(state) }
	},
})
</script>
<style lang="scss" scoped>
.p-nav {
	width: 100%;
}
</style>
