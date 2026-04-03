import Image from "next/image";

type MonzaLogoProps = {
	className?: string;
	title?: string;
	src?: string;
	primaryColor?: string;
	secondaryColor?: string;
};

const DEFAULT_LOGO_SRC = "/brand/monza-logo.png";

export function MonzaLogo({
	className,
	title,
	src = DEFAULT_LOGO_SRC,
}: MonzaLogoProps) {
	return (
		<Image
			alt={title ?? ""}
			className={className}
			height={768}
			priority
			src={src}
			unoptimized
			width={1388}
		/>
	);
}
