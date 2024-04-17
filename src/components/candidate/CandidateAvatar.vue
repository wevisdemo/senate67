<script setup>
defineProps({
	section: String,
	name: String,
	alias: String,
	avatar: String,
});
</script>

<template>
	<div
		class="flex gap-2"
		:class="section == 'details' ? 'flex-col' : 'flex-col sm:flex-row'"
	>
		<img
			:src="avatar"
			class="max-w-[60px] sm:max-w-[130px] w-full object-cover rounded-full"
			loading="lazy"
		/>
		<div>
			<h1 class="heading-responsive-02 text-neutral pb-3 leading-10">
				{{ name }}
			</h1>
			<p class="body-03" v-if="alias">({{ alias }})</p>
		</div>
	</div>
</template>
