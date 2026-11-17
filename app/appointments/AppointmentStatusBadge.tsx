
type AppointmentStatusBadgeProps = {
  status: string;
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  CANCELLED: "bg-red-100 text-red-800",
  REJECTED: "bg-gray-100 text-gray-700",
};

export default function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  const normalizedStatus = status.toUpperCase();

  const styles =
    statusStyles[normalizedStatus] ??
    "bg-gray-100 text-gray-700";

  const label = normalizedStatus
    .toLowerCase()
    .replace(/^\w/, (letter) => letter.toUpperCase());

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {label}
    </span>
  );
}
