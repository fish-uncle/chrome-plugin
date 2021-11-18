<template lang="pug">
p-layout
	.img2base64-btn-box.fn-flex
		el-upload(action="" :on-change="changeImg" :auto-upload="false" :show-file-list="false")
			el-button(type="primary") 上传图片
	.img2base64-input-box.fn-flex.flex-row
		.img2base64-input.fn-flex.flex-column
			el-tag 
				span data url
				el-icon(@click="copy(base64)")
					document-copy
			el-input( v-model="base64" type="textarea" )
		.img2base64-input.fn-flex.flex-column
			el-tag 
				span css
				el-icon(@click="copy(css)")
					document-copy
			el-input( v-model="css" type="textarea" )
	.img2base64-img(v-if="base64")
		img(:src="base64")
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import PLayout from '@/routers/components/p-layout/index.vue'
import { DocumentCopy } from '@element-plus/icons'
import { copyText } from 'vue3-clipboard'
import { ElNotification } from 'element-plus'

export default defineComponent({
	name: 'img2base64',
	components: { PLayout, DocumentCopy },
	setup() {
		const state = reactive({ base64: '', css: '' })
		const changeImg = file => {
			const reader = new FileReader()
			reader.readAsDataURL(file.raw)
			reader.onload = () => {
				state.base64 = reader.result as string
				state.css = `background-image:url(${reader.result as string})`
			}
		}
		const copy = text => {
			copyText(text, undefined, error => {
				if (error) {
					ElNotification.success({ title: '复制失败' })
				} else {
					ElNotification.success({ title: '复制成功' })
				}
			})
		}
		return {
			...toRefs(state),
			changeImg,
			copy,
		}
	},
})
</script>
<style lang="scss" scoped>
.img2base64-img {
	padding: 20px;
	img {
		max-width: 100%;
	}
}
.img2base64-btn-box {
	align-items: center;
	justify-content: center;
}
.img2base64-input-box {
	padding: 20px;
}
.img2base64-input {
	flex: 1;
	margin-right: 10px;
	&::v-deep(.el-textarea__inner) {
		height: 200px;
	}
	&:last-child {
		margin-right: 0;
	}
}
</style>
