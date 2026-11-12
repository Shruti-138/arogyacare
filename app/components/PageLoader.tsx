// Reusable full-screen loader with a themed spinner, accessible to screen readers
export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen bg-[#eaf7f5] flex items-center justify-center"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0d8f82] border-t-transparent" />
      <span className="sr-only">Loading</span>
    </div>
  );
}