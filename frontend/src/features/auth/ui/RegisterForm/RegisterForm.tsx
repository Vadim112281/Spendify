import {type FormEvent, useState} from "react";

import {AppButton} from "@/shared/ui/AppButton/AppButton";
import {AppField} from "@/shared/ui/AppField/AppField";
import {AppHeading} from "@/shared/ui/AppHeading/AppHeading";
import {AppTextButton} from "@/shared/ui/AppTextButton/AppTextButton";

type RegisterFormProps = {
	onLogin: () => void;
	interactionsDisabled?: boolean;
};

export const RegisterForm = ({
	onLogin,
	interactionsDisabled = false,
}: RegisterFormProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);
		// TODO: wire auth API
		setIsSubmitting(false);
	};

	return (
		<>
			<AppHeading className="mb-6">Реєстрація</AppHeading>
			<p className="mb-16 text-14 leading-145 text-e-text">
				Створіть обліковий запис за хвилину.
			</p>

			{/* TODO: remove noValidate and add client-side validation in onSubmit once auth API is wired (required, email format, password match, minLength, server errors). */}
			<form
				className="flex flex-col gap-10"
				data-auth-form
				onSubmit={onSubmit}
				noValidate
			>
				<AppField
					id="register-email"
					label="Email"
					size="sm"
					type="email"
					name="email"
					autoComplete="email"
					inputMode="email"
					placeholder="you@example.com"
					required
				/>
				<AppField
					id="register-password"
					label="Пароль"
					size="sm"
					type="password"
					name="password"
					autoComplete="new-password"
					placeholder="••••••••"
					minLength={8}
					required
				/>
				<AppField
					id="register-password-confirm"
					label="Повтор пароля"
					size="sm"
					type="password"
					name="passwordConfirm"
					autoComplete="new-password"
					placeholder="••••••••"
					minLength={8}
					required
				/>

				<AppButton
					type="submit"
					size="sm"
					className="mt-2"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Створення…" : "Зареєструватися"}
				</AppButton>
			</form>

			<p className="mt-14 border-t border-dashed border-e-border pt-14 text-center text-13 leading-normal text-e-muted">
				Вже є обліковий запис?{" "}
				<AppTextButton
					emphasis
					disabled={interactionsDisabled}
					onClick={onLogin}
				>
					Увійти
				</AppTextButton>
			</p>
		</>
	);
};
