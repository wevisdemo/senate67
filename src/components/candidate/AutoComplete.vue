<!-- ./components/Autocomplete.vue -->

<template>
	<div class="dropdown w-full body-01" ref="dropdownRef">
		<label class="input input-bordered flex items-center gap-2">
			<input
				type="text"
				class="grow placeholder:text-neutral"
				v-model="inputValue"
				:placeholder="placeholder"
				:disabled="disabled"
				@focus="handleFocus"
				@blur="handleBlur"
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="w-4 h-4 opacity-70"
			>
				<path
					fill-rule="evenodd"
					d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
					clip-rule="evenodd"
				/>
			</svg>
		</label>
		<div
			v-if="isOpen"
			class="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md w-full"
			:style="{ width: dropdownWidth + 'px' }"
		>
			<ul class="menu menu-compact">
				<li
					v-for="(item, index) in displayOptions"
					:key="index"
					:tabindex="index + 1"
					@click="selectOption(item)"
					class="w-full body-01"
				>
					<button v-html="displayLabel(item.label)"></button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import type { DropdownOption } from "../../data/candidate";

export default {
	name: "Autocomplete",
	props: {
		options: {
			type: Array<DropdownOption>,
			required: true,
		},
		value: {
			type: Object as () => DropdownOption | null,
			required: true,
		},
		placeholder: {
			type: String,
			required: true,
		},
		onChange: {
			type: Function,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const dropdownRef = ref<HTMLElement | null>(null);
		const inputValue = ref("");
		const isOpen = ref(false);
		const dropdownWidth = ref(0);

		const handleFocus = () => {
			isOpen.value = true;
			updateDropdownWidth();
		};

		const handleBlur = () => {
			setTimeout(() => {
				isOpen.value = false;
			}, 200);
		};

		const updateDropdownWidth = () => {
			if (!dropdownRef.value) return;
			dropdownWidth.value = dropdownRef.value.clientWidth || 0;
		};

		const displayOptions = computed(() => {
			if (!inputValue.value) {
				return props.options;
			}
			return props.options.filter((option) =>
				option.label.toLowerCase().includes(inputValue.value.toLowerCase()),
			);
		});

		function displayLabel(label: string): string {
			if (!inputValue.value) return `<p>${label}</p>`;
			const markOpenTag = "<b>";
			const markCloseTag = "</b>";

			// Escape special characters in targetText to avoid issues in regex
			const escapedTargetText = inputValue.value.replace(
				/[.*+?^${}()|[\]\\]/g,
				"\\$&",
			);

			// Create a regex to find the target text
			const regex = new RegExp(`(${escapedTargetText})`, "gi");

			// Replace the target text with the marked version
			const result = label.replace(regex, `${markOpenTag}$1${markCloseTag}`);

			// Return the final string wrapped in <p> tags
			return `<p>${result}</p>`;
		}

		const selectOption = (option: DropdownOption) => {
			inputValue.value = option.label;
			// this.$emit('change', option);
			props.onChange(option);
			handleBlur();
		};

		watch(
			() => props.value,
			(newValue) => {
				inputValue.value = newValue ? newValue.label : "";
			},
		);

		onMounted(() => {
			updateDropdownWidth();
		});

		return {
			dropdownRef,
			inputValue,
			isOpen,
			dropdownWidth,
			handleFocus,
			handleBlur,
			displayOptions,
			selectOption,
			displayLabel,
		};
	},
};
</script>

<style scoped>
/* Add any scoped styles if necessary */
</style>
