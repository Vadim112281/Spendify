import {Navigate} from "react-router-dom";
import {AppShell} from "@/app/layout/AppShell";
import {APP_ROUTES} from "@/app/navigation/routes";
import {hasAuthSession} from "@/shared/services/storage/appStorage";

export const ProtectedAppRoute = () => {
	if (!hasAuthSession()) {
		return <Navigate to={APP_ROUTES.ENTRY} replace />;
	}

	return <AppShell />;
};
