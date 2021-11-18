<template lang="pug">
.form-item-list.fn-flex.flex-row
	.form-label {{  title  }}
	slot
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'p-form-item',
	props: {
		title: {
			type: String,
		},
	},
})
</script>
<style lang="scss" scoped>
.form-item-list {
	align-items: center;
	margin-bottom: 4px;
	&:last-child {
		margin-bottom: 0;
	}
	.form-label {
		margin-right: 10px;
	}
}
</style>
