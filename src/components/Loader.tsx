
type Props = { ready: boolean };

export function Loader({ ready }: Props) {
  if (ready) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#080809]" role="status" aria-live="polite">
      <div className="text-center">
        <p className="label mb-3">Truhlářství Dvořák</p>
        <p className="text-sm text-muted">Připravujeme přesný model…</p>
      </div>
    </div>
  );
}
