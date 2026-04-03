type MonzaDiamondMarkProps = {
  className?: string;
  title?: string;
};

export function MonzaDiamondMark({ className, title }: MonzaDiamondMarkProps) {
  const labelled = Boolean(title);
  const accessibilityProps = labelled
    ? ({ role: "img", "aria-label": title } as const)
    : ({ "aria-hidden": true } as const);

  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      {...accessibilityProps}
    >
      {labelled ? <title>{title}</title> : null}
      <path
        d="M40 3L77 40L40 77L3 40L40 3Z"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="3"
      />
      <path
        d="M18 46L28 26L40 46L52 26L62 46"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="3"
      />
      <path
        d="M18 34L28 54L40 34L52 54L62 34"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="3"
      />
    </svg>
  );
}