import type {SubmitEventHandler} from "react";
import {useState} from "react";

import {isApiError} from "@/app/api/httpClient";
import {SLIDE_INTENT} from "@/app/navigation/types/slideIntentTypes";
import {useRouteNavigation} from "@/app/navigation/useRouteNavigation";
import {createWallet} from "@/features/wallets/api/walletsApi";
import type {CurrencyType, WalletType} from "@/features/wallets/walletTypes";
import {resolveWalletName} from "@/pages/wallets/services/resolveWalletName";
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
	const navigation = useRouteNavigation();
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
			await createWallet({
				walletType: values.walletType,
				currencyType: values.currencyType,
				walletName: resolveWalletName(values.walletName, values.walletType),
			});
			navigation.goToHomePage({
				replace: true,
				slide: SLIDE_INTENT.BACK,
			});
		} catch (error) {
			const apiErrors = isApiError(error)
				? mapCreateWalletApiError(error)
				: getCreateWalletUnknownError();

			setFieldErrors(apiErrors.fieldErrors);
			setFormError(apiErrors.formError);
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
