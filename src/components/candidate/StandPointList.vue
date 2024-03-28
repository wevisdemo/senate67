<script setup>
const standpoint_list = [
	{
		status: "pass",
		name: "เขียนรัฐธรรมนูญใหม่ “ทั้งฉบับ”",
	},
	{
		status: "fail",
		name: "เขียนรัฐธรรมนูญใหม่ แต่ยกเว้นหมวด 1 หมวด 2",
	},
	{
		status: "ready",
		name: "ยกเลิกกฎหมายปราบปรามการค้าประเวณี",
	},
];

defineProps({
	standpoint_list: Array || Object,
});
</script>

<template>
	<div
		class="flex gap-2 border-b border-b-base-300 py-1 items-center"
		v-for="item in standpoint_list"
	>
		<div class="basis-2/6 sm:basis-1/6">
			<div
				:class="{
					'bg-info': item.status == 'pass',
					'bg-accent': item.status == 'fail',
					'bg-base-200': item.status == 'ready',
				}"
				class="text-center p-1 rounded-sm"
			>
				<p class="body-03" v-if="item.status == 'pass'">เห็นด้วย</p>
				<p class="body-03" v-else-if="item.status == 'fail'">ไม่เห็นด้วย</p>
				<p class="body-03" v-else>พร้อมพิจารณา</p>
			</div>
		</div>
		<div class="basis-4/6 sm:basis-5/6">
			<p class="body-03">
				{{ item.name }}
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
