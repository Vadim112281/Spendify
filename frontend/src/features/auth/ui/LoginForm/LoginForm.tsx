import {type FormEvent, useState} from "react";

import {AppButton} from "@/shared/ui/AppButton/AppButton";
import {AppField} from "@/shared/ui/AppField/AppField";
import {AppHeading} from "@/shared/ui/AppHeading/AppHeading";
import {AppTextButton} from "@/shared/ui/AppTextButton/AppTextButton";

type LoginFormProps = {
	onRegister: () => void;
	interactionsDisabled?: boolean;
};

export const LoginForm = ({
	onRegister,
	interactionsDisabled = false,
}: LoginFormProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);
		// TODO: wire auth API
		setIsSubmitting(false);
	};

	return (
		<>
			<AppHeading className="mb-6">Увійдіть</AppHeading>
			<p className="mb-16 text-14 leading-145 text-e-text">
				Баланс і витрати в одному застосунку.
			</p>

			{/* TODO: remove noValidate and add client-side validation in onSubmit once auth API is wired (required, email format, server errors). */}
			<form
				className="flex flex-col gap-12"
				data-auth-form
				onSubmit={onSubmit}
				noValidate
			>
				<AppField
					id="login-email"
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
					id="login-password"
					label="Пароль"
					size="sm"
					type="password"
					name="password"
					autoComplete="current-password"
					placeholder="••••••••"
					required
				/>

				<AppButton
					type="submit"
					size="sm"
					className="mt-4"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Вхід…" : "Увійти"}
				</AppButton>
			</form>

			<div className="mt-14 space-y-8 border-t border-dashed border-e-border pt-14 text-center">
				{/* TODO: Do it in the future */}
				<AppTextButton disabled={interactionsDisabled}>
					Забули пароль?
				</AppTextButton>
				<p className="m-0 text-13 leading-normal text-e-muted">
					Немає облікового запису?{" "}
					<AppTextButton
						emphasis
						disabled={interactionsDisabled}
						onClick={onRegister}
					>
						Зареєструватися
					</AppTextButton>
				</p>
			</div>
		</>
	);
};
