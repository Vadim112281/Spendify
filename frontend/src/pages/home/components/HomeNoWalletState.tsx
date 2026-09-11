import {AppButton} from "@/shared/ui/AppButton/AppButton";
import {AppDecorativeIcon} from "@/shared/ui/AppDecorativeIcon/AppDecorativeIcon";

export const HomeNoWalletState = () => (
	<div className="flex w-full flex-col items-center px-4 text-center">
		<div className="relative mb-28 grid place-items-center">
			<div
				className="pointer-events-none absolute -inset-24 rounded-full bg-e-dash-from/25 blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="relative grid size-54 place-items-center rounded-18 border border-white/10 bg-e-dash shadow-e-dash"
			>
				<AppDecorativeIcon width={28} height={28} strokeWidth={1.65}>
					<path d="M19 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
					<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
				</AppDecorativeIcon>
			</div>
		</div>

		<p className="mb-8 text-11 font-medium tracking-label text-e-muted uppercase">
			Wallet
		</p>
		<h2 className="m-0 text-24 font-semibold tracking-tight-03 text-e-heading">
			No wallet yet
		</h2>
		<p className="mt-10 px-8 text-15 leading-155 text-e-text">
			Create a wallet to track your balance and transactions.
		</p>

		<AppButton className="mt-28">
			Create wallet
		</AppButton>
	</div>
);
