import React from "react";

export interface RiUserFillIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  glow?: boolean;
}

/**
 * High-Definition, Razor-Sharp Vector Implementation of Remix Icon: `ri-user-fill`
 * Rendered with geometricPrecision for flawless crisp quality on Retina/4K displays.
 */
export function RiUserFillIcon({
  size = 24,
  className = "h-6 w-6",
  glow = false,
  ...props
}: RiUserFillIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      className={`${className} ${glow ? "drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]" : ""}`}
      {...props}
    >
      <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z" />
    </svg>
  );
}

export default RiUserFillIcon;
