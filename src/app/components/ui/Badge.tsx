interface Props {
  isVerified: boolean;
}

export default function Badge({ isVerified }: Props) {
  if (!isVerified) return null;

  return (
    <span
      aria-label="Doğrulanmış hesap"
      title="Doğrulanmış hesap"
      className="inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}
