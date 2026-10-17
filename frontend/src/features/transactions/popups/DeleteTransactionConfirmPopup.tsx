import {AppButton} from "@/shared/ui/AppButton/AppButton";
import {AppFormError} from "@/shared/ui/AppFormError/AppFormError";
import {AppPopup} from "@/shared/ui/AppPopup/AppPopup";
import {AppTextButton} from "@/shared/ui/AppTextButton/AppTextButton";

type DeleteTransactionConfirmPopupProps = {
	open: boolean;
	error?: string;
	isPending: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	onCancel: () => void;
};

export const DeleteTransactionConfirmPopup = ({
	open,
	error,
	isPending,
	onOpenChange,
	onConfirm,
	onCancel,
}: DeleteTransactionConfirmPopupProps) => (
	<AppPopup
		open={open}
		onOpenChange={onOpenChange}
		size="default"
		showHandle={false}
		showCloseButton={false}
		title="Delete transaction?"
		description="This cannot be undone."
	>
		<div className="flex flex-col gap-16 px-20 pb-20">
			{error ? <AppFormError message={error} /> : null}
			<div className="flex flex-col gap-10">
				<AppButton
					type="button"
					className="bg-e-error text-white shadow-none hover:bg-e-error/92 hover:text-white"
					disabled={isPending}
					onClick={onConfirm}
				>
					{isPending ? "Deleting…" : "Delete"}
				</AppButton>
				<AppTextButton type="button" disabled={isPending} onClick={onCancel}>
					Cancel
				</AppTextButton>
			</div>
		</div>
	</AppPopup>
);
