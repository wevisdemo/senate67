<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";

import CandidateAvatar from "../candidate/CandidateAvatar.vue";
import CandidateDepartmentAndGroupDetails from "../candidate/CandidateDepartmentAndGroupDetails.vue";
import CandidateSocialMediaList from "../candidate/CandidateSocialMediaList.vue";
import CandidateFilterList from "../candidate/CandidateFilterList.vue";
import StandPointList from "../candidate/StandPointList.vue";
import type { CandidateOverview } from "../../data/candidate";
import type { ApplicationGroup } from "../../data/application_group";
import type { LocationMap } from "../../data/senate_option";

const props = defineProps<{
	candidates: CandidateOverview[];
	application_group: ApplicationGroup[];
	provinces: string[];
	districts: LocationMap;
	total_candidate: number;
}>();

const groupResults = ref<CandidateOverview[]>([]);

const province_query = ref("");
const district_query = ref("");
const occupation_query = ref("");
const url = ref<URL>();
const params = ref<URLSearchParams>();

const getCandidatesData = async (
	province: string,
	district: string,
	application: string,
	isClearFilter: boolean,
) => {
	groupResults.value = [];

	if (province == "ทุกจังหวัด")
		if (application == "ทุกกลุ่มอาชีพ") {
			groupResults.value = props.candidates;
		} else {
			groupResults.value = props.candidates.filter((c) => {
				return c.application.group == application;
			});
		}
	else {
		if (district == "ทุกอำเภอ/เขต") {
			if (application == "ทุกกลุ่มอาชีพ")
				groupResults.value = props.candidates.filter((c) => {
					return c.application.province == province;
				});
			else
				groupResults.value = props.candidates.filter((c) => {
					return (
						c.application.province == province &&
						c.application.group == application
					);
				});
		} else {
			if (application == "ทุกกลุ่มอาชีพ") {
				groupResults.value = props.candidates.filter((c) => {
					return (
						c.application.province == province &&
						c.application.district == district
					);
				});
			} else {
				groupResults.value = props.candidates.filter((c) => {
					return (
						c.application.province == province &&
						c.application.district == district &&
						c.application.group == application
					);
				});
			}
		}
	}

	if (params.value?.size != 0 && isClearFilter) {
		province_query.value = "";
		district_query.value = "";
		occupation_query.value = "";
	}
};

onBeforeMount(() => {
	url.value = new URL(window.location.href);
	params.value = url.value.searchParams;

	if (params.value.size != 0) {
		province_query.value = params.value.get("province") ?? "";
		district_query.value = params.value.get("district") ?? "";
		occupation_query.value = params.value.get("occupation") ?? "";
	} else groupResults.value = props.candidates;
});
</script>

<template>
	<section
		class="flex items-center justify-center bg-primary pt-36 pb-10 text-center"
	>
		<div class="text-center max-w-[650px] w-full">
			<div class="px-4">
				<h1 class="heading-responsive-01 text-base-100 pb-3">
					ค้นหาผู้สมัคร สว.
				</h1>

				<p class="max-w-[650px] mx-auto body-01 text-base-100">
					ทั้งหมด {{ total_candidate }} คน ในฐานข้อมูล
				</p>
			</div>

			<div class="pt-14 px-4 z-[99] relative sm:z-0 bg-primary">
				<p class="heading-02 mb-2 text-base-100">
					กรองหาผู้สมัครที่คุณมีสิทธิ์เลือก
				</p>

				<CandidateFilterList
					:province_query="province_query"
					:district_query="district_query"
					:occupation_query="occupation_query"
					:provinces="provinces"
					:districts="districts"
					:occupations="application_group"
					@filter="getCandidatesData"
				/>
			</div>
		</div>
	</section>
	<section class="bg-info py-10 text-center px-3">
		<div class="mx-auto max-w-[650px]">
			<p class="heading-02 mb-2 text-neutral">
				ผลลัพธ์ : {{ groupResults.length }} คน
			</p>

			<div
				class="mt-5 bg-base-100 p-2 sm:p-5 rounded-[10px]"
				v-for="item in groupResults"
			>
				<div class="flex space-x-2">
					<div class="flex-1 text-left">
						<CandidateAvatar
							:name="item.firstName + ' ' + item.lastName"
							:alias="item.aliasName"
						/>
					</div>
					<div class="max-w-[120px] sm:max-w-[150px] w-full">
						<CandidateDepartmentAndGroupDetails
							:application="item.application"
						/>
					</div>
				</div>

				<div class="text-left">
					<div class="flex space-x-2 pt-3">
						<div class="flex-1">
							<div class="bg-base-200 px-3 py-0.5 rounded-md">
								<p class="body-03">ข้อมูลทั่วไป</p>
							</div>

							<div class="flex space-x-3 px-3 pt-2">
								<div class="basis-[33%] sm:basis-[15%]">
									<p class="body-03 mt-[2px]">อายุ</p>
								</div>
								<div class="basis-3/4 sm:basis-[85%]">
									<p class="body-01 font-bold">{{ item.age }} ปี</p>
								</div>
							</div>
							<div class="flex space-x-3 px-3">
								<div class="basis-[33%] sm:basis-[15%]">
									<p class="body-03 mt-[2px]">การศึกษา</p>
								</div>
								<div class="basis-3/4 sm:basis-[85%]">
									<p class="body-01 font-bold">{{ item.education }}</p>
								</div>
							</div>
							<div class="flex space-x-3 px-3">
								<div class="basis-[33%] sm:basis-[15%]">
									<p class="body-03 mt-[2px]">อาชีพ</p>
								</div>
								<div class="basis-3/4 sm:basis-[85%]">
									<p class="body-01 font-bold">{{ item.occupation }}</p>
								</div>
							</div>
						</div>
						<div class="max-w-[120px] sm:max-w-[150px] w-full">
							<div class="bg-base-200 px-3 py-0.5 body-03 rounded-md">
								ช่องทางติดต่อ
							</div>
							<CandidateSocialMediaList :contacts="item.contacts" />
						</div>
					</div>

					<div class="bg-base-200 px-3 py-0.5 rounded-md my-2">
						<p class="body-03">จุดยืน</p>
					</div>
					<StandPointList :standpoints="item.politicalStances" />
				</div>

				<div class="text-right py-2 flex space-x-1 justify-end">
					<a
						class="font-bold text-accent underline"
						:href="'/candidates/' + item.firstName + '-' + item.lastName"
						target="_blank"
						>ดูเพิ่มเติม
					</a>
					<img src="/arrow.svg" class="-rotate-90" alt="" />
				</div>
			</div>

			<a
				target="_blank"
				href="https://forms.gle/AiPQPxvqFex2a7Hk8"
				class="btn w-full bg-primary text-base-100 mt-14"
			>
				แสดงตัวเป็นผู้สมัคร <img src="/link-icon.svg" class="inline pr-2" />
			</a>
		</div>
	</section>
</template>

<style scoped></style>
