(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════
     CBSA Assessment Dashboard Runtime
     Pattern: IIFE, innerHTML rendering, same as kg-runtime.js
     Dependencies (loaded by HTML shell): Leaflet (L), D3 (d3)
     ══════════════════════════════════════════════════════════════ */

  /* ── RTL detector (same as kg-runtime) ── */
  var isRTL = function (s) {
    return /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(s || '');
  };

  /* ── Escape HTML for all user content ── */
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ── Color palette ── */
  var COLORS = {
    bg:          '#f5f7fa',
    bgCard:      '#ffffff',
    border:      '#dfe4ea',
    text:        '#1e293b',
    textDim:     '#475569',
    textMuted:   '#94a3b8',
    accent:      '#2563eb',
    accentLight: '#dbeafe',
    green:       '#16a34a',
    greenLight:  '#d1fae5',
    amber:       '#f59e0b',
    amberLight:  '#fef3c7',
    red:         '#ef4444',
    redLight:    '#fee2e2',
    purple:      '#8b5cf6',
    purpleLight: '#ede9fe',
    blue:        '#3b82f6',
    blueLight:   '#dbeafe',
    slate:       '#64748b',
    headerBg:    '#1e293b'
  };

  var CHANGE_COLORS = {
    structure:      '#f59e0b',
    use:            '#3b82f6',
    setting:        '#10b981',
    infrastructure: '#8b5cf6'
  };

  var RATING_COLORS = {
    high:       { bg: '#d1fae5', text: '#065f46', border: '#10b981', emoji: '\uD83D\uDFE2' },
    medium:     { bg: '#fef3c7', text: '#92400e', border: '#f59e0b', emoji: '\uD83D\uDFE1' },
    'low-medium': { bg: '#fef3c7', text: '#92400e', border: '#f59e0b', emoji: '\uD83D\uDFE1' },
    low:        { bg: '#fee2e2', text: '#991b1b', border: '#ef4444', emoji: '\uD83D\uDD34' }
  };

  var EVIDENCE_ICONS = {
    sourced:   '\u2705',
    inferred:  '\u3030\uFE0F',
    uncertain: '\uD83D\uDCAD'
  };

  var CONTEXT_EMOJIS = {
    historical:    '\uD83C\uDFDB\uFE0F',
    spatial:       '\uD83D\uDDFA\uFE0F',
    social:        '\uD83D\uDC65',
    political:     '\u2696\uFE0F',
    economic:      '\uD83D\uDCB0',
    technological: '\u2699\uFE0F',
    environmental: '\uD83C\uDF3F',
    cultural:      '\uD83C\uDFA8',
    religious:     '\uD83D\uDD4C'
  };

  /* ── Bilingual UI strings ── */
  var UI = {
    en: {
      overview: 'Overview', map: 'Map', timeline: 'Timeline',
      contextsValues: 'Contexts & Values', themes: 'Themes',
      integrity: 'Integrity', comparative: 'Comparative',
      significance: 'Significance',
      values: 'Values', contexts: 'Contexts', evidenceRate: 'Evidence Rate',
      dataGaps: 'Data Gaps', sources: 'Sources', description: 'Description',
      integrityRange: 'Integrity Range', noData: 'No data available',
      noCoords: 'Location not specified in source material',
      coordSource: 'Coordinates',
      timelineEmpty: 'No timeline events recorded',
      attribute: 'Attribute', assocValues: 'Associated Values',
      siteSig: 'Significance', implication: 'Implication',
      aspect: 'Aspect', valueExpr: 'Value Expression', rating: 'Rating',
      vulnAnalysis: 'Vulnerability Analysis',
      vulnLegend: '\uD83D\uDD34 = loss severely damages this value, \uD83D\uDFE1 = moderate, \u26AA = minor',
      comparatorSummary: 'Summary', period: 'Period', architect: 'Architect',
      rarity: 'Rarity', documentation: 'Documentation', condition: 'Condition',
      sigStatement: 'Statement of Cultural Significance',
      clearHighlight: 'Clear filter',
      valueThemes: 'Value Themes', contextThemes: 'Context Themes',
      threatThemes: 'Threat Themes',
      processQuality: 'Process Quality', strengths: 'Strengths',
      quickBoosts: 'Quick Boosts', nextSteps: 'Next Steps',
      terrain: 'Terrain', satellite: 'Satellite', streets: 'Streets',
      attributeTable: 'Attribute Table', naraGrid: 'Nara Grid'
    },
    he: {
      overview: '\u05E1\u05E7\u05D9\u05E8\u05D4', map: '\u05DE\u05E4\u05D4',
      timeline: '\u05E6\u05D9\u05E8 \u05D6\u05DE\u05DF',
      contextsValues: '\u05D4\u05E7\u05E9\u05E8\u05D9\u05DD \u05D5\u05E2\u05E8\u05DB\u05D9\u05DD',
      themes: '\u05E0\u05D5\u05E9\u05D0\u05D9\u05DD', integrity: '\u05E9\u05DC\u05DE\u05D5\u05EA',
      comparative: '\u05D4\u05E9\u05D5\u05D5\u05D0\u05D4', significance: '\u05DE\u05E9\u05DE\u05E2\u05D5\u05EA',
      values: '\u05E2\u05E8\u05DB\u05D9\u05DD', contexts: '\u05D4\u05E7\u05E9\u05E8\u05D9\u05DD',
      evidenceRate: '\u05E9\u05D9\u05E2\u05D5\u05E8 \u05E2\u05D3\u05D5\u05EA',
      dataGaps: '\u05E4\u05E2\u05E8\u05D9 \u05DE\u05D9\u05D3\u05E2',
      sources: '\u05DE\u05E7\u05D5\u05E8\u05D5\u05EA', description: '\u05EA\u05D9\u05D0\u05D5\u05E8',
      integrityRange: '\u05D8\u05D5\u05D5\u05D7 \u05E9\u05DC\u05DE\u05D5\u05EA',
      noData: '\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D6\u05DE\u05D9\u05E0\u05D9\u05DD',
      noCoords: '\u05DE\u05D9\u05E7\u05D5\u05DD \u05DC\u05D0 \u05E6\u05D5\u05D9\u05DF \u05D1\u05D7\u05D5\u05DE\u05E8 \u05D4\u05DE\u05E7\u05D5\u05E8',
      coordSource: '\u05E7\u05D5\u05D0\u05D5\u05E8\u05D3\u05D9\u05E0\u05D8\u05D5\u05EA',
      timelineEmpty: '\u05DC\u05D0 \u05E0\u05E8\u05E9\u05DE\u05D5 \u05D0\u05D9\u05E8\u05D5\u05E2\u05D9 \u05E6\u05D9\u05E8 \u05D6\u05DE\u05DF',
      attribute: '\u05DE\u05D0\u05E4\u05D9\u05D9\u05DF', assocValues: '\u05E2\u05E8\u05DB\u05D9\u05DD \u05E7\u05E9\u05D5\u05E8\u05D9\u05DD',
      siteSig: '\u05DE\u05E9\u05DE\u05E2\u05D5\u05EA', implication: '\u05DE\u05E9\u05DE\u05E2\u05D5\u05EA',
      aspect: '\u05D4\u05D9\u05D1\u05D8', valueExpr: '\u05D1\u05D9\u05D8\u05D5\u05D9 \u05E2\u05E8\u05DB\u05D9',
      rating: '\u05D3\u05D9\u05E8\u05D5\u05D2',
      vulnAnalysis: '\u05E0\u05D9\u05EA\u05D5\u05D7 \u05E4\u05D2\u05D9\u05E2\u05D5\u05EA',
      vulnLegend: '\uD83D\uDD34 = \u05D0\u05D1\u05D3\u05DF \u05D7\u05DE\u05D5\u05E8, \uD83D\uDFE1 = \u05D1\u05D9\u05E0\u05D5\u05E0\u05D9, \u26AA = \u05E7\u05DC',
      comparatorSummary: '\u05E1\u05D9\u05DB\u05D5\u05DD',
      period: '\u05EA\u05E7\u05D5\u05E4\u05D4', architect: '\u05D0\u05D3\u05E8\u05D9\u05DB\u05DC',
      rarity: '\u05E0\u05D3\u05D9\u05E8\u05D5\u05EA', documentation: '\u05EA\u05D9\u05E2\u05D5\u05D3',
      condition: '\u05DE\u05E6\u05D1',
      sigStatement: '\u05D4\u05E6\u05D4\u05E8\u05EA \u05DE\u05E9\u05DE\u05E2\u05D5\u05EA \u05EA\u05E8\u05D1\u05D5\u05EA\u05D9\u05EA',
      clearHighlight: '\u05E0\u05E7\u05D4 \u05E1\u05D9\u05E0\u05D5\u05DF',
      valueThemes: '\u05E0\u05D5\u05E9\u05D0\u05D9 \u05E2\u05E8\u05DB\u05D9\u05DD',
      contextThemes: '\u05E0\u05D5\u05E9\u05D0\u05D9 \u05D4\u05E7\u05E9\u05E8\u05D9\u05DD',
      threatThemes: '\u05E0\u05D5\u05E9\u05D0\u05D9 \u05D0\u05D9\u05D5\u05DE\u05D9\u05DD',
      processQuality: '\u05D0\u05D9\u05DB\u05D5\u05EA \u05EA\u05D4\u05DC\u05D9\u05DA',
      strengths: '\u05D7\u05D5\u05D6\u05E7\u05D5\u05EA',
      quickBoosts: '\u05E9\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD \u05DE\u05D4\u05D9\u05E8\u05D9\u05DD',
      nextSteps: '\u05E6\u05E2\u05D3\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD',
      terrain: '\u05E9\u05D8\u05D7', satellite: '\u05DC\u05D5\u05D5\u05D9\u05DF', streets: '\u05E8\u05D7\u05D5\u05D1\u05D5\u05EA',
      attributeTable: '\u05D8\u05D1\u05DC\u05EA \u05DE\u05D0\u05E4\u05D9\u05D9\u05E0\u05D9\u05DD',
      naraGrid: '\u05E8\u05E9\u05EA \u05E0\u05D0\u05E8\u05D4'
    }
  };

  /* ── Tab definitions ── */
  var TAB_DEFS = [
    { id: 'overview',    icon: '\uD83D\uDCCA' },
    { id: 'map',         icon: '\uD83D\uDDFA\uFE0F' },
    { id: 'timeline',    icon: '\u23F3' },
    { id: 'ctxval',      icon: '\uD83D\uDD17' },
    { id: 'themes',      icon: '\uD83C\uDFA8' },
    { id: 'integrity',   icon: '\uD83D\uDEE1\uFE0F' },
    { id: 'comparative', icon: '\uD83D\uDD0D' },
    { id: 'significance',icon: '\u2728' }
  ];

  var TAB_LABELS = {
    overview:    'overview',
    map:         'map',
    timeline:    'timeline',
    ctxval:      'contextsValues',
    themes:      'themes',
    integrity:   'integrity',
    comparative: 'comparative',
    significance:'significance'
  };

  /* ══════════════════════════════════════════════════════════════
     STATE
     ══════════════════════════════════════════════════════════════ */
  var data = {};
  var state = {
    activeTab: 'overview',
    highlight: null, // { type: 'context'|'value'|'comparator', id: string }
    rtl: false,
    lang: 'en',
    mapInstance: null,
    mapReady: false
  };
  var ui = UI.en;

  /* ══════════════════════════════════════════════════════════════
     DATA NORMALIZATION
     Supports both abbreviated (from spec) and full-name keys
     ══════════════════════════════════════════════════════════════ */
  function norm() {
    var d = window.__DASHBOARD_DATA__ || {};
    data.asset = d.asset || {};
    data.dataQuality = d.dataQuality || { sources: [], gaps: [] };

    // Timeline: support both ys/ct abbreviations and full names
    data.timeline = (d.timeline || []).map(function (t) {
      return {
        year:       t.year || '',
        yearStart:  t.ys || t.yearStart || 0,
        label:      t.label || '',
        changeType: t.ct || t.changeType || 'structure'
      };
    });

    // Contexts: rv = relatedValues, ts = timespan
    data.contexts = (d.contexts || []).map(function (c) {
      return {
        id:            c.id || '',
        type:          c.type || '',
        label:         c.label || '',
        relatedValues: c.rv || c.relatedValues || [],
        timespan:      c.ts || c.timespan || ''
      };
    });

    // Values: cat = category, ev = evidence
    data.values = (d.values || []).map(function (v) {
      return {
        id:       v.id || '',
        name:     v.name || '',
        category: v.cat || v.category || '',
        evidence: v.ev || v.evidence || 'uncertain',
        summary:  v.summary || ''
      };
    });

    // Attribute table: vals = values, sig = significance, impl = implication
    data.attrTable = (d.attrTable || d.attributeTable || []).map(function (a) {
      return {
        attribute: a.attr || a.attribute || '',
        values:    a.vals || a.values || [],
        sig:       a.sig || a.significance || '',
        impl:      a.impl || a.implication || ''
      };
    });

    // Nara grid: ve = valueExpression
    data.nara = (d.nara || (d.authenticity && d.authenticity.grid) || []).map(function (n) {
      return {
        aspect:          n.aspect || '',
        desc:            n.desc || n.description || '',
        valueExpression: n.ve || n.valueExpression || '',
        rating:          n.rating || 'medium'
      };
    });
    data.naraSummary = d.naraSummary || (d.authenticity && d.authenticity.summary) || '';

    // Comparative
    var comp = d.comparative || {};
    data.comparative = {
      summary: comp.summary || '',
      sites: (comp.sites || comp.comparators || []).map(function (s) {
        var crit = s.crit || s.criteria || {};
        return {
          name:     s.name || '',
          period:   s.period || '',
          arch:     s.arch || s.architect || '',
          dist:     s.dist || s.distinction || '',
          crit: {
            rarity:        crit.rarity || 'unknown',
            documentation: crit.documentation || 'unknown',
            condition:     crit.condition || 'unknown'
          },
          coordinates: s.coordinates || null
        };
      })
    };

    data.significance = d.significance || '';
    if (typeof d.significance === 'object' && d.significance !== null) {
      data.significance = d.significance.statement || '';
    }

    // Vulnerability
    data.vuln = (d.vuln || d.vulnerability || []).map(function (v) {
      return {
        value:    v.value || '',
        form:     v.form != null ? v.form : 0,
        material: v.material != null ? v.material : 0,
        use:      v.use != null ? v.use : 0,
        setting:  v.setting != null ? v.setting : 0
      };
    });

    // Process quality
    var pq = d.pq || d.processQuality || {};
    data.pq = {
      strengths: pq.strengths || 0,
      boosts:    pq.boosts || pq.quickBoosts || [],
      next:      pq.next || pq.nextSteps || []
    };

    data.stages = d.stages || d.stagesCompleted || [];
    data.kg = d.kg || null;
    data.tabs = d.tabs || [];

    // Coordinates
    data.coordinates = d.coordinates || (d.asset && d.asset.coordinates) || null;
    data.comparatorCoords = d.comparatorCoords || [];
    // Also gather from comparative sites
    if (data.comparatorCoords.length === 0) {
      data.comparative.sites.forEach(function (s) {
        if (s.coordinates && s.coordinates.lat != null) {
          data.comparatorCoords.push({ name: s.name, lat: s.coordinates.lat, lng: s.coordinates.lng });
        }
      });
    }

    // Themes
    data.themes = d.themes || null;
    var hasThemes = false;
    if (data.themes) {
      var vt = (data.themes.valueThemes || []).length;
      var ct = (data.themes.contextThemes || []).length;
      var tt = (data.themes.threatThemes || []).length;
      hasThemes = (vt + ct + tt) >= 2;
    }
    data.hasThemes = hasThemes;

    // Derived KPIs
    data.kpis = {
      valuesCount:  data.values.length,
      contextsCount: data.contexts.length,
      evidenceRate: data.values.length > 0
        ? Math.round(data.values.filter(function (v) { return v.evidence === 'sourced'; }).length / data.values.length * 100)
        : 0,
      gapsCount: data.dataQuality.gaps.length
    };
  }

  /* ══════════════════════════════════════════════════════════════
     STYLE INJECTION
     ══════════════════════════════════════════════════════════════ */
  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = [
      '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }',
      'body { font-family: "DM Sans", "Segoe UI", system-ui, sans-serif; background: ' + COLORS.bg + '; color: ' + COLORS.text + '; line-height: 1.6; }',
      'body.rtl { direction: rtl; text-align: right; }',
      'body.rtl .db-sidebar { border-right: none; border-left: 1px solid ' + COLORS.border + '; }',
      'body.rtl .db-sidebar-tab .db-tab-indicator { left: auto; right: 0; }',

      /* Layout */
      '.db-shell { display: flex; min-height: 100vh; }',
      '.db-sidebar { width: 180px; min-width: 180px; background: #fff; border-right: 1px solid ' + COLORS.border + '; display: flex; flex-direction: column; position: fixed; top: 0; bottom: 0; z-index: 10; overflow-y: auto; }',
      'body.rtl .db-sidebar { left: auto; right: 0; }',
      '.db-main { flex: 1; margin-left: 180px; display: flex; flex-direction: column; min-height: 100vh; }',
      'body.rtl .db-main { margin-left: 0; margin-right: 180px; }',

      /* Header */
      '.db-header { background: ' + COLORS.headerBg + '; color: #fff; padding: 20px 28px; }',
      '.db-header-name { font-size: 1.35rem; font-weight: 700; letter-spacing: -0.01em; }',
      '.db-header-meta { font-size: 0.82rem; color: ' + COLORS.textMuted + '; margin-top: 4px; }',

      /* Sidebar tabs */
      '.db-sidebar-header { padding: 16px 14px 8px; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: ' + COLORS.textMuted + '; font-weight: 600; }',
      '.db-sidebar-tab { display: flex; align-items: center; gap: 8px; padding: 10px 14px; cursor: pointer; font-size: 0.85rem; color: ' + COLORS.textDim + '; border: none; background: none; width: 100%; text-align: inherit; position: relative; transition: background 0.15s, color 0.15s; }',
      '.db-sidebar-tab:hover { background: ' + COLORS.accentLight + '; color: ' + COLORS.accent + '; }',
      '.db-sidebar-tab.is-active { color: ' + COLORS.accent + '; font-weight: 600; background: ' + COLORS.accentLight + '; }',
      '.db-tab-indicator { position: absolute; left: 0; top: 4px; bottom: 4px; width: 3px; border-radius: 0 3px 3px 0; background: ' + COLORS.accent + '; display: none; }',
      '.db-sidebar-tab.is-active .db-tab-indicator { display: block; }',
      '.db-tab-icon { font-size: 1rem; flex-shrink: 0; width: 22px; text-align: center; }',

      /* Content area */
      '.db-content { padding: 24px 28px 40px; flex: 1; max-width: 960px; }',

      /* Cards */
      '.db-card { background: ' + COLORS.bgCard + '; border: 1px solid ' + COLORS.border + '; border-radius: 10px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }',
      '.db-card-title { font-size: 0.95rem; font-weight: 600; margin-bottom: 10px; color: ' + COLORS.text + '; }',

      /* KPI row */
      '.db-kpi-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 20px; }',
      '.db-kpi { background: ' + COLORS.bgCard + '; border: 1px solid ' + COLORS.border + '; border-radius: 10px; padding: 16px; text-align: center; }',
      '.db-kpi-value { font-size: 1.6rem; font-weight: 700; color: ' + COLORS.accent + '; font-family: "JetBrains Mono", ui-monospace, monospace; }',
      '.db-kpi-label { font-size: 0.75rem; color: ' + COLORS.textMuted + '; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.04em; }',

      /* Pills / Badges */
      '.db-pill { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 500; margin: 2px 3px; }',
      '.db-pill-accent { background: ' + COLORS.accentLight + '; color: ' + COLORS.accent + '; }',
      '.db-pill-green { background: ' + COLORS.greenLight + '; color: #065f46; }',
      '.db-pill-amber { background: ' + COLORS.amberLight + '; color: #92400e; }',
      '.db-pill-red { background: ' + COLORS.redLight + '; color: #991b1b; }',
      '.db-pill-purple { background: ' + COLORS.purpleLight + '; color: #5b21b6; }',
      '.db-pill-slate { background: #f1f5f9; color: ' + COLORS.slate + '; }',
      '.db-pill-clickable { cursor: pointer; transition: opacity 0.15s; }',
      '.db-pill-clickable:hover { opacity: 0.75; }',

      /* Rating badge */
      '.db-rating { display: inline-flex; align-items: center; gap: 4px; padding: 2px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 600; }',

      /* Integrity range in overview */
      '.db-integrity-range { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }',
      '.db-integrity-chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 8px; font-size: 0.78rem; border: 1px solid; }',

      /* Lists */
      '.db-list { list-style: none; padding: 0; }',
      '.db-list li { padding: 4px 0; font-size: 0.88rem; color: ' + COLORS.textDim + '; }',
      '.db-list li::before { content: "\u2022"; color: ' + COLORS.accent + '; margin-right: 8px; }',
      'body.rtl .db-list li::before { margin-right: 0; margin-left: 8px; }',

      /* Table */
      '.db-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }',
      '.db-table th { background: ' + COLORS.bg + '; padding: 8px 12px; text-align: inherit; font-weight: 600; border-bottom: 2px solid ' + COLORS.border + '; }',
      '.db-table td { padding: 8px 12px; border-bottom: 1px solid ' + COLORS.border + '; vertical-align: top; }',
      '.db-table tr:last-child td { border-bottom: none; }',

      /* Timeline */
      '.db-timeline { position: relative; padding: 0 0 0 24px; }',
      'body.rtl .db-timeline { padding: 0 24px 0 0; }',
      '.db-timeline::before { content: ""; position: absolute; left: 7px; top: 0; bottom: 0; width: 2px; background: ' + COLORS.border + '; }',
      'body.rtl .db-timeline::before { left: auto; right: 7px; }',
      '.db-tl-event { position: relative; margin-bottom: 0; padding-bottom: 8px; }',
      '.db-tl-dot { position: absolute; left: -21px; top: 6px; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.1); }',
      'body.rtl .db-tl-dot { left: auto; right: -21px; }',
      '.db-tl-year { font-size: 0.78rem; font-weight: 700; color: ' + COLORS.textDim + '; }',
      '.db-tl-label { font-size: 0.88rem; color: ' + COLORS.text + '; }',
      '.db-tl-spacer { border: none; height: 1px; background: transparent; }',

      /* Context / Value cards */
      '.db-ctx-card, .db-val-card { border-left: 3px solid ' + COLORS.accent + '; padding-left: 14px; margin-bottom: 14px; }',
      'body.rtl .db-ctx-card, body.rtl .db-val-card { border-left: none; border-right: 3px solid ' + COLORS.accent + '; padding-left: 0; padding-right: 14px; }',
      '.db-ctx-card.is-highlight, .db-val-card.is-highlight { background: ' + COLORS.accentLight + '; border-radius: 6px; padding: 10px 14px; }',

      /* Highlight banner */
      '.db-highlight-banner { background: ' + COLORS.accentLight + '; border: 1px solid ' + COLORS.accent + '; border-radius: 8px; padding: 8px 14px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; }',
      '.db-highlight-clear { background: none; border: 1px solid ' + COLORS.accent + '; color: ' + COLORS.accent + '; border-radius: 6px; padding: 2px 10px; cursor: pointer; font-size: 0.78rem; }',

      /* Nara card */
      '.db-nara-card { border-radius: 10px; border: 1px solid ' + COLORS.border + '; padding: 16px; margin-bottom: 12px; position: relative; }',
      '.db-nara-left-bar { position: absolute; left: 0; top: 8px; bottom: 8px; width: 4px; border-radius: 0 4px 4px 0; }',
      'body.rtl .db-nara-left-bar { left: auto; right: 0; border-radius: 4px 0 0 4px; }',

      /* Vulnerability heatmap */
      '.db-vuln-table th, .db-vuln-table td { text-align: center; padding: 6px 10px; font-size: 0.8rem; }',
      '.db-vuln-cell { border-radius: 4px; padding: 4px 8px; display: inline-block; min-width: 28px; }',
      '.db-vuln-3 { background: ' + COLORS.redLight + '; color: #991b1b; font-weight: 600; }',
      '.db-vuln-2 { background: ' + COLORS.amberLight + '; color: #92400e; }',
      '.db-vuln-1 { background: #f1f5f9; color: ' + COLORS.slate + '; }',
      '.db-vuln-0 { background: #f8fafc; color: #cbd5e1; }',

      /* Comparative card */
      '.db-comp-card { border: 1px solid ' + COLORS.border + '; border-radius: 10px; padding: 16px; margin-bottom: 14px; }',
      '.db-comp-card.is-highlight { box-shadow: 0 0 0 2px ' + COLORS.accent + '; }',
      '.db-comp-name { font-weight: 600; font-size: 1rem; margin-bottom: 6px; }',
      '.db-comp-meta { font-size: 0.82rem; color: ' + COLORS.textDim + '; margin-bottom: 8px; }',
      '.db-comp-dist { font-size: 0.88rem; color: ' + COLORS.text + '; margin-top: 8px; }',

      /* Significance */
      '.db-sig-block { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: #fff; border-radius: 12px; padding: 28px 24px; font-size: 1.05rem; line-height: 1.7; }',

      /* Map */
      '.db-map-container { height: min(440px, 60vh); border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; }',
      '.db-map-placeholder { height: 440px; display: flex; align-items: center; justify-content: center; background: #f8fafc; border-radius: 10px; border: 1px dashed ' + COLORS.border + '; color: ' + COLORS.textMuted + '; font-size: 0.9rem; }',
      '.db-coord-note { font-size: 0.78rem; color: ' + COLORS.textMuted + '; margin-top: 8px; }',

      /* Theme pills */
      '.db-theme-card { border: 1px solid ' + COLORS.border + '; border-radius: 10px; padding: 16px; margin-bottom: 14px; }',
      '.db-theme-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 6px; vertical-align: middle; }',
      'body.rtl .db-theme-dot { margin-right: 0; margin-left: 6px; }',
      '.db-theme-sub-tabs { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }',
      '.db-theme-sub-tab { padding: 4px 14px; border-radius: 99px; border: 1px solid ' + COLORS.border + '; background: #fff; cursor: pointer; font-size: 0.82rem; }',
      '.db-theme-sub-tab.is-active { background: ' + COLORS.accent + '; color: #fff; border-color: ' + COLORS.accent + '; }',

      /* Section label */
      '.db-section-label { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; color: ' + COLORS.textMuted + '; font-weight: 600; margin-bottom: 10px; margin-top: 18px; }',

      /* Leaflet RTL fix */
      'body.rtl .leaflet-control-layers { direction: ltr; }',
      'body.rtl .leaflet-popup-content { direction: rtl; text-align: right; }',

      /* Responsive */
      '@media (max-width: 768px) {',
      '  .db-sidebar { width: 100%; min-width: 100%; position: relative; flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid ' + COLORS.border + '; }',
      '  body.rtl .db-sidebar { border-left: none; }',
      '  .db-main { margin-left: 0 !important; margin-right: 0 !important; }',
      '  .db-sidebar-header { display: none; }',
      '  .db-sidebar-tab { flex-direction: column; padding: 8px 10px; font-size: 0.72rem; gap: 2px; }',
      '  .db-tab-indicator { display: none !important; }',
      '  .db-sidebar-tab.is-active { border-bottom: 2px solid ' + COLORS.accent + '; }',
      '  .db-content { padding: 16px 14px 32px; }',
      '  .db-kpi-row { grid-template-columns: repeat(2, 1fr); }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ══════════════════════════════════════════════════════════════
     RENDER HELPERS
     ══════════════════════════════════════════════════════════════ */

  function ratingBadge(rating) {
    var r = RATING_COLORS[rating] || RATING_COLORS.medium;
    return '<span class="db-rating" style="background:' + r.bg + ';color:' + r.text + ';">' + r.emoji + ' ' + escapeHtml(rating) + '</span>';
  }

  function critPill(label, value) {
    var cls = 'db-pill ';
    var v = String(value).toLowerCase();
    if (v === 'high') cls += 'db-pill-green';
    else if (v === 'moderate' || v === 'medium') cls += 'db-pill-amber';
    else if (v === 'low') cls += 'db-pill-red';
    else if (v === 'unknown') cls += 'db-pill-slate';
    else cls += 'db-pill-slate';
    return '<span class="' + cls + '">' + escapeHtml(label) + ': ' + escapeHtml(value) + '</span>';
  }

  function valuePill(val, clickable) {
    var cls = 'db-pill db-pill-accent' + (clickable ? ' db-pill-clickable' : '');
    var attr = clickable ? ' data-nav-value="' + escapeHtml(val) + '"' : '';
    return '<span class="' + cls + '"' + attr + '>' + escapeHtml(val) + '</span>';
  }

  function isHighlighted(type, id) {
    if (!state.highlight) return false;
    return state.highlight.type === type && state.highlight.id === id;
  }

  function isValueHighlighted(valueId) {
    if (!state.highlight) return false;
    if (state.highlight.type === 'value' && state.highlight.id === valueId) return true;
    if (state.highlight.type === 'context') {
      // check if this value is related to the highlighted context
      var ctx = data.contexts.filter(function (c) { return c.id === state.highlight.id; })[0];
      if (ctx) {
        var val = data.values.filter(function (v) { return v.id === valueId; })[0];
        if (val && ctx.relatedValues.indexOf(val.category) !== -1) return true;
        if (ctx.relatedValues.indexOf(valueId) !== -1) return true;
      }
    }
    return false;
  }

  function highlightBanner() {
    if (!state.highlight) return '';
    var label = state.highlight.type + ': ' + state.highlight.id;
    return '<div class="db-highlight-banner"><span>\uD83D\uDD17 ' + escapeHtml(label) + '</span>' +
      '<button class="db-highlight-clear" data-action="clear-highlight">' + escapeHtml(ui.clearHighlight) + '</button></div>';
  }

  var VULN_SYMBOLS = { 3: '\u25CF', 2: '\u25D0', 1: '\u25CB', 0: '\u00B7' };

  function vulnCell(level) {
    var sym = VULN_SYMBOLS[level] != null ? VULN_SYMBOLS[level] : '';
    return '<span class="db-vuln-cell db-vuln-' + level + '">' + sym + ' ' + level + '</span>';
  }

  /* ══════════════════════════════════════════════════════════════
     TAB RENDERERS
     ══════════════════════════════════════════════════════════════ */

  /* ── 1. Overview ── */
  function renderOverview() {
    var html = '';

    // KPIs
    html += '<div class="db-kpi-row">';
    html += '<div class="db-kpi"><div class="db-kpi-value">' + data.kpis.valuesCount + '</div><div class="db-kpi-label">' + escapeHtml(ui.values) + '</div></div>';
    html += '<div class="db-kpi"><div class="db-kpi-value">' + data.kpis.contextsCount + '</div><div class="db-kpi-label">' + escapeHtml(ui.contexts) + '</div></div>';
    html += '<div class="db-kpi"><div class="db-kpi-value">' + data.kpis.evidenceRate + '%</div><div class="db-kpi-label">' + escapeHtml(ui.evidenceRate) + '</div></div>';
    html += '<div class="db-kpi"><div class="db-kpi-value">' + data.kpis.gapsCount + '</div><div class="db-kpi-label">' + escapeHtml(ui.dataGaps) + '</div></div>';
    html += '</div>';

    // Asset description
    if (data.asset.description) {
      html += '<div class="db-card"><div class="db-card-title">' + escapeHtml(ui.description) + '</div>';
      html += '<p style="font-size:0.9rem;color:' + COLORS.textDim + '">' + escapeHtml(data.asset.description) + '</p></div>';
    }

    // Integrity range
    if (data.nara.length > 0) {
      html += '<div class="db-card"><div class="db-card-title">' + escapeHtml(ui.integrityRange) + '</div>';
      html += '<div class="db-integrity-range">';
      data.nara.forEach(function (n) {
        var r = RATING_COLORS[n.rating] || RATING_COLORS.medium;
        html += '<span class="db-integrity-chip" style="background:' + r.bg + ';color:' + r.text + ';border-color:' + r.border + '">' + r.emoji + ' ' + escapeHtml(n.aspect) + '</span>';
      });
      html += '</div></div>';
    }

    // Data gaps
    if (data.dataQuality.gaps.length > 0) {
      html += '<div class="db-card"><div class="db-card-title">' + escapeHtml(ui.dataGaps) + '</div>';
      html += '<ul class="db-list">';
      data.dataQuality.gaps.forEach(function (g) {
        html += '<li>' + escapeHtml(g) + '</li>';
      });
      html += '</ul></div>';
    }

    // Sources
    if (data.dataQuality.sources.length > 0) {
      html += '<div class="db-card"><div class="db-card-title">' + escapeHtml(ui.sources) + '</div>';
      html += '<ul class="db-list">';
      data.dataQuality.sources.forEach(function (s) {
        html += '<li>' + escapeHtml(s) + '</li>';
      });
      html += '</ul></div>';
    }

    // Process quality
    if (data.pq.boosts.length > 0 || data.pq.next.length > 0) {
      html += '<div class="db-card"><div class="db-card-title">' + escapeHtml(ui.processQuality) + '</div>';
      if (data.pq.boosts.length > 0) {
        html += '<div class="db-section-label">' + escapeHtml(ui.quickBoosts) + '</div>';
        html += '<ul class="db-list">';
        data.pq.boosts.forEach(function (b) { html += '<li>' + escapeHtml(b) + '</li>'; });
        html += '</ul>';
      }
      if (data.pq.next.length > 0) {
        html += '<div class="db-section-label">' + escapeHtml(ui.nextSteps) + '</div>';
        html += '<ul class="db-list">';
        data.pq.next.forEach(function (n) { html += '<li>' + escapeHtml(n) + '</li>'; });
        html += '</ul>';
      }
      html += '</div>';
    }

    return html;
  }

  /* ── 2. Map ── */
  function renderMap() {
    var coords = data.coordinates;
    var hasCoords = coords && coords.lat != null && coords.lng != null;

    if (!hasCoords) {
      return '<div class="db-map-placeholder">\uD83D\uDCCD ' + escapeHtml(ui.noCoords) + '</div>';
    }

    var html = '<div id="db-map" class="db-map-container"></div>';
    var coordSrc = data.asset.coordinateSource || 'unknown';
    html += '<div class="db-coord-note">\uD83D\uDCCD ' + escapeHtml(ui.coordSource) + ': ' + escapeHtml(coordSrc) + '</div>';

    // Defer map init
    setTimeout(function () { initMap(); }, 50);

    return html;
  }

  function initMap() {
    if (typeof L === 'undefined') return;
    var container = document.getElementById('db-map');
    if (!container) return;

    // Clean up previous instance
    if (state.mapInstance) {
      state.mapInstance.remove();
      state.mapInstance = null;
    }

    var coords = data.coordinates;
    var lat = coords.lat;
    var lng = coords.lng;

    var mapLang = (state.lang === 'he') ? 'iw' : 'en';
    var googleTerrain = L.tileLayer('https://mt1.google.com/vt/lyrs=p&hl=' + mapLang + '&x={x}&y={y}&z={z}', { maxZoom: 20 });
    var googleSatellite = L.tileLayer('https://mt1.google.com/vt/lyrs=y&hl=' + mapLang + '&x={x}&y={y}&z={z}', { maxZoom: 20 });
    var googleStreets = L.tileLayer('https://mt1.google.com/vt/lyrs=m&hl=' + mapLang + '&x={x}&y={y}&z={z}', { maxZoom: 20 });

    var baseMaps = {};
    baseMaps[ui.terrain] = googleTerrain;
    baseMaps[ui.satellite] = googleSatellite;
    baseMaps[ui.streets] = googleStreets;

    var map = L.map(container, { layers: [googleTerrain] }).setView([lat, lng], 12);
    L.control.layers(baseMaps, null, { position: 'topleft' }).addTo(map);

    // Asset marker
    var assetMarker = L.circleMarker([lat, lng], {
      radius: 10, fillColor: '#2563eb', fillOpacity: 0.9,
      color: '#fff', weight: 2
    }).addTo(map);

    var assetPopup = '<strong>' + escapeHtml(data.asset.name) + '</strong>';
    if (data.asset.type) assetPopup += '<br>' + escapeHtml(data.asset.type);
    if (data.asset.period) assetPopup += '<br>' + escapeHtml(data.asset.period);
    if (data.asset.description) assetPopup += '<br><em>' + escapeHtml(data.asset.description) + '</em>';
    assetMarker.bindPopup(assetPopup);

    // Comparator markers
    var bounds = L.latLngBounds([[lat, lng]]);
    var hasComparators = false;

    data.comparatorCoords.forEach(function (comp) {
      if (comp.lat == null || comp.lng == null) return;
      hasComparators = true;
      bounds.extend([comp.lat, comp.lng]);

      var marker = L.circleMarker([comp.lat, comp.lng], {
        radius: 7, fillColor: '#94a3b8', fillOpacity: 0.8,
        color: '#fff', weight: 2
      }).addTo(map);

      var popup = '<strong>' + escapeHtml(comp.name) + '</strong>';
      marker.bindPopup(popup);

      marker.on('click', function () {
        navigateTo('comparative', { type: 'comparator', id: comp.name });
      });
    });

    if (hasComparators) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    state.mapInstance = map;
    state.mapReady = true;

    // Force map to recalculate size
    setTimeout(function () { map.invalidateSize(); }, 100);
  }

  /* ── 3. Timeline ── */
  function renderTimeline() {
    if (data.timeline.length === 0) {
      return '<div class="db-card" style="text-align:center;color:' + COLORS.textMuted + '">' + escapeHtml(ui.timelineEmpty) + '</div>';
    }

    // Sort by yearStart
    var sorted = data.timeline.slice().sort(function (a, b) { return a.yearStart - b.yearStart; });

    // Compute proportional spacing
    var minYear = sorted[0].yearStart;
    var maxYear = sorted[sorted.length - 1].yearStart;
    var span = maxYear - minYear || 1;

    var html = '<div class="db-card"><div class="db-timeline">';

    sorted.forEach(function (evt, i) {
      var dotColor = CHANGE_COLORS[evt.changeType] || COLORS.slate;

      // Proportional spacer
      if (i > 0) {
        var gap = evt.yearStart - sorted[i - 1].yearStart;
        var pxGap = Math.max(8, Math.min(60, Math.round((gap / span) * 200)));
        html += '<div class="db-tl-spacer" style="height:' + pxGap + 'px"></div>';
      }

      html += '<div class="db-tl-event">';
      html += '<div class="db-tl-dot" style="background:' + dotColor + '"></div>';
      html += '<div class="db-tl-year">' + escapeHtml(evt.year) + '</div>';
      html += '<div class="db-tl-label">' + escapeHtml(evt.label) + ' ';
      html += '<span class="db-pill db-pill-slate" style="border-left:3px solid ' + dotColor + '">' + escapeHtml(evt.changeType) + '</span>';
      html += '</div></div>';
    });

    html += '</div></div>';

    // Legend — only show change types present in the data
    var presentTypes = {};
    sorted.forEach(function (evt) { presentTypes[evt.changeType] = true; });
    html += '<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;font-size:0.78rem;color:' + COLORS.textMuted + '">';
    Object.keys(CHANGE_COLORS).forEach(function (type) {
      if (!presentTypes[type]) return;
      html += '<span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + CHANGE_COLORS[type] + ';margin-right:4px;vertical-align:middle"></span>' + escapeHtml(type) + '</span>';
    });
    html += '</div>';

    return html;
  }

  /* ── 4. Contexts & Values ── */
  function renderCtxVal() {
    var html = highlightBanner();

    // Contexts section
    html += '<div class="db-section-label">' + escapeHtml(ui.contexts) + ' (' + data.contexts.length + ')</div>';
    data.contexts.forEach(function (ctx) {
      var emoji = CONTEXT_EMOJIS[ctx.type] || '\uD83D\uDD39';
      var hl = isHighlighted('context', ctx.id) ? ' is-highlight' : '';
      html += '<div class="db-ctx-card' + hl + '" data-ctx-id="' + escapeHtml(ctx.id) + '">';
      html += '<div style="font-weight:600;font-size:0.95rem;margin-bottom:4px">' + emoji + ' ' + escapeHtml(ctx.label) + '</div>';
      if (ctx.timespan) {
        html += '<div style="font-size:0.78rem;color:' + COLORS.textMuted + ';margin-bottom:4px">' + escapeHtml(ctx.timespan) + '</div>';
      }
      // Related value pills
      if (ctx.relatedValues.length > 0) {
        html += '<div style="margin-top:6px">';
        ctx.relatedValues.forEach(function (rv) {
          html += valuePill(rv, true);
        });
        html += '</div>';
      }
      html += '</div>';
    });

    // Values section
    html += '<div class="db-section-label">' + escapeHtml(ui.values) + ' (' + data.values.length + ')</div>';
    data.values.forEach(function (val) {
      var hl = isValueHighlighted(val.id) ? ' is-highlight' : '';
      html += '<div class="db-val-card' + hl + '" data-val-id="' + escapeHtml(val.id) + '">';
      html += '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">';
      html += '<span style="font-weight:600;font-size:0.95rem">' + escapeHtml(val.name) + '</span>';
      html += '<span class="db-pill db-pill-accent">' + escapeHtml(val.category) + '</span>';
      var evIcon = EVIDENCE_ICONS[val.evidence] || '\u2753';
      html += '<span title="' + escapeHtml(val.evidence) + '">' + evIcon + '</span>';
      html += '</div>';
      if (val.summary) {
        html += '<div style="font-size:0.88rem;color:' + COLORS.textDim + ';margin-top:4px">' + escapeHtml(val.summary) + '</div>';
      }
      html += '</div>';
    });

    // Attribute table
    if (data.attrTable.length > 0) {
      html += '<div class="db-section-label">' + escapeHtml(ui.attributeTable) + '</div>';
      html += '<div class="db-card" style="overflow-x:auto"><table class="db-table">';
      html += '<thead><tr><th>' + escapeHtml(ui.attribute) + '</th><th>' + escapeHtml(ui.assocValues) + '</th><th>' + escapeHtml(ui.siteSig) + '</th><th>\uD83D\uDD11 ' + escapeHtml(ui.implication) + '</th></tr></thead>';
      html += '<tbody>';
      data.attrTable.forEach(function (row) {
        html += '<tr>';
        html += '<td style="font-weight:500">' + escapeHtml(row.attribute) + '</td>';
        html += '<td>' + (row.values || []).map(function (v) { return valuePill(v, false); }).join('') + '</td>';
        html += '<td>' + escapeHtml(row.sig) + '</td>';
        html += '<td style="color:' + COLORS.textDim + '">' + escapeHtml(row.impl) + '</td>';
        html += '</tr>';
      });
      html += '</tbody></table></div>';
    }

    return html;
  }

  /* ── 5. Themes ── */
  function renderThemes() {
    if (!data.hasThemes) {
      return '<div class="db-card" style="text-align:center;color:' + COLORS.textMuted + '">' + escapeHtml(ui.noData) + '</div>';
    }

    var themes = data.themes;
    var cats = [];
    if ((themes.valueThemes || []).length > 0) cats.push({ key: 'valueThemes', label: ui.valueThemes, items: themes.valueThemes });
    if ((themes.contextThemes || []).length > 0) cats.push({ key: 'contextThemes', label: ui.contextThemes, items: themes.contextThemes });
    if ((themes.threatThemes || []).length > 0) cats.push({ key: 'threatThemes', label: ui.threatThemes, items: themes.threatThemes });

    // Default to first available sub-tab
    var activeSub = cats[0] ? cats[0].key : '';

    var html = '<div class="db-theme-sub-tabs">';
    cats.forEach(function (cat) {
      var active = cat.key === activeSub ? ' is-active' : '';
      html += '<button class="db-theme-sub-tab' + active + '" data-theme-sub="' + cat.key + '">' + escapeHtml(cat.label) + ' (' + cat.items.length + ')</button>';
    });
    html += '</div>';

    // Render items for active sub-tab
    cats.forEach(function (cat) {
      var display = cat.key === activeSub ? 'block' : 'none';
      html += '<div class="db-theme-group" data-theme-group="' + cat.key + '" style="display:' + display + '">';
      cat.items.forEach(function (theme) {
        var dotColor = theme.color || COLORS.accent;
        html += '<div class="db-theme-card">';
        html += '<div style="font-weight:600;font-size:0.95rem;margin-bottom:6px">';
        html += '<span class="db-theme-dot" style="background:' + escapeHtml(dotColor) + '"></span>';
        html += escapeHtml(theme.label) + '</div>';
        if (theme.description) {
          html += '<div style="font-size:0.85rem;color:' + COLORS.textDim + ';margin-bottom:8px">' + escapeHtml(theme.description) + '</div>';
        }
        // Member pills
        var memberIds = theme.valueIds || theme.contextIds || theme.vulnerabilities || [];
        memberIds.forEach(function (mid) {
          html += '<span class="db-pill db-pill-accent db-pill-clickable" data-nav-member="' + escapeHtml(mid) + '">' + escapeHtml(mid) + '</span>';
        });
        html += '</div>';
      });
      html += '</div>';
    });

    return html;
  }

  /* ── 6. Integrity ── */
  function renderIntegrity() {
    var html = '';

    // Nara summary
    if (data.naraSummary) {
      html += '<div class="db-card" style="font-size:0.95rem;color:' + COLORS.text + ';font-weight:500">' + escapeHtml(data.naraSummary) + '</div>';
    }

    // Nara grid cards
    if (data.nara.length > 0) {
      html += '<div class="db-section-label">' + escapeHtml(ui.naraGrid) + '</div>';
      data.nara.forEach(function (n) {
        var r = RATING_COLORS[n.rating] || RATING_COLORS.medium;
        html += '<div class="db-nara-card">';
        html += '<div class="db-nara-left-bar" style="background:' + r.border + '"></div>';
        html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;padding-left:12px">';
        html += '<div style="flex:1;min-width:200px">';
        html += '<div style="font-weight:600;font-size:0.95rem;margin-bottom:4px">' + escapeHtml(n.aspect) + '</div>';
        html += '<div style="font-size:0.85rem;color:' + COLORS.textDim + ';margin-bottom:6px">' + escapeHtml(n.desc) + '</div>';
        if (n.valueExpression) {
          html += '<div style="font-size:0.82rem;color:' + COLORS.textMuted + '">' + escapeHtml(ui.valueExpr) + ': ' + escapeHtml(n.valueExpression) + '</div>';
        }
        html += '</div>';
        html += '<div>' + ratingBadge(n.rating) + '</div>';
        html += '</div></div>';
      });
    }

    // Vulnerability heatmap
    if (data.vuln.length > 0) {
      html += '<div class="db-section-label">\uD83D\uDD34 ' + escapeHtml(ui.vulnAnalysis) + '</div>';
      html += '<div style="font-size:0.78rem;color:' + COLORS.textMuted + ';margin-bottom:10px">' + escapeHtml(ui.vulnLegend) + '</div>';

      // Build nara aspect headers from data
      var aspects = ['Form & Design', 'Materials', 'Use & Function', 'Setting'];
      var naraAspectShort = ['form', 'material', 'use', 'setting'];

      html += '<div class="db-card" style="overflow-x:auto"><table class="db-table db-vuln-table">';
      html += '<thead><tr><th></th>';
      aspects.forEach(function (a, i) {
        // Try to find matching nara to get its rating
        var naraMatch = data.nara.filter(function (n) {
          return n.aspect.toLowerCase().indexOf(naraAspectShort[i]) !== -1;
        })[0];
        var ratingStr = naraMatch ? ' (' + naraMatch.rating + ')' : '';
        html += '<th>' + escapeHtml(a) + '<br><span style="font-weight:400;font-size:0.72rem;color:' + COLORS.textMuted + '">' + escapeHtml(ratingStr) + '</span></th>';
      });
      html += '</tr></thead><tbody>';

      data.vuln.forEach(function (row) {
        html += '<tr>';
        html += '<td style="font-weight:500;text-align:inherit">' + escapeHtml(row.value) + '</td>';
        html += '<td>' + vulnCell(row.form) + '</td>';
        html += '<td>' + vulnCell(row.material) + '</td>';
        html += '<td>' + vulnCell(row.use) + '</td>';
        html += '<td>' + vulnCell(row.setting) + '</td>';
        html += '</tr>';
      });

      html += '</tbody></table></div>';
    }

    return html;
  }

  /* ── 7. Comparative ── */
  function renderComparative() {
    var html = '';
    var sites = data.comparative.sites;

    if (sites.length === 0) {
      return '<div class="db-card" style="text-align:center;color:' + COLORS.textMuted + '">' + escapeHtml(ui.noData) + '</div>';
    }

    // Summary
    if (data.comparative.summary) {
      html += '<div class="db-card"><div class="db-card-title">' + escapeHtml(ui.comparatorSummary) + '</div>';
      html += '<p style="font-size:0.9rem;color:' + COLORS.textDim + '">' + escapeHtml(data.comparative.summary) + '</p></div>';
    }

    // Per-comparator cards
    sites.forEach(function (site) {
      var hl = isHighlighted('comparator', site.name) ? ' is-highlight' : '';
      html += '<div class="db-comp-card' + hl + '" data-comp-name="' + escapeHtml(site.name) + '">';
      html += '<div class="db-comp-name">' + escapeHtml(site.name) + '</div>';
      html += '<div class="db-comp-meta">';
      if (site.period) html += escapeHtml(ui.period) + ': ' + escapeHtml(site.period);
      if (site.arch) html += ' &middot; ' + escapeHtml(ui.architect) + ': ' + escapeHtml(site.arch);
      html += '</div>';

      // Criteria pills
      html += '<div style="margin-top:6px">';
      html += critPill(ui.rarity, site.crit.rarity);
      html += critPill(ui.documentation, site.crit.documentation);
      html += critPill(ui.condition, site.crit.condition);
      html += '</div>';

      if (site.dist) {
        html += '<div class="db-comp-dist">' + escapeHtml(site.dist) + '</div>';
      }
      html += '</div>';
    });

    return html;
  }

  /* ── 8. Significance ── */
  function renderSignificance() {
    if (!data.significance) {
      return '<div class="db-card" style="text-align:center;color:' + COLORS.textMuted + '">' + escapeHtml(ui.noData) + '</div>';
    }
    return '<div class="db-card-title" style="margin-bottom:12px">' + escapeHtml(ui.sigStatement) + '</div>' +
      '<div class="db-sig-block">' + escapeHtml(data.significance) + '</div>';
  }

  /* ══════════════════════════════════════════════════════════════
     TAB DISPATCH
     ══════════════════════════════════════════════════════════════ */
  var TAB_RENDERERS = {
    overview:     renderOverview,
    map:          renderMap,
    timeline:     renderTimeline,
    ctxval:       renderCtxVal,
    themes:       renderThemes,
    integrity:    renderIntegrity,
    comparative:  renderComparative,
    significance: renderSignificance
  };

  /* ══════════════════════════════════════════════════════════════
     GENERIC DYNAMIC TAB RENDERERS
     ══════════════════════════════════════════════════════════════ */

  /* ── Entity name map for auto-linking in dynamic tabs ── */
  var entityNameMap = {};

  function buildEntityNameMap() {
    entityNameMap = {};
    if (data.asset && data.asset.name) entityNameMap[data.asset.name] = '__asset__';
    (data.comparative.sites || []).forEach(function (s) {
      if (s.name) entityNameMap[s.name] = s.name;
    });
  }

  function linkifyCell(cellText) {
    var escaped = escapeHtml(cellText);
    var match = entityNameMap[String(cellText)];
    if (match == null) return escaped;
    if (match === '__asset__') {
      return '<button style="background:none;border:none;color:' + COLORS.accent + ';cursor:pointer;font:inherit;text-decoration:underline;padding:0" data-nav-entity="map">' + escaped + '</button>';
    }
    return '<button style="background:none;border:none;color:' + COLORS.accent + ';cursor:pointer;font:inherit;text-decoration:underline;padding:0" data-nav-entity="comparative" data-nav-entity-id="' + escapeHtml(match) + '">' + escaped + '</button>';
  }

  function renderGenericTable(tabData) {
    if (!tabData || !tabData.columns || !tabData.rows) return '';
    var html = '<div class="db-card" style="overflow-x:auto"><table class="db-table">';
    html += '<thead><tr>';
    tabData.columns.forEach(function (col) {
      html += '<th>' + escapeHtml(col) + '</th>';
    });
    html += '</tr></thead><tbody>';
    tabData.rows.forEach(function (row) {
      html += '<tr>';
      (row || []).forEach(function (cell) {
        html += '<td>' + linkifyCell(cell) + '</td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }

  function renderGenericCards(tabData) {
    if (!tabData || !tabData.cards) return '';
    var html = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px">';
    tabData.cards.forEach(function (card) {
      var level = String(card.level || '').toLowerCase();
      var borderColor = COLORS.accent;
      if (level === 'well-grounded' || level === 'strong') borderColor = COLORS.green;
      else if (level === 'supported' || level === 'moderate') borderColor = COLORS.amber;
      else if (level === 'asserted' || level === 'weak') borderColor = COLORS.red;

      html += '<div class="db-card" style="border-left:4px solid ' + borderColor + '">';
      html += '<div style="font-weight:600;font-size:0.95rem;margin-bottom:4px">' + escapeHtml(card.title || '') + '</div>';
      if (card.subtitle) {
        html += '<div style="font-size:0.82rem;color:' + COLORS.textMuted + ';margin-bottom:6px">' + escapeHtml(card.subtitle) + '</div>';
      }
      if (card.body) {
        html += '<div style="font-size:0.88rem;color:' + COLORS.textDim + '">' + escapeHtml(card.body) + '</div>';
      }
      if (card.badges && card.badges.length > 0) {
        html += '<div style="margin-top:8px">';
        card.badges.forEach(function (badge) {
          html += '<span class="db-pill db-pill-accent">' + escapeHtml(badge) + '</span>';
        });
        html += '</div>';
      }
      html += '</div>';
    });
    html += '</div>';
    return html;
  }

  function renderGenericMatrix(tabData) {
    if (!tabData || !tabData.rowLabels || !tabData.colLabels || !tabData.cells) return '';
    var cellColors = { 3: '#fecaca', 2: '#fef3c7', 1: '#f1f5f9', 0: '#f8fafc' };
    var html = '<div class="db-card" style="overflow-x:auto"><table class="db-table db-vuln-table">';
    html += '<thead><tr><th></th>';
    tabData.colLabels.forEach(function (col) {
      html += '<th>' + escapeHtml(col) + '</th>';
    });
    html += '</tr></thead><tbody>';
    tabData.rowLabels.forEach(function (rowLabel, ri) {
      html += '<tr><td style="font-weight:500;text-align:inherit">' + linkifyCell(rowLabel) + '</td>';
      var row = tabData.cells[ri] || [];
      row.forEach(function (val) {
        var v = val != null ? val : 0;
        var bg = cellColors[v] || cellColors[0];
        html += '<td><span class="db-vuln-cell" style="background:' + bg + '">' + v + '</span></td>';
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }

  function renderGenericProse(tabData) {
    if (!tabData || !tabData.sections) return '';
    var html = '';
    tabData.sections.forEach(function (section) {
      html += '<div class="db-card">';
      if (section.title) {
        html += '<h3 style="font-size:0.95rem;font-weight:600;margin-bottom:8px;color:' + COLORS.text + '">' + escapeHtml(section.title) + '</h3>';
      }
      if (section.body) {
        // Parse markdown-style **bold** to <strong>
        var escaped = escapeHtml(section.body);
        var parsed = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html += '<p style="font-size:0.9rem;color:' + COLORS.textDim + ';line-height:1.7">' + parsed + '</p>';
      }
      html += '</div>';
    });
    return html;
  }

  function renderGenericCustom(tabData) {
    return tabData && tabData.html ? tabData.html : '';
  }

  function renderDynamicTab(tab) {
    var html = '<div class="db-section-label">' + escapeHtml(tab.label) + '</div>';
    switch (tab.type) {
      case 'table':  html += renderGenericTable(tab.data); break;
      case 'cards':  html += renderGenericCards(tab.data); break;
      case 'matrix': html += renderGenericMatrix(tab.data); break;
      case 'prose':  html += renderGenericProse(tab.data); break;
      case 'custom': html += renderGenericCustom(tab.data); break;
      default: html += '<p>' + escapeHtml(JSON.stringify(tab.data)) + '</p>';
    }
    return html;
  }

  /* ══════════════════════════════════════════════════════════════
     MAIN RENDER
     ══════════════════════════════════════════════════════════════ */
  function render() {
    var root = document.getElementById('dashboard-root');
    if (!root) return;

    // Filter tabs (hide Themes if no data)
    var visibleTabs = TAB_DEFS.filter(function (t) {
      if (t.id === 'themes' && !data.hasThemes) return false;
      return true;
    });

    // Add dynamic tabs from data.tabs
    var dynamicTabs = (data.tabs || []).map(function (t) {
      return { id: t.id, icon: t.icon || '\uD83D\uDCC4', label: t.label };
    });
    visibleTabs = visibleTabs.concat(dynamicTabs);

    // Ensure active tab is visible
    var activeValid = visibleTabs.some(function (t) { return t.id === state.activeTab; });
    if (!activeValid) state.activeTab = visibleTabs[0].id;

    // Build sidebar
    var sidebar = '<div class="db-sidebar">';
    sidebar += '<div class="db-sidebar-header">CBSA Dashboard</div>';
    sidebar += '<div role="tablist">';
    visibleTabs.forEach(function (tab) {
      var isActive = tab.id === state.activeTab;
      var active = isActive ? ' is-active' : '';
      var label = TAB_LABELS[tab.id] ? (ui[TAB_LABELS[tab.id]] || tab.id) : (tab.label || tab.id);
      sidebar += '<button class="db-sidebar-tab' + active + '" data-tab="' + tab.id + '" role="tab" aria-selected="' + isActive + '">';
      sidebar += '<span class="db-tab-indicator"></span>';
      sidebar += '<span class="db-tab-icon">' + tab.icon + '</span>';
      sidebar += '<span>' + escapeHtml(label) + '</span>';
      sidebar += '</button>';
    });
    sidebar += '</div></div>';

    // Build header
    var header = '<div class="db-header">';
    header += '<div class="db-header-name">' + escapeHtml(data.asset.name || 'CBSA Dashboard') + '</div>';
    var metaParts = [];
    if (data.asset.location) metaParts.push(data.asset.location);
    if (data.asset.type) metaParts.push(data.asset.type);
    if (data.asset.period) metaParts.push(data.asset.period);
    if (metaParts.length > 0) {
      header += '<div class="db-header-meta">' + escapeHtml(metaParts.join(' \u00B7 ')) + '</div>';
    }
    header += '</div>';

    // Build content
    var renderer = TAB_RENDERERS[state.activeTab];
    var content = renderer ? renderer() : '';

    // Check if activeTab is a dynamic tab
    if (!renderer) {
      var dynTab = (data.tabs || []).filter(function (t) { return t.id === state.activeTab; })[0];
      if (dynTab) {
        content = renderDynamicTab(dynTab);
      }
    }

    var html = '<div class="db-shell">';
    html += sidebar;
    html += '<div class="db-main">';
    html += header;
    html += '<div class="db-content">' + content + '</div>';
    html += '</div></div>';

    root.innerHTML = html;

    // Attach events after render
    attachEvents();
  }

  /* ══════════════════════════════════════════════════════════════
     EVENT HANDLING
     ══════════════════════════════════════════════════════════════ */
  function attachEvents() {
    // Tab switching
    var tabBtns = document.querySelectorAll('.db-sidebar-tab[data-tab]');
    for (var i = 0; i < tabBtns.length; i++) {
      tabBtns[i].addEventListener('click', function (e) {
        var tab = this.getAttribute('data-tab');
        if (tab && tab !== state.activeTab) {
          state.activeTab = tab;
          render();
        }
      });
    }

    // Clear highlight
    var clearBtns = document.querySelectorAll('[data-action="clear-highlight"]');
    for (var j = 0; j < clearBtns.length; j++) {
      clearBtns[j].addEventListener('click', function () {
        state.highlight = null;
        render();
      });
    }

    // Context card click → highlight related values
    var ctxCards = document.querySelectorAll('.db-ctx-card[data-ctx-id]');
    for (var k = 0; k < ctxCards.length; k++) {
      ctxCards[k].addEventListener('click', function () {
        var id = this.getAttribute('data-ctx-id');
        if (state.highlight && state.highlight.type === 'context' && state.highlight.id === id) {
          state.highlight = null;
        } else {
          state.highlight = { type: 'context', id: id };
        }
        render();
      });
    }

    // Value card click → toggle highlight
    var valCards = document.querySelectorAll('.db-val-card[data-val-id]');
    for (var m = 0; m < valCards.length; m++) {
      valCards[m].addEventListener('click', function () {
        var id = this.getAttribute('data-val-id');
        if (state.highlight && state.highlight.type === 'value' && state.highlight.id === id) {
          state.highlight = null;
        } else {
          state.highlight = { type: 'value', id: id };
        }
        render();
      });
    }

    // Value pill click → navigate to context & values tab
    var navPills = document.querySelectorAll('[data-nav-value]');
    for (var n = 0; n < navPills.length; n++) {
      navPills[n].addEventListener('click', function (e) {
        e.stopPropagation();
        var val = this.getAttribute('data-nav-value');
        // Find first matching value by category
        var matchVal = data.values.filter(function (v) { return v.category === val || v.id === val; })[0];
        if (matchVal) {
          navigateTo('ctxval', { type: 'value', id: matchVal.id });
        }
      });
    }

    // Theme sub-tab switching
    var themeSubTabs = document.querySelectorAll('.db-theme-sub-tab[data-theme-sub]');
    for (var p = 0; p < themeSubTabs.length; p++) {
      themeSubTabs[p].addEventListener('click', function () {
        var key = this.getAttribute('data-theme-sub');
        // Toggle active class
        var allSubs = document.querySelectorAll('.db-theme-sub-tab');
        for (var q = 0; q < allSubs.length; q++) {
          allSubs[q].classList.remove('is-active');
        }
        this.classList.add('is-active');
        // Toggle group visibility
        var allGroups = document.querySelectorAll('.db-theme-group');
        for (var r = 0; r < allGroups.length; r++) {
          allGroups[r].style.display = allGroups[r].getAttribute('data-theme-group') === key ? 'block' : 'none';
        }
      });
    }

    // Entity name links in dynamic tables/matrices
    var entityBtns = document.querySelectorAll('[data-nav-entity]');
    for (var ent = 0; ent < entityBtns.length; ent++) {
      entityBtns[ent].addEventListener('click', function (e) {
        e.stopPropagation();
        var targetTab = this.getAttribute('data-nav-entity');
        var entityId = this.getAttribute('data-nav-entity-id');
        if (targetTab === 'comparative' && entityId) {
          navigateTo('comparative', { type: 'comparator', id: entityId });
        } else {
          navigateTo(targetTab, null);
        }
      });
    }

    // Theme member pill click → navigate to home tab
    var memberPills = document.querySelectorAll('[data-nav-member]');
    for (var s = 0; s < memberPills.length; s++) {
      memberPills[s].addEventListener('click', function (e) {
        e.stopPropagation();
        var mid = this.getAttribute('data-nav-member');
        // Try values first, then contexts
        var matchVal = data.values.filter(function (v) { return v.id === mid; })[0];
        if (matchVal) {
          navigateTo('ctxval', { type: 'value', id: matchVal.id });
          return;
        }
        var matchCtx = data.contexts.filter(function (c) { return c.id === mid; })[0];
        if (matchCtx) {
          navigateTo('ctxval', { type: 'context', id: matchCtx.id });
        }
      });
    }
  }

  /* ── Navigation helper ── */
  function navigateTo(tabId, highlight) {
    state.activeTab = tabId;
    state.highlight = highlight || null;
    render();
  }

  /* ══════════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════════ */
  function init() {
    // Normalize data
    norm();
    buildEntityNameMap();

    // RTL detection
    var testStr = (data.asset.name || '') + ' ' + (data.contexts.length > 0 ? data.contexts[0].label : '');
    state.rtl = isRTL(testStr);
    if (state.rtl) {
      state.lang = 'he';
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'he';
      document.body.classList.add('rtl');
    } else {
      state.lang = 'en';
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
    ui = UI[state.lang];

    injectStyles();
    render();
  }

  /* ── Boot ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
