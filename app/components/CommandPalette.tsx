"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./Reveal";
import { isSoundEnabled, playClick, subscribe, toggleSound } from "./sound";
import { projects } from "../data/projects";
import { EMAIL } from "../lib/links";

/** Anything outside the palette (e.g. the header hint) opens it with this. */
export function openPalette() {
  window.dispatchEvent(new Event("palette:open"));
}

type Command = {
  id: string;
  group: "navigate" | "projects" | "actions";
  /** Mono command text shown in the row, e.g. "cd ./work" */
  cmd: string;
  desc: string;
  /** Extra match terms beyond cmd + desc. */
  keywords?: string;
  href?: string;
};

const GROUPS: Command["group"][] = ["navigate", "projects", "actions"];

function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const soundOn = useSyncExternalStore(subscribe, isSoundEnabled, () => false);

  // Same SSR-safe mount check as Header — portal target only after hydration.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const commands = useMemo<Command[]>(
    () => [
      { id: "work", group: "navigate", cmd: "cd ./work", desc: "selected work", href: "/#work", keywords: "projects home" },
      { id: "about", group: "navigate", cmd: "cd ./about", desc: "who i am", href: "/about", keywords: "bio" },
      { id: "contact", group: "navigate", cmd: "cd ./contact", desc: "get in touch", href: "/#contact", keywords: "hire email" },
      ...projects.map((p) => ({
        id: p.slug,
        group: "projects" as const,
        cmd: `open ./work/${p.slug}`,
        desc: "case study",
        keywords: `${p.name} ${p.tags.join(" ")}`,
        href: `/work/${p.slug}`,
      })),
      { id: "email", group: "actions", cmd: "pbcopy < email", desc: copied ? "copied ✓" : EMAIL, keywords: "copy mail contact" },
      { id: "sound", group: "actions", cmd: `sound ${soundOn ? "--off" : "--on"}`, desc: soundOn ? "sound is on" : "sound is off", keywords: "toggle audio mute" },
    ],
    [copied, soundOn],
  );

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return commands;
    return commands.filter((c) => {
      const hay = `${c.cmd} ${c.desc} ${c.keywords ?? ""}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [commands, query]);

  const close = useCallback(() => {
    setOpen(false);
    restoreRef.current?.focus();
    restoreRef.current = null;
  }, []);

  const show = useCallback(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setCopied(false);
    setOpen(true);
  }, []);

  // "/" opens from anywhere (except while typing somewhere editable).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditable(e.target)) return;
      e.preventDefault(); // Firefox quick-find
      show();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", show);
    };
  }, [show]);

  // Focus the input, lock body scroll, close on Escape while open.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Keep the active row visible while arrowing through a long list.
  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = useCallback(
    (c: Command, viaKeyboard: boolean) => {
      if (c.id === "email") {
        navigator.clipboard?.writeText(EMAIL);
        if (viaKeyboard) playClick();
        setCopied(true);
        window.setTimeout(close, 900);
        return;
      }
      if (c.id === "sound") {
        // toggleSound voices itself; stay open so the flipped label confirms.
        toggleSound();
        return;
      }
      if (viaKeyboard) playClick();
      if (c.href) router.push(c.href);
      close();
    },
    [router, close],
  );

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const c = filtered[active];
      if (c) run(c, true);
    }
  };

  return mounted
    ? createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="palette-overlay"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: EASE }}
            >
              <motion.div
                className="palette"
                role="dialog"
                aria-modal="true"
                aria-label="command palette"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: EASE }}
              >
                <div className="palette-bar">
                  <span className="prompt">{">_"}</span>
                  <span>command palette</span>
                  <kbd className="palette-kbd">esc</kbd>
                </div>

                <div className="palette-input-row">
                  <span className="palette-prompt" aria-hidden="true">
                    $
                  </span>
                  <input
                    ref={inputRef}
                    className="palette-input"
                    type="text"
                    role="combobox"
                    aria-expanded="true"
                    aria-controls="palette-list"
                    aria-activedescendant={
                      filtered[active] ? `palette-${filtered[active].id}` : undefined
                    }
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="type a command…"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActive(0);
                    }}
                    onKeyDown={onInputKeyDown}
                  />
                </div>

                <div
                  className="palette-list"
                  id="palette-list"
                  role="listbox"
                  ref={listRef}
                >
                  {GROUPS.map((group) => {
                    const items = filtered.filter((c) => c.group === group);
                    if (!items.length) return null;
                    return (
                      <div key={group}>
                        <div className="palette-group-label"># {group}</div>
                        {items.map((c) => {
                          const idx = filtered.indexOf(c);
                          return (
                            <button
                              key={c.id}
                              id={`palette-${c.id}`}
                              type="button"
                              role="option"
                              aria-selected={idx === active}
                              className={`palette-item ${idx === active ? "active" : ""}`}
                              data-own-sound={c.id === "sound" ? "" : undefined}
                              onPointerMove={() => setActive(idx)}
                              onClick={() => run(c, false)}
                            >
                              <span className="palette-caret" aria-hidden="true">
                                {">"}
                              </span>
                              <span className="palette-cmd">{c.cmd}</span>
                              <span
                                className={`palette-desc ${c.id === "email" && !copied ? "preserve-case" : ""}`}
                              >
                                {c.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                  {!filtered.length && (
                    <div className="palette-empty">
                      command not found: {query.trim().toLowerCase()}
                    </div>
                  )}
                </div>

                <div className="palette-foot">
                  <span>
                    <kbd className="palette-kbd">↑↓</kbd> navigate
                  </span>
                  <span>
                    <kbd className="palette-kbd">↵</kbd> run
                  </span>
                  <span>
                    <kbd className="palette-kbd">esc</kbd> close
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )
    : null;
}
