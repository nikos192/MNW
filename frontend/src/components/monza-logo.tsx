type MonzaLogoProps = {
  className?: string;
  title?: string;
  primaryColor?: string;
  secondaryColor?: string;
};

export function MonzaLogo({
  className,
  title,
  primaryColor = "#cf0000",
  secondaryColor = "#111111",
}: MonzaLogoProps) {
  const labelled = Boolean(title);
  const accessibilityProps = labelled
    ? ({ role: "img", "aria-label": title } as const)
    : ({ "aria-hidden": true } as const);

  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 520 170"
      xmlns="http://www.w3.org/2000/svg"
      {...accessibilityProps}
    >
      {labelled ? <title>{title}</title> : null}
      <path
        d="M26 150L92 20H142L190 118L238 20H288L354 150"
        stroke={primaryColor}
        strokeLinejoin="miter"
        strokeWidth="22"
      />
      <path
        d="M110 150L176 20H226L274 118L322 20H372L438 150H476L492 20H442L394 118L346 20H296L248 118L200 20H150L84 150"
        stroke={secondaryColor}
        strokeLinejoin="miter"
        strokeWidth="22"
      />
      <path
        d="M76 150L124 56L172 150L220 56L268 150"
        stroke={primaryColor}
        strokeLinejoin="miter"
        strokeWidth="22"
      />
      <path
        d="M304 150L352 56L400 150L448 56"
        stroke={secondaryColor}
        strokeLinejoin="miter"
        strokeWidth="22"
      />
    </svg>
  );
}