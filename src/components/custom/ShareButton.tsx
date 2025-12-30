"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;

    // 1️⃣ Native Share (mobile browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url,
        });
        return; // ✅ EXIT — no alert
      } catch {
        // User cancelled share → DO NOTHING
        return;
      }
    }

    // 2️⃣ Clipboard API fallback
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied. Open in browser to share.");
        return;
      } catch {
        // move to final fallback
      }
    }

    // 3️⃣ Ultimate fallback (very old browsers)
    try {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      alert("Link copied. Open in browser to share.");
    } catch {
      alert("Unable to share. Please copy the link manually.");
    }
  };

  return (
    <Button
      variant="outline"
      className="border-slate-200"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4 mr-2" />
      Share
    </Button>
  );
}
