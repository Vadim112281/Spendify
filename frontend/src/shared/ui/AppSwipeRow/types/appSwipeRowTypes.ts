export type AppSwipeRowAction = {
	id: string;
	label: string;
	tone: "neutral" | "destructive";
	onPress: () => void;
};
