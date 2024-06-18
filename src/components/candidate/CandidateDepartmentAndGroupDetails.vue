<script lang="ts" setup>
import { ApplicationGroup } from "../../data/application_group";

defineProps<{
	application: ApplicationGroup;
	number?: number;
}>();
</script>

<template>
	<div class="rounded-[10px] flex flex-col h-full text-center">
		<div
			class="bg-secondary p-3 flex-1 flex items-center justify-center flex-col rounded-t-lg"
		>
			<p class="body-03 font-bold">{{ application.province }}</p>
			<p v-if="!number" class="body-03">เขต{{ application.district }}</p>
		</div>
		<div
			class="bg-primary text-secondary p-3 flex-1 flex flex-col items-center justify-center rounded-b-lg"
		>
			<p class="body-03 font-bold">{{ application.group }}</p>
			<p v-if="number" class="heading-responsive-03 font-bold">{{ number }}</p>
		</div>
	</div>
</template>
