import type {ComponentType} from "react";

import {AuthPage} from "@/pages/auth/AuthPage";
import {DesktopOnlyPage} from "@/pages/desktop-only/DesktopOnlyPage";
import {MobileInstallPage} from "@/pages/mobile-install/MobileInstallPage";
import {
	ENTRY_TARGET,
	type EntryTarget,
	resolveEntryTarget,
} from "@/pages/entry/resolveEntryTarget";

const entryScreens: Record<EntryTarget, ComponentType> = {
	[ENTRY_TARGET.AUTH]: AuthPage,
	[ENTRY_TARGET.DESKTOP_ONLY]: DesktopOnlyPage,
	[ENTRY_TARGET.MOBILE_INSTALL]: MobileInstallPage,
};

export const EntryGate = () => {
	const Screen = entryScreens[resolveEntryTarget()];
	return <Screen />;
};
