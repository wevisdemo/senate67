<template>
	<h2>hello</h2>
	<AutoComplete
		:options="[
			{
				value: '1',
				label: 'Option 1',
			},
			{
				value: '2',
				label: 'Option 2',
			},
			{
				value: '3',
				label: 'Option 3',
			},
		]"
		:value="null"
		placeholder="Select an option"
		:disabled="false"
		@change="
			(v: string) => {
				value = v;
			}
		"
	/>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import AutoComplete from "./AutoComplete.vue";

const value = ref("");
</script>

<style scoped>
/* Add any scoped styles if necessary */
</style>
