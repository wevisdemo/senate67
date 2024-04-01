import { isProd } from "../../utils/flag";

interface PropsType {
	province: string;
	district: string;
	group: string;
	candidate_count: number;
}

const ResultCard: React.FC<PropsType> = ({
	province,
	district,
	group,
	candidate_count,
}: PropsType) => {
	let link = `/candidates?province=${province}&district=${district}&occupation=${group}`;
	return (
		<div className="flex w-full text-left">
			<div className="p-[10px] w-[50%] flex flex-col text-neutral bg-secondary">
				<p className="body-02 font-bold">{province}</p>
				<p className="body-03">{district}</p>
			</div>
			<div className="p-[10px] w-[50%] text-secondary font-bold body-02 bg-primary">
				<p>{group}</p>
			</div>
			{!isProd() && (
				<div className="flex flex-col text-center w-[65px]">
					<p className="heading-03">{candidate_count.toString()}</p>
					<p className="body-03">คน</p>
					<a
						className="link-02 mx-auto inline-flex content-center items-center gap-2 text-accent underline"
						href={link}
					>
						สำรวจ
					</a>
				</div>
			)}
		</div>
	);
};

export default ResultCard;
