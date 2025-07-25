import { VisuallyHidden as VisuallyHiddenPrimitive } from "@radix-ui/react-visually-hidden";

export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <VisuallyHiddenPrimitive>{children}</VisuallyHiddenPrimitive>;
}
