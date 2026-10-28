import {CreateWalletForm} from "@/pages/wallets/components/CreateWalletForm";
import {CreateWalletPageBackground} from "@/pages/wallets/components/CreateWalletPageBackground";
import {CreateWalletPreviewCard} from "@/pages/wallets/components/CreateWalletPreviewCard";
import {useCreateWalletForm} from "@/pages/wallets/hooks/useCreateWalletForm";
import {useWalletCreateReturnNavigation} from "@/pages/wallets/hooks/useWalletCreateReturnNavigation";
import {AppBackButton} from "@/shared/ui/AppBackButton/AppBackButton";
import {AppHeading} from "@/shared/ui/AppHeading/AppHeading";
import {twx} from "@/shared/utils/twx";

export const CreateWalletPage = () => {
	const {goToReturn} = useWalletCreateReturnNavigation();
	const {
		values,
		fieldErrors,
		formError,
		isSubmitting,
		canSubmit,
		setWalletName,
		setWalletType,
		setCurrencyType,
		onSubmit,
	} = useCreateWalletForm();

	return (
		<div className="relative">
			<CreateWalletPageBackground currencyType={values.currencyType} />

			<div
				className={twx(
					"relative z-1 mx-auto min-h-app-page w-full max-w-card pb-16",
				)}
			>
				<div className="pt-inset-top-toolbar">
					<AppBackButton
						aria-label="Back"
						onClick={() => goToReturn()}
					/>
				</div>

				<div className="mb-14 mt-10">
					<p className="mb-6 text-11 font-medium tracking-label text-e-muted uppercase">
						Wallet
					</p>
					<AppHeading className="mb-6">New wallet</AppHeading>
					<p className="text-14 leading-145 text-e-text">
						Set up a wallet to track your balance and spending.
					</p>
				</div>

				<CreateWalletPreviewCard values={values} />

				<CreateWalletForm
					className="mt-14"
					values={values}
					fieldErrors={fieldErrors}
					formError={formError}
					isSubmitting={isSubmitting}
					canSubmit={canSubmit}
					onSubmit={onSubmit}
					onWalletNameChange={setWalletName}
					onWalletTypeChange={setWalletType}
					onCurrencyTypeChange={setCurrencyType}
				/>
			</div>
		</div>
	);
};
