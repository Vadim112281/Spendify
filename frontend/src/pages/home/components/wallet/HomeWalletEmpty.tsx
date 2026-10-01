import {HomeWalletIcon} from "@/pages/home/components/dashboard/icons/HomeWalletIcon";
import {AppButton} from "@/shared/ui/AppButton/AppButton";

type HomeWalletEmptyProps = {
	onCreateWallet: () => void;
};

export const HomeWalletEmpty = ({onCreateWallet}: HomeWalletEmptyProps) => (
	<div className="flex w-full flex-col items-center px-4 text-center">
		<div className="relative mb-28 grid place-items-center">
			<div
				className="pointer-events-none absolute -inset-24 rounded-full bg-e-dash-from/25 blur-3xl"
				aria-hidden="true"
			/>
			<div className="relative grid size-54 place-items-center rounded-18 border border-white/10 bg-e-dash shadow-e-dash">
				<HomeWalletIcon width={28} height={28} strokeWidth={1.65} />
			</div>
		</div>

		<p className="mb-8 text-11 font-medium tracking-label text-e-muted uppercase">
			Wallet
		</p>
		<h2 className="m-0 text-24 font-semibold tracking-tight-03 text-e-zinc">
			No wallet yet
		</h2>
		<p className="mt-10 px-8 text-15 leading-155 text-e-text">
			Create a wallet to track your balance and transactions.
		</p>

		<AppButton type="button" className="mt-28" onClick={onCreateWallet}>
			Create wallet
		</AppButton>
	</div>
);
