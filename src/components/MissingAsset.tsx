import { AlertTriangle } from "lucide-react";

export function MissingAsset({
  label,
  files,
  className = "",
}: {
  label: string;
  files: string[];
  className?: string;
}) {
  return (
    <div
      role="note"
      className={`flex h-full w-full flex-col justify-center gap-2 rounded-2xl border border-dashed border-coral/50 bg-coral/5 p-5 text-left ${className}`}
      style={{ borderColor: "color-mix(in oklab, var(--coral) 45%, transparent)" }}
    >
      <div
        className="flex items-center gap-2 text-sm font-semibold"
        style={{ color: "var(--coral)" }}
      >
        <AlertTriangle className="size-4 shrink-0" aria-hidden />
        Missing asset — {label}
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        No replacement media was generated. Upload the following file{files.length > 1 ? "s" : ""}{" "}
        to complete this block:
      </p>
      <ul className="space-y-1">
        {files.map((f) => (
          <li key={f} className="font-mono text-[11px] text-muted-foreground">
            • {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
