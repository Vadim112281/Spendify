import {AddTransactionForm} from "@/features/transactions/popups/components/AddTransactionForm";
import {AddTransactionStepIndicator} from "@/features/transactions/popups/components/step/AddTransactionStepIndicator";
import {useTransactionPopupForm} from "@/features/transactions/popups/hooks/useTransactionPopupForm";
import type {EditTransactionTarget} from "@/features/transactions/popups/types/editTransactionTypes";
import type {Wallet} from "@/features/wallets/walletTypes";
import {
	AppPopup,
	AppPopupClose,
	AppPopupTitle,
} from "@/shared/ui/AppPopup/AppPopup";
import {twx} from "@/shared/utils/twx";

type EditTransactionPopupProps = {
	open: boolean;
	target: EditTransactionTarget | null;
	lockedWallet: Wallet | null;
	onOpenChange: (open: boolean) => void;
};

export const EditTransactionPopup = ({
	open,
	target,
	lockedWallet,
	onOpenChange,
}: EditTransactionPopupProps) => {
	const form = useTransactionPopupForm({
		mode: "edit",
		open,
		target,
		lockedWallet,
		onSuccess: () => onOpenChange(false),
	});

	return (
		<AppPopup
			open={open && Boolean(target)}
			onOpenChange={onOpenChange}
			size="tall"
			showHandle={false}
			header={
				<div
					className={twx("relative shrink-0 px-20 pb-14", "pt-inset-top-sheet")}
				>
					<AppPopupClose
						aria-label="Close"
						className={twx("absolute right-20", "top-inset-top-sheet")}
					/>

					<div className="min-w-0 pr-52">
						<p className="m-0 text-11 font-medium tracking-label text-e-muted uppercase">
							Edit
						</p>
						<AppPopupTitle id="edit-transaction-title" className="mt-4">
							Transaction
						</AppPopupTitle>
					</div>

					<div className="mt-14">
						<AddTransactionStepIndicator step={form.step} />
					</div>
				</div>
			}
		>
			<AddTransactionForm {...form} formId="edit-transaction-form" lockWallet />
		</AppPopup>
	);
};
