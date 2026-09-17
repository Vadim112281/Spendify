import type {SubmitEventHandler} from "react";
import {useState} from "react";
import {isApiError} from "@/app/api/httpClient";
import {beginAuthSession} from "@/app/auth/authSession";
import {useRouteNavigation} from "@/app/navigation/useRouteNavigation";
import {loginUser} from "@/pages/auth/api/authApi";
import {
	getLoginUnknownError,
	mapLoginApiError,
	mapLoginClientErrors,
} from "@/pages/auth/services/authMessagesService";
import type {
	LoginFieldErrors,
	LoginFormValues,
} from "@/pages/auth/types/authTypes";
import {validateLoginForm} from "@/pages/auth/validation/validateAuthForms";

const parseLoginFormValues = (formData: FormData): LoginFormValues => ({
	email: String(formData.get("email") ?? ""),
	password: String(formData.get("password") ?? ""),
});

export const useLoginForm = () => {
	const navigation = useRouteNavigation();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
	const [formError, setFormError] = useState<string | undefined>();

	const onSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		setFieldErrors({});
		setFormError(undefined);

		const values = parseLoginFormValues(new FormData(event.currentTarget));
		const clientErrorCodes = validateLoginForm(values);

		if (clientErrorCodes) {
			setFieldErrors(mapLoginClientErrors(clientErrorCodes));
			return;
		}

		setIsSubmitting(true);

		try {
			const session = await loginUser({
				email: values.email.trim(),
				password: values.password.trim(),
			});
			beginAuthSession(session.token);
			navigation.goToHomePage({replace: true});
		} catch (error) {
			const apiErrors = isApiError(error)
				? mapLoginApiError(error)
				: getLoginUnknownError();
			setFieldErrors(apiErrors.fieldErrors);
			setFormError(apiErrors.formError);
			setIsSubmitting(false);
		}
	};

	return {
		fieldErrors,
		formError,
		isSubmitting,
		onSubmit,
	};
};
