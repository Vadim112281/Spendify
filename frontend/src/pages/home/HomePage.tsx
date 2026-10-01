import {useRouteNavigation} from "@/app/navigation/useRouteNavigation";
import {HomeDashboard} from "@/pages/home/components/dashboard/HomeDashboard";
import {HomeWalletEmpty} from "@/pages/home/components/wallet/HomeWalletEmpty";
import {HomeWalletLoadError} from "@/pages/home/components/wallet/HomeWalletLoadError";
import {HomeWalletLoading} from "@/pages/home/components/wallet/HomeWalletLoading";
import {useUserWallets} from "@/pages/home/hooks/useUserWallets";

export const HomePage = () => {
	const navigation = useRouteNavigation();
	const {wallets, isLoading, error, hasWallet, refetch} = useUserWallets();

	const centeredPageClassName =
		"flex min-h-app-page w-full items-center justify-center";

	if (isLoading) {
		return (
			<div className={centeredPageClassName}>
				<HomeWalletLoading />
			</div>
		);
	}

	if (error) {
		return (
			<div className={centeredPageClassName}>
				<HomeWalletLoadError
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
				<HomeWalletEmpty onCreateWallet={navigation.goToCreateWalletPage} />
			</div>
		);
	}

	return (
		<div className="flex h-full min-h-0 flex-col">
			<HomeDashboard wallets={wallets} />
		</div>
	);
};
