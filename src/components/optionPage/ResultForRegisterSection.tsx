import React from "react";
import WeWatchPhoneButton from "../buttons/WeWatchPhoneButton.astro";
import ECTPhoneButton from "../buttons/ECTPhoneButton.astro";
import Phone from "../icons/Phone.tsx";
import OpenInNew from "../icons/OpenInNew.tsx";
import ArrowRight from "../icons/ArrowRight.tsx";

interface PropsType {
	title: string;
	canAppend?: boolean;
}

const ResultForRegisterSection: React.FC = () => {
	const isHideFeature = (): boolean => {
		return import.meta.env.PUBLIC_BUILD_TARGET === "production" ? true : false;
	};

	return (
		<section className="flex flex-col justify-center items-center text-center py-[60px] md:py-[120px]">
			<h1 className="heading-responsive-02">สรุปผล</h1>
			<div className="flex flex-col w-full max-w-[650px] space-y-[10px]">
				<div>
					<h2 className="heading-01">คุณมีทางเลือกในการสมัคร สว. xx แบบ</h2>
					<p className="body-01">เลือกสมัครได้แบบเดียวเท่านั้นนะ</p>
				</div>
				<div>{/* result */}</div>
				<a
					className="mx-auto inline-flex content-center items-center gap-2 text-accent underline"
					href="https://www.ilaw.or.th/articles/21466"
					target="_blank"
				>
					อ่านวิธีเตรียมตัวสมัครเพิ่มเติม{" "}
					<OpenInNew className="fill-accent ml-[4px]" />
				</a>
				<a
					className="mx-auto inline-flex content-center items-center gap-2 text-accent underline"
					href="https://www.ilaw.or.th/articles/16805"
					target="_blank"
				>
					ดาวน์โหลดคู่มือผู้สมัคร <OpenInNew className="fill-accent ml-[4px]" />
				</a>
				<a
					className="mx-auto inline-flex content-center items-center gap-2 text-accent underline"
					href="https://drive.google.com/drive/folders/1_pWE_P7pxTWWQnejbdKRzzCoC2RuvfmD?usp=sharing"
					target="_blank"
				>
					ดาวน์โหลด Material สว. 67{" "}
					<OpenInNew className="fill-accent ml-[4px]" />
				</a>

				<p className="text-center">หากยังมีข้อสงสัย โทรปรึกษาได้ที่</p>

				<a className="btn btn-base-200 w-full" href="tel:021143189">
					<Phone />
					02-114-3189 (ทีม WeWatch)
				</a>

				<p className="text-center">หรือโทรถาม กกต. โดยตรง</p>
				<a className="btn btn-base-200 w-full" href="tel:021418888">
					<Phone />
					02-141-8888
				</a>

				<p className="text-center">
					ถ้ามั่นใจแล้วว่าลงสมัครแน่ มาแสดงตัวกับเราหน่อย
				</p>
				<a
					className="btn btn-primary w-full text-base-100"
					href="tel:021418888"
				>
					แสดงตัวเป็นผู้สมัคร
					<OpenInNew className="fill-base-100" />
				</a>
				<p className="text-center">สำรวจผู้สมัครคนอื่นๆ ได้ที่</p>
				{isHideFeature() && (
					<a
						className="btn btn-primary w-full text-base-100"
						href="tel:021418888"
					>
						ค้นหาผู้สมัคร
						<ArrowRight className="fill-base-100" />
					</a>
				)}
			</div>
		</section>
	);
};

export default ResultForRegisterSection;
