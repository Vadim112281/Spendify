import {type FormEvent, useState} from "react";

import {registerUser} from "@/pages/auth/api/authApi";
import {
	getRegisterUnknownError,
	mapRegisterApiError,
	mapRegisterClientErrors,
} from "@/pages/auth/services/authMessagesService";
import type {
	RegisterFieldErrors,
	RegisterFormValues,
} from "@/pages/auth/types/authTypes";
import {validateRegisterForm} from "@/pages/auth/validation/validateAuthForms";
import {isApiError} from "@/shared/api/httpClient";
import {setAuthToken} from "@/shared/services/storage/appStorage";

const parseRegisterFormValues = (formData: FormData): RegisterFormValues => ({
	email: String(formData.get("email") ?? ""),
	firstName: String(formData.get("firstName") ?? ""),
	lastName: String(formData.get("lastName") ?? ""),
	password: String(formData.get("password") ?? ""),
	passwordConfirm: String(formData.get("passwordConfirm") ?? ""),
});

export const useRegisterForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
	const [formError, setFormError] = useState<string | undefined>();

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFieldErrors({});
		setFormError(undefined);

		const values = parseRegisterFormValues(new FormData(event.currentTarget));
		const clientErrorCodes = validateRegisterForm(values);

		if (clientErrorCodes) {
			setFieldErrors(mapRegisterClientErrors(clientErrorCodes));
			return;
		}

		setIsSubmitting(true);

		try {
			const session = await registerUser({
				email: values.email.trim(),
				firstName: values.firstName.trim(),
				lastName: values.lastName.trim(),
				password: values.password.trim(),
			});
			setAuthToken(session.token);
		} catch (error) {
			const apiErrors = isApiError(error)
				? mapRegisterApiError(error)
				: getRegisterUnknownError();
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
