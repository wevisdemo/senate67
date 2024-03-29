<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
	provinces: Object,
	districts: Object,
	occupations: Object,
});

const emit = defineEmits(["filter"]);

const district = props.districts;
const selectedProvince = ref("ทุกจังหวัด");
const selectedDistrict = ref("ทุกอำเภอ/เขต");
const selectedOccupation = ref("ทุกกลุ่มอาชีพ");
let selected_district_list = ref([]);

const onChangeDistrict = async () => {
	selected_district_list.value = [];
	if (selectedProvince.value != "ทุกจังหวัด")
		selected_district_list.value = district[selectedProvince.value];
	else selectedDistrict.value = "ทุกอำเภอ/เขต";

	emit(
		"filter",
		selectedProvince.value,
		selectedDistrict.value,
		selectedOccupation.value,
	);
};

watch(selectedProvince, async (newProvince, oldProvince) => {
	if (newProvince != oldProvince) selectedDistrict.value = "ทุกอำเภอ/เขต";
});
</script>

<template>
	<div
		class="flex space-y-[10px] sm:space-y-0 sm:space-x-[5px] flex-col sm:flex-row"
	>
		<select
			class="select w-full body-01"
			v-model="selectedProvince"
			@change="onChangeDistrict"
			:class="{ 'bg-secondary': selectedProvince != 'ทุกจังหวัด' }"
		>
			<option value="ทุกจังหวัด">ทุกจังหวัด</option>
			<option v-for="item in props.provinces" :value="item">
				{{ item }}
			</option>
		</select>

		<select
			:class="{ 'bg-secondary': selectedDistrict != 'ทุกอำเภอ/เขต' }"
			class="select w-full body-01"
			v-model="selectedDistrict"
			@change="
				$emit('filter', selectedProvince, selectedDistrict, selectedOccupation)
			"
		>
			<option value="ทุกอำเภอ/เขต">ทุกอำเภอ/เขต</option>
			<option v-for="item in selected_district_list" :value="item">
				{{ item }}
			</option>
		</select>

		<select
			:class="{ 'bg-secondary': selectedOccupation != 'ทุกกลุ่มอาชีพ' }"
			class="select w-full body-01"
			v-model="selectedOccupation"
			@change="
				$emit('filter', selectedProvince, selectedDistrict, selectedOccupation)
			"
		>
			<option value="ทุกกลุ่มอาชีพ">ทุกกลุ่มอาชีพ</option>
			<option v-for="item in props.occupations" :value="item">
				{{ item }}
			</option>
		</select>
	</div>
</template>

<style scoped>
select option {
	background-color: #ffffff !important;
}
</style>
