import { BadgeCheck } from "lucide-react";

export default function VerifiedBadge({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <BadgeCheck
      size={size}
      className="text-sky-500 fill-sky-500"
    />
  );
}
