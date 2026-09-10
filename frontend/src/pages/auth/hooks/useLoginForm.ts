import {type FormEvent, useState} from "react";

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
import {isApiError} from "@/shared/api/httpClient";
import {setAuthToken} from "@/shared/services/storage/appStorage";

const parseLoginFormValues = (formData: FormData): LoginFormValues => ({
	email: String(formData.get("email") ?? ""),
	password: String(formData.get("password") ?? ""),
});

export const useLoginForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
	const [formError, setFormError] = useState<string | undefined>();

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
			setAuthToken(session.token);
		} catch (error) {
			const apiErrors = isApiError(error)
				? mapLoginApiError(error)
				: getLoginUnknownError();
			setFieldErrors(apiErrors.fieldErrors);
			setFormError(apiErrors.formError);
		} finally {
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
