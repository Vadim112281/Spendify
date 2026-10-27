import {getDefaultLoginFoldLayout} from "@/app/layout/LoginFold/loginFoldLayoutDefaults";
import type {LoginFoldLayout} from "@/app/navigation/types/loginFoldTypes";

const measureElement = (
	element: Element,
	background: string,
	light?: boolean,
) => {
	const rect = element.getBoundingClientRect();
	return {
		left: rect.left,
		top: rect.top,
		width: rect.width,
		height: rect.height,
		background,
		...(light ? {light: true} : {}),
	};
};

export const captureLoginFoldLayout = (): LoginFoldLayout => {
	const form = document.querySelector<HTMLFormElement>("[data-auth-form]");
	const email = document.getElementById("login-email");
	const password = document.getElementById("login-password");
	const submit = form?.querySelector<HTMLButtonElement>(
		'button[type="submit"]',
	);
	const brandIcon = form
		?.closest("main")
		?.querySelector<HTMLElement>("img[src='/favicon.svg']");

	if (!email || !password || !submit || !brandIcon) {
		return getDefaultLoginFoldLayout();
	}

	const brandRect = brandIcon.getBoundingClientRect();

	return {
		shards: [
			measureElement(email, "#25252c"),
			measureElement(password, "#35353d"),
			measureElement(submit, "#f4f4f5", true),
		],
		brandIcon: {
			left: brandRect.left,
			top: brandRect.top,
			width: brandRect.width,
			height: brandRect.height,
		},
	};
};
