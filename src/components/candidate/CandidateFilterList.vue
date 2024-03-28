<script setup>
const props = defineProps({
	provinces: Array || Object,
	districts: Array || Object,
	occupations: Array || Object,
});

const district = props.districts;
let selectedProvince = "ทุกจังหวัด";
let selectedDistrict = "ทุกอำเภอ/เขต";
let selectedOccupation = "ทุกกลุ่มอาชีพ";
let selected_district_list = [];

function onChangeDistrict() {
	selected_district_list = [];
	if (selectedProvince != "ทุกจังหวัด")
		selected_district_list = district[selectedProvince];

	console.log(selected_district_list);
}
</script>

<template>
	<div
		class="flex space-y-[10px] sm:space-y-0 sm:space-x-[5px] flex-col sm:flex-row"
	>
		<select
			class="select w-full body-01"
			v-model="selectedProvince"
			@change="onChangeDistrict"
		>
			<option value="ทุกจังหวัด">ทุกจังหวัด</option>
			<option v-for="item in props.provinces" :value="item">
				{{ item }}
			</option></select
		>.

		<select class="select w-full body-01" v-model="selectedDistrict">
			<option value="ทุกอำเภอ/เขต">ทุกอำเภอ/เขต</option>
			<option v-for="item in selected_district_list" :value="item">
				{{ item }}
			</option>
		</select>

		<select class="select w-full body-01" v-model="selectedOccupation">
			<option value="ทุกกลุ่มอาชีพ">ทุกกลุ่มอาชีพ</option>
			<option v-for="item in props.occupations" :value="item">
				{{ item }}
			</option>
		</select>
	</div>
</template>

<style lang="scss" scoped></style>
