import {CHART_DONUT_TRACK_COLOR} from "@/features/transactions/config/categoryChartColors";
import type {TransactionInsightsSegment} from "@/features/transactions/services/transactionInsightsService";

const DONUT_RADIUS = 52;
const DONUT_GAP_DEGREES_TYPE_SPLIT = 1;
const DONUT_STROKE_WIDTH = 12;
const VIEWBOX_SIZE = 120;
const CENTER = VIEWBOX_SIZE / 2;
const ROUND_CAP_MIN_ARC_LENGTH = DONUT_STROKE_WIDTH * 1.5;
// Donut-only: tiny real shares still get a visible arc; legend keeps true %.
const MIN_DONUT_VISUAL_SHARE = 0.04;

const getVisualDonutAmounts = (
	segments: TransactionInsightsSegment[],
): number[] => {
	const total = segments.reduce((sum, segment) => sum + segment.amount, 0);
	if (total <= 0) {
		return segments.map(() => 0);
	}

	const shares = segments.map((segment) => segment.amount / total);
	const smallSliceCount = segments.filter(
		(segment, index) =>
			segment.amount > 0 && shares[index] < MIN_DONUT_VISUAL_SHARE,
	).length;

	if (smallSliceCount === 0) {
		return segments.map((segment) => segment.amount);
	}

	const reservedShare = smallSliceCount * MIN_DONUT_VISUAL_SHARE;
	const largeShareSum = segments.reduce((sum, segment, index) => {
		if (segment.amount <= 0 || shares[index] < MIN_DONUT_VISUAL_SHARE) {
			return sum;
		}
		return sum + shares[index];
	}, 0);
	const remainingShare = Math.max(0, 1 - reservedShare);

	if (largeShareSum <= 0) {
		const nonZeroCount = segments.filter(
			(segment) => segment.amount > 0,
		).length;
		const equalShare = nonZeroCount > 0 ? 1 / nonZeroCount : 0;
		return segments.map((segment) =>
			segment.amount > 0 ? equalShare * total : 0,
		);
	}

	return segments.map((segment, index) => {
		if (segment.amount <= 0) {
			return 0;
		}

		const share = shares[index];
		if (share < MIN_DONUT_VISUAL_SHARE) {
			return MIN_DONUT_VISUAL_SHARE * total;
		}

		return (share / largeShareSum) * remainingShare * total;
	});
};

type DonutArc = {
	id: string;
	color: string;
	dashArray: string;
	dashOffset: number;
	lineCap: "round" | "butt";
};

const buildDonutArcs = (segments: TransactionInsightsSegment[]): DonutArc[] => {
	const total = segments.reduce((sum, segment) => sum + segment.amount, 0);
	if (total <= 0) {
		return [];
	}

	const visualAmounts = getVisualDonutAmounts(segments);
	const visualTotal = visualAmounts.reduce((sum, amount) => sum + amount, 0);
	if (visualTotal <= 0) {
		return [];
	}

	const circumference = 2 * Math.PI * DONUT_RADIUS;
	const isTypeSplitDonut =
		segments.length === 2 &&
		segments.every(
			(segment) => segment.id === "expenses" || segment.id === "income",
		);
	const gapDegrees = isTypeSplitDonut ? DONUT_GAP_DEGREES_TYPE_SPLIT : 0;
	const gapLength = (gapDegrees / 360) * circumference;
	const minShare = Math.min(
		...segments
			.filter((segment) => segment.amount > 0)
			.map((segment) => segment.amount / total),
	);
	const twoSegmentTightJunction = isTypeSplitDonut && minShare < 0.1;
	let accumulated = 0;

	return segments
		.map((segment, index) => {
			if (segment.amount <= 0) {
				return null;
			}

			const segmentLength =
				(visualAmounts[index] / visualTotal) * circumference;
			const visibleLength = Math.max(0, segmentLength - gapLength);
			if (visibleLength <= 0) {
				return null;
			}

			const dashArray = `${visibleLength} ${circumference}`;
			const dashOffset = -accumulated;
			accumulated += segmentLength;

			const lineCap: DonutArc["lineCap"] = !isTypeSplitDonut
				? "butt"
				: twoSegmentTightJunction
					? "butt"
					: visibleLength >= ROUND_CAP_MIN_ARC_LENGTH
						? "round"
						: "butt";

			return {
				id: segment.id,
				color: segment.color,
				dashArray,
				dashOffset,
				lineCap,
			};
		})
		.filter((arc): arc is DonutArc => arc !== null);
};

type CategoryDonutChartProps = {
	segments: TransactionInsightsSegment[];
};

export const CategoryDonutChart = ({segments}: CategoryDonutChartProps) => {
	const arcs = buildDonutArcs(segments);

	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: decorative; legend lists category breakdown
		<svg
			className="block size-full -rotate-90"
			viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
			aria-hidden
		>
			<circle
				cx={CENTER}
				cy={CENTER}
				r={DONUT_RADIUS}
				fill="none"
				stroke={CHART_DONUT_TRACK_COLOR}
				strokeWidth={DONUT_STROKE_WIDTH}
			/>
			{arcs.map((arc) => (
				<circle
					key={arc.id}
					cx={CENTER}
					cy={CENTER}
					r={DONUT_RADIUS}
					fill="none"
					stroke={arc.color}
					strokeWidth={DONUT_STROKE_WIDTH}
					strokeLinecap={arc.lineCap}
					strokeDasharray={arc.dashArray}
					strokeDashoffset={arc.dashOffset}
				/>
			))}
		</svg>
	);
};
