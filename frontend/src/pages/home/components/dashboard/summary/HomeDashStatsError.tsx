import {AppTextButton} from "@/shared/ui/AppTextButton/AppTextButton";

const TRANSACTIONS_LOAD_ERROR_MESSAGE =
	"Could not load transactions. Please try again.";

type HomeDashStatsErrorProps = {
	onRetry?: () => void;
};

export const HomeDashStatsError = ({onRetry}: HomeDashStatsErrorProps) => (
	<>
		<p className="m-0 mt-8 text-14 leading-relaxed text-e-zinc/85">
			{TRANSACTIONS_LOAD_ERROR_MESSAGE}
		</p>
		{onRetry ? (
			<AppTextButton
				type="button"
				emphasis
				className="mt-10"
				onClick={() => {
					void onRetry();
				}}
			>
				Try again
			</AppTextButton>
		) : null}
	</>
);
