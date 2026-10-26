import {useRouteNavigation} from "@/app/navigation/useRouteNavigation";
import {WalletEmpty} from "@/features/wallets/components/WalletEmpty";
import {WalletLoadError} from "@/features/wallets/components/WalletLoadError";
import {WalletLoading} from "@/features/wallets/components/WalletLoading";
import {useUserWallets} from "@/features/wallets/hooks/useUserWallets";
import {HomeDashboard} from "@/pages/home/components/dashboard/HomeDashboard";

export const HomePage = () => {
	const navigation = useRouteNavigation();
	const {wallets, isLoading, error, hasWallet, refetch} = useUserWallets();

	const centeredPageClassName =
		"flex min-h-app-page w-full items-center justify-center";

	if (isLoading) {
		return (
			<div className={centeredPageClassName}>
				<WalletLoading />
			</div>
		);
	}

	if (error) {
		return (
			<div className={centeredPageClassName}>
				<WalletLoadError
					message={error}
					onRetry={() => {
						void refetch();
					}}
				/>
			</div>
		);
	}

	if (!hasWallet) {
		return (
			<div className={centeredPageClassName}>
				<WalletEmpty onCreateWallet={navigation.goToCreateWalletPage} />
			</div>
		);
	}

	return (
		<div className="flex h-full min-h-0 flex-col overflow-hidden">
			<HomeDashboard wallets={wallets} />
		</div>
	);
};
