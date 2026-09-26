import {SLIDE_INTENT} from "@/app/navigation/types/slideIntentTypes";
import {useRouteNavigation} from "@/app/navigation/useRouteNavigation";
import {CreateWalletForm} from "@/pages/wallets/components/CreateWalletForm";
import {CreateWalletPageBackground} from "@/pages/wallets/components/CreateWalletPageBackground";
import {CreateWalletPreviewCard} from "@/pages/wallets/components/CreateWalletPreviewCard";
import {useCreateWalletForm} from "@/pages/wallets/hooks/useCreateWalletForm";
import {twx} from "@/shared/lib/twx";
import {AppBackButton} from "@/shared/ui/AppBackButton/AppBackButton";
import {AppHeading} from "@/shared/ui/AppHeading/AppHeading";

export const CreateWalletPage = () => {
	const navigation = useRouteNavigation();
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
		// Cancel shell pt so background reaches the top; safe area stays on content only.
		<div
			className={twx("relative", "-mt-[max(20px,env(safe-area-inset-top))]")}
		>
			<CreateWalletPageBackground currencyType={values.currencyType} />

			<div
				className={twx(
					"relative z-1 mx-auto min-h-app-page w-full max-w-card",
					"pt-[max(20px,env(safe-area-inset-top))]",
				)}
			>
				<header className="mb-16">
					<AppBackButton
						aria-label="Back to home"
						className="mb-14"
						onClick={() => navigation.goToHomePage({slide: SLIDE_INTENT.BACK})}
					/>

					<p className="mb-6 text-11 font-medium tracking-label text-e-muted uppercase">
						Wallet
					</p>
					<AppHeading className="mb-6">New wallet</AppHeading>
					<p className="text-14 leading-145 text-e-text">
						Set up a wallet to track your balance and spending.
					</p>
				</header>

				<CreateWalletPreviewCard values={values} />

				<CreateWalletForm
					className="mt-16"
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
