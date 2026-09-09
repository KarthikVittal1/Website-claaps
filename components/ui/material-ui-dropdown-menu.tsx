"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRight, ChevronLeft, Check, Circle } from "lucide-react";
import { cn } from "@/lib/cn";

function extractBorderRadius(className?: string): string {
  if (!className) return "12px";
  const arbitraryMatch = className.match(/rounded-\[([^\]]+)\]/);
  if (arbitraryMatch) return arbitraryMatch[1];
  if (className.includes("rounded-none")) return "0px";
  if (className.includes("rounded-sm")) return "0.125rem";
  if (className.includes("rounded-md")) return "0.375rem";
  if (className.includes("rounded-lg")) return "0.5rem";
  if (className.includes("rounded-xl")) return "0.75rem";
  if (className.includes("rounded-2xl")) return "1rem";
  if (className.includes("rounded-3xl")) return "1.5rem";
  if (className.includes("rounded-full")) return "9999px";
  if (className.includes("rounded")) return "0.25rem";
  return "12px";
}

type DrilldownContextType = {
  activePage: string;
  history: string[];
  navigate: (page: string) => void;
  goBack: () => void;
  menuHeight: number | null;
  setMenuHeight: (h: number) => void;
};

const DrilldownContext = React.createContext<DrilldownContextType | null>(null);

function useDrilldown() {
  const ctx = React.useContext(DrilldownContext);
  if (!ctx) throw new Error("Component must be used within a DropdownMenu");
  return ctx;
}

const MINIMUM_PRESS_MS = 300;
type RippleVariant = "trigger" | "item";

const useInternalRipple = ({ disabled = false, variant = "item" }: { disabled?: boolean; variant?: RippleVariant } = {}) => {
  const [pressed, setPressed] = React.useState(false);
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const rippleRef = React.useRef<HTMLDivElement>(null);
  const growAnimationRef = React.useRef<Animation | null>(null);
  const isMounted = React.useRef(true);

  React.useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const startPressAnimation = (event?: React.PointerEvent | React.KeyboardEvent) => {
    if (disabled || !surfaceRef.current || !rippleRef.current) return;
    const rect = surfaceRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    setPressed(true);
    growAnimationRef.current?.cancel();

    let clickX = rect.width / 2;
    let clickY = rect.height / 2;
    if (event && "clientX" in event) {
      clickX = (event as React.PointerEvent).clientX - rect.left;
      clickY = (event as React.PointerEvent).clientY - rect.top;
    }

    if (variant === "trigger") {
      const maxDistance = Math.max(
        Math.hypot(clickX, clickY),
        Math.hypot(rect.width - clickX, clickY),
        Math.hypot(clickX, rect.height - clickY),
        Math.hypot(rect.width - clickX, rect.height - clickY)
      );
      const finalRadius = maxDistance / 0.65;
      const finalSize = finalRadius * 2;
      const initialScale = Math.min(10 / finalSize, 0.04);
      const duration = Math.min(Math.max(600, Math.sqrt(rect.width * rect.height) * 3), 1000);
      rippleRef.current.style.width = `${finalSize}px`;
      rippleRef.current.style.height = `${finalSize}px`;
      const left = clickX - finalRadius;
      const top = clickY - finalRadius;
      const centerLeft = (rect.width - finalSize) / 2;
      const centerTop = (rect.height - finalSize) / 2;
      growAnimationRef.current = rippleRef.current.animate(
        [{ transform: `translate(${left}px, ${top}px) scale(${initialScale})` }, { transform: `translate(${centerLeft}px, ${centerTop}px) scale(1)` }],
        { duration, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" }
      );
    } else {
      const maxDim = Math.max(rect.width, rect.height);
      const softEdgeSize = Math.max(0.35 * maxDim, 75);
      const initialSize = Math.max(2, Math.floor(maxDim * 0.2));
      const hypotenuse = Math.sqrt(rect.width ** 2 + rect.height ** 2);
      const maxRadius = hypotenuse + 10;
      const duration = Math.min(Math.max(400, hypotenuse * 1.5), 1000);
      const scale = (maxRadius + softEdgeSize) / initialSize;
      rippleRef.current.style.width = `${initialSize}px`;
      rippleRef.current.style.height = `${initialSize}px`;
      const startX = clickX - initialSize / 2;
      const startY = clickY - initialSize / 2;
      const endX = (rect.width - initialSize) / 2;
      const endY = (rect.height - initialSize) / 2;
      growAnimationRef.current = rippleRef.current.animate(
        [{ transform: `translate(${startX}px, ${startY}px) scale(1)` }, { transform: `translate(${endX}px, ${endY}px) scale(${scale})` }],
        { duration, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "forwards" }
      );
    }
  };

  const endPressAnimation = async () => {
    const animation = growAnimationRef.current;
    if (animation && typeof animation.currentTime === "number" && animation.currentTime < MINIMUM_PRESS_MS) {
      await new Promise((r) => setTimeout(r, MINIMUM_PRESS_MS - (animation.currentTime as number)));
    }
    if (isMounted.current) setPressed(false);
  };

  return {
    surfaceRef, rippleRef, pressed,
    events: {
      onPointerDown: (e: React.PointerEvent) => { if (e.button === 0) startPressAnimation(e); },
      onPointerUp: endPressAnimation,
      onPointerLeave: endPressAnimation,
      onPointerCancel: endPressAnimation,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          startPressAnimation();
          setTimeout(endPressAnimation, MINIMUM_PRESS_MS);
        }
      },
    },
  };
};

const RippleLayer = ({ pressed, rippleRef, variant = "item" }: { pressed: boolean; rippleRef: React.RefObject<HTMLDivElement | null>; variant?: RippleVariant }) => (
  <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none z-0">
    <div className="absolute inset-0 bg-current opacity-0 transition-opacity duration-200 group-hover:opacity-[0.06] group-data-[highlighted]:opacity-[0.06]" />
    <div
      ref={rippleRef}
      className="absolute rounded-full opacity-0 bg-current"
      style={{
        background: variant === "trigger"
          ? "radial-gradient(closest-side, currentColor 65%, transparent 100%)"
          : "radial-gradient(closest-side, currentColor max(calc(100% - 70px), 65%), transparent 100%)",
        transition: "opacity 375ms linear",
        opacity: pressed ? "0.10" : "0",
        transitionDuration: pressed ? "100ms" : "375ms",
        top: 0,
        left: 0,
      }}
    />
  </div>
);

const M3Styles = () => (
  <style id="m3-dropdown-styles" dangerouslySetInnerHTML={{
    __html: `
    @media (prefers-reduced-motion: no-preference) {
      @keyframes m3-sweep-down { 0% { clip-path: inset(0 0 100% 0 round var(--m3-menu-radius, 12px)); } 100% { clip-path: inset(0 0 0 0 round var(--m3-menu-radius, 12px)); } }
      @keyframes m3-sweep-up { 0% { clip-path: inset(100% 0 0 0 round var(--m3-menu-radius, 12px)); } 100% { clip-path: inset(0 0 0 0 round var(--m3-menu-radius, 12px)); } }
      @keyframes m3-sweep-out-up { 0% { clip-path: inset(0 0 0 0 round var(--m3-menu-radius, 12px)); opacity: 1; } 100% { clip-path: inset(0 0 100% 0 round var(--m3-menu-radius, 12px)); opacity: 0; } }
      @keyframes m3-sweep-out-down { 0% { clip-path: inset(0 0 0 0 round var(--m3-menu-radius, 12px)); opacity: 1; } 100% { clip-path: inset(100% 0 0 0 round var(--m3-menu-radius, 12px)); opacity: 0; } }
      @keyframes m3-item-cinematic { 0% { opacity: 0; transform: translateY(6px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes m3-item-exit { 0% { opacity: 1; } 100% { opacity: 0; } }

      .m3-content[data-state="open"] { opacity: 1; }
      .m3-content[data-state="closed"] { opacity: 0; transition: opacity 150ms linear; }
      .m3-content[data-state="open"][data-side="bottom"] { animation: m3-sweep-down 350ms cubic-bezier(0.1, 0.8, 0.2, 1) forwards; }
      .m3-content[data-state="open"][data-side="top"] { animation: m3-sweep-up 350ms cubic-bezier(0.1, 0.8, 0.2, 1) forwards; }
      .m3-content[data-state="closed"][data-side="bottom"] { animation: m3-sweep-out-up 250ms cubic-bezier(0.4, 0, 1, 1) forwards; }
      .m3-content[data-state="closed"][data-side="top"] { animation: m3-sweep-out-down 250ms cubic-bezier(0.4, 0, 1, 1) forwards; }
      .m3-content[data-state="open"] .m3-item-enter { opacity: 0; animation: m3-item-cinematic 300ms cubic-bezier(0.1, 0.8, 0.2, 1) forwards; animation-delay: calc(var(--m3-stagger, 0) * 25ms + 30ms); }
      .m3-content[data-state="closed"] .m3-item-enter { animation: m3-item-exit 150ms cubic-bezier(0.4, 0, 1, 1) forwards; }
    }
  `}} />
);

const DropdownMenu = ({ onOpenChange, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>) => {
  const [history, setHistory] = React.useState(["main"]);
  const activePage = history[history.length - 1] || "main";
  const [menuHeight, setMenuHeight] = React.useState<number | null>(null);

  const navigate = React.useCallback((page: string) => {
    setHistory((prev) => prev[prev.length - 1] === page ? prev : [...prev, page].slice(-10));
  }, []);

  const goBack = React.useCallback(() => {
    setHistory((prev) => prev.length <= 1 ? prev : prev.slice(0, -1));
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open) { setHistory(["main"]); setMenuHeight(null); }
    onOpenChange?.(open);
  };

  return (
    <DrilldownContext.Provider value={{ activePage, history, navigate, goBack, menuHeight, setMenuHeight }}>
      <DropdownMenuPrimitive.Root onOpenChange={handleOpenChange} {...props} />
    </DrilldownContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ children, className, asChild = false, ...props }, ref) => {
  const { surfaceRef, rippleRef, pressed, events } = useInternalRipple({ variant: "trigger" });

  if (asChild && React.isValidElement(children)) {
    return (
      <DropdownMenuPrimitive.Trigger ref={ref} asChild className={cn("group relative overflow-hidden outline-none", className)} {...events} {...props}>
        {React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
          children: (
            <>
              <RippleLayer rippleRef={rippleRef} pressed={pressed} variant="trigger" />
              <span ref={surfaceRef as React.RefObject<HTMLSpanElement>} className="absolute inset-0 z-0" />
              <div className="relative z-10 flex w-full h-full items-center justify-center gap-[inherit] pointer-events-none">
                {(children.props as React.PropsWithChildren).children}
              </div>
            </>
          ),
        })}
      </DropdownMenuPrimitive.Trigger>
    );
  }

  return (
    <DropdownMenuPrimitive.Trigger ref={ref} asChild {...props}>
      <button className={cn("group relative overflow-hidden outline-none flex items-center justify-center rounded-xl transition-all", className)} {...events}>
        <RippleLayer rippleRef={rippleRef} pressed={pressed} variant="trigger" />
        <span ref={surfaceRef as React.RefObject<HTMLSpanElement>} className="absolute inset-0 z-0" />
        <div className="relative z-10 flex w-full h-full items-center justify-center gap-[inherit] pointer-events-none">{children}</div>
      </button>
    </DropdownMenuPrimitive.Trigger>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, children, ...props }, ref) => {
  const ctx = React.useContext(DrilldownContext);
  const staggeredChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) return React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, { style: { ...(child.props as React.HTMLAttributes<HTMLElement>).style, "--m3-stagger": index } as React.CSSProperties });
    return child;
  });

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        style={{
          height: ctx?.menuHeight ? `${ctx.menuHeight}px` : "auto",
          transition: ctx?.menuHeight ? "height 350ms cubic-bezier(0.2, 0, 0, 1), opacity 200ms linear" : "opacity 200ms linear",
          "--m3-menu-radius": extractBorderRadius(className),
          ...props.style,
        } as React.CSSProperties}
        className={cn(
          "m3-content z-50 rounded-xl bg-white/95 backdrop-blur-xl text-slate-700 shadow-[0px_8px_32px_rgba(0,0,0,0.12)] border border-slate-200/60 outline-none overflow-hidden relative py-1.5",
          "origin-[var(--radix-dropdown-menu-content-transform-origin)]",
          className
        )}
        {...props}
      >
        <M3Styles />
        {staggeredChildren}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean; delayDuration?: number; enterAnimation?: boolean;
  }
>(({ className, inset, children, delayDuration = 150, enterAnimation = true, asChild = false, ...props }, ref) => {
  const { surfaceRef, rippleRef, pressed, events } = useInternalRipple({ disabled: props.disabled, variant: "item" });

  const handleSelect = (e: Event) => {
    const isKeyboard = (e as CustomEvent)?.detail?.originalEvent?.type === "keydown";
    if (delayDuration > 0 && !isKeyboard) {
      e.preventDefault();
      setTimeout(() => props.onSelect?.(e), delayDuration);
    } else {
      props.onSelect?.(e);
    }
  };

  const baseClassName = cn(
    "group relative flex cursor-pointer select-none items-stretch px-0 min-h-[40px] text-sm font-medium tracking-[0.01em] outline-none transition-colors",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-40 overflow-hidden rounded-none",
    enterAnimation && "m3-item-enter",
    className
  );

  if (asChild && React.isValidElement(children)) {
    return (
      <DropdownMenuPrimitive.Item ref={ref} asChild className={baseClassName} {...events} {...props} onSelect={handleSelect}>
        {React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
          children: (
            <div ref={surfaceRef} className={cn("relative flex flex-1 items-center px-3", inset && "pl-10")}>
              <RippleLayer rippleRef={rippleRef} pressed={pressed} variant="item" />
              <span className="relative z-10 flex w-full items-center gap-2.5 pointer-events-none">
                {(children.props as React.PropsWithChildren).children}
              </span>
            </div>
          ),
        })}
      </DropdownMenuPrimitive.Item>
    );
  }

  return (
    <DropdownMenuPrimitive.Item ref={ref} className={baseClassName} {...events} {...props} onSelect={handleSelect}>
      <div ref={surfaceRef} className={cn("relative flex flex-1 items-center px-3", inset && "pl-10")}>
        <RippleLayer rippleRef={rippleRef} pressed={pressed} variant="item" />
        <span className="relative z-10 flex w-full items-center gap-2.5 pointer-events-none">{children}</span>
      </div>
    </DropdownMenuPrimitive.Item>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("h-px w-full m3-item-enter my-1 bg-slate-200/70", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-3 pt-2.5 pb-1 text-[10px] font-black tracking-[0.14em] text-slate-400 uppercase m3-item-enter", inset && "pl-10", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & { delayDuration?: number; enterAnimation?: boolean }
>(({ className, children, checked, enterAnimation = true, ...props }, ref) => {
  const { surfaceRef, rippleRef, pressed, events } = useInternalRipple({ disabled: props.disabled, variant: "item" });
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn("group relative flex cursor-pointer select-none items-stretch px-0 min-h-[40px] text-sm font-medium tracking-[0.01em] outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-40 overflow-hidden rounded-none", enterAnimation && "m3-item-enter", className)}
      checked={checked}
      {...events}
      {...props}
    >
      <div ref={surfaceRef} className="relative flex flex-1 items-center px-3">
        <RippleLayer rippleRef={rippleRef} pressed={pressed} variant="item" />
        <span className="relative z-10 flex w-full items-center gap-2.5 pointer-events-none">
          <span className="flex h-4 w-4 items-center justify-center"><DropdownMenuPrimitive.ItemIndicator><Check className="h-3.5 w-3.5" /></DropdownMenuPrimitive.ItemIndicator></span>
          {children}
        </span>
      </div>
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & { delayDuration?: number; enterAnimation?: boolean }
>(({ className, children, enterAnimation = true, ...props }, ref) => {
  const { surfaceRef, rippleRef, pressed, events } = useInternalRipple({ disabled: props.disabled, variant: "item" });
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn("group relative flex cursor-pointer select-none items-stretch px-0 min-h-[40px] text-sm font-medium tracking-[0.01em] outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-40 overflow-hidden rounded-none", enterAnimation && "m3-item-enter", className)}
      {...events}
      {...props}
    >
      <div ref={surfaceRef} className="relative flex flex-1 items-center px-3">
        <RippleLayer rippleRef={rippleRef} pressed={pressed} variant="item" />
        <span className="relative z-10 flex w-full items-center gap-2.5 pointer-events-none">
          <span className="flex h-4 w-4 items-center justify-center"><DropdownMenuPrimitive.ItemIndicator><Circle className="h-2 w-2 fill-current" /></DropdownMenuPrimitive.ItemIndicator></span>
          {children}
        </span>
      </div>
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuInternalBack = () => {
  const ctx = useDrilldown();
  return (
    <DropdownMenuItem delayDuration={0} onSelect={(e) => { e.preventDefault(); ctx.goBack(); }} enterAnimation={false} style={{ "--m3-stagger": 0 } as React.CSSProperties}>
      <ChevronLeft className="w-4 h-4 text-slate-500" />
      <span>Back</span>
    </DropdownMenuItem>
  );
};

const DropdownMenuPage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { id: string }>(
  ({ id, children, className, ...props }, ref) => {
    const ctx = useDrilldown();
    const { activePage, history, setMenuHeight } = ctx;
    const isActive = activePage === id;
    const isLeft = history.includes(id) && !isActive;
    const [pageNode, setPageNode] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (isActive && pageNode) {
        const observer = new ResizeObserver((entries) => {
          setMenuHeight(entries[0].borderBoxSize?.[0]?.blockSize ?? entries[0].contentRect.height);
        });
        observer.observe(pageNode);
        return () => observer.disconnect();
      }
    }, [isActive, pageNode, setMenuHeight]);

    const staggeredChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) return React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, { style: { ...(child.props as { style?: React.CSSProperties }).style, "--m3-stagger": id === "main" ? index : index + 1 } as React.CSSProperties });
      return child;
    });

    return (
      <div
        ref={(node) => { setPageNode(node); if (typeof ref === "function") ref(node); else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node; }}
        className={cn(
          "w-full absolute top-0 left-0 transition-all duration-[350ms] ease-[cubic-bezier(0.2,0,0,1)] py-0",
          isActive ? "translate-x-0 opacity-100 scale-100 pointer-events-auto"
            : isLeft ? "-translate-x-[20%] opacity-0 scale-[0.98] pointer-events-none"
              : "translate-x-[20%] opacity-0 scale-[0.98] pointer-events-none",
          className
        )}
        {...props}
      >
        {id !== "main" && <DropdownMenuInternalBack />}
        {staggeredChildren}
      </div>
    );
  }
);
DropdownMenuPage.displayName = "DropdownMenuPage";

const DropdownMenuPageTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuItem> & { targetId: string }
>(({ targetId, children, ...props }, ref) => {
  const ctx = useDrilldown();
  return (
    <DropdownMenuItem ref={ref} delayDuration={0} onSelect={(e) => { e.preventDefault(); ctx.navigate(targetId); }} {...props}>
      {children}
      <ChevronRight className="ml-auto w-4 h-4 text-slate-400 opacity-70" />
    </DropdownMenuItem>
  );
});
DropdownMenuPageTrigger.displayName = "DropdownMenuPageTrigger";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuPage,
  DropdownMenuPageTrigger,
};
