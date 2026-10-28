import type {SubmitEventHandler} from "react";
import {useState} from "react";

import {isApiError} from "@/app/api/httpClient";
import {createWallet} from "@/features/wallets/api/walletsApi";
import {walletDisplayService} from "@/features/wallets/walletDisplayService";
import type {CurrencyType, WalletType} from "@/features/wallets/walletTypes";
import {useWalletCreateReturnNavigation} from "@/pages/wallets/hooks/useWalletCreateReturnNavigation";
import {
	getCreateWalletUnknownError,
	mapCreateWalletApiError,
	mapCreateWalletClientErrors,
} from "@/pages/wallets/services/walletMessagesService";
import type {
	CreateWalletFieldErrors,
	CreateWalletFormValues,
} from "@/pages/wallets/types/createWalletFormTypes";
import {validateCreateWalletForm} from "@/pages/wallets/validation/validateCreateWalletForm";

const initialValues: CreateWalletFormValues = {
	walletName: "",
	walletType: null,
	currencyType: null,
};

export const useCreateWalletForm = () => {
	const {completeAfterWalletCreate} = useWalletCreateReturnNavigation();
	const [values, setValues] = useState<CreateWalletFormValues>(initialValues);
	const [fieldErrors, setFieldErrors] = useState<CreateWalletFieldErrors>({});
	const [formError, setFormError] = useState<string | undefined>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const updateValues = (
		updater: (current: CreateWalletFormValues) => CreateWalletFormValues,
	) => {
		setValues(updater);
	};

	const setWalletName = (walletName: string) => {
		updateValues((current) => ({...current, walletName}));
	};

	const setWalletType = (walletType: WalletType) => {
		updateValues((current) => ({...current, walletType}));
	};

	const setCurrencyType = (currencyType: CurrencyType) => {
		updateValues((current) => ({...current, currencyType}));
	};

	const canSubmit = values.walletType !== null && values.currencyType !== null;

	const onSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		setFieldErrors({});
		setFormError(undefined);

		const clientErrorCodes = validateCreateWalletForm(values);

		if (clientErrorCodes) {
			setFieldErrors(mapCreateWalletClientErrors(clientErrorCodes));
			return;
		}

		setIsSubmitting(true);

		if (values.walletType === null || values.currencyType === null) {
			setIsSubmitting(false);
			return;
		}

		try {
			const wallet = await createWallet({
				walletType: values.walletType,
				currencyType: values.currencyType,
				walletName: walletDisplayService.getWalletDisplayName(
					values.walletName,
					values.walletType,
				),
			});
			completeAfterWalletCreate(wallet);
		} catch (error) {
			const apiErrors = isApiError(error)
				? mapCreateWalletApiError(error)
				: getCreateWalletUnknownError();

			setFieldErrors(apiErrors.fieldErrors);
			setFormError(apiErrors.formError);
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		values,
		fieldErrors,
		formError,
		isSubmitting,
		canSubmit,
		setWalletName,
		setWalletType,
		setCurrencyType,
		onSubmit,
	};
};
