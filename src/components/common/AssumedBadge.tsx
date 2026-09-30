import React from 'react';
import { Info } from 'lucide-react';

interface AssumedBadgeProps {
  label?: string;
  tooltip?: string;
  className?: string;
}

export const AssumedBadge: React.FC<AssumedBadgeProps> = ({
  label = "Assumed / Illustrative",
  tooltip = "Engineering approximation for prototype simulation. Authoritative analysis to be verified via Autodesk Forma/Revit.",
  className = "",
}) => {
  return (
    <span
      title={tooltip}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide bg-amber-500/10 text-amber-300 border border-amber-500/25 hover:bg-amber-500/20 transition-colors cursor-help ${className}`}
    >
      <Info className="w-2.5 h-2.5 text-amber-400 shrink-0" />
      <span>{label}</span>
    </span>
  );
};
