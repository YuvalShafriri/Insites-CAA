/* kg.js — Universal Knowledge Graph Engine (RTL/LTR auto-detect) */

(function () {
  "use strict";

  // --- RTL detector ---
  const isRTL = (s) =>
    /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(s || "");

  function sanitizeText(text) {
    if (typeof text !== "string") return text;
    return text.replace(/[""]/g, '"').replace(/['']/g, "'").trim();
  }

  // --- Get DATA ---
  function getGraphData() {
    if (window.__DATA_JSON__ && window.__DATA_JSON__.nodes) {
      return window.__DATA_JSON__;
    }
    if (typeof __DATA_JSON__ !== "undefined" && __DATA_JSON__) {
      return __DATA_JSON__;
    }
    const container = document.getElementById("mynetwork");
    if (container && container.dataset.kgData) {
      try {
        return JSON.parse(container.dataset.kgData);
      } catch (e) {
        console.warn("Failed to parse data from container:", e);
      }
    }
    console.warn("kg: no DATA found");
    return { nodes: [], edges: [] };
  }

  const DATA = getGraphData();

  // --- Detect language from data ---
  const anyRTL =
    Array.isArray(DATA.nodes) &&
    DATA.nodes.some((n) => isRTL(n.name) || isRTL(n.meaning));

  // --- Page direction (auto-detect from data) ---
  (function setupPageDirection() {
    try {
      document.documentElement.lang = anyRTL ? "he" : "en";
      document.documentElement.dir = anyRTL ? "rtl" : "ltr";
      document.body.dir = anyRTL ? "rtl" : "ltr";
      if (anyRTL) document.body.classList.add("rtl");
    } catch (e) {
      console.warn("Page direction setup failed:", e);
    }
  })();

  /* ---------- Canonical color palette (EN) ---------- */
  const COLOR_BY_TYPE = {
    "Natural Phenomenon": {
      background: "rgba(30,144,255,0.7)",
      border: "#1E90FF",
    },
    "Structure / Building": {
      background: "rgba(178,34,34,0.7)",
      border: "#B22222",
    },
    "Architectural Element": {
      background: "rgba(129,199,132,0.7)",
      border: "#81C784",
    },
    Person: { background: "rgba(255,105,180,0.7)", border: "#FF69B4" },
    Event: { background: "rgba(255,160,122,0.7)", border: "#FFA07A" },
    "Story / Narrative": {
      background: "rgba(255,228,181,0.7)",
      border: "#FFE4B5",
    },
    "Social Group": { background: "rgba(255,215,0,0.7)", border: "#FFD700" },
    "Cultural Value": { background: "rgba(255,193,7,0.7)", border: "#FFC107" },
    Value: { background: "rgba(255,193,7,0.7)", border: "#FFC107" },
    Place: { background: "rgba(100,149,237,0.7)", border: "#6495ED" },
    "Artwork / Artefact": {
      background: "rgba(128,0,128,0.7)",
      border: "#800080",
    },
    "Tradition / Custom": {
      background: "rgba(139,69,19,0.7)",
      border: "#8B4513",
    },
    "Historical Period": {
      background: "rgba(0,180,180,0.7)",
      border: "#00B4B4",
    },
    "Religion / Belief": {
      background: "rgba(218,112,214,0.7)",
      border: "#DA70D6",
    },
    "Collective Memory": {
      background: "rgba(75,0,130,0.7)",
      border: "#4B0082",
    },
  };
  const FALLBACK_COLOR = {
    background: "rgba(200,200,200,0.6)",
    border: "#666666",
  };

  // --- Hebrew → canonical type mapping (safety net for Hebrew type inputs) ---
  const CANONICAL_TYPE_MAP = {
    "תופעה טבעית": "Natural Phenomenon",
    "מבנה": "Structure / Building",
    "מבנה / אתר": "Structure / Building",
    "אלמנט אדריכלי": "Architectural Element",
    "דמות": "Person",
    "אדם": "Person",
    "קבוצה חברתית": "Social Group",
    "אירוע": "Event",
    "סיפור": "Story / Narrative",
    "סיפור / נרטיב": "Story / Narrative",
    "נרטיב": "Story / Narrative",
    "ערך": "Cultural Value",
    "ערך תרבותי": "Cultural Value",
    "מקום": "Place",
    "יצירת אמנות": "Artwork / Artefact",
    "יצירת אמנות / ממצא": "Artwork / Artefact",
    "ממצא": "Artwork / Artefact",
    "מסורת": "Tradition / Custom",
    "מסורת / מנהג": "Tradition / Custom",
    "מנהג": "Tradition / Custom",
    "תקופה היסטורית": "Historical Period",
    "דת / אמונה": "Religion / Belief",
    "זיכרון קולקטיבי": "Collective Memory",
  };

  // Canonical English → Hebrew labels (for display when data is RTL)
  const HEBREW_LABEL_BY_CANONICAL = {
    "Natural Phenomenon": "תופעה טבעית",
    "Structure / Building": "מבנה",
    "Architectural Element": "אלמנט אדריכלי",
    Person: "דמות",
    Event: "אירוע",
    "Story / Narrative": "סיפור / נרטיב",
    "Social Group": "קבוצה חברתית",
    "Cultural Value": "ערך תרבותי",
    Value: "ערך תרבותי",
    Place: "מקום",
    "Artwork / Artefact": "יצירת אמנות / ממצא",
    "Tradition / Custom": "מסורת / מנהג",
    "Historical Period": "תקופה היסטורית",
    "Religion / Belief": "דת / אמונה",
    "Collective Memory": "זיכרון קולקטיבי",
    General: "סוג כללי",
  };

  // Dynamic palette for unknown types
  const dynamicTypeColors = {};
  const dynamicPalette = [
    { background: "rgba(244,67,54,0.7)", border: "#F44336" },
    { background: "rgba(76,175,80,0.7)", border: "#4CAF50" },
    { background: "rgba(33,150,243,0.7)", border: "#2196F3" },
    { background: "rgba(255,152,0,0.7)", border: "#FF9800" },
    { background: "rgba(156,39,176,0.7)", border: "#9C27B0" },
    { background: "rgba(121,85,72,0.7)", border: "#795548" },
  ];
  let dynamicIndex = 0;

  // Optional palette override from data
  const TYPE_PALETTE = (DATA && DATA.type_palette) || {};

  function getDynamicColor(typeKey) {
    if (!typeKey) return FALLBACK_COLOR;
    if (!dynamicTypeColors[typeKey]) {
      dynamicTypeColors[typeKey] =
        dynamicPalette[dynamicIndex % dynamicPalette.length];
      dynamicIndex++;
    }
    return dynamicTypeColors[typeKey];
  }

  // Normalize to canonical English type (for color lookup)
  const normalizeCanonicalType = (t) => {
    if (!t) return "General";
    const s = String(t).trim();
    const heb = CANONICAL_TYPE_MAP[s];
    if (heb) return heb;

    const lower = s.toLowerCase();
    if (lower === "value" || lower === "cultural value") {
      return "Cultural Value";
    }
    if (COLOR_BY_TYPE[s]) return s;

    return "General";
  };

  // Ensure arrays
  DATA.nodes = Array.isArray(DATA.nodes) ? DATA.nodes : [];
  DATA.edges = Array.isArray(DATA.edges) ? DATA.edges : [];

  // --- Normalize nodes (bilingual display + colors) ---
  DATA.nodes.forEach((n, index) => {
    if (!n.id) n.id = `node_${index}`;

    n.name = sanitizeText(n.name) || (anyRTL ? `ישות ${n.id}` : `Entity ${n.id}`);
    const originalType = sanitizeText(n.type) || (anyRTL ? "כללי" : "General");

    // Canonical type for color resolution
    const canonicalType = normalizeCanonicalType(originalType);

    // Display type: show in data language
    if (anyRTL) {
      // RTL data → display Hebrew labels
      n.display_type = isRTL(originalType)
        ? originalType
        : HEBREW_LABEL_BY_CANONICAL[canonicalType] || originalType;
    } else {
      // LTR data → display English labels (canonical or as-is)
      n.display_type = canonicalType !== "General" ? canonicalType : originalType;
    }

    n.meaning = sanitizeText(n.meaning || "");

    // Label (keep original name)
    n.label = n.name;

    // Color resolution — priority order:
    // node.color > TYPE_PALETTE[display_type] > COLOR_BY_TYPE[canonicalType] > dynamic > FALLBACK
    let baseColor = n.color;
    if (!baseColor && TYPE_PALETTE[originalType]) {
      baseColor = TYPE_PALETTE[originalType];
    }
    if (!baseColor && COLOR_BY_TYPE[canonicalType]) {
      baseColor = COLOR_BY_TYPE[canonicalType];
    }
    if (!baseColor && canonicalType === "General") {
      baseColor = getDynamicColor(originalType);
    }
    if (!baseColor) baseColor = FALLBACK_COLOR;

    n.color = {
      background: baseColor.background,
      border: baseColor.border,
    };
    n.shape = n.shape || "box";

    if (n.title) delete n.title; // no tooltips
  });

  // --- Validation ---
  try {
    const ids = new Set();
    DATA.nodes.forEach((n) => {
      if (ids.has(String(n.id))) console.warn("Duplicate id:", n.id);
      ids.add(String(n.id));
    });
  } catch (e) {
    console.warn("validation failed:", e);
  }

  // --- Build network ---
  const container = document.getElementById("mynetwork");
  if (!container) {
    console.error("kg: missing #mynetwork container");
    return;
  }

  if (!DATA.nodes.length) {
    container.innerHTML = anyRTL
      ? '<div style="padding:20px;text-align:center;color:#666;">אין נתונים לגרף.</div>'
      : '<div style="padding:20px;text-align:center;color:#666;">No data for graph.</div>';
    return;
  }

  const nodes = new vis.DataSet(DATA.nodes);
  const edges = new vis.DataSet(DATA.edges);

  const fontFace = anyRTL
    ? "Noto Sans Hebrew, Noto Sans, Arial"
    : "Noto Sans, Noto Sans Hebrew, Arial";

  const options = {
    nodes: {
      font: {
        align: "center",
        size: 14,
        color: "#222",
        face: fontFace,
      },
      borderWidth: 1,
      margin: { top: 8, right: 10, bottom: 8, left: 10 },
      widthConstraint: { maximum: 180 },
    },
    edges: {
      arrows: { to: { enabled: true, scaleFactor: 0.45 } },
      font: {
        align: "middle",
        size: 11,
        color: "#555",
        background: "white",
        face: fontFace,
      },
      smooth: {
        type: "cubicBezier",
        forceDirection: "horizontal",
        roundness: 0.5,
      },
      color: {
        color: "#848484",
        highlight: "#333",
        hover: "#555",
        inherit: false,
      },
    },
    layout: { improvedLayout: true },
    physics: {
      enabled: true,
      solver: "repulsion",
      repulsion: {
        nodeDistance: 240,
        centralGravity: 0.04,
        springLength: 22,
        springConstant: 0.003,
        damping: 0.09,
      },
      stabilization: { iterations: 800, fit: true },
    },
    interaction: {
      hover: false,
      multiselect: false,
      dragNodes: true,
    },
  };

  const network = new vis.Network(container, { nodes, edges }, options);

  // --- Info window ---
  const info = document.getElementById("infowindow");
  const closeBtnEl = document.getElementById("closeinfo");

  function hideInfo() {
    if (!info) return;
    info.style.display = "none";
    info.style.visibility = "hidden";
    info.setAttribute("aria-hidden", "true");
  }

  // Set infowindow direction based on data language
  if (info) {
    info.setAttribute("dir", anyRTL ? "rtl" : "ltr");
    info.style.textAlign = anyRTL ? "right" : "left";
  }

  if (closeBtnEl) closeBtnEl.addEventListener("click", hideInfo);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideInfo();
  });

  network.on("click", (params) => {
    if (!info) return;
    if (!params.nodes || !params.nodes.length) {
      hideInfo();
      return;
    }

    const node = nodes.get(params.nodes[0]);
    if (!node) {
      hideInfo();
      return;
    }

    const d = node;
    const nameEl = document.getElementById("info_name");
    const typeEl = document.getElementById("info_type");
    const meaningEl = document.getElementById("info_meaning");

    if (nameEl) nameEl.textContent = d.name || d.label || "";
    if (typeEl) typeEl.textContent = d.display_type || d.type || "";
    if (meaningEl) meaningEl.textContent = d.meaning || "";

    info.style.visibility = "hidden";
    info.style.display = "block";

    const iw = info.offsetWidth || 320;
    const ih = info.offsetHeight || 160;
    const pad = 12;

    const xViewport =
      params.pointer &&
      params.pointer.DOM &&
      typeof params.pointer.DOM.x === "number"
        ? params.pointer.DOM.x
        : window.innerWidth / 2;
    const yViewport =
      params.pointer &&
      params.pointer.DOM &&
      typeof params.pointer.DOM.y === "number"
        ? params.pointer.DOM.y
        : window.innerHeight / 2;

    let x = xViewport + 12;
    let y = yViewport - 12;

    const vw = document.documentElement.clientWidth || window.innerWidth;
    const vh = document.documentElement.clientHeight || window.innerHeight;

    if (x + iw + pad > vw) x = Math.max(pad, xViewport - iw - 12);
    if (y + ih + pad > vh) y = Math.max(pad, vh - ih - pad);
    if (y < pad) y = pad;

    info.style.left = `${x}px`;
    info.style.top = `${y}px`;
    info.style.visibility = "visible";
    info.setAttribute("aria-hidden", "false");
  });

  // Debug access
  window.__KG_DEBUG = { DATA, nodes, edges, network, anyRTL };
})();
