import type {ChangeEvent} from "react";
import {DEFAULT_WALLET_NAMES} from "@/features/wallets/walletDisplay";
import type {WalletType} from "@/features/wallets/walletTypes";
import {AppField} from "@/shared/ui/AppField/AppField";

type CreateWalletNameFieldProps = {
	id: string;
	value: string;
	walletType: WalletType | null;
	onChange: (value: string) => void;
	error?: string;
};

export const CreateWalletNameField = ({
	id,
	value,
	walletType,
	onChange,
	error,
}: CreateWalletNameFieldProps) => {
	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	const placeholder = walletType
		? DEFAULT_WALLET_NAMES[walletType]
		: "Wallet name";

	return (
		<AppField
			id={id}
			label="Name"
			size="sm"
			name="walletName"
			type="text"
			autoComplete="off"
			placeholder={placeholder}
			value={value}
			onChange={onInputChange}
			error={error}
		/>
	);
};
