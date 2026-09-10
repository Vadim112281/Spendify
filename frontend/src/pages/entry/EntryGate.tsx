import type {ComponentType} from "react";
import {Navigate} from "react-router-dom";

import {APP_ROUTES} from "@/app/navigation/routes";
import {AuthPage} from "@/pages/auth/AuthPage";
import {DesktopOnlyPage} from "@/pages/desktop-only/DesktopOnlyPage";
import {
	ENTRY_TARGET,
	type EntryTarget,
	resolveEntryTarget,
} from "@/pages/entry/resolveEntryTarget";
import {MobileInstallPage} from "@/pages/mobile-install/MobileInstallPage";
import {hasAuthSession} from "@/shared/services/storage/appStorage";

const entryScreens: Record<EntryTarget, ComponentType> = {
	[ENTRY_TARGET.AUTH]: AuthPage,
	[ENTRY_TARGET.DESKTOP_ONLY]: DesktopOnlyPage,
	[ENTRY_TARGET.MOBILE_INSTALL]: MobileInstallPage,
};

export const EntryGate = () => {
	const entryTarget = resolveEntryTarget();

	if (hasAuthSession() && entryTarget === ENTRY_TARGET.AUTH) {
		return <Navigate to={APP_ROUTES.APP_HOME} replace />;
	}

	const Screen = entryScreens[entryTarget];
	return <Screen />;
};
