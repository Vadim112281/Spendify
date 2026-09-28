import {HomeWalletIcon} from "@/pages/home/components/dashboard/icons/HomeWalletIcon";
import {twx} from "@/shared/utils/twx";

type HomeWalletSwitcherSummaryProps = {
	name: string;
	walletTypeLabel: string;
	labelClassName?: string;
};

export const HomeWalletSwitcherSummary = ({
	name,
	walletTypeLabel,
	labelClassName,
}: HomeWalletSwitcherSummaryProps) => (
	<>
		<span
			className="grid size-28 shrink-0 place-items-center rounded-full bg-e-dash text-e-heading"
			aria-hidden="true"
		>
			<HomeWalletIcon width={14} height={14} strokeWidth={1.75} />
		</span>
		<span
			className={twx("min-w-0 truncate text-13 font-medium", labelClassName)}
		>
			{name}
			<span className="text-e-zinc/75"> · {walletTypeLabel}</span>
		</span>
	</>
);
