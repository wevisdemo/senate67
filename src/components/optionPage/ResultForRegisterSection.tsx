import React from "react";
import Phone from "../icons/Phone.tsx";
import OpenInNew from "../icons/OpenInNew.tsx";
import ArrowRight from "../icons/ArrowRight.tsx";
import ResultCard from "./ResultCard.tsx";
import type { Result } from "../../data/senate_option.ts";

interface PropsType {
	results: Result[];
	candidateGroupCount: Map<string, number>;
}

const ResultForRegisterSection: React.FC<PropsType> = ({
	results,
	candidateGroupCount,
}: PropsType) => {
	const getCandidateCount = (
		province: string,
		district: string,
		group: string,
	): number =>
		candidateGroupCount.get([province, district, group].join("|")) ?? 0;

	return (
		<section className="flex flex-col justify-center items-center text-center py-[60px] md:py-[120px]">
			<h1 className="heading-responsive-02 mb-[20px]">สรุปผล</h1>
			<div className="flex flex-col w-full max-w-[650px] space-y-[10px] px-[16px]">
				{results.length === 0 && (
					<p className="body-01 py-[20px]">
						ยังสรุปผลไม่ได้ เพราะ{" "}
						<span className="font-bold"> คุณยังไม่ได้เลือกอำเภอ/เขต</span>
						ที่มีความเกี่ยวข้อง
					</p>
				)}
				{results.length > 0 && (
					<>
						<div>
							<h2 className="heading-01">
								คุณมีทางเลือกในการสมัคร สว. {results.length} แบบ
							</h2>
							<p className="body-01">เลือกสมัครได้แบบเดียวเท่านั้นนะ</p>
						</div>
						<div className="flex text-left pl-[15px]">
							<span className="body-03 w-[50%]">อำเภอ/เขต</span>
							<span className="body-03 w-[50%]">กลุ่มอาชีพ/คุณสมบัติ</span>
							<span className="body-03 w-[65px] md:text-nowrap">
								มีผู้สมัครแล้ว
							</span>
						</div>
					</>
				)}
				<div className="grid space-y-[10px]">
					{results.map((result, index) => (
						<div className="flex items-center" key={`result-${index}`}>
							<span className="body-03 mr-[8px]">{index + 1}</span>
							<ResultCard
								province={result.province}
								district={result.district}
								group={result.group}
								candidate_count={getCandidateCount(
									result.province,
									result.district,
									result.group,
								)}
							/>
						</div>
					))}
				</div>
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
					href="https://forms.gle/AiPQPxvqFex2a7Hk8"
					target="_blank"
				>
					แสดงจุดยืนผู้สมัคร
					<OpenInNew className="fill-base-100" />
				</a>

				<p className="text-center">สำรวจผู้สมัครคนอื่นๆ ได้ที่</p>

				<a className="btn btn-primary w-full text-base-100" href="/candidates">
					ค้นหาผู้สมัคร
					<ArrowRight className="fill-base-100" />
				</a>
			</div>
		</section>
	);
};

export default ResultForRegisterSection;
