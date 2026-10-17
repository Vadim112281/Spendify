import type {ComponentProps, ReactNode} from "react";
import {Drawer} from "vaul";

import {useScrollLock} from "@/shared/hooks/useScrollLock";
import {AppCloseButton} from "@/shared/ui/AppCloseButton/AppCloseButton";
import {twx} from "@/shared/utils/twx";

type AppPopupSize = "default" | "tall";

const overlayClassNameBySize: Record<AppPopupSize, string> = {
	default: "fixed inset-0 z-100 bg-e-bg/82 backdrop-blur-sm",
	tall: "fixed inset-0 z-110 bg-e-bg/82 backdrop-blur-sm",
};

const contentClassNameBySize: Record<AppPopupSize, string> = {
	default: twx(
		"fixed inset-x-0 bottom-0 z-100 flex max-h-[min(84dvh,620px)] flex-col",
		"rounded-t-18 border border-b-0 border-white/10 bg-e-bg shadow-e-card",
		"pb-inset-bottom-tab",
		"outline-none focus:outline-none",
	),
	tall: twx(
		"fixed inset-x-0 bottom-0 z-110 flex h-[min(94dvh,760px)] max-h-[94dvh] flex-col",
		"rounded-t-18 border border-b-0 border-white/10 bg-e-bg shadow-e-card",
		"pb-inset-bottom-sheet",
		"outline-none focus:outline-none",
	),
};

type AppPopupProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
	description?: string;
	showCloseButton?: boolean;
	showHandle?: boolean;
	size?: AppPopupSize;
	header?: ReactNode;
	children: ReactNode;
};

export const AppPopupClose = (props: ComponentProps<typeof AppCloseButton>) => (
	<Drawer.Close asChild>
		<AppCloseButton {...props} />
	</Drawer.Close>
);

type AppPopupTitleProps = ComponentProps<typeof Drawer.Title>;

export const AppPopupTitle = ({className, ...props}: AppPopupTitleProps) => (
	<Drawer.Title
		className={twx(
			"m-0 text-17 font-semibold tracking-tight-03 text-e-heading",
			className,
		)}
		{...props}
	/>
);

export const AppPopup = ({
	open,
	onOpenChange,
	title,
	description,
	showCloseButton = true,
	showHandle = true,
	size = "default",
	header,
	children,
}: AppPopupProps) => {
	// TODO: Unify scroll lock with vaul (noBodyStyles + useScrollLock is a workaround).
	// Page scroll lives on [data-app-page-scroll], not body; verify iOS scroll bleed and
	// drop the extra lock or move to a single mechanism once target devices are covered.
	useScrollLock(open);

	const useDefaultHeader = header === undefined;

	return (
		<Drawer.Root
			open={open}
			onOpenChange={onOpenChange}
			shouldScaleBackground={false}
			noBodyStyles
			handleOnly
		>
			<Drawer.Portal>
				<Drawer.Overlay className={overlayClassNameBySize[size]} />
				<Drawer.Content className={contentClassNameBySize[size]}>
					{useDefaultHeader ? (
						<div className="flex shrink-0 flex-col px-20">
							{showHandle ? (
								<Drawer.Handle
									className={twx(
										"mx-auto flex w-full shrink-0 cursor-grab touch-none",
										"min-h-44 items-start justify-center pt-10 pb-6 active:cursor-grabbing",
									)}
								>
									<span
										className="h-4 w-32 shrink-0 rounded-full bg-white/12"
										aria-hidden
									/>
								</Drawer.Handle>
							) : null}
							<div className="flex items-start justify-between gap-12 pb-14">
								<div className="min-w-0 pt-2">
									{title ? (
										<AppPopupTitle>{title}</AppPopupTitle>
									) : null}
									{description ? (
										<Drawer.Description className="m-0 mt-4 text-12 text-e-muted">
											{description}
										</Drawer.Description>
									) : null}
								</div>
								{showCloseButton ? (
									<AppPopupClose />
								) : null}
							</div>
						</div>
					) : header !== null ? (
						<div className="flex shrink-0 flex-col">{header}</div>
					) : null}
					<div className="flex min-h-0 flex-1 flex-col">{children}</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};
