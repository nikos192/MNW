import Image from "next/image";

type MonzaLogoProps = {
	className?: string;
	title?: string;
	src?: string;
	priority?: boolean;
};

const DEFAULT_LOGO_SRC = "/brand/monza-logo.png";

export function MonzaLogo({
	className,
	title,
	src = DEFAULT_LOGO_SRC,
	priority = false,
}: MonzaLogoProps) {
	return (
		<span className={className}>
			<Image
				alt={title ?? ""}
				height={768}
				priority={priority}
				src={src}
				style={{
					display: "block",
					height: "100%",
					objectFit: "contain",
					transform: "translateY(var(--logo-shift, -6px)) scale(var(--logo-scale, 1.34))",
					transformOrigin: "center",
					width: "100%",
				}}
				unoptimized
				width={1408}
			/>
		</span>
	);
}
