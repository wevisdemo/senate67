<script setup>
defineProps({
	section: String,
	name: String,
	alias: String,
});
</script>

<template>
	<div
		class="flex gap-2"
		:class="[section == 'details' ? 'flex-col' : 'sm:flex-row']"
	>
		<img
			src="/example-candidate-image.svg"
			class="max-w-[60px] sm:max-w-[130px]"
			alt=""
		/>
		<div>
			<h1 class="heading-responsive-02 text-neutral pb-3 leading-10">
				{{ name }}
			</h1>
			<p class="body-03">({{ alias }})</p>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
