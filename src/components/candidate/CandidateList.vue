<script setup>
import CandidateAvatar from "../candidate/CandidateAvatar.vue";
import CandidateDepartmentAndGroupDetails from "../candidate/CandidateDepartmentAndGroupDetails.vue";
import CandidateSocialMediaList from "../candidate/CandidateSocialMediaList.vue";
import StandPointList from "../candidate/StandPointList.vue";
</script>

<template>
	<section class="bg-info py-10 text-center px-3">
		<div class="mx-auto max-w-[650px]">
			<p class="heading-02 mb-2 text-neutral">ผลลัพธ์ : xx คน</p>

			<div class="mt-5 bg-base-100 p-2 sm:p-5 rounded-[10px]" v-for="item in 2">
				<div class="flex space-x-2">
					<div class="basis-3/4 text-left"><CandidateAvatar /></div>
					<div class="basis-1/4">
						<CandidateDepartmentAndGroupDetails />
					</div>
				</div>

				<div class="text-left">
					<div class="flex space-x-2 pt-3">
						<div class="basis-3/4">
							<div class="bg-base-200 px-3 py-0.5 rounded-md">
								<p class="body-03">ข้อมูลทั่วไป</p>
							</div>

							<div class="flex space-x-3 px-3 pt-2">
								<div class="basis-1/4 sm:basis-[15%]">
									<p class="body-03">อายุ</p>
								</div>
								<div class="basis-3/4 sm:basis-[85%]">
									<p class="body-03 font-bold">45 ปี</p>
								</div>
							</div>
							<div class="flex space-x-3 px-3">
								<div class="basis-1/4 sm:basis-[15%]">
									<p class="body-03">การศึกษา</p>
								</div>
								<div class="basis-3/4 sm:basis-[85%]">
									<p class="body-03 font-bold">ปริญญาเอก</p>
								</div>
							</div>
							<div class="flex space-x-3 px-3">
								<div class="basis-1/4 sm:basis-[15%]">
									<p class="body-03">อาชีพ</p>
								</div>
								<div class="basis-3/4 sm:basis-[85%]">
									<p class="body-03 font-bold">อาจารย์</p>
								</div>
							</div>
						</div>
						<div class="basis-1/4">
							<div class="bg-base-200 px-3 py-0.5 body-03 rounded-md">
								ช่องทางติดต่อ
							</div>
							<CandidateSocialMediaList />
						</div>
					</div>

					<div class="bg-base-200 px-3 py-0.5 rounded-md">
						<p class="body-03">จุดยืน</p>
					</div>
					<StandPointList />
				</div>

				<div class="text-right py-2 flex space-x-1 justify-end">
					<a
						class="font-bold text-accent underline"
						href="/candidates/details"
						target="_blank"
						>ดูเพิ่มเติม
					</a>
					<img src="/arrow.svg" class="-rotate-90" alt="" />
				</div>
			</div>

			<button class="btn w-full bg-primary text-base-100 mt-14">
				แสดงตัวเป็นผู้สมัคร <img src="/link-icon.svg" class="inline pr-2" />
			</button>
		</div>
	</section>
</template>

<style scoped></style>
