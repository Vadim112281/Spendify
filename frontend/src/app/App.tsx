import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {APP_ROUTE_SEGMENTS, APP_ROUTES} from "@/app/navigation/routes";
import {ProtectedAppRoute} from "@/app/routing/ProtectedAppRoute";
import {AnalyticsPage} from "@/pages/analytics/AnalyticsPage";
import {DevToolsPage} from "@/pages/dev-tools/DevToolsPage";
import {EntryGate} from "@/pages/entry/EntryGate";
import {HomePage} from "@/pages/home/HomePage";
import {OperationsPage} from "@/pages/operations/OperationsPage";
import {ProfilePage} from "@/pages/profile/ProfilePage";
import {AppVersionBadge} from "@/app/layout/AppVersionBadge/AppVersionBadge";

import "./styles/global.css";

export const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path={APP_ROUTES.ENTRY} element={<EntryGate />} />
			<Route path={APP_ROUTES.DEV_TOOLS} element={<DevToolsPage />} />
			<Route path={APP_ROUTES.APP} element={<ProtectedAppRoute />}>
				<Route
					index
					element={<Navigate to={APP_ROUTES.APP_HOME} replace />}
				/>
				<Route path={APP_ROUTE_SEGMENTS.HOME} element={<HomePage />} />
				<Route
					path={APP_ROUTE_SEGMENTS.OPERATIONS}
					element={<OperationsPage />}
				/>
				<Route
					path={APP_ROUTE_SEGMENTS.ANALYTICS}
					element={<AnalyticsPage />}
				/>
				<Route
					path={APP_ROUTE_SEGMENTS.PROFILE}
					element={<ProfilePage />}
				/>
			</Route>
		</Routes>
		<AppVersionBadge />
	</BrowserRouter>
);
