import {twx} from "@/shared/utils/twx";

type HomeWalletSwitcherAddRowProps = {
	onAddWallet: () => void;
};

export const HomeWalletSwitcherAddRow = ({
	onAddWallet,
}: HomeWalletSwitcherAddRowProps) => (
	<button
		type="button"
		role="menuitem"
		className={twx(
			"flex w-full min-h-44 cursor-pointer items-center gap-8 rounded-10 border-none px-10 py-10 text-left",
			"bg-transparent text-e-heading hover:bg-white/6",
		)}
		onClick={onAddWallet}
	>
		<span
			className="grid size-28 shrink-0 place-items-center rounded-full bg-white/8 text-e-heading"
			aria-hidden="true"
		>
			<svg
				width={14}
				height={14}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				strokeLinecap="round"
				aria-hidden="true"
			>
				<path d="M12 5v14M5 12h14" />
			</svg>
		</span>
		<span className="min-w-0 truncate text-13 font-medium">Add wallet</span>
	</button>
);
