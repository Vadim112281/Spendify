import {createRoot} from "react-dom/client";

import {App} from "@/app/App";
import {QueryProvider} from "@/app/query/QueryProvider";

const root = document.getElementById("root");
if (!root) {
	throw new Error("Root element #root not found");
}

createRoot(root).render(
	<QueryProvider>
		<App />
	</QueryProvider>,
);
