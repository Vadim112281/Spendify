type AuthFormErrorProps = {
	message: string;
};

export const AuthFormError = ({message}: AuthFormErrorProps) => (
	<div
		className="rounded-12 border border-e-error/35 bg-e-error/10 px-12 py-10"
		role="alert"
	>
		<p className="m-0 text-13 font-medium leading-140 text-e-error">
			{message}
		</p>
	</div>
);
