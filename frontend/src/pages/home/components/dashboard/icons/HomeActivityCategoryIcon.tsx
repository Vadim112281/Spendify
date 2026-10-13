import {
	TRANSACTION_CATEGORY,
	type TransactionCategory,
} from "@/features/transactions/types/transactionCategory";
import {TransactionCategoryIcon} from "@/shared/icons/TransactionCategoryIcon/TransactionCategoryIcon";
import {
	ACTIVITY_CATEGORY,
	type HomeActivityCategory,
} from "@/pages/home/types/homeDashboardTypes";

const HOME_ACTIVITY_TO_TRANSACTION_CATEGORY: Record<
	HomeActivityCategory,
	TransactionCategory
> = {
	[ACTIVITY_CATEGORY.CAFE]: TRANSACTION_CATEGORY.CAFE,
	[ACTIVITY_CATEGORY.SALARY]: TRANSACTION_CATEGORY.SALARY,
	[ACTIVITY_CATEGORY.TRANSPORT]: TRANSACTION_CATEGORY.TRANSPORT,
	[ACTIVITY_CATEGORY.GROCERIES]: TRANSACTION_CATEGORY.GROCERIES,
	[ACTIVITY_CATEGORY.SUBSCRIPTION]: TRANSACTION_CATEGORY.SUBSCRIPTION,
};

type HomeActivityCategoryIconProps = {
	category: HomeActivityCategory;
	size?: "sm" | "md";
};

export const HomeActivityCategoryIcon = ({
	category,
	size = "md",
}: HomeActivityCategoryIconProps) => (
	<TransactionCategoryIcon
		category={HOME_ACTIVITY_TO_TRANSACTION_CATEGORY[category]}
		size={size}
	/>
);
