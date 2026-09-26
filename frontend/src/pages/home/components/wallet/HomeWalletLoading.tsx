type HomeWalletLoadingProps = {
	label?: string;
};

export const HomeWalletLoading = ({
	label = "Loading wallet…",
}: HomeWalletLoadingProps) => (
	<div className="flex w-full flex-col items-center px-4 text-center">
		<div
			className="mb-20 size-54 animate-pulse rounded-18 border border-white/10 bg-white/6"
			aria-hidden="true"
		/>
		<p className="m-0 text-14 text-e-muted">{label}</p>
	</div>
);
