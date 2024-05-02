<script setup lang="ts">
import type { Event } from "../../data/event";
import { useKeenSlider } from "keen-slider/vue";
import "keen-slider/keen-slider.min.css";

defineProps<{
	upcomingEvents: Event[];
	pastEventCount: number;
}>();

const [container] = useKeenSlider({
	slides: {
		perView: 1.5,
		spacing: 10,
	},
	breakpoints: {
		"(min-width: 520px)": {
			slides: {
				perView: 3.5,
				spacing: 10,
			},
		},
	},
});
</script>

<template>
	<div id="events" class="bg-info">
		<div class="mx-auto max-w-5xl py-20 space-y-[30px]">
			<h1 class="heading-responsive-01 text-center">ตารางกิจกรรม</h1>
			<p class="text-center">
				<span class="opacity-50">จัดไปแล้ว {{ pastEventCount }} กิจกรรม</span
				><br />
				กำลังจะเกิดขึ้น {{ upcomingEvents.length }} กิจกรรม
			</p>
			<div ref="container" class="keen-slider flex flex-row px-4">
				<div
					v-for="(event, i) in upcomingEvents"
					class="keen-slider__slide flex flex-col rounded h-full"
					:key="event.name"
				>
					<div class="bg-secondary p-1">
						{{ event.date.toLocaleDateString() }}
					</div>
					<div class="flex flex-col p-2 bg-base-100">
						<p class="heading-02">{{ event.name }}</p>
						<table>
							<tr>
								<td class="font-bold">เวลา</td>
								<td>{{ event.timeDescription }}</td>
							</tr>
							<tr>
								<td class="font-bold">จังหวัด</td>
								<td>{{ event.province }}</td>
							</tr>
							<tr>
								<td class="font-bold">สถานที่</td>
								<td>
									{{ event.location }}<br /><a
										:href="event.locationUrl"
										target="_blank"
										rel="noopener noreferrer"
										>ดูแผนที่</a
									>
								</td>
							</tr>
						</table>
						<a
							:href="event.MoreInfoUrl"
							class="underline text-primary place-self-end"
							rel="noopener noreferrer"
							>รายละเอียด</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
