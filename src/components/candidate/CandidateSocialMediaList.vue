<script setup>
defineProps({
	section: String,
});
</script>

<template>
	<div
		class="flex px-2 gap-1 flex-col"
		:class="[section == 'details' ? 'sm:flex-row justify-between ' : 'pt-2']"
	>
		<div class="flex items-center">
			<img src="/facebook-icon.svg" class="inline pr-2" />
			<a
				href="http://"
				target="_blank"
				rel="noopener noreferrer"
				class="text-neutral underline body-03"
				>iLawClub</a
			>
		</div>
		<div class="flex items-center">
			<img src="/x-icon.svg" class="inline pr-2" />
			<a
				href="http://"
				target="_blank"
				rel="noopener noreferrer"
				class="text-neutral underline body-03"
				>iLawClub
			</a>
		</div>
		<div class="flex items-center">
			<img src="/phone-icon.svg" class="inline pr-2" />
			<span class="body-03">0821234567</span>
		</div>
		<div class="flex items-center">
			<img src="/email-icon.svg" class="inline pr-2" />
			<div>
				<p class="body-03 word-break">ilawilawilaw@gmail.com</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.word-break {
	word-break: break-word;
}
</style>
