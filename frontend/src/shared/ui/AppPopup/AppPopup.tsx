import type {ReactNode} from "react";
import {Drawer} from "vaul";

import {useScrollLock} from "@/shared/hooks/useScrollLock";
import {AppCloseButton} from "@/shared/ui/AppCloseButton/AppCloseButton";
import {twx} from "@/shared/utils/twx";

const overlayClassName = "fixed inset-0 z-100 bg-e-bg/82 backdrop-blur-sm";

const contentClassName = twx(
	"fixed inset-x-0 bottom-0 z-100 flex max-h-[min(84dvh,620px)] flex-col",
	"rounded-t-18 border border-b-0 border-white/10 bg-e-bg shadow-e-card",
	"pb-[max(12px,env(safe-area-inset-bottom))]",
	"outline-none focus:outline-none",
);

const handleClassName = twx(
	"mx-auto flex w-full shrink-0 cursor-grab touch-none",
	"min-h-44 items-start justify-center pt-10 pb-6 active:cursor-grabbing",
);

const handleGripClassName =
	"h-4 w-32 shrink-0 rounded-full bg-white/12";

type AppPopupProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	showCloseButton?: boolean;
	children: ReactNode;
};

export const AppPopup = ({
	open,
	onOpenChange,
	title,
	description,
	showCloseButton = true,
	children,
}: AppPopupProps) => {
	// TODO: Unify scroll lock with vaul (noBodyStyles + useScrollLock is a workaround).
	// Page scroll lives on [data-app-page-scroll], not body; verify iOS scroll bleed and
	// drop the extra lock or move to a single mechanism once target devices are covered.
	useScrollLock(open);

	return (
		<Drawer.Root
			open={open}
			onOpenChange={onOpenChange}
			shouldScaleBackground={false}
			noBodyStyles
			handleOnly
		>
			<Drawer.Portal>
				<Drawer.Overlay className={overlayClassName} />
				<Drawer.Content className={contentClassName}>
					<div className="flex shrink-0 flex-col px-20">
						<Drawer.Handle className={handleClassName}>
							<span className={handleGripClassName} aria-hidden />
						</Drawer.Handle>
						<div className="flex items-start justify-between gap-12 pb-14">
							<div className="min-w-0 pt-2">
								<Drawer.Title className="m-0 text-17 font-semibold tracking-tight-03 text-e-heading">
									{title}
								</Drawer.Title>
								{description ? (
									<Drawer.Description className="m-0 mt-4 text-12 text-e-muted">
										{description}
									</Drawer.Description>
								) : null}
							</div>
							{showCloseButton ? (
								<Drawer.Close asChild>
									<AppCloseButton />
								</Drawer.Close>
							) : null}
						</div>
					</div>
					<div className="flex min-h-0 flex-1 flex-col">{children}</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};
