<script setup lang="ts">
import { type Candidate } from "../../data/candidate";

defineProps<{
	section?: string;
	contacts: Candidate["contacts"];
}>();
</script>

<template>
	<div
		class="flex px-2 gap-1 flex-col"
		:class="[section == 'details' ? 'sm:flex-row justify-between ' : 'pt-2']"
	>
		<div class="flex items-center" v-if="contacts.facebookUrl">
			<img src="/facebook-icon.svg" class="inline pr-2" />
			<p class="body-03 break-all">{{ contacts.facebookUrl }}</p>
		</div>
		<div class="flex items-center" v-if="contacts.xUrl">
			<img src="/x-icon.svg" class="inline pr-2" />
			<p class="body-03 break-all">{{ contacts.xUrl }}</p>
		</div>
		<div class="flex items-center" v-if="contacts.phoneNumber">
			<img src="/phone-icon.svg" class="inline pr-2" />
			<span class="body-03 break-all">{{ contacts.phoneNumber }}</span>
		</div>
		<div class="flex items-center" v-if="contacts.email">
			<img src="/email-icon.svg" class="inline pr-2" />
			<div>
				<p class="body-03 break-all">{{ contacts.email }}</p>
			</div>
		</div>
	</div>
</template>
