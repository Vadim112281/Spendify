import {AuthPage} from "@/pages/auth/AuthPage";
import {DesktopOnlyPage} from "@/pages/desktop-only/DesktopOnlyPage";
import {MobileInstallPage} from "@/pages/mobile-install/MobileInstallPage";
import {
	isMobileBrowser,
	isPwaStandalone,
} from "@/shared/lib/device/isMobileBrowser";

export const EntryPage = () => {
	const isMobile = isMobileBrowser();
	const isStandalone = isPwaStandalone();

	if (!isMobile) {
		return <DesktopOnlyPage />;
	}
	if (isStandalone) {
		return <AuthPage />;
	}

	return <MobileInstallPage />;
};
