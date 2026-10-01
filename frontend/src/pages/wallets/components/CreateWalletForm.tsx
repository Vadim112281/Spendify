import type {SubmitEventHandler} from "react";

import type {CurrencyType, WalletType} from "@/features/wallets/walletTypes";
import {CreateWalletFormSection} from "@/pages/wallets/components/createWalletFormPieces/CreateWalletFormSection";
import {CreateWalletNameField} from "@/pages/wallets/components/createWalletFormPieces/CreateWalletNameField";
import {CurrencySelector} from "@/pages/wallets/components/createWalletFormPieces/CurrencySelector";
import {WalletTypeSelector} from "@/pages/wallets/components/createWalletFormPieces/WalletTypeSelector";
import type {
	CreateWalletFieldErrors,
	CreateWalletFormValues,
} from "@/pages/wallets/types/createWalletFormTypes";
import {twx} from "@/shared/utils/twx";
import {AppButton} from "@/shared/ui/AppButton/AppButton";
import {AppFormError} from "@/shared/ui/AppFormError/AppFormError";

type CreateWalletFormProps = {
	className?: string;
	values: CreateWalletFormValues;
	fieldErrors: CreateWalletFieldErrors;
	formError?: string;
	isSubmitting: boolean;
	canSubmit: boolean;
	onSubmit: SubmitEventHandler<HTMLFormElement>;
	onWalletNameChange: (walletName: string) => void;
	onWalletTypeChange: (walletType: WalletType) => void;
	onCurrencyTypeChange: (currencyType: CurrencyType) => void;
};

export const CreateWalletForm = ({
	className,
	values,
	fieldErrors,
	formError,
	isSubmitting,
	canSubmit,
	onSubmit,
	onWalletNameChange,
	onWalletTypeChange,
	onCurrencyTypeChange,
}: CreateWalletFormProps) => (
	<div
		className={twx(
			"overflow-hidden rounded-18 border border-white/10",
			"bg-white/4 shadow-e-card backdrop-blur-md",
			className,
		)}
	>
		<div
			className="h-px bg-linear-to-r from-transparent via-white/35 to-transparent"
			aria-hidden="true"
		/>

		<form className="flex flex-col" onSubmit={onSubmit} noValidate>
			<div className="p-14">
				<CreateWalletNameField
					id="wallet-name"
					value={values.walletName}
					walletType={values.walletType}
					onChange={onWalletNameChange}
					error={fieldErrors.walletName}
				/>
			</div>

			<div className={twx("border-t border-white/8", "p-14")}>
				<CreateWalletFormSection label="Type" error={fieldErrors.walletType}>
					<WalletTypeSelector
						value={values.walletType}
						onChange={onWalletTypeChange}
					/>
				</CreateWalletFormSection>
			</div>

			<div className={twx("border-t border-white/8", "p-14")}>
				<CreateWalletFormSection
					label="Currency"
					error={fieldErrors.currencyType}
				>
					<CurrencySelector
						value={values.currencyType}
						onChange={onCurrencyTypeChange}
					/>
				</CreateWalletFormSection>
			</div>

			{formError ? (
				<div className={twx("border-t border-white/8", "px-14 pt-14")}>
					<AppFormError message={formError} />
				</div>
			) : null}

			<div className={twx("border-t border-white/8", "p-14")}>
				<AppButton type="submit" disabled={!canSubmit || isSubmitting}>
					{isSubmitting ? "Creating…" : "Create wallet"}
				</AppButton>
			</div>
		</form>
	</div>
);
