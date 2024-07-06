import DefaultLayout from "@/layouts/default";
import { motion } from "framer-motion";

const LoadingDot = {
	display: "block",
	width: "2rem",
	height: "2rem",
	backgroundColor: "black",
	borderRadius: "50%",
};

const LoadingContainer = {
	width: "10rem",
	height: "5rem",
	display: "flex",
	justifyContent: "space-around",
};

const ContainerVariants = {
	initial: {
		transition: {
			staggerChildren: 0.2,
		},
	},
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const DotVariants = {
	initial: {
		y: "0%",
	},
	animate: {
		y: "100%",
	},
};

const DotTransition = {
	duration: 0.5,
	yoyo: Infinity,
	ease: "easeInOut",
};

export default function Loader() {
	return (
		<div className="relative flex justify-center items-center h-screen overflow-hidden">
			<motion.div
				style={LoadingContainer}
				variants={ContainerVariants}
				initial="initial"
				animate="animate"
			>
				<motion.span
					style={LoadingDot}
					variants={DotVariants}
					transition={DotTransition}
				/>
				<motion.span
					style={LoadingDot}
					variants={DotVariants}
					transition={DotTransition}
				/>
				<motion.span
					style={LoadingDot}
					variants={DotVariants}
					transition={DotTransition}
				/>
			</motion.div>
		</div>
	);
}
