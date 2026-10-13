import {AddTransactionForm} from "@/pages/transactions/popup/components/AddTransactionForm";
import {AddTransactionStepIndicator} from "@/pages/transactions/popup/components/step/AddTransactionStepIndicator";
import {useAddTransactionForm} from "@/pages/transactions/popup/hooks/useAddTransactionForm";
import {
	AppPopup,
	AppPopupClose,
	AppPopupTitle,
} from "@/shared/ui/AppPopup/AppPopup";
import {twx} from "@/shared/utils/twx";

type AddTransactionPopupProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const AddTransactionPopup = ({
	open,
	onOpenChange,
}: AddTransactionPopupProps) => {
	const form = useAddTransactionForm({
		open,
		onSuccess: () => onOpenChange(false),
	});

	return (
		<AppPopup
			open={open}
			onOpenChange={onOpenChange}
			size="tall"
			showHandle={false}
			header={
				<div
					className={twx(
						"relative shrink-0 px-20 pb-14",
						"pt-inset-top-sheet",
					)}
				>
					<AppPopupClose
						aria-label="Close"
						className={twx(
							"absolute right-20",
							"top-inset-top-sheet",
						)}
					/>

					<div className="min-w-0 pr-52">
						<p
							className="m-0 text-11 font-medium tracking-label text-e-muted uppercase"
						>
							New
						</p>
						<AppPopupTitle
							id="add-transaction-title"
							className="mt-4"
						>
							Transaction
						</AppPopupTitle>
					</div>

					<div className="mt-14">
						<AddTransactionStepIndicator step={form.step} />
					</div>
				</div>
			}
		>
			<AddTransactionForm {...form} />
		</AppPopup>
	);
};
