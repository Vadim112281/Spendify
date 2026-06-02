import {useCallback, useState} from "react";

import {AuthScreenPanels} from "@/pages/auth/components/AuthScreenPanels";
import {AuthScreenTabs} from "@/pages/auth/components/AuthScreenTabs";
import type {AuthPanelMeasure} from "@/pages/auth/hooks/useAuthPanelHeight";
import {useAuthPanelHeight} from "@/pages/auth/hooks/useAuthPanelHeight";
import {useAuthNavigation} from "@/pages/auth/hooks/useAuthNavigation";
import {EntryBrand, EntryLayout} from "@/shared/ui/EntryLayout/EntryLayout";
import {ENTRY_LAYOUT_SIZE} from "@/shared/ui/EntryLayout/entryLayoutSize";

import styles from "./AuthPage.module.scss";

export const AuthPage = () => {
	const {screen, isTransitioning, onTransitionComplete, navigation} =
		useAuthNavigation();
	const [panelMeasure, setPanelMeasure] = useState<AuthPanelMeasure | null>(
		null,
	);

	const onMeasure = useCallback((next: AuthPanelMeasure) => {
		setPanelMeasure(next);
	}, []);

	const {viewportRef, height} = useAuthPanelHeight({
		measure: panelMeasure,
		screen,
	});

	return (
		<EntryLayout size={ENTRY_LAYOUT_SIZE.SM}>
			<EntryBrand size={ENTRY_LAYOUT_SIZE.SM} className="mb-12" />
			<div className={styles.sectionTabs}>
				<AuthScreenTabs
					screen={screen}
					disabled={isTransitioning}
					navigation={navigation}
				/>
			</div>
			<div className={styles.sectionPanels}>
				<AuthScreenPanels
					screen={screen}
					height={height}
					viewportRef={viewportRef}
					viewportReady={panelMeasure !== null}
					interactionsDisabled={isTransitioning}
					onMeasure={onMeasure}
					onMotionComplete={onTransitionComplete}
					navigation={navigation}
				/>
			</div>
		</EntryLayout>
	);
};
