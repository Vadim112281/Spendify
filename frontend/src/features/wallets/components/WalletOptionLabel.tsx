import {WalletIcon} from "@/features/wallets/components/icons/WalletIcon";
import {twx} from "@/shared/utils/twx";

type WalletOptionLabelProps = {
	name: string;
	walletTypeLabel: string;
	nameClassName?: string;
	typeClassName?: string;
};

export const WalletOptionLabel = ({
	name,
	walletTypeLabel,
	nameClassName,
	typeClassName,
}: WalletOptionLabelProps) => (
	<>
		<span
			className="grid size-28 shrink-0 place-items-center rounded-full bg-e-dash text-e-heading"
			aria-hidden="true"
		>
			<WalletIcon width={14} height={14} strokeWidth={1.75} />
		</span>
		<span
			className={twx(
				"min-w-0 flex-1 truncate text-left text-15 font-medium text-e-zinc",
				nameClassName,
			)}
		>
			{name}
			<span className={twx("text-e-muted", typeClassName)}>
				{" "}
				· {walletTypeLabel}
			</span>
		</span>
	</>
);
