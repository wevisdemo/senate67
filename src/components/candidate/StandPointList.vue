<script setup lang="ts">
import type { PoliticalStance } from "../../data/candidate";

const props = defineProps<{
	standpoints: PoliticalStance[];
}>();
</script>

<template>
	<div
		class="flex gap-2 border-b border-b-base-300 py-1 items-center"
		v-for="item in props.standpoints"
	>
		<div class="basis-2/6 sm:basis-1/6">
			<div
				:class="
					item.answer == 'agree'
						? 'bg-info'
						: item.answer == 'disagree'
							? 'bg-accent'
							: 'bg-base-200'
				"
				class="text-center p-1 rounded-sm"
			>
				<p class="body-03" v-if="item.answer == 'agree'">เห็นด้วย</p>
				<p class="body-03" v-else-if="item.answer == 'disagree'">ไม่เห็นด้วย</p>
				<p class="body-03" v-else-if="item.answer == 'to be considered'">
					พร้อมพิจารณา
				</p>
				<p class="body-03" v-else>ไม่พร้อมเปิดเผยต่อสาธารณะ</p>
			</div>
		</div>
		<div class="basis-4/6 sm:basis-5/6">
			<p class="body-01">
				{{ item.statement }}
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
