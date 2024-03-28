<script setup>
defineProps({
	section: String,
	contacts: Array || Object,
});
</script>

<template>
	<div
		class="flex px-2 gap-1 flex-col"
		:class="[section == 'details' ? 'sm:flex-row justify-between ' : 'pt-2']"
	>
		<div class="flex items-center" v-if="contacts.facebookUrl != ''">
			<img src="/facebook-icon.svg" class="inline pr-2" />
			<a
				:href="'https://www.' + contacts.facebookUrl"
				target="_blank"
				rel="noopener noreferrer"
				class="text-neutral underline body-03"
				>{{ contacts.facebookUrl }}</a
			>
		</div>
		<div class="flex items-center" v-if="contacts.xUrl != ''">
			<img src="/x-icon.svg" class="inline pr-2" />
			<a
				:href="'https://www.' + contacts.xUrl"
				target="_blank"
				rel="noopener noreferrer"
				class="text-neutral underline body-03"
				>{{ contacts.xUrl }}
			</a>
		</div>
		<div class="flex items-center" v-if="contacts.phoneNumber != ''">
			<img src="/phone-icon.svg" class="inline pr-2" />
			<span class="body-03">{{ contacts.phoneNumber }}</span>
		</div>
		<div class="flex items-center" v-if="contacts.email != ''">
			<img src="/email-icon.svg" class="inline pr-2" />
			<div>
				<p class="body-03 word-break">{{ contacts.email }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.word-break {
	word-break: break-word;
}
</style>
