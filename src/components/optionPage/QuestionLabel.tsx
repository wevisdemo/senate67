interface PropsType {
	number: number;
	light?: boolean;
}

const QuestionLabel: React.FC<PropsType> = ({
	number,
	light = false,
}: PropsType) => {
	return (
		<div className="flex items-center">
			<div
				className={"w-[60px] h-[1px] " + (light ? "bg-base-100" : "bg-neutral")}
			></div>
			<div
				className={
					"w-10 h-10 border rounded-full heading-02 flex items-center justify-center " +
					(light
						? "border-base-100 text-base-100"
						: "border-neutral text-neutral")
				}
			>
				{number}
			</div>
			<div
				className={"w-[60px] h-[1px] " + (light ? "bg-base-100" : "bg-neutral")}
			></div>
		</div>
	);
};

export default QuestionLabel;
