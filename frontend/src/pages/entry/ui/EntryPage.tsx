import {useMemo} from "react";

import {DesktopOnlyPage} from "@/pages/desktop-only/ui/DesktopOnlyPage";
import {MobileInstallPage} from "@/pages/mobile-install/ui/MobileInstallPage";
import {isMobileBrowser} from "@/shared/lib/device/isMobileBrowser";

export const EntryPage = () => {
	const isMobile = useMemo(() => isMobileBrowser(), []);

	return isMobile ? <MobileInstallPage /> : <DesktopOnlyPage />;
};
