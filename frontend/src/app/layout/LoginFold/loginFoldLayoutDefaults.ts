import type {LoginFoldLayout} from "@/app/navigation/types/loginFoldTypes";

// Fallback when Login DOM is unavailable — tuned for AuthPage + EntryLayout SM.
export const getDefaultLoginFoldLayout = (): LoginFoldLayout => {
	const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 390;
	const cardWidth = Math.min(viewportWidth - 40, 340);
	const cardLeft = (viewportWidth - cardWidth) / 2;
	const cardTop = 120;

	return {
		brandIcon: {
			left: cardLeft + 16,
			top: cardTop + 16,
			width: 36,
			height: 36,
		},
		shards: [
			{
				left: cardLeft + 16,
				top: cardTop + 200,
				width: cardWidth - 32,
				height: 44,
				background: "#25252c",
			},
			{
				left: cardLeft + 16,
				top: cardTop + 268,
				width: cardWidth - 32,
				height: 44,
				background: "#35353d",
			},
			{
				left: cardLeft + 16,
				top: cardTop + 332,
				width: cardWidth - 32,
				height: 44,
				background: "#f4f4f5",
				light: true,
			},
		],
	};
};
