<script lang="ts" setup>
import type { CandidateOverview } from "../../data/candidate";
import CandidateAvatar from "../candidate/CandidateAvatar.vue";
import CandidateDepartmentAndGroupDetails from "../candidate/CandidateDepartmentAndGroupDetails.vue";
import CandidateSocialMediaList from "../candidate/CandidateSocialMediaList.vue";
import StandPointList from "../candidate/StandPointList.vue";

const props = defineProps<{
	candidate: CandidateOverview;
}>();
</script>

<template>
	<div class="mt-5 bg-base-100 p-2 sm:p-5 rounded-[10px] space-y-3">
		<div class="flex space-x-2">
			<div class="flex-1 text-left">
				<CandidateAvatar
					:name="`${props.candidate.firstName} ${props.candidate.lastName}`"
					:alias="props.candidate.aliasName"
					:avatar="props.candidate.avatarUrl"
				/>
			</div>
			<div class="max-w-[120px] sm:max-w-[150px] w-full">
				<CandidateDepartmentAndGroupDetails
					:application="props.candidate.application"
				/>
			</div>
		</div>

		<div class="flex flex-col text-left space-y-2">
			<div class="overflow-hidden text-ellipsis">
				<div class="body-03 bg-base-200 px-2 py-0.5 rounded-md">
					ข้อมูลทั่วไป
				</div>
				<table>
					<tr>
						<td class="body-03 mt-[2px]">อายุ</td>
						<td class="body-01 font-bold flex">{{ props.candidate.age }} ปี</td>
					</tr>
					<tr v-if="props.candidate.gender">
						<td class="body-03 mt-[2px]">เพศ</td>
						<td class="body-01 font-bold flex">{{ props.candidate.gender }}</td>
					</tr>
					<tr>
						<td class="body-03 mt-[2px] whitespace-nowrap flex justify-start">
							การศึกษา
						</td>
						<td class="body-01 font-bold break-words whitespace-pre-wrap">
							{{ props.candidate.education }}
						</td>
					</tr>
					<tr>
						<td class="body-03 mt-[2px] flex justify-start">อาชีพ</td>
						<td class="body-01 font-bold break-words whitespace-pre-wrap">
							{{ props.candidate.occupation }}
						</td>
					</tr>
				</table>
			</div>

			<div
				v-if="
					props.candidate.contacts.email ||
					props.candidate.contacts.facebookUrl ||
					props.candidate.contacts.phoneNumber ||
					props.candidate.contacts.xUrl
				"
				class="space-y-2"
			>
				<div class="body-03 bg-base-200 px-2 rounded-md">ช่องทางติดต่อ</div>
				<CandidateSocialMediaList :contacts="props.candidate.contacts" />
			</div>

			<div class="space-y-1">
				<div class="body-03 bg-base-200 px-2 rounded-md">จุดยืน</div>

				<StandPointList :standpoints="props.candidate.politicalStances" />
			</div>
		</div>

		<div class="text-right flex space-x-1 justify-end">
			<a
				class="font-bold text-accent underline"
				:href="'/candidates/' + props.candidate.id"
				>ดูเพิ่มเติม
			</a>
			<img src="/arrow.svg" class="-rotate-90" alt="" />
		</div>
	</div>
</template>
