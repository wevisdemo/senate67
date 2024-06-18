<script lang="ts" setup>
import { computed } from "vue";
import type { CandidateOverview } from "../../data/candidate";
import CandidateAvatar from "../candidate/CandidateAvatar.vue";
import CandidateDepartmentAndGroupDetails from "../candidate/CandidateDepartmentAndGroupDetails.vue";
import CandidateSocialMediaList from "../candidate/CandidateSocialMediaList.vue";
import StandPointList from "../candidate/StandPointList.vue";

const props = defineProps<{
	candidate: CandidateOverview;
}>();

const isKnownCandidate = computed(() => "politicalStances" in props.candidate);
</script>

<template>
	<div class="mt-5 bg-base-100 p-2 sm:p-5 rounded-[10px] space-y-3">
		<div class="relative space-y-2">
			<div
				v-if="candidate.isEliminated"
				class="absolute top-0 left-0 w-full h-full bg-base-100 bg-opacity-90 z-10 text-center"
			>
				<span
					class="flex space-x-[10px] text-[#FF5C00] -rotate-[30deg] w-fit m-auto mt-[100px]"
				>
					<svg height="30" width="100" xmlns="http://www.w3.org/2000/svg">
						<line
							x1="0"
							y1="15"
							x2="100"
							y2="15"
							style="stroke: #ff5c00; stroke-width: 2"
						/>
					</svg>

					<span class="heading-01">ไม่ผ่านเข้ารอบ</span>
					<svg height="30" width="100" xmlns="http://www.w3.org/2000/svg">
						<line
							x1="0"
							y1="15"
							x2="100"
							y2="15"
							style="stroke: #ff5c00; stroke-width: 2"
						/>
					</svg>
				</span>
			</div>
			<div class="flex space-x-2">
				<div class="flex-1 text-left">
					<CandidateAvatar
						:name="`${candidate.firstName} ${candidate.lastName}`"
						:alias="candidate.aliasName"
						:avatar="candidate.avatarUrl"
						:isUnknownCandidate="!isKnownCandidate"
					/>
				</div>
				<div class="max-w-[120px] sm:max-w-[150px] w-full">
					<CandidateDepartmentAndGroupDetails
						:application="candidate.application"
						:number="candidate.number"
					/>
				</div>
			</div>

			<div
				v-if="'education' in candidate"
				class="flex flex-col text-left space-y-2"
			>
				<div class="overflow-hidden text-ellipsis">
					<div
						class="body-03 bg-base-200 px-2 py-0.5 my-2.5 rounded-md text-left"
					>
						ข้อมูลทั่วไป
					</div>
					<table>
						<tr>
							<td class="body-03 mt-[2px]">อายุ</td>
							<td class="body-01 font-bold flex">{{ candidate.age }} ปี</td>
						</tr>
						<tr v-if="candidate.gender">
							<td class="body-03 mt-[2px]">เพศ</td>
							<td class="body-01 font-bold flex">
								{{ candidate.gender }}
							</td>
						</tr>
						<tr>
							<td class="body-03 mt-[2px] whitespace-nowrap flex justify-start">
								การศึกษา
							</td>
							<td class="body-01 font-bold break-words whitespace-pre-wrap">
								{{ candidate.education }}
							</td>
						</tr>
						<tr>
							<td class="body-03 mt-[2px] flex justify-start">อาชีพ</td>
							<td class="body-01 font-bold break-words whitespace-pre-wrap">
								{{ candidate.occupation }}
							</td>
						</tr>
					</table>
				</div>
			</div>

			<div
				v-if="
					'contacts' in candidate &&
					(candidate.contacts.email ||
						candidate.contacts.facebookUrl ||
						candidate.contacts.phoneNumber ||
						candidate.contacts.xUrl)
				"
				class="space-y-2"
			>
				<div
					class="body-03 bg-base-200 px-2 py-0.5 my-2.5 rounded-md text-left"
				>
					ช่องทางติดต่อ
				</div>
				<CandidateSocialMediaList :contacts="candidate.contacts" />
			</div>

			<div v-if="'politicalStances' in candidate" class="space-y-1">
				<div
					class="body-03 bg-base-200 px-2 py-0.5 my-2.5 rounded-md text-left"
				>
					จุดยืน
				</div>

				<StandPointList :standpoints="candidate.politicalStances" />
			</div>
		</div>

		<div v-if="isKnownCandidate" class="text-right flex space-x-1 justify-end">
			<a
				class="font-bold text-accent underline"
				:href="'/candidates/' + candidate.id"
				>ดูเพิ่มเติม
			</a>
			<img src="/arrow.svg" class="-rotate-90" alt="" />
		</div>
	</div>
</template>
