<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

const props = defineProps({
	standpoints: Object,
	section: String,
});

const standpoints_list = ref([]);

const default_standpoints = [
	"เขียนรัฐธรรมนูญใหม่ “ทั้งฉบับ”",
	"เขียนรัฐธรรมนูญใหม่ แต่ยกเว้นหมวด 1 หมวด 2",
	"ให้มีสภาร่างรัฐธรรมนูญ (สสร.) ใหม่ จากการเลือกตั้ง100%",
	"ยกเลิกสว. ใช้ระบบสภาเดี่ยว",
	"นิรโทษกรรมคดีการเมือง “ทุกคดี”",
];

const getStandPointData = async () => {
	if (props.section == "details") {
		props.standpoints.forEach((standpoints) => {
			standpoints_list.value.push(standpoints);
		});
	} else {
		props.standpoints.forEach((standpoints) => {
			default_standpoints.forEach((default_standpoints) => {
				if (standpoints.statement == default_standpoints)
					standpoints_list.value.push(standpoints);
			});
		});
	}
};

onBeforeMount(() => {
	getStandPointData();
});
</script>

<template>
	<div
		class="flex gap-2 border-b border-b-base-300 py-1 items-center"
		v-for="item in standpoints_list"
	>
		<div class="basis-2/6 sm:basis-1/6">
			<div
				:class="{
					'bg-info': item.answer == 'agree',
					'bg-accent': item.answer == 'disagree',
					'bg-base-200': item.answer == 'to be considered',
				}"
				class="text-center p-1 rounded-sm"
			>
				<p class="body-03" v-if="item.answer == 'agree'">เห็นด้วย</p>
				<p class="body-03" v-else-if="item.answer == 'disagree'">ไม่เห็นด้วย</p>
				<p class="body-03" v-else>พร้อมพิจารณา</p>
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
