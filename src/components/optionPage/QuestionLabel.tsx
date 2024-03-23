interface PropsType {
	number: number;
}

const QuestionLabel: React.FC<PropsType> = ({ number }: PropsType) => {
	return (
		<div className="flex items-center">
			<div className="w-[60px] h-[1px] bg-neutral"></div>
			<div className="w-10 h-10 border border-neutral rounded-full heading-02 flex items-center justify-center">
				{number}
			</div>
			<div className="w-[60px] h-[1px] bg-neutral"></div>
		</div>
	);
};

export default QuestionLabel;
