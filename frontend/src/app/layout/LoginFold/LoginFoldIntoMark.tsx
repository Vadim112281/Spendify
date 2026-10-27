import {motion} from "motion/react";
import {useEffect, useMemo, useState} from "react";

import {
	LOGIN_FOLD_ASSEMBLE_DELAY_S,
	LOGIN_FOLD_EXIT_DURATION_S,
	LOGIN_FOLD_GLOW_DURATION_S,
	LOGIN_FOLD_HERO_DELAY_S,
	LOGIN_FOLD_HERO_DURATION_S,
	LOGIN_FOLD_HOLD_MS,
	LOGIN_FOLD_ICON_EASE,
	LOGIN_FOLD_ICON_FLIGHT_DURATION_S,
	LOGIN_FOLD_SHARD_DURATION_S,
	LOGIN_FOLD_SHARD_EASE,
	LOGIN_FOLD_SHARD_STAGGER_BASE_S,
	LOGIN_FOLD_SHARD_STAGGER_STEP_S,
	LOGIN_FOLD_SPRING_EASE,
	LOGIN_FOLD_WORDMARK_DELAY_S,
	LOGIN_FOLD_WORDMARK_DURATION_S,
} from "@/app/layout/LoginFold/config/loginFoldMotion";
import type {LoginFoldLayout} from "@/app/navigation/types/loginFoldTypes";
import {twx} from "@/shared/utils/twx";

type LoginFoldIntoMarkProps = {
	layout: LoginFoldLayout;
	onComplete: () => void;
};

const HERO_ICON_PX = 64;

export const LoginFoldIntoMark = ({
	layout,
	onComplete,
}: LoginFoldIntoMarkProps) => {
	const [phase, setPhase] = useState<"shards" | "assemble" | "exit" | "done">(
		"shards",
	);
	const [showAssemble, setShowAssemble] = useState(false);

	const center = useMemo(() => {
		if (typeof window === "undefined") {
			return {x: 195, y: 422};
		}
		return {x: window.innerWidth / 2, y: window.innerHeight / 2};
	}, []);

	const brandFlight = useMemo(() => {
		const start = layout.brandIcon;
		const dx = center.x - (start.left + start.width / 2);
		const dy = center.y - (start.top + start.height / 2);
		const scaleEnd = HERO_ICON_PX / start.width;
		return {dx, dy, scaleEnd, start};
	}, [center, layout.brandIcon]);

	useEffect(() => {
		const assembleTimer = window.setTimeout(() => {
			setShowAssemble(true);
			setPhase("assemble");
		}, LOGIN_FOLD_ASSEMBLE_DELAY_S * 1000);

		const iconFlightMs = LOGIN_FOLD_ICON_FLIGHT_DURATION_S * 1000;
		const exitTimer = window.setTimeout(
			() => {
				setPhase("exit");
			},
			LOGIN_FOLD_ASSEMBLE_DELAY_S * 1000 + iconFlightMs + LOGIN_FOLD_HOLD_MS,
		);

		const completeTimer = window.setTimeout(
			() => {
				setPhase("done");
				onComplete();
			},
			LOGIN_FOLD_ASSEMBLE_DELAY_S * 1000 +
				iconFlightMs +
				LOGIN_FOLD_HOLD_MS +
				LOGIN_FOLD_EXIT_DURATION_S * 1000,
		);

		return () => {
			window.clearTimeout(assembleTimer);
			window.clearTimeout(exitTimer);
			window.clearTimeout(completeTimer);
		};
	}, [onComplete]);

	if (phase === "done") {
		return null;
	}

	return (
		<div
			className="pointer-events-auto fixed inset-0 z-100 touch-none bg-e-bg"
			aria-hidden="true"
		>
			{layout.shards.map((shard, index) => {
				const shardCenterX = shard.left + shard.width / 2;
				const shardCenterY = shard.top + shard.height / 2;
				const dx = center.x - shardCenterX;
				const dy = center.y - shardCenterY;
				const rotation = (index - 1) * 8;

				return (
					<motion.div
						key={`${shard.background}-${shard.left}-${shard.top}-${shard.width}`}
						className={twx(
							"absolute rounded-11",
							shard.light && "shadow-[0_4px_14px_rgb(0_0_0/0.2)]",
						)}
						style={{
							left: shard.left,
							top: shard.top,
							width: shard.width,
							height: shard.height,
							background: shard.background,
						}}
						initial={{x: 0, y: 0, scale: 1, rotate: 0, opacity: 1}}
						animate={{
							x: [0, dx * 0.5, dx],
							y: [0, dy * 0.5, dy],
							scale: [1, 0.7, 0.06],
							rotate: [0, rotation * 0.35, rotation],
							opacity: [1, 1, 0],
						}}
						transition={{
							duration: LOGIN_FOLD_SHARD_DURATION_S,
							delay:
								LOGIN_FOLD_SHARD_STAGGER_BASE_S +
								index * LOGIN_FOLD_SHARD_STAGGER_STEP_S,
							ease: LOGIN_FOLD_SHARD_EASE,
						}}
					/>
				);
			})}

			<motion.img
				src="/favicon.svg"
				alt=""
				className="absolute z-22"
				style={{
					left: brandFlight.start.left,
					top: brandFlight.start.top,
					width: brandFlight.start.width,
					height: brandFlight.start.height,
				}}
				initial={{x: 0, y: 0, scale: 1, opacity: 1}}
				animate={{
					x: [0, brandFlight.dx * 0.4, brandFlight.dx],
					y: [0, brandFlight.dy * 0.4, brandFlight.dy],
					scale: [
						1,
						1 + (brandFlight.scaleEnd - 1) * 0.3,
						brandFlight.scaleEnd,
					],
					opacity: [1, 1, 0],
				}}
				transition={{
					duration: LOGIN_FOLD_ICON_FLIGHT_DURATION_S,
					ease: LOGIN_FOLD_ICON_EASE,
				}}
			/>

			{showAssemble && (
				<motion.div
					className="pointer-events-none absolute inset-0 z-25"
					initial={{opacity: 1}}
					animate={{opacity: phase === "exit" ? 0 : 1}}
					transition={{
						duration: LOGIN_FOLD_EXIT_DURATION_S,
						ease: "easeOut",
					}}
				>
					<motion.div
						className="absolute inset-0 z-24 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.14)_0%,transparent_55%)]"
						initial={{opacity: 0}}
						animate={{opacity: [0, 0.85, 0]}}
						transition={{duration: 0.65, delay: 0.35, ease: "easeOut"}}
					/>

					<div className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2">
						<motion.div
							className="absolute top-1/2 left-1/2 size-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,244,245,0.18)_0%,rgba(244,244,245,0.06)_45%,transparent_72%)]"
							initial={{opacity: 0, scale: 0.4}}
							animate={{opacity: 1, scale: 1.15}}
							transition={{
								duration: LOGIN_FOLD_GLOW_DURATION_S,
								ease: LOGIN_FOLD_SPRING_EASE,
							}}
						/>
						<motion.img
							src="/favicon.svg"
							alt=""
							className="relative size-64 drop-shadow-[0_4px_20px_rgb(0_0_0/0.45)]"
							initial={{scale: 0.12, rotate: -14, opacity: 0}}
							animate={{
								scale: [0.12, 1.12, 1],
								rotate: [-14, 3, 0],
								opacity: [0, 1, 1],
							}}
							transition={{
								duration: LOGIN_FOLD_HERO_DURATION_S,
								delay: LOGIN_FOLD_HERO_DELAY_S,
								ease: LOGIN_FOLD_SPRING_EASE,
								times: [0, 0.68, 1],
							}}
						/>
					</div>

					<motion.span
						className="absolute top-[calc(50%+46px)] left-1/2 -translate-x-1/2 text-17 font-semibold tracking-tight-03 whitespace-nowrap text-e-zinc"
						initial={{opacity: 0, y: 18}}
						animate={{opacity: 1, y: 0}}
						transition={{
							duration: LOGIN_FOLD_WORDMARK_DURATION_S,
							delay: LOGIN_FOLD_WORDMARK_DELAY_S,
							ease: LOGIN_FOLD_SPRING_EASE,
						}}
					>
						Spendify
					</motion.span>
				</motion.div>
			)}
		</div>
	);
};
