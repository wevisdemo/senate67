interface PropsType {
	province: string;
	district: string;
	attribute: string;
}

const ResultCard: React.FC<PropsType> = ({
	province,
	district,
	attribute,
}: PropsType) => {
	return (
		<div className="flex w-full text-left">
			<div className="p-[10px] w-[50%] flex flex-col text-neutral bg-secondary">
				<p className="body-02 font-bold">{province}</p>
				<p className="body-03">{district}</p>
			</div>
			<div className="p-[10px] w-[50%] text-secondary font-bold body-02 bg-primary">
				<p>{attribute}</p>
			</div>
		</div>
	);
};

export default ResultCard;
