import {
  BrainCircuit,
  Briefcase,
  Cloud,
  CloudCog,
  Code2,
  Compass,
  Hammer,
  LifeBuoy,
  MessageSquareQuote,
  Plug,
  ShoppingCart,
  Smartphone,
  UserRound,
  Workflow,
  Boxes,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  Cloud,
  BrainCircuit,
  Workflow,
  Plug,
  Boxes,
  ShoppingCart,
  CloudCog,
  LifeBuoy,
  Compass,
  Hammer,
  MessageSquareQuote,
  UserRound,
  Briefcase,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Compass;
}
