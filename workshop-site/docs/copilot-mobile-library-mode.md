# Copilot Instructions: Mobile Library Mode + Viewport Switch (React + TypeScript)

## Goal
Add a **Mobile Library Mode** for phone-sized screens, while keeping the existing desktop app unchanged.

- **Auto switch by viewport width** (mobile for narrow screens, desktop otherwise)
- **User override** (auto / mobile / desktop) persisted in `localStorage`
- If a user opens a **deep link hash** on mobile (`#step-3`, `#graph`, etc.), show a **gateway screen**:
  - Open desktop view (force desktop)
  - Copy link (copy current URL)
  - Back to library (clear hash)

## Constraints
- Additive changes only; do **not** refactor existing routing/app logic.
- Use existing Tailwind setup (no new CSS files required).
- Mobile UI should be RTL: `dir="rtl"`.
- Threshold for mobile: `max-width: 900px` (can be adjusted later).

## Where to implement
Assume typical Vite/React project structure:
- Entry file is either `src/main.tsx` (Vite) or `src/index.tsx`.
- Existing app component is `src/App.tsx`.

---

## Step 1: Create `useMediaQuery` hook
Create: `src/hooks/useMediaQuery.ts`

```ts
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const getMatches = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(getMatches);

  useEffect(() => {
    const mql = window.matchMedia(query);

    const onChange = () => setMatches(mql.matches);

    // init
    setMatches(mql.matches);

    // subscribe
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    // fallback for older browsers
    // (still present in DOM typings, but deprecated)
    // eslint-disable-next-line deprecation/deprecation
    mql.addListener(onChange);
    // eslint-disable-next-line deprecation/deprecation
    return () => mql.removeListener(onChange);
  }, [query]);

  return matches;
}
```

---

## Step 2: Create `useViewportMode` hook (auto + override)
Create: `src/hooks/useViewportMode.ts`

```ts
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

export type ViewMode = "mobile" | "desktop";
export type ViewPreference = "auto" | ViewMode;

const STORAGE_KEY = "icomos_view_preference";
const MOBILE_QUERY = "(max-width: 900px)";

function readQueryPreference(): ViewPreference | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const v = p.get("view"); // view=mobile|desktop|auto
  if (v === "mobile" || v === "desktop" || v === "auto") return v;
  return null;
}

function readStoredPreference(): ViewPreference {
  if (typeof window === "undefined") return "auto";
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v === "mobile" || v === "desktop" || v === "auto") return v;
  return "auto";
}

export function useViewportMode() {
  const isNarrow = useMediaQuery(MOBILE_QUERY);

  const [preference, setPreferenceState] = useState<ViewPreference>(() => {
    return readQueryPreference() ?? readStoredPreference();
  });

  const mode: ViewMode = useMemo(() => {
    if (preference === "mobile") return "mobile";
    if (preference === "desktop") return "desktop";
    return isNarrow ? "mobile" : "desktop";
  }, [preference, isNarrow]);

  const setPreference = useCallback((p: ViewPreference) => {
    setPreferenceState(p);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, p);
    }
  }, []);

  const resetPreference = useCallback(() => {
    setPreferenceState("auto");
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "auto");
    }
  }, []);

  // Query param override on load (does not permanently lock unless you keep it)
  useEffect(() => {
    const qp = readQueryPreference();
    if (qp) setPreferenceState(qp);
  }, []);

  return { mode, preference, setPreference, resetPreference, isNarrow };
}
```

---

## Step 3: Create Mobile Library data
Create folder: `src/components/mobile/`  
Create: `src/components/mobile/mobileLibraryData.ts`

> Note: This is an initial working list. Replace with real resource items later if needed.

```ts
export type MobileItem = {
  title: string;
  description?: string;
  href: string; // external URL or "#hash"
  kind?: "external" | "hash";
};

export type MobileSection = {
  title: string;
  items: MobileItem[];
};

export const MOBILE_SECTIONS: MobileSection[] = [
  {
    title: "עיקרי הדברים",
    items: [
      { title: "שלבי CBSA (0-6)", description: "מסגרת השלבים", href: "#step-0", kind: "hash" },
      { title: "כלים", description: "מסך כלים", href: "#tools", kind: "hash" },
    ],
  },
  {
    title: "שאילתות לדוגמה",
    items: [
      { title: "נרטיבים חלופיים", href: "#q-narratives", kind: "hash" },
      { title: "סנטימנט קהילתי", href: "#q-sentiment", kind: "hash" },
      { title: "חינוך והמסרה", href: "#q-education", kind: "hash" },
      { title: "ניתוח סמיוטי", href: "#q-semiotics", kind: "hash" },
      { title: "ליצן החצר", href: "#q-jester", kind: "hash" },
      { title: "מקהלה יוונית", href: "#q-chorus", kind: "hash" },
      { title: "ליצן החצר + מקהלה יוונית", href: "#q-jester-chorus", kind: "hash" },
    ],
  },
  {
    title: "גרף ידע וויזואל",
    items: [
      { title: "יצירת גרף ידע", href: "#graph-create", kind: "hash" },
      { title: "תצוגת גרף", href: "#graph", kind: "hash" },
      { title: "ויזואל", href: "#visual", kind: "hash" },
    ],
  },
];
```

---

## Step 4: Create `MobileLibraryMode` component (library + deep-link gateway)
Create: `src/components/mobile/MobileLibraryMode.tsx`

```tsx
import React, { useMemo, useState } from "react";
import { MOBILE_SECTIONS, MobileSection, MobileItem } from "./mobileLibraryData";

function useHash(): string {
  const [h, setH] = React.useState<string>(() =>
    typeof window === "undefined" ? "" : window.location.hash
  );

  React.useEffect(() => {
    const onChange = () => setH(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return h || "";
}

function fullUrl(): string {
  return typeof window === "undefined" ? "" : window.location.href;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function matchItem(q: string, s: MobileSection, it: MobileItem) {
  if (!q) return true;
  const hay = `${s.title} ${it.title} ${it.description ?? ""}`.toLowerCase();
  return hay.includes(q.toLowerCase());
}

type Props = {
  onOpenDesktop: () => void;
  onBackToAuto: () => void;
  preference: "auto" | "mobile" | "desktop";
};

export default function MobileLibraryMode(props: Props) {
  const hash = useHash();
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState<"ok" | "fail" | "">("");

  const filtered = useMemo(() => {
    return MOBILE_SECTIONS
      .map((s) => ({
        ...s,
        items: s.items.filter((it) => matchItem(q, s, it)),
      }))
      .filter((s) => s.items.length > 0);
  }, [q]);

  const isDeepLink = hash.length > 1;

  if (isDeepLink) {
    return (
      <div className="min-h-screen bg-white text-slate-900" dir="rtl">
        <div className="max-w-xl mx-auto px-4 py-6 space-y-4">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">תצוגת מובייל (שער)</h1>
            <p className="text-sm text-slate-600">
              פתחת קישור ישיר למסך <span className="font-mono">{hash}</span>. למסכים המלאים מומלץ דסקטופ.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 space-y-3">
            <button
              className="w-full rounded-lg bg-slate-900 text-white py-3 text-base"
              onClick={props.onOpenDesktop}
            >
              פתח תצוגת דסקטופ למסך הזה
            </button>

            <button
              className="w-full rounded-lg border border-slate-300 py-3 text-base"
              onClick={async () => {
                const ok = await copyText(fullUrl());
                setCopied(ok ? "ok" : "fail");
                window.setTimeout(() => setCopied(""), 1500);
              }}
            >
              העתק קישור להמשך במחשב
            </button>

            <button
              className="w-full rounded-lg border border-slate-300 py-3 text-base"
              onClick={() => {
                window.location.hash = "";
              }}
            >
              חזור לספריית המשאבים
            </button>

            {copied === "ok" && <div className="text-sm text-emerald-700">הקישור הועתק</div>}
            {copied === "fail" && (
              <div className="text-sm text-rose-700">
                לא הצלחתי להעתיק. אפשר להעתיק ידנית משורת הכתובת.
              </div>
            )}
          </div>

          <button className="text-sm text-slate-600 underline" onClick={props.onBackToAuto}>
            חזרה למצב אוטומטי
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900" dir="rtl">
      <div className="max-w-xl mx-auto px-4 py-6 space-y-4">
        <header className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold">מאגר משאבים לסדנה</h1>
              <p className="text-sm text-slate-600">מובייל מציג גרסת ספרייה. לעבודה מעמיקה עדיף מחשב.</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                className="rounded-lg bg-slate-900 text-white px-3 py-2 text-sm"
                onClick={props.onOpenDesktop}
              >
                תצוגת דסקטופ
              </button>

              <button
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                onClick={props.onBackToAuto}
              >
                אוטומטי
              </button>
            </div>
          </div>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="חיפוש מהיר במשאבים ובשאילתות"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base"
          />
        </header>

        <main className="space-y-3">
          {filtered.map((section) => (
            <details key={section.title} className="rounded-xl border border-slate-200 p-3" open>
              <summary className="cursor-pointer select-none text-base font-semibold">{section.title}</summary>

              <div className="mt-3 space-y-2">
                {section.items.map((it) => (
                  <a
                    key={it.title}
                    href={it.href}
                    className="block rounded-lg border border-slate-200 p-3 active:scale-[0.99]"
                  >
                    <div className="text-base font-medium">{it.title}</div>
                    {it.description && <div className="text-sm text-slate-600 mt-1">{it.description}</div>}

                    <div className="text-xs text-slate-500 mt-2">
                      {it.kind === "hash" ? "מסך פנימי (מומלץ דסקטופ)" : "קישור חיצוני"}
                    </div>
                  </a>
                ))}
              </div>
            </details>
          ))}
        </main>

        <footer className="pt-2 text-xs text-slate-500">
          טיפ: אפשר לפתוח במובייל, להעתיק קישור, ולהמשיך במחשב.
        </footer>
      </div>
    </div>
  );
}
```

---

## Step 5: Create `ViewportSwitch` wrapper
Create: `src/ViewportSwitch.tsx`

```tsx
import React from "react";
import App from "./App";
import { useViewportMode } from "./hooks/useViewportMode";
import MobileLibraryMode from "./components/mobile/MobileLibraryMode";

export default function ViewportSwitch() {
  const { mode, preference, setPreference, resetPreference } = useViewportMode();

  if (mode === "mobile") {
    return (
      <MobileLibraryMode
        preference={preference}
        onOpenDesktop={() => setPreference("desktop")}
        onBackToAuto={resetPreference}
      />
    );
  }

  return <App />;
}
```

---

## Step 6: Wire it into the entry point
Find your entry file (common cases):
- `src/main.tsx` (Vite)
- `src/index.tsx`

Replace rendering of `<App />` with `<ViewportSwitch />`.

Example for `src/main.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ViewportSwitch from "./ViewportSwitch";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ViewportSwitch />
  </React.StrictMode>
);
```

Keep your existing imports if they differ; only swap `App` -> `ViewportSwitch`.

---

## Manual acceptance checklist
1) Desktop width (>900px):
- App renders exactly as before.
- Existing routes work.

2) Mobile width (<=900px):
- Mobile Library renders (search + sections).
- Clicking a hash item navigates to that hash (then gateway appears).

3) Deep link gateway:
- Open `https://.../#step-3` on mobile:
  - Open desktop view forces desktop.
  - Copy link copies full URL.
  - Back to library clears hash and returns to library.

4) Override persistence:
- Force desktop on mobile, refresh: stays desktop.
- Click "Auto": returns to width-based mode.

5) Query param override:
- `?view=desktop` forces desktop.
- `?view=mobile` forces mobile.
- `?view=auto` resets.
