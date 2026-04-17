import Image from "next/image";

type MonzaLogoProps = {
	className?: string;
	title?: string;
	src?: string;
	priority?: boolean;
};

const DEFAULT_LOGO_SRC = "/brand/LOGO MW TP.png";

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
				height={500}
				priority={priority}
				src={src}
				style={{
					display: "block",
					height: "100%",
					objectFit: "contain",
					width: "100%",
				}}
				unoptimized
				width={500}
			/>
		</span>
	);
}
