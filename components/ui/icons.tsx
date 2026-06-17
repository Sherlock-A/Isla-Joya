import type { SVGProps, ReactNode } from "react";

/**
 * Isla Joya thin-line icon set — 1.4px stroke, rounded joins, 24px grid.
 * "Quiet and elegant — never busy."
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const DiamondIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 L20 9.5 L12 21 L4 9.5 Z" />
    <path d="M4 9.5 H20" />
    <path d="M9 9.5 L12 21" />
    <path d="M15 9.5 L12 21" />
    <path d="M9 9.5 L10.5 3" />
    <path d="M15 9.5 L13.5 3" />
  </Base>
);

export const RingIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="15" r="5.4" />
    <path d="M9.3 10 L12 6.4 L14.7 10" />
    <path d="M10 4.4 L12 2.4 L14 4.4 L12 6.6 Z" />
  </Base>
);

export const NecklaceIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5 C 7 13.5, 17 13.5, 20 5" />
    <path d="M12 13 v1.6" />
    <path d="M12 15 L13.6 17 L12 19.4 L10.4 17 Z" />
  </Base>
);

export const EarringsIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 4.5 v2.2" />
    <circle cx="8" cy="9.4" r="2.4" />
    <path d="M16 4.5 v3.4" />
    <circle cx="16" cy="11.4" r="2.4" />
  </Base>
);

export const BraceletIcon = (p: IconProps) => (
  <Base {...p}>
    <ellipse cx="12" cy="12" rx="8.2" ry="5.6" />
    <circle cx="3.8" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="20.2" cy="12" r="1.3" fill="currentColor" stroke="none" />
  </Base>
);

export const CrownIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8 L6.6 15.5 H17.4 L20 8 L15.5 11 L12 5 L8.5 11 Z" />
    <path d="M6.6 18.4 H17.4" />
  </Base>
);

export const DeliveryIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 7 H14 V16 H3 Z" />
    <path d="M14 10 H18 L21 13 V16 H14 Z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </Base>
);

export const WhatsAppIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 20.5 L5 16.5 A8 8 0 1 1 8 19.5 Z" />
    <path d="M9 9.2 c0 3 2.8 5.8 5.8 5.8 c1 0 1.4 -.6 1.4 -1.2 l-1.8 -1 l-1 1 c-1 -.5 -2 -1.5 -2.5 -2.5 l1 -1 l-1 -1.8 c-.6 0 -1.9 .4 -1.9 1.7 Z" />
  </Base>
);

export const SupportIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 13 v-1 a7 7 0 0 1 14 0 v1" />
    <rect x="3.5" y="13" width="3.5" height="5" rx="1.4" />
    <rect x="17" y="13" width="3.5" height="5" rx="1.4" />
    <path d="M19 18 v.6 a2.4 2.4 0 0 1 -2.4 2.4 H13" />
  </Base>
);

export const InstagramGlyph = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </Base>
);

/** Filled, brand-accurate WhatsApp logo for CTAs and the sticky button. */
export const WhatsAppGlyph = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M16 .4C7.4.4.5 7.3.5 15.9c0 2.8.7 5.5 2.1 7.9L.3 31.6l8-2.1c2.3 1.3 4.9 1.9 7.6 1.9 8.6 0 15.5-7 15.5-15.5S24.6.4 16 .4zm0 28.3c-2.4 0-4.7-.6-6.7-1.9l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.4-2.1-2.1-4.6-2.1-7.1C2.9 8.6 8.8 2.8 16 2.8S29.1 8.6 29.1 15.9 23.2 28.7 16 28.7zm8.5-9.7c-.5-.2-2.8-1.4-3.2-1.5-.4-.2-.7-.2-1 .2-.3.5-1.1 1.5-1.4 1.7-.3.3-.5.3-1 .1-.5-.2-2-.7-3.8-2.4-1.4-1.3-2.4-2.8-2.6-3.3-.3-.5 0-.7.2-1 .2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.1-.3 0-.6 0-.8-.1-.2-1-2.5-1.4-3.4-.4-.8-.7-.7-1-.7h-.8c-.3 0-.8.1-1.2.6-.4.5-1.6 1.5-1.6 3.8s1.6 4.4 1.9 4.7c.2.3 3.2 4.9 7.7 6.8 1.1.5 1.9.8 2.6 1 .3.1 2.1-.1 2.6-.7.5-.7.5-1.3.4-1.4-.1-.2-.4-.3-.9-.5z" />
  </svg>
);
