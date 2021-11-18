<template lang="pug">
p-layout
	.url2qrcode.fn-flex.flex-row
		.url2qrcode-canvas1.fn-flex.flex-column
			#url2qrcode-canvas1
			.url2qrcode-btn-box.fn-flex.flex-row
				el-button(@click="download('url2qrcode-canvas1')") 保存图片
		.url2qrcode-canvas2.fn-flex.flex-column
			#url2qrcode-canvas2
			.url2qrcode-btn-box.fn-flex.flex-row
				el-button(@click="download('url2qrcode-canvas2')") 保存图片
	.url2qrcode-url-box.fn-flex.flex-column
		.url2qrcode-label.fn-flex.flex-row
			h2 输入文字
			span 即时输入即时生成!
		el-input(v-model="url" type="textarea" :rows="4" @input="changeQrcode")
		el-tabs
			el-tab-pane(label="颜色选择")
				p-form-item(title="背景色")
					el-color-picker(v-model="colorLight" :show-alpha="true" @change="changeQrcode" color-format="hex" size="small")
				p-form-item(title="是否多色")
					el-switch(v-model="colorful" @change="changeQrcode" size="small")
				p-form-item(title="前景色" v-if="colorful")
					.url2qrcode-del-color-box.pos-r(v-for="(item,index) in dotColors")
						el-color-picker(:modelValue="item" :show-alpha="true" @change="value=>updateColor(value,index)" color-format="hex" size="small")
						.pos-a.url2qrcode-del-color.cursor-pointer(@click="delColor(index)" v-if="dotColors.length>1") -
					el-button(size="mini"  @click="addColor") +
				p-form-item(title="前景色" v-else)
					.url2qrcode-del-color-box
						el-color-picker(v-model="colorDark" :show-alpha="true" @change="changeQrcode" color-format="hex" size="small")
			el-tab-pane(label="嵌入logo")
				p-form-item(title="logo宽度")
					el-input-number(v-model="imgWidth" size="mini" @input="changeQrcode")
				p-form-item(title="logo高度")
					el-input-number(v-model="imgHeight" size="mini" @input="changeQrcode")
				p-form-item(title="图片")
					el-upload(action="" :on-change="changeImg" :auto-upload="false" :show-file-list="false")
						el-button(size="mini" type="primary") 上传图片
					el-button(size="mini" @click="changeImg('')" :style="{marginLeft:'10px'}") 清空图片
			el-tab-pane(label="其他设置")
				p-form-item(title="宽度")
					el-input-number(v-model="width" size="mini" @input="changeQrcode")
				p-form-item(title="高度")
					el-input-number(v-model="height" size="mini" @input="changeQrcode")
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import init from './init'
import { getQueryString } from '@/routers/utils'
import PLayout from '@/routers/components/p-layout/index.vue'
import PFormItem from '@/routers/components/p-form-item/index.vue'

export default defineComponent({
	name: 'url2qrcode',
	components: { PFormItem, PLayout },
	setup() {
		const state = reactive({
			url: 'hello world',
			colorful: false,
			colorLight: 'rgba(255,255,255,0)',
			colorDark: '#000',
			dotColors: ['#67C23A', '#E6A23C', '#F56C6C', '#409EFF'],
			imageUrl: '',
			width: 300,
			height: 300,
			imgWidth: 50,
			imgHeight: 50,
		})
		const updateColor = (value, index) => {
			state.dotColors[index] = value
			init(state)
		}
		const addColor = () => {
			state.dotColors.push('#000')
			init(state)
		}
		const delColor = index => {
			state.dotColors.splice(index, 1)
			init(state)
		}
		const download = id => {
			const can = document.getElementById(id).firstChild as HTMLCanvasElement
			const img = can.toDataURL('image/png')
			const a = document.createElement('a')
			const event = new MouseEvent('click')
			a.download = +new Date() + '.png'
			a.href = img
			a.dispatchEvent(event)
		}
		const changeImg = file => {
			if (file) {
				const reader = new FileReader()
				reader.readAsDataURL(file.raw)
				reader.onload = () => {
					state.imageUrl = reader.result as string
					init(state)
				}
			} else {
				state.imageUrl = ''
				init(state)
			}
		}
		onMounted(() => {
			const url = getQueryString('url')
			if (url) state.url = url
			init(state)
		})

		return {
			...toRefs(state),
			changeQrcode: () => init(state),
			updateColor,
			addColor,
			delColor,
			changeImg,
			download,
		}
	},
})
</script>
<style lang="scss" scoped>
.url2qrcode {
	padding: 20px;
}
.url2qrcode-canvas1,
.url2qrcode-canvas2 {
	flex: 1;
	#url2qrcode-canvas1,
	#url2qrcode-canvas2 {
		margin: 0 auto;
	}
	&::v-deep(canvas) {
		display: none !important;
	}
	&::v-deep(img) {
		max-width: 300px !important;
		max-height: 300px !important;
		display: block !important;
	}
}
.url2qrcode-url-box {
	padding: 20px;
	.url2qrcode-label {
		align-items: center;
		height: 50px;
		line-height: 50px;
		span {
			color: #999;
			margin-left: auto;
		}
	}
	&::v-deep(.el-textarea__inner) {
		height: 100px;
	}
}
.url2qrcode-del-color-box {
	.url2qrcode-del-color {
		right: 1px;
		top: -2px;
		display: none;
		background-color: #f56c6c;
		color: #fff;
		border-radius: 10px;
		padding: 0 2px;
		font-size: 12px;
		line-height: 12px;
	}
	&:hover {
		.url2qrcode-del-color {
			display: block;
		}
	}
}
.url2qrcode-color-box {
	margin-top: 20px;
	width: 340px;
	padding: 0 20px;
}
.url2qrcode-btn-box {
	margin-top: 20px;
	padding: 0 20px;
	justify-content: center;
}
</style>
