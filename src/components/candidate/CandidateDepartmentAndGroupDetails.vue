<template>
	<div class="rounded-[10px] flex flex-col h-full text-center">
		<div
			class="bg-secondary px-3 flex-1 flex items-center justify-center flex-col rounded-t-lg"
		>
			<p class="body-03 font-bold">{{ application.province }}</p>
			<p class="body-03">เขต{{ application.district }}</p>
		</div>
		<div
			class="bg-primary text-secondary px-3 flex-1 flex items-center justify-center rounded-b-lg"
		>
			<p class="body-03 font-bold">{{ application.group }}</p>
		</div>
	</div>
</template>

<script setup>
defineProps({
	application: Object,
});
</script>

<style lang="scss" scoped></style>
