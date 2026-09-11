import {AuthFormError} from "@/pages/auth/components/AuthFormError";
import {useLoginForm} from "@/pages/auth/hooks/useLoginForm";
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
	const {fieldErrors, formError, isSubmitting, onSubmit} = useLoginForm();

	return (
		<>
			<AppHeading className="mb-6">Log in</AppHeading>
			<p className="mb-16 text-14 leading-145 text-e-text">
				Balance and expenses in one app.
			</p>

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
					error={fieldErrors.email}
				/>
				<AppField
					id="login-password"
					label="Password"
					size="sm"
					type="password"
					name="password"
					autoComplete="current-password"
					placeholder="••••••••"
					error={fieldErrors.password}
				/>

				{formError && <AuthFormError message={formError} />}

				<AppButton
					type="submit"
					size="sm"
					className="mt-4"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Signing in…" : "Log in"}
				</AppButton>
			</form>

			<div className="mt-14 space-y-8 border-t border-dashed border-e-border pt-14 text-center">
				{/* TODO: Do it in the future */}
				<AppTextButton disabled={interactionsDisabled}>
					Forgot password?
				</AppTextButton>
				<p className="m-0 text-13 leading-normal text-e-muted">
					Don&apos;t have an account?{" "}
					<AppTextButton
						emphasis
						disabled={interactionsDisabled}
						onClick={onRegister}
					>
						Sign up
					</AppTextButton>
				</p>
			</div>
		</>
	);
};
