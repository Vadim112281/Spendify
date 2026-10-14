import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type {ReactNode} from "react";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60_000,
			retry: 1,
		},
	},
});

type QueryProviderProps = {
	children: ReactNode;
};

export const QueryProvider = ({children}: QueryProviderProps) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
