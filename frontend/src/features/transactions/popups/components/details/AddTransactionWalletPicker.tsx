import {motion, useReducedMotion} from "motion/react";
import {useId, useState} from "react";

import {
	AddTransactionDropdownListPanel,
	addTransactionDropdownChevronTransition,
	addTransactionDropdownShellClassName,
} from "@/features/transactions/popups/components/details/AddTransactionDropdownListPanel";
import {useDropdownShellOpen} from "@/features/transactions/popups/hooks/useDropdownShellOpen";
import {ChevronDownIcon} from "@/features/wallets/components/icons/ChevronDownIcon";
import {WalletOptionLabel} from "@/features/wallets/components/WalletOptionLabel";
import {
	WALLET_TYPE_LABELS,
	walletDisplayService,
} from "@/features/wallets/walletDisplayService";
import type {Wallet} from "@/features/wallets/walletTypes";
import {twx} from "@/shared/utils/twx";

type AddTransactionWalletPickerProps = {
	wallets: Wallet[];
	value: string | null;
	onChange: (walletId: string) => void;
	error?: string;
};

export const AddTransactionWalletPicker = ({
	wallets,
	value,
	onChange,
	error,
}: AddTransactionWalletPickerProps) => {
	const listboxId = useId();
	const reducedMotion = useReducedMotion();
	const [isOpen, setIsOpen] = useState(false);
	const {shellOpen, onListClosed} = useDropdownShellOpen(isOpen);

	const selectedWallet = wallets.find((wallet) => wallet.walletId === value);

	const handleToggle = () => {
		setIsOpen((open) => !open);
	};

	const handlePick = (walletId: string) => {
		onChange(walletId);
		setIsOpen(false);
	};

	return (
		<div>
			<p
				id={`${listboxId}-label`}
				className={twx(
					"mb-8 text-12 font-medium tracking-label uppercase",
					error ? "text-e-error" : "text-e-muted",
				)}
			>
				Wallet
			</p>

			<div
				className={addTransactionDropdownShellClassName({
					error,
					shellOpen,
				})}
			>
				<button
					type="button"
					className={twx(
						"flex min-h-44 w-full cursor-pointer items-center gap-10 px-14 py-12 text-left",
						"transition-colors duration-150",
						"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
					)}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					aria-controls={listboxId}
					aria-labelledby={`${listboxId}-label`}
					onClick={handleToggle}
				>
					{selectedWallet ? (
						<WalletOptionLabel
							name={walletDisplayService.getWalletDisplayName(
								selectedWallet.walletName,
								selectedWallet.walletType,
							)}
							walletTypeLabel={WALLET_TYPE_LABELS[selectedWallet.walletType]}
						/>
					) : (
						<span className="flex-1 text-15 text-e-muted">Select wallet</span>
					)}

					<motion.span
						className="grid size-28 shrink-0 place-items-center rounded-full text-e-muted"
						aria-hidden="true"
						animate={{rotate: isOpen ? 180 : 0}}
						transition={
							reducedMotion
								? {duration: 0}
								: addTransactionDropdownChevronTransition
						}
					>
						<ChevronDownIcon />
					</motion.span>
				</button>

				<AddTransactionDropdownListPanel
					isOpen={isOpen}
					reducedMotion={reducedMotion}
					listClassName="border-t border-white/10 p-6"
					onExitComplete={onListClosed}
				>
					<div
						id={listboxId}
						role="listbox"
						aria-labelledby={`${listboxId}-label`}
					>
						{wallets.map((wallet) => {
							const isSelected = value === wallet.walletId;
							const name = walletDisplayService.getWalletDisplayName(
								wallet.walletName,
								wallet.walletType,
							);

							return (
								<div key={wallet.walletId} role="presentation">
									<button
										type="button"
										role="option"
										aria-selected={isSelected}
										className={twx(
											"flex w-full cursor-pointer items-center gap-10 rounded-10 px-10 py-10 text-left",
											"transition-colors duration-150",
											"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-zinc",
											isSelected
												? "bg-white/10"
												: "bg-transparent hover:bg-white/6",
										)}
										onClick={() => handlePick(wallet.walletId)}
									>
										<WalletOptionLabel
											name={name}
											walletTypeLabel={WALLET_TYPE_LABELS[wallet.walletType]}
											nameClassName={isSelected ? "text-e-heading" : undefined}
										/>
									</button>
								</div>
							);
						})}
					</div>
				</AddTransactionDropdownListPanel>
			</div>

			{error ? (
				<p role="alert" className="mt-8 text-13 font-medium text-e-error">
					{error}
				</p>
			) : null}
		</div>
	);
};
