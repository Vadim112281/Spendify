import {AppButton} from "@/shared/ui/AppButton/AppButton";

type HomeWalletLoadErrorProps = {
	message: string;
	onRetry: () => void;
};

export const HomeWalletLoadError = ({
	message,
	onRetry,
}: HomeWalletLoadErrorProps) => (
	<div className="flex w-full max-w-card flex-col items-center px-4 text-center">
		<p className="mb-8 text-11 font-medium tracking-label text-e-muted uppercase">
			Wallet
		</p>
		<h2 className="m-0 text-20 font-semibold tracking-tight-03 text-e-zinc">
			Could not load
		</h2>
		<p className="mt-10 text-15 leading-155 text-e-text">{message}</p>
		<AppButton type="button" className="mt-24" onClick={onRetry}>
			Try again
		</AppButton>
	</div>
);
