import {BrowserRouter, Route, Routes} from "react-router-dom";

import {APP_ROUTES} from "@/app/navigation/routes";
import {DevToolsPage} from "@/pages/dev-tools/DevToolsPage";
import {EntryGate} from "@/pages/entry/EntryGate";
import {AppVersionBadge} from "@/shared/ui/AppVersionBadge/AppVersionBadge";

import "./styles/global.css";

export const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path={APP_ROUTES.ENTRY} element={<EntryGate />} />
			<Route path={APP_ROUTES.DEV_TOOLS} element={<DevToolsPage />} />
		</Routes>
		<AppVersionBadge />
	</BrowserRouter>
);
