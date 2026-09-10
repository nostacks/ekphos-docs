export const LOGO_PATH =
  "M32 0h192v32H32z M0 32h32v32H0z M224 32h32v32H224z M0 64h32v32H0z M224 64h32v32H224z M0 96h256v32H0z M0 128h32v32H0z M0 160h32v32H0z M0 192h32v32H0z M224 192h32v32H224z M32 224h192v32H32z";

export function Logo({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      <path d={LOGO_PATH} fill="currentColor" />
    </svg>
  );
}
