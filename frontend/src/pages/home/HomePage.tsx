import {useRouteNavigation} from "@/app/navigation/useRouteNavigation";
import {HomeWalletEmpty} from "@/pages/home/components/wallet/HomeWalletEmpty";
import {HomeWalletLoadError} from "@/pages/home/components/wallet/HomeWalletLoadError";
import {HomeWalletLoading} from "@/pages/home/components/wallet/HomeWalletLoading";
import {useUserWallets} from "@/pages/home/hooks/useUserWallets";

export const HomePage = () => {
	const navigation = useRouteNavigation();
	const {isLoading, error, hasWallet, refetch} = useUserWallets();

	const pageClassName =
		"flex min-h-app-page w-full items-center justify-center";

	if (isLoading) {
		return (
			<div className={pageClassName}>
				<HomeWalletLoading />
			</div>
		);
	}

	if (error) {
		return (
			<div className={pageClassName}>
				<HomeWalletLoadError
					message={error}
					onRetry={() => {
						void refetch();
					}}
				/>
			</div>
		);
	}

	if (hasWallet) {
		return <div className="min-h-app-page w-full" />;
	}

	return (
		<div className={pageClassName}>
			<HomeWalletEmpty onCreateWallet={navigation.goToCreateWalletPage} />
		</div>
	);
};
