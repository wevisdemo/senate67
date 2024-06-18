<script setup lang="ts">
const DEFAULT_AVATAR = "/example-candidate-image.svg";

defineProps<{
	section?: string;
	name: string;
	alias?: string;
	avatar?: string;
	isUnknownCandidate?: boolean;
}>();
</script>

<template>
	<div
		class="flex gap-2"
		:class="section == 'details' ? 'flex-col' : 'flex-col sm:flex-row'"
	>
		<img
			v-if="!isUnknownCandidate"
			:src="avatar || DEFAULT_AVATAR"
			class="max-w-[60px] sm:max-w-[130px] w-full object-cover rounded-full"
			loading="lazy"
		/>
		<div>
			<h1 class="heading-responsive-02 text-neutral pb-3 leading-10">
				{{ name }}
			</h1>
			<p v-if="isUnknownCandidate" class="body-03 text-accent">
				ยังไม่ได้แสดงจุดยืน
			</p>
			<p v-else-if="alias" class="body-03">({{ alias }})</p>
		</div>
	</div>
</template>
