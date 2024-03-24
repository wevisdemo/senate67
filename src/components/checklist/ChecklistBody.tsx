import React from "react";
import scrollama from "scrollama";
import defaultChecklistData from "../../data/senate_checklist.json";
import QuestionLabel from "../optionPage/QuestionLabel";
import SelectButton from "./SelectButton";

export enum AnswerResult {
	Sucess = "sucess",
	Failed = "failed",
	Caution = "caution",
}

export type ChecklistData = typeof defaultChecklistData;

export default function ChecklistBody() {
	const [checklistData, setChecklistData] =
		React.useState<ChecklistData>(defaultChecklistData);

	const [questionReadFlags, setQuestionReadFlags] = React.useState<boolean[]>(
		new Array(defaultChecklistData.length).fill(false),
	);

	const questionsContainer = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (!questionsContainer.current) return;

		const scroller = scrollama();

		scroller
			.setup({ step: questionsContainer.current.childNodes })
			.onStepExit(({ index, direction }) => {
				if (direction === "down") {
					setQuestionReadFlags(
						questionReadFlags.map((val, i) => (i === index ? true : val)),
					);
				}
			});

		return () => scroller.destroy();
	}, [questionReadFlags]);

	function updateAnswer(
		index: number,
		user_answer: string,
		user_answer_explanation: string,
	) {
		setChecklistData(
			checklistData.map((question, i) =>
				i === index
					? {
							...question,
							user_answer,
							user_answer_explanation,
						}
					: question,
			),
		);
	}

	return (
		<>
			<div className="w-screen h-9 bg-base-200 p-[10px] fixed bottom-0 flex items-center justify-center">
				{checklistData.map((data, index) => (
					<a
						key={index}
						href={`#question-${index + 1}`}
						className="flex items-center"
					>
						{index !== 0 && (
							<div className="w-[3px] md:w-5 h-[1px] bg-neutral" />
						)}
						{data.user_answer === AnswerResult.Sucess ? (
							<img
								src="/sucess-step.svg"
								alt="sucess"
								className="cursor-pointer"
							/>
						) : data.user_answer === AnswerResult.Failed ? (
							<img
								src="/failed-step.svg"
								alt="failed"
								className="cursor-pointer"
							/>
						) : data.user_answer === AnswerResult.Caution ? (
							<img
								src="/caution-step.svg"
								alt="caution"
								className="cursor-pointer"
							/>
						) : (
							<img
								src="/default-step.svg"
								alt="default"
								className="cursor-pointer"
							/>
						)}
					</a>
				))}
			</div>
			<div ref={questionsContainer}>
				{checklistData.map((data, index) => {
					const isReadAndNotAnswer =
						questionReadFlags[index] && !data.user_answer;

					return (
						<section
							id={`question-${index + 1}`}
							key={index}
							className={`flex items-center justify-center h-screen transition-colors duration-500 ${isReadAndNotAnswer ? "bg-[#F9D142]" : "bg-secondary"}`}
						>
							<div className="flex flex-col items-center justify-center gap-5 w-[288px] md:w-[650px]">
								<QuestionLabel number={index + 1} />
								<h1 className="heading-02 text-center">{data.question}</h1>
								<div className="flex gap-[10px]">
									<SelectButton
										isActive={data.user_answer === data.answer1_result}
										onClick={() =>
											updateAnswer(
												index,
												data.answer1_result,
												data.answer1_explanation,
											)
										}
									>
										{data.answer1_label}
									</SelectButton>
									<SelectButton
										isActive={data.user_answer === data.answer2_result}
										onClick={() =>
											updateAnswer(
												index,
												data.answer2_result,
												data.answer2_explanation,
											)
										}
									>
										{data.answer2_label}
									</SelectButton>
								</div>
								{data.user_answer === AnswerResult.Sucess && (
									<div className="flex flex-col items-center justify-center gap-[5px]">
										<img src="/checkmark.svg" alt="check" />
										<p className="body-01 text-center text-primary">
											คุณได้ไปต่อ!
										</p>
									</div>
								)}
								{data.user_answer === AnswerResult.Failed && (
									<div className="flex flex-col items-center justify-center gap-[5px]">
										<img src="/close.svg" alt="close" />
										<p className="body-01 text-center text-accent">
											{data.user_answer_explanation}
										</p>
									</div>
								)}
								{data.user_answer === AnswerResult.Caution && (
									<div className="flex flex-col items-center justify-center gap-[5px]">
										<img src="/warning.svg" alt="warning" />
										<p className="body-01 text-center text-neutral">
											{data.user_answer_explanation}
										</p>
									</div>
								)}
								{isReadAndNotAnswer && (
									<p className="body-02">*ยังไม่ได้ตอบคำถาม</p>
								)}
							</div>
						</section>
					);
				})}
			</div>
			{checklistData.some((data) => data.user_answer === "") && (
				<section className="flex items-center justify-center h-screen bg-secondary">
					<div className="w-[288px] md:w-[650px] flex flex-col gap-5 items-center justify-center">
						<h1 className="heading-responsive-02 text-neutral text-center">
							สรุปผล
						</h1>
						<p className="body-01 text-center text-neutral">
							ยังสรุปผลไม่ได้ เพราะคุณยังตอบคำถามไม่ครบ
							รบกวนกลับขึ้นไปตอบให้ครบก่อน
						</p>
					</div>
				</section>
			)}
			{checklistData.every(
				(data) => data.user_answer === AnswerResult.Sucess,
			) && (
				<section className="flex items-center justify-center h-screen bg-info">
					<div className="w-[288px] md:w-[650px] flex flex-col gap-5 items-center justify-center">
						<h1 className="heading-responsive-02 text-neutral text-center">
							สรุปผล
						</h1>
						<img src="/sucess-large.svg" alt="sucess" />
						<h2 className="heading-01">คุณสมบัติผ่านหมด!</h2>
						<div className="flex flex-col gap-[10px] items-center w-full">
							<p className="body-01 font-bold">ชวนสำรวจต่อว่า</p>
							<a href="/option" className="w-full btn btn-secondary">
								ฉันมีทางเลือก สมัคร สว. แบบไหนบ้าง
							</a>
						</div>
					</div>
				</section>
			)}
			{checklistData.some(
				(data) => data.user_answer === AnswerResult.Caution,
			) &&
				checklistData.every(
					(data) => data.user_answer !== AnswerResult.Failed,
				) && (
					<section className="flex items-center justify-center h-screen bg-base-200">
						<div className="w-[288px] md:w-[650px] flex flex-col gap-5 items-center justify-center">
							<h1 className="heading-responsive-02 text-neutral text-center">
								สรุปผล
							</h1>
							<img src="/caution-large.svg" alt="caution" />
							<h2 className="heading-01 text-center">
								มีเงื่อนไขที่ต้องไปดำเนินการต่อ
							</h2>
							<div>
								{checklistData
									.filter((data) => data.user_answer === AnswerResult.Caution)
									.map((data, index) => (
										<div key={index}>
											{index + 1}. {data.user_answer_explanation}
										</div>
									))}
							</div>
							<div className="flex flex-col gap-[10px] items-center w-full">
								<p className="body-01 font-bold">ชวนสำรวจต่อว่า</p>
								<a href="/option" className="w-full btn btn-secondary">
									ฉันมีทางเลือก สมัคร สว. แบบไหนบ้าง
								</a>
							</div>
						</div>
					</section>
				)}
			{checklistData.some(
				(data) => data.user_answer === AnswerResult.Failed,
			) && (
				<section className="flex items-center justify-center h-screen bg-accent">
					<div className="w-[288px] md:w-[650px] flex flex-col gap-5 items-center justify-center">
						<h1 className="heading-responsive-02 text-neutral text-center">
							สรุปผล
						</h1>
						<img src="/failed-large.svg" alt="failed" />
						<h2 className="heading-01 text-center">มีคุณสมบัติที่ไม่ผ่าน</h2>
						<ol className="list-decimal ml-4">
							{checklistData
								.filter((data) => data.user_answer === AnswerResult.Failed)
								.map((data, index) => (
									<li key={index}>{data.user_answer_explanation}</li>
								))}
						</ol>
					</div>
				</section>
			)}
		</>
	);
}
