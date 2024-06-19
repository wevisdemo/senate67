<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed } from "vue";
import type { LocationMap } from "../../data/senate_option";
import type { ApplicationGroup } from "../../data/application_group";
import type { CandidateOverview, DropdownOption } from "../../data/candidate";
import AutoComplete from "./AutoComplete.vue";

const props = defineProps<{
	candidates: CandidateOverview[];
	provinces: string[];
	districts?: LocationMap;
	occupations: ApplicationGroup[];
	province_query: string;
	district_query: string;
	occupation_query: string;
}>();

const emit = defineEmits(["filter"]);

const selectedProvince = ref("ทุกจังหวัด");
const selectedDistrict = ref("ทุกอำเภอ/เขต");
const selectedOccupation = ref("ทุกกลุ่มอาชีพ");
let selected_district_list = ref<string[]>([]);

const onChangeDistrict = async () => {
	selected_district_list.value = [];
	if (props.districts && selectedProvince.value != "ทุกจังหวัด") {
		selected_district_list.value = props.districts[selectedProvince.value];

		nextTick(() => {
			selectedDistrict.value =
				props.district_query != "" ? props.district_query : "ทุกอำเภอ/เขต";
		});
	} else selectedDistrict.value = "ทุกอำเภอ/เขต";

	nextTick(() => {
		emit(
			"filter",
			selectedProvince.value,
			selectedDistrict.value,
			selectedOccupation.value,
			false,
		);
	});
};

const candidateOptions = computed(() =>
	props.candidates?.map((candidate) => ({
		value: candidate.id,
		label: candidate.firstName + " " + candidate.lastName,
		disabled: !("politicalStances" in candidate),
	})),
);

const clearFitler = () => {
	selectedProvince.value = "ทุกจังหวัด";
	selectedDistrict.value = "ทุกอำเภอ/เขต";
	selectedOccupation.value = "ทุกกลุ่มอาชีพ";

	emit(
		"filter",
		selectedProvince.value,
		selectedDistrict.value,
		selectedOccupation.value,
		true,
	);
};

onMounted(() => {
	const url = new URL(window.location.href);
	const params = url.searchParams;

	if (params.size != 0) {
		selectedProvince.value = props.province_query
			? props.province_query
			: "ทุกจังหวัด";
		selectedOccupation.value = props.occupation_query
			? props.occupation_query
			: "ทุกกลุ่มอาชีพ";

		onChangeDistrict();
	}
});

watch(selectedProvince, async (newProvince, oldProvince) => {
	if (newProvince != oldProvince) selectedDistrict.value = "ทุกอำเภอ/เขต";
});

const onSelectCandidate = (candidate: DropdownOption) => {
	window.location.href = `/candidates/${candidate.value}`;
};
</script>

<template>
	<div class="flex space-y-[10px] flex-col">
		<AutoComplete
			v-if="candidateOptions"
			:options="candidateOptions"
			:value="null"
			placeholder="ค้นด้วยชื่อ"
			@change="onSelectCandidate"
		/>

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
				v-if="districts"
				:class="{ 'bg-secondary': selectedDistrict != 'ทุกอำเภอ/เขต' }"
				class="select w-full body-01"
				v-model="selectedDistrict"
				@change="
					$emit(
						'filter',
						selectedProvince,
						selectedDistrict,
						selectedOccupation,
					)
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
					$emit(
						'filter',
						selectedProvince,
						selectedDistrict,
						selectedOccupation,
					)
				"
			>
				<option value="ทุกกลุ่มอาชีพ">ทุกกลุ่มอาชีพ</option>
				<option v-for="item in props.occupations" :value="item">
					{{ item }}
				</option>
			</select>
		</div>
	</div>

	<p class="text-secondary pt-3 cursor-pointer font-bold" @click="clearFitler">
		<span class="underline"> ล้างตัวเลือก</span>
		<img src="/clear-icon.svg" alt="" class="inline pb-[5px] pl-1" />
	</p>
</template>

<style scoped>
select option {
	background-color: #ffffff !important;
}
</style>
