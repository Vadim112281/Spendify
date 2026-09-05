import {AuthFormError} from "@/pages/auth/components/AuthFormError";
import {useRegisterForm} from "@/pages/auth/hooks/useRegisterForm";
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
	const {fieldErrors, formError, isSubmitting, onSubmit} = useRegisterForm();

	return (
		<>
			<AppHeading className="mb-6">Реєстрація</AppHeading>
			<p className="mb-16 text-14 leading-145 text-e-text">
				Створіть обліковий запис за хвилину.
			</p>

			<form
				className="flex flex-col gap-10"
				data-auth-form
				onSubmit={onSubmit}
				noValidate
			>
				<div className="grid grid-cols-2 gap-10">
					<AppField
						id="register-first-name"
						label="Ім'я"
						size="sm"
						type="text"
						name="firstName"
						autoComplete="given-name"
						placeholder="Іван"
						error={fieldErrors.firstName}
					/>
					<AppField
						id="register-last-name"
						label="Прізвище"
						size="sm"
						type="text"
						name="lastName"
						autoComplete="family-name"
						placeholder="Іваненко"
						error={fieldErrors.lastName}
					/>
				</div>
				<AppField
					id="register-email"
					label="Email"
					size="sm"
					type="email"
					name="email"
					autoComplete="email"
					inputMode="email"
					placeholder="you@example.com"
					error={fieldErrors.email}
				/>
				<AppField
					id="register-password"
					label="Пароль"
					size="sm"
					type="password"
					name="password"
					autoComplete="new-password"
					placeholder="••••••••"
					error={fieldErrors.password}
				/>
				<AppField
					id="register-password-confirm"
					label="Повтор пароля"
					size="sm"
					type="password"
					name="passwordConfirm"
					autoComplete="new-password"
					placeholder="••••••••"
					error={fieldErrors.passwordConfirm}
				/>

				{formError && <AuthFormError message={formError} />}

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
