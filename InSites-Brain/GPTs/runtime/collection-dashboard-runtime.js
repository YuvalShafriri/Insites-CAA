(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════
     CBSA Collection Dashboard Runtime
     Pattern: IIFE, innerHTML rendering, same as dashboard-runtime.js
     Dependencies (loaded by HTML shell): Leaflet (L)
     Data source: window.__COLLECTION_DATA__
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
    green:       '#10b981',
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

  var DEPTH_COLORS = {
    rich:   '#d97706',
    medium: '#0369a1',
    thin:   '#a8a29e'
  };

  var DEPTH_RADIUS = {
    rich:   10,
    medium: 7,
    thin:   5
  };

  var VALUE_CELL_COLORS = {
    e: { bg: COLORS.greenLight, text: '#065f46' },
    i: { bg: COLORS.amberLight, text: '#92400e' },
    a: { bg: '#f1f5f9',        text: COLORS.textMuted }
  };

  var STRENGTH_COLORS = {
    strong:   { bg: COLORS.greenLight, text: '#065f46', border: COLORS.green },
    moderate: { bg: COLORS.amberLight, text: '#92400e', border: COLORS.amber },
    weak:     { bg: COLORS.redLight,   text: '#991b1b', border: COLORS.red }
  };

  var GAP_COLORS = {
    present: { bg: COLORS.greenLight, text: '#065f46', icon: '\u2705' },
    partial: { bg: COLORS.amberLight, text: '#92400e', icon: '\u26A0\uFE0F' },
    missing: { bg: COLORS.redLight,   text: '#991b1b', icon: '\u274C' }
  };

  /* ── Bilingual UI strings ── */
  var UI = {
    en: {
      overview: 'Overview', map: 'Map', values: 'Values',
      arguments: 'Arguments', gaps: 'Gaps', aiQuery: 'AI Query',
      sites: 'Sites', regions: 'Regions', timeSpan: 'Time Span',
      depth: 'Depth', depthDist: 'Depth Distribution',
      byRegion: 'By Region', byType: 'By Type', byPeriod: 'By Period',
      byDepth: 'By Depth', collectionSummary: 'Collection Summary',
      patterns: 'Patterns', gapsLabel: 'Gaps', distinctives: 'Distinctives',
      all: 'All', rich: 'Rich', medium: 'Medium', thin: 'Thin',
      region: 'Region', description: 'Description', threats: 'Threats',
      site: 'Site', type: 'Type', period: 'Period',
      explicit: 'Explicit', implied: 'Implied', absent: 'Absent',
      valueSpecs: 'Value Specifications',
      argumentType: 'Type', strength: 'Strength', evidenceBasis: 'Evidence Basis',
      claimScope: 'Claim Scope', keyClaim: 'Key Claim', weakLink: 'Weak Link',
      premises: 'Premises', sortByStrength: 'Sort by Strength',
      completeness: 'Completeness', gapMatrix: 'Data Completeness Matrix',
      significance: 'Significance', integrity: 'Integrity',
      threats2: 'Threats', comparisons: 'Comparisons',
      aiQueryTitle: 'AI Query',
      aiQueryMsg: 'Ask these questions in the GPT conversation.',
      backToTab: '\u2190 Back',
      noCoords: 'No coordinates available for this collection',
      terrain: 'Terrain', satellite: 'Satellite', streets: 'Streets',
      narrative: 'Narrative'
    },
    he: {
      overview: '\u05E1\u05E7\u05D9\u05E8\u05D4', map: '\u05DE\u05E4\u05D4',
      values: '\u05E2\u05E8\u05DB\u05D9\u05DD', arguments: '\u05D8\u05D9\u05E2\u05D5\u05E0\u05D9\u05DD',
      gaps: '\u05E4\u05E2\u05E8\u05D9\u05DD', aiQuery: '\u05E9\u05D0\u05D9\u05DC\u05EA AI',
      sites: '\u05D0\u05EA\u05E8\u05D9\u05DD', regions: '\u05D0\u05D6\u05D5\u05E8\u05D9\u05DD',
      timeSpan: '\u05D8\u05D5\u05D5\u05D7 \u05D6\u05DE\u05DF', depth: '\u05E2\u05D5\u05DE\u05E7',
      depthDist: '\u05D4\u05EA\u05E4\u05DC\u05D2\u05D5\u05EA \u05E2\u05D5\u05DE\u05E7',
      byRegion: '\u05DC\u05E4\u05D9 \u05D0\u05D6\u05D5\u05E8',
      byType: '\u05DC\u05E4\u05D9 \u05E1\u05D5\u05D2',
      byPeriod: '\u05DC\u05E4\u05D9 \u05EA\u05E7\u05D5\u05E4\u05D4',
      byDepth: '\u05DC\u05E4\u05D9 \u05E2\u05D5\u05DE\u05E7',
      collectionSummary: '\u05E1\u05D9\u05DB\u05D5\u05DD \u05D0\u05D5\u05E1\u05E3',
      patterns: '\u05D3\u05E4\u05D5\u05E1\u05D9\u05DD',
      gapsLabel: '\u05E4\u05E2\u05E8\u05D9\u05DD',
      distinctives: '\u05D9\u05D9\u05D7\u05D5\u05D3\u05D9\u05DD',
      all: '\u05D4\u05DB\u05DC', rich: '\u05E2\u05E9\u05D9\u05E8',
      medium: '\u05D1\u05D9\u05E0\u05D5\u05E0\u05D9', thin: '\u05D3\u05DC',
      region: '\u05D0\u05D6\u05D5\u05E8',
      description: '\u05EA\u05D9\u05D0\u05D5\u05E8',
      threats: '\u05D0\u05D9\u05D5\u05DE\u05D9\u05DD',
      site: '\u05D0\u05EA\u05E8', type: '\u05E1\u05D5\u05D2',
      period: '\u05EA\u05E7\u05D5\u05E4\u05D4',
      explicit: '\u05DE\u05E4\u05D5\u05E8\u05E9',
      implied: '\u05DE\u05E9\u05EA\u05DE\u05E2',
      absent: '\u05D7\u05E1\u05E8',
      valueSpecs: '\u05E4\u05D9\u05E8\u05D5\u05D8 \u05E2\u05E8\u05DB\u05D9\u05DD',
      argumentType: '\u05E1\u05D5\u05D2',
      strength: '\u05E2\u05D5\u05E6\u05DE\u05D4',
      evidenceBasis: '\u05D1\u05E1\u05D9\u05E1 \u05E8\u05D0\u05D9\u05D4',
      claimScope: '\u05D4\u05D9\u05E7\u05E3 \u05D8\u05E2\u05E0\u05D4',
      keyClaim: '\u05D8\u05E2\u05E0\u05D4 \u05DE\u05E8\u05DB\u05D6\u05D9\u05EA',
      weakLink: '\u05D7\u05D5\u05DC\u05D9\u05D4 \u05D7\u05DC\u05E9\u05D4',
      premises: '\u05D4\u05E0\u05D7\u05D5\u05EA',
      sortByStrength: '\u05DE\u05D9\u05D5\u05DF \u05DC\u05E4\u05D9 \u05E2\u05D5\u05E6\u05DE\u05D4',
      completeness: '\u05E9\u05DC\u05DE\u05D5\u05EA',
      gapMatrix: '\u05DE\u05D8\u05E8\u05D9\u05E6\u05EA \u05E9\u05DC\u05DE\u05D5\u05EA \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD',
      significance: '\u05DE\u05E9\u05DE\u05E2\u05D5\u05EA',
      integrity: '\u05E9\u05DC\u05DE\u05D5\u05EA',
      threats2: '\u05D0\u05D9\u05D5\u05DE\u05D9\u05DD',
      comparisons: '\u05D4\u05E9\u05D5\u05D5\u05D0\u05D5\u05EA',
      aiQueryTitle: '\u05E9\u05D0\u05D9\u05DC\u05EA AI',
      aiQueryMsg: '\u05E9\u05D0\u05DC\u05D5 \u05E9\u05D0\u05DC\u05D5\u05EA \u05D0\u05DC\u05D4 \u05D1\u05E9\u05D9\u05D7\u05EA \u05D4-GPT.',
      backToTab: '\u2190 \u05D7\u05D6\u05E8\u05D4',
      noCoords: '\u05D0\u05D9\u05DF \u05E7\u05D5\u05D0\u05D5\u05E8\u05D3\u05D9\u05E0\u05D8\u05D5\u05EA \u05D6\u05DE\u05D9\u05E0\u05D5\u05EA \u05DC\u05D0\u05D5\u05E1\u05E3 \u05D6\u05D4',
      terrain: '\u05E9\u05D8\u05D7', satellite: '\u05DC\u05D5\u05D5\u05D9\u05DF',
      streets: '\u05E8\u05D7\u05D5\u05D1\u05D5\u05EA',
      narrative: '\u05E0\u05E8\u05D8\u05D9\u05D1'
    }
  };

  /* ── Tab definitions ── */
  var TAB_DEFS = [
    { id: 'overview',   icon: '\uD83D\uDCCA' },
    { id: 'map',        icon: '\uD83D\uDDFA\uFE0F' },
    { id: 'values',     icon: '\uD83C\uDFA8' },
    { id: 'arguments',  icon: '\uD83D\uDCDD' },
    { id: 'gaps',       icon: '\u26A0\uFE0F' },
    { id: 'aiQuery',    icon: '\uD83E\uDD16' }
  ];

  var TAB_LABELS = {
    overview:  'overview',
    map:       'map',
    values:    'values',
    arguments: 'arguments',
    gaps:      'gaps',
    aiQuery:   'aiQuery'
  };

  /* ══════════════════════════════════════════════════════════════
     STATE
     ══════════════════════════════════════════════════════════════ */
  var data = {};
  var state = {
    activeTab: 'overview',
    previousTab: null,
    depthFilter: 'all',
    expandedSite: null,
    rtl: false,
    lang: 'en',
    mapInstance: null,
    mapMarkers: [],
    mapReady: false
  };
  var ui = UI.en;

  /* ══════════════════════════════════════════════════════════════
     DATA NORMALIZATION
     ══════════════════════════════════════════════════════════════ */
  function norm() {
    var d = window.__COLLECTION_DATA__ || {};

    data.collection = d.collection || {};
    data.sites = (d.sites || []).map(function (s) {
      return {
        id:                 s.id || '',
        name:               s.name || '',
        region:             s.region || '',
        lat:                s.lat != null ? s.lat : null,
        lng:                s.lng != null ? s.lng : null,
        depth:              (s.depth || 'thin').toLowerCase(),
        type:               s.type || '',
        typeCategory:       s.typeCategory || '',
        period:             s.period || '',
        periodCategory:     s.periodCategory || '',
        description:        s.description || '',
        significanceSummary:s.significanceSummary || '',
        highlight:          s.highlight || '',
        values:             s.values || {},
        valueSpecs:         s.valueSpecs || {},
        integrity:          s.integrity || '',
        integrityNote:      s.integrityNote || '',
        threats:            s.threats || [],
        comparativeBasis:   s.comparativeBasis || '',
        claimScope:         s.claimScope || ''
      };
    });

    data.themes = d.themes || [];
    data.arguments = d.arguments || [];
    data.managementClusters = d.managementClusters || {};

    var cs = d.collectionSummary || {};
    data.collectionSummary = {
      narrative:    cs.narrative || '',
      patterns:     cs.patterns || [],
      gaps:         cs.gaps || [],
      distinctives: cs.distinctives || []
    };

    data.kg = d.kg || null;

    /* Derived: unique regions */
    var regionMap = {};
    data.sites.forEach(function (s) {
      if (s.region) regionMap[s.region] = (regionMap[s.region] || 0) + 1;
    });
    data.regionCounts = regionMap;
    data.regionList = Object.keys(regionMap).sort();

    /* Derived: type distribution */
    var typeMap = {};
    data.sites.forEach(function (s) {
      var t = s.typeCategory || s.type || 'Unknown';
      typeMap[t] = (typeMap[t] || 0) + 1;
    });
    data.typeCounts = typeMap;

    /* Derived: period distribution */
    var periodMap = {};
    data.sites.forEach(function (s) {
      var p = s.periodCategory || s.period || 'Unknown';
      periodMap[p] = (periodMap[p] || 0) + 1;
    });
    data.periodCounts = periodMap;

    /* Derived: depth distribution */
    var depthMap = { rich: 0, medium: 0, thin: 0 };
    data.sites.forEach(function (s) {
      if (depthMap[s.depth] != null) depthMap[s.depth]++;
      else depthMap.thin++;
    });
    data.depthCounts = depthMap;

    /* Derived: all value types across sites */
    var vtSet = {};
    data.sites.forEach(function (s) {
      var keys = Object.keys(s.values || {});
      keys.forEach(function (k) { vtSet[k] = true; });
    });
    data.valueTypes = Object.keys(vtSet).sort();

    /* Derived: time span */
    var periods = data.sites.map(function (s) { return s.period; }).filter(Boolean);
    data.timeSpanLabel = periods.length > 0 ? periods[0] + ' \u2013 ' + periods[periods.length - 1] : '\u2014';
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
      'body.rtl .cd-sidebar { border-right: none; border-left: 1px solid ' + COLORS.border + '; }',
      'body.rtl .cd-sidebar-tab .cd-tab-indicator { left: auto; right: 0; }',

      /* Layout */
      '.cd-shell { display: flex; min-height: 100vh; }',
      '.cd-sidebar { width: 180px; min-width: 180px; background: #fff; border-right: 1px solid ' + COLORS.border + '; display: flex; flex-direction: column; position: fixed; top: 0; bottom: 0; z-index: 10; overflow-y: auto; }',
      'body.rtl .cd-sidebar { left: auto; right: 0; }',
      '.cd-main { flex: 1; margin-left: 180px; display: flex; flex-direction: column; min-height: 100vh; }',
      'body.rtl .cd-main { margin-left: 0; margin-right: 180px; }',

      /* Header */
      '.cd-header { background: ' + COLORS.headerBg + '; color: #fff; padding: 20px 28px; }',
      '.cd-header-name { font-size: 1.35rem; font-weight: 700; letter-spacing: -0.01em; }',
      '.cd-header-meta { font-size: 0.82rem; color: ' + COLORS.textMuted + '; margin-top: 4px; }',

      /* Sidebar tabs */
      '.cd-sidebar-header { padding: 16px 14px 8px; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: ' + COLORS.textMuted + '; font-weight: 600; }',
      '.cd-sidebar-tab { display: flex; align-items: center; gap: 8px; padding: 10px 14px; cursor: pointer; font-size: 0.85rem; color: ' + COLORS.textDim + '; border: none; background: none; width: 100%; text-align: inherit; position: relative; transition: background 0.15s, color 0.15s; }',
      '.cd-sidebar-tab:hover { background: ' + COLORS.accentLight + '; color: ' + COLORS.accent + '; }',
      '.cd-sidebar-tab.is-active { color: ' + COLORS.accent + '; font-weight: 600; background: ' + COLORS.accentLight + '; }',
      '.cd-tab-indicator { position: absolute; left: 0; top: 4px; bottom: 4px; width: 3px; border-radius: 0 3px 3px 0; background: ' + COLORS.accent + '; display: none; }',
      '.cd-sidebar-tab.is-active .cd-tab-indicator { display: block; }',
      '.cd-tab-icon { font-size: 1rem; flex-shrink: 0; width: 22px; text-align: center; }',

      /* Content area */
      '.cd-content { padding: 24px 28px 40px; flex: 1; max-width: 1060px; }',

      /* Cards */
      '.cd-card { background: ' + COLORS.bgCard + '; border: 1px solid ' + COLORS.border + '; border-radius: 10px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }',
      '.cd-card-title { font-size: 0.95rem; font-weight: 600; margin-bottom: 10px; color: ' + COLORS.text + '; }',

      /* KPI row */
      '.cd-kpi-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 20px; }',
      '.cd-kpi { background: ' + COLORS.bgCard + '; border: 1px solid ' + COLORS.border + '; border-radius: 10px; padding: 16px; text-align: center; }',
      '.cd-kpi-value { font-size: 1.6rem; font-weight: 700; color: ' + COLORS.accent + '; }',
      '.cd-kpi-label { font-size: 0.75rem; color: ' + COLORS.textMuted + '; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.04em; }',

      /* Pills / Badges */
      '.cd-pill { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 500; margin: 2px 3px; }',
      '.cd-pill-accent { background: ' + COLORS.accentLight + '; color: ' + COLORS.accent + '; }',
      '.cd-pill-green { background: ' + COLORS.greenLight + '; color: #065f46; }',
      '.cd-pill-amber { background: ' + COLORS.amberLight + '; color: #92400e; }',
      '.cd-pill-red { background: ' + COLORS.redLight + '; color: #991b1b; }',
      '.cd-pill-purple { background: ' + COLORS.purpleLight + '; color: #5b21b6; }',
      '.cd-pill-slate { background: #f1f5f9; color: ' + COLORS.slate + '; }',

      /* Bar chart */
      '.cd-bar-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-size: 0.82rem; }',
      '.cd-bar-label { min-width: 100px; color: ' + COLORS.textDim + '; text-align: end; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      'body.rtl .cd-bar-label { text-align: start; }',
      '.cd-bar-track { flex: 1; height: 18px; background: ' + COLORS.bg + '; border-radius: 4px; overflow: hidden; }',
      '.cd-bar-fill { height: 100%; border-radius: 4px; transition: width 0.3s; min-width: 2px; }',
      '.cd-bar-count { min-width: 24px; font-weight: 600; font-size: 0.78rem; color: ' + COLORS.text + '; }',

      /* Lists */
      '.cd-list { list-style: none; padding: 0; }',
      '.cd-list li { padding: 4px 0; font-size: 0.88rem; color: ' + COLORS.textDim + '; }',
      '.cd-list li::before { content: "\\2022"; color: ' + COLORS.accent + '; margin-right: 8px; }',
      'body.rtl .cd-list li::before { margin-right: 0; margin-left: 8px; }',

      /* Table */
      '.cd-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }',
      '.cd-table th { background: ' + COLORS.bg + '; padding: 8px 10px; text-align: inherit; font-weight: 600; border-bottom: 2px solid ' + COLORS.border + '; font-size: 0.75rem; white-space: nowrap; }',
      '.cd-table td { padding: 8px 10px; border-bottom: 1px solid ' + COLORS.border + '; vertical-align: top; }',
      '.cd-table tr:last-child td { border-bottom: none; }',

      /* Value matrix cell */
      '.cd-val-cell { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 24px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; }',

      /* Site name button */
      '.cd-site-link { background: none; border: none; color: ' + COLORS.accent + '; cursor: pointer; font-weight: 600; font-size: inherit; text-decoration: underline; text-decoration-color: transparent; transition: text-decoration-color 0.15s; padding: 0; text-align: inherit; }',
      '.cd-site-link:hover { text-decoration-color: ' + COLORS.accent + '; }',

      /* Argument card */
      '.cd-arg-card { border: 1px solid ' + COLORS.border + '; border-radius: 10px; padding: 16px; margin-bottom: 14px; border-left: 4px solid ' + COLORS.border + '; }',
      'body.rtl .cd-arg-card { border-left: 1px solid ' + COLORS.border + '; border-right: 4px solid ' + COLORS.border + '; }',

      /* Expand panel */
      '.cd-expand { background: ' + COLORS.bg + '; border: 1px solid ' + COLORS.border + '; border-radius: 8px; padding: 14px; margin-top: 8px; }',

      /* Map */
      '.cd-map-container { height: 480px; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; }',
      '.cd-map-placeholder { height: 480px; display: flex; align-items: center; justify-content: center; background: #f8fafc; border-radius: 10px; border: 1px dashed ' + COLORS.border + '; color: ' + COLORS.textMuted + '; font-size: 0.9rem; }',

      /* Filter buttons */
      '.cd-filter-row { display: flex; gap: 6px; margin-bottom: 14px; flex-wrap: wrap; }',
      '.cd-filter-btn { padding: 4px 14px; border-radius: 99px; border: 1px solid ' + COLORS.border + '; background: #fff; cursor: pointer; font-size: 0.82rem; transition: all 0.15s; }',
      '.cd-filter-btn:hover { border-color: ' + COLORS.accent + '; }',
      '.cd-filter-btn.is-active { background: ' + COLORS.accent + '; color: #fff; border-color: ' + COLORS.accent + '; }',

      /* Back button */
      '.cd-back-btn { display: inline-flex; align-items: center; gap: 4px; background: none; border: 1px solid ' + COLORS.border + '; border-radius: 6px; padding: 4px 12px; cursor: pointer; font-size: 0.82rem; color: ' + COLORS.accent + '; margin-bottom: 14px; }',
      '.cd-back-btn:hover { background: ' + COLORS.accentLight + '; }',

      /* AI query card */
      '.cd-ai-card { border: 1px solid ' + COLORS.border + '; border-radius: 10px; padding: 16px; cursor: default; transition: box-shadow 0.15s; }',
      '.cd-ai-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }',
      '.cd-ai-card-q { font-size: 0.95rem; font-weight: 600; color: ' + COLORS.text + '; margin-bottom: 4px; }',

      /* Section label */
      '.cd-section-label { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; color: ' + COLORS.textMuted + '; font-weight: 600; margin-bottom: 10px; margin-top: 18px; }',

      /* Leaflet RTL fix */
      'body.rtl .leaflet-control-layers { direction: ltr; }',
      'body.rtl .leaflet-popup-content { direction: rtl; text-align: right; }',

      /* Responsive */
      '@media (max-width: 768px) {',
      '  .cd-sidebar { width: 100%; min-width: 100%; position: relative; flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid ' + COLORS.border + '; }',
      '  body.rtl .cd-sidebar { border-left: none; }',
      '  .cd-main { margin-left: 0 !important; margin-right: 0 !important; }',
      '  .cd-sidebar-header { display: none; }',
      '  .cd-sidebar-tab { flex-direction: column; padding: 8px 10px; font-size: 0.72rem; gap: 2px; }',
      '  .cd-tab-indicator { display: none !important; }',
      '  .cd-sidebar-tab.is-active { border-bottom: 2px solid ' + COLORS.accent + '; }',
      '  .cd-content { padding: 16px 14px 32px; }',
      '  .cd-kpi-row { grid-template-columns: repeat(2, 1fr); }',
      '  .cd-table { font-size: 0.72rem; }',
      '  .cd-bar-label { min-width: 70px; }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ══════════════════════════════════════════════════════════════
     RENDER HELPERS
     ══════════════════════════════════════════════════════════════ */

  function barChart(items, color, maxVal) {
    if (!maxVal) {
      maxVal = 0;
      items.forEach(function (it) { if (it.count > maxVal) maxVal = it.count; });
    }
    if (maxVal === 0) maxVal = 1;
    var html = '';
    items.forEach(function (it) {
      var pct = Math.round((it.count / maxVal) * 100);
      html += '<div class="cd-bar-row">';
      html += '<span class="cd-bar-label" title="' + escapeHtml(it.label) + '">' + escapeHtml(it.label) + '</span>';
      html += '<span class="cd-bar-track"><span class="cd-bar-fill" style="width:' + pct + '%;background:' + (color || COLORS.accent) + '"></span></span>';
      html += '<span class="cd-bar-count">' + it.count + '</span>';
      html += '</div>';
    });
    return html;
  }

  function siteLink(site) {
    return '<button class="cd-site-link" data-nav-site="' + escapeHtml(site.id) + '">' + escapeHtml(site.name) + '</button>';
  }

  function depthPill(depth) {
    var d = (depth || 'thin').toLowerCase();
    var cls = 'cd-pill ';
    if (d === 'rich') cls += 'cd-pill-amber';
    else if (d === 'medium') cls += 'cd-pill-accent';
    else cls += 'cd-pill-slate';
    return '<span class="' + cls + '">' + escapeHtml(depth) + '</span>';
  }

  function strengthPill(strength) {
    var s = (strength || 'moderate').toLowerCase();
    var sc = STRENGTH_COLORS[s] || STRENGTH_COLORS.moderate;
    return '<span class="cd-pill" style="background:' + sc.bg + ';color:' + sc.text + '">' + escapeHtml(strength) + '</span>';
  }

  function gapStatus(site, field) {
    var val;
    if (field === 'description') val = site.description;
    else if (field === 'significance') val = site.significanceSummary;
    else if (field === 'values') {
      var vKeys = Object.keys(site.values || {});
      var hasExplicit = vKeys.some(function (k) { return site.values[k] === 'e'; });
      val = hasExplicit ? 'present' : (vKeys.length > 0 ? 'partial' : '');
    }
    else if (field === 'integrity') val = site.integrity;
    else if (field === 'threats') val = (site.threats && site.threats.length > 0) ? site.threats.join(',') : '';
    else if (field === 'comparisons') val = site.comparativeBasis;
    else val = '';

    if (field === 'values') {
      if (val === 'present') return 'present';
      if (val === 'partial') return 'partial';
      return 'missing';
    }

    if (!val || val === '\u2014' || val === '\u26A0 not stated' || val === '\u26A0\uFE0F not stated' || val.indexOf('\u26A0') === 0) return 'missing';
    if (val.indexOf('?') !== -1 || val.indexOf('partial') !== -1) return 'partial';
    return 'present';
  }

  /* ══════════════════════════════════════════════════════════════
     TAB RENDERERS
     ══════════════════════════════════════════════════════════════ */

  /* ── 1. Overview ── */
  function renderOverview() {
    var html = '';

    /* KPIs */
    html += '<div class="cd-kpi-row">';
    html += '<div class="cd-kpi"><div class="cd-kpi-value">' + data.sites.length + '</div><div class="cd-kpi-label">' + escapeHtml(ui.sites) + '</div></div>';
    html += '<div class="cd-kpi"><div class="cd-kpi-value">' + data.regionList.length + '</div><div class="cd-kpi-label">' + escapeHtml(ui.regions) + '</div></div>';
    html += '<div class="cd-kpi"><div class="cd-kpi-value">' + escapeHtml(data.timeSpanLabel) + '</div><div class="cd-kpi-label">' + escapeHtml(ui.timeSpan) + '</div></div>';
    var richPct = data.sites.length > 0 ? Math.round(data.depthCounts.rich / data.sites.length * 100) : 0;
    html += '<div class="cd-kpi"><div class="cd-kpi-value">' + richPct + '%</div><div class="cd-kpi-label">' + escapeHtml(ui.rich) + ' ' + escapeHtml(ui.depth) + '</div></div>';
    html += '</div>';

    /* Distribution charts */
    var maxSites = data.sites.length || 1;

    /* By region */
    html += '<div class="cd-card"><div class="cd-card-title">' + escapeHtml(ui.byRegion) + '</div>';
    var regionItems = data.regionList.map(function (r) { return { label: r, count: data.regionCounts[r] }; });
    regionItems.sort(function (a, b) { return b.count - a.count; });
    html += barChart(regionItems, COLORS.accent, maxSites);
    html += '</div>';

    /* By type */
    var typeKeys = Object.keys(data.typeCounts).sort(function (a, b) { return data.typeCounts[b] - data.typeCounts[a]; });
    if (typeKeys.length > 0) {
      html += '<div class="cd-card"><div class="cd-card-title">' + escapeHtml(ui.byType) + '</div>';
      var typeItems = typeKeys.map(function (k) { return { label: k, count: data.typeCounts[k] }; });
      html += barChart(typeItems, COLORS.purple, maxSites);
      html += '</div>';
    }

    /* By period */
    var periodKeys = Object.keys(data.periodCounts).sort(function (a, b) { return data.periodCounts[b] - data.periodCounts[a]; });
    if (periodKeys.length > 0) {
      html += '<div class="cd-card"><div class="cd-card-title">' + escapeHtml(ui.byPeriod) + '</div>';
      var periodItems = periodKeys.map(function (k) { return { label: k, count: data.periodCounts[k] }; });
      html += barChart(periodItems, COLORS.amber, maxSites);
      html += '</div>';
    }

    /* By depth */
    html += '<div class="cd-card"><div class="cd-card-title">' + escapeHtml(ui.byDepth) + '</div>';
    var depthItems = [
      { label: ui.rich, count: data.depthCounts.rich },
      { label: ui.medium, count: data.depthCounts.medium },
      { label: ui.thin, count: data.depthCounts.thin }
    ];
    html += barChart(depthItems, COLORS.amber, maxSites);
    html += '</div>';

    /* Collection summary */
    if (data.collectionSummary.narrative) {
      html += '<div class="cd-card"><div class="cd-card-title">' + escapeHtml(ui.collectionSummary) + '</div>';
      html += '<p style="font-size:0.9rem;color:' + COLORS.textDim + ';line-height:1.65">' + escapeHtml(data.collectionSummary.narrative) + '</p>';

      if (data.collectionSummary.patterns.length > 0) {
        html += '<div class="cd-section-label">' + escapeHtml(ui.patterns) + '</div>';
        html += '<ul class="cd-list">';
        data.collectionSummary.patterns.forEach(function (p) { html += '<li>' + escapeHtml(p) + '</li>'; });
        html += '</ul>';
      }
      if (data.collectionSummary.gaps.length > 0) {
        html += '<div class="cd-section-label">' + escapeHtml(ui.gapsLabel) + '</div>';
        html += '<ul class="cd-list">';
        data.collectionSummary.gaps.forEach(function (g) { html += '<li>' + escapeHtml(g) + '</li>'; });
        html += '</ul>';
      }
      if (data.collectionSummary.distinctives.length > 0) {
        html += '<div class="cd-section-label">' + escapeHtml(ui.distinctives) + '</div>';
        html += '<ul class="cd-list">';
        data.collectionSummary.distinctives.forEach(function (d) { html += '<li>' + escapeHtml(d) + '</li>'; });
        html += '</ul>';
      }
      html += '</div>';
    }

    return html;
  }

  /* ── 2. Map ── */
  function renderMap() {
    var hasAny = data.sites.some(function (s) { return s.lat != null && s.lng != null; });
    if (!hasAny) {
      return '<div class="cd-map-placeholder">\uD83D\uDCCD ' + escapeHtml(ui.noCoords) + '</div>';
    }

    /* Back button */
    var html = '';
    if (state.previousTab) {
      html += '<button class="cd-back-btn" data-action="go-back">' + escapeHtml(ui.backToTab) + '</button>';
    }

    /* Depth filter */
    html += '<div class="cd-filter-row">';
    var filters = ['all', 'rich', 'medium', 'thin'];
    filters.forEach(function (f) {
      var active = state.depthFilter === f ? ' is-active' : '';
      var label = ui[f] || f;
      html += '<button class="cd-filter-btn' + active + '" data-depth-filter="' + f + '">' + escapeHtml(label) + '</button>';
    });
    html += '</div>';

    html += '<div id="cd-map" class="cd-map-container"></div>';

    setTimeout(function () { initMap(); }, 50);
    return html;
  }

  function initMap() {
    if (typeof L === 'undefined') return;
    var container = document.getElementById('cd-map');
    if (!container) return;

    if (state.mapInstance) {
      state.mapInstance.remove();
      state.mapInstance = null;
    }
    state.mapMarkers = [];

    var mapLang = (state.lang === 'he') ? 'iw' : 'en';
    var googleTerrain = L.tileLayer('https://mt1.google.com/vt/lyrs=p&hl=' + mapLang + '&x={x}&y={y}&z={z}', { maxZoom: 20 });
    var googleSatellite = L.tileLayer('https://mt1.google.com/vt/lyrs=y&hl=' + mapLang + '&x={x}&y={y}&z={z}', { maxZoom: 20 });
    var googleStreets = L.tileLayer('https://mt1.google.com/vt/lyrs=m&hl=' + mapLang + '&x={x}&y={y}&z={z}', { maxZoom: 20 });

    var baseMaps = {};
    baseMaps[ui.terrain] = googleTerrain;
    baseMaps[ui.satellite] = googleSatellite;
    baseMaps[ui.streets] = googleStreets;

    var map = L.map(container, { layers: [googleTerrain] }).setView([31.5, 35], 7);
    L.control.layers(baseMaps, null, { position: 'topleft' }).addTo(map);

    var bounds = L.latLngBounds([]);

    data.sites.forEach(function (site) {
      if (site.lat == null || site.lng == null) return;

      var depth = site.depth || 'thin';
      var color = DEPTH_COLORS[depth] || DEPTH_COLORS.thin;
      var radius = DEPTH_RADIUS[depth] || 5;

      var marker = L.circleMarker([site.lat, site.lng], {
        radius: radius, fillColor: color, fillOpacity: 0.85,
        color: '#fff', weight: 2
      }).addTo(map);

      var popup = '<strong>' + escapeHtml(site.name) + '</strong>';
      if (site.region) popup += '<br>' + escapeHtml(ui.region) + ': ' + escapeHtml(site.region);
      popup += '<br>' + escapeHtml(ui.depth) + ': ' + escapeHtml(site.depth);
      if (site.description) {
        var desc = site.description.length > 120 ? site.description.substring(0, 120) + '\u2026' : site.description;
        popup += '<br><em>' + escapeHtml(desc) + '</em>';
      }
      if (site.threats && site.threats.length > 0) {
        popup += '<br>\u26A0\uFE0F ' + escapeHtml(site.threats.join(', '));
      }
      marker.bindPopup(popup);

      bounds.extend([site.lat, site.lng]);
      state.mapMarkers.push({ marker: marker, site: site });
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    state.mapInstance = map;
    state.mapReady = true;

    setTimeout(function () { map.invalidateSize(); }, 100);

    applyDepthFilter();
  }

  function applyDepthFilter() {
    var filter = state.depthFilter;
    state.mapMarkers.forEach(function (entry) {
      var depth = entry.site.depth || 'thin';
      if (filter === 'all' || depth === filter) {
        entry.marker.setStyle({ fillOpacity: 0.85 });
        entry.marker.setRadius(DEPTH_RADIUS[depth] || 5);
      } else {
        entry.marker.setStyle({ fillOpacity: 0.15 });
        entry.marker.setRadius(3);
      }
    });
  }

  function navigateToSite(siteId) {
    var site = data.sites.filter(function (s) { return s.id === siteId; })[0];
    if (!site || site.lat == null || site.lng == null) return;

    state.previousTab = state.activeTab;
    state.activeTab = 'map';
    state.depthFilter = 'all';
    render();

    /* After render, zoom to marker */
    setTimeout(function () {
      if (!state.mapInstance) return;
      state.mapInstance.setView([site.lat, site.lng], 14);
      state.mapMarkers.forEach(function (entry) {
        if (entry.site.id === siteId) {
          entry.marker.openPopup();
        }
      });
    }, 200);
  }

  function goBack() {
    if (state.previousTab) {
      state.activeTab = state.previousTab;
      state.previousTab = null;
      render();
    }
  }

  /* ── 3. Values ── */
  function renderValues() {
    if (data.sites.length === 0 || data.valueTypes.length === 0) {
      return '<div class="cd-card" style="text-align:center;color:' + COLORS.textMuted + '">No value data available</div>';
    }

    var html = '';

    /* Matrix table */
    html += '<div class="cd-card" style="overflow-x:auto"><div class="cd-card-title">' + escapeHtml(ui.values) + '</div>';
    html += '<table class="cd-table"><thead><tr>';
    html += '<th>' + escapeHtml(ui.site) + '</th>';
    data.valueTypes.forEach(function (vt) {
      html += '<th style="text-align:center">' + escapeHtml(vt) + '</th>';
    });
    html += '</tr></thead><tbody>';

    data.sites.forEach(function (site) {
      var expanded = state.expandedSite === site.id;
      html += '<tr>';
      html += '<td>' + siteLink(site) + '</td>';
      data.valueTypes.forEach(function (vt) {
        var val = (site.values && site.values[vt]) || 'a';
        var vc = VALUE_CELL_COLORS[val] || VALUE_CELL_COLORS.a;
        html += '<td style="text-align:center"><span class="cd-val-cell" style="background:' + vc.bg + ';color:' + vc.text + '">' + escapeHtml(val) + '</span></td>';
      });
      html += '</tr>';

      /* Expanded value specs */
      if (expanded && site.valueSpecs) {
        var specKeys = Object.keys(site.valueSpecs);
        if (specKeys.length > 0) {
          html += '<tr><td colspan="' + (data.valueTypes.length + 1) + '">';
          html += '<div class="cd-expand"><strong>' + escapeHtml(ui.valueSpecs) + ' \u2014 ' + escapeHtml(site.name) + '</strong>';
          specKeys.forEach(function (k) {
            html += '<div style="margin-top:6px"><span class="cd-pill cd-pill-accent">' + escapeHtml(k) + '</span> ';
            html += '<span style="font-size:0.85rem;color:' + COLORS.textDim + '">' + escapeHtml(site.valueSpecs[k]) + '</span></div>';
          });
          html += '</div></td></tr>';
        }
      }
    });

    /* Footer: counts */
    html += '<tr style="font-weight:600;background:' + COLORS.bg + '">';
    html += '<td>' + escapeHtml(ui.explicit) + '/' + escapeHtml(ui.implied) + '/' + escapeHtml(ui.absent) + '</td>';
    data.valueTypes.forEach(function (vt) {
      var eCount = 0, iCount = 0, aCount = 0;
      data.sites.forEach(function (s) {
        var v = (s.values && s.values[vt]) || 'a';
        if (v === 'e') eCount++;
        else if (v === 'i') iCount++;
        else aCount++;
      });
      html += '<td style="text-align:center;font-size:0.72rem">' +
        '<span style="color:#065f46">' + eCount + '</span>/' +
        '<span style="color:#92400e">' + iCount + '</span>/' +
        '<span style="color:' + COLORS.textMuted + '">' + aCount + '</span></td>';
    });
    html += '</tr>';

    html += '</tbody></table></div>';

    return html;
  }

  /* ── 4. Arguments ── */
  function renderArguments() {
    if (data.arguments.length === 0) {
      return '<div class="cd-card" style="text-align:center;color:' + COLORS.textMuted + '">No arguments data available</div>';
    }

    /* Sort by strength: strong first, then moderate, then weak */
    var strengthOrder = { strong: 0, moderate: 1, weak: 2 };
    var sorted = data.arguments.slice().sort(function (a, b) {
      var sa = strengthOrder[(a.strength || 'moderate').toLowerCase()];
      var sb = strengthOrder[(b.strength || 'moderate').toLowerCase()];
      if (sa == null) sa = 1;
      if (sb == null) sb = 1;
      return sa - sb;
    });

    var html = '';
    html += '<div class="cd-section-label">' + escapeHtml(ui.sortByStrength) + '</div>';

    sorted.forEach(function (arg) {
      var s = (arg.strength || 'moderate').toLowerCase();
      var sc = STRENGTH_COLORS[s] || STRENGTH_COLORS.moderate;
      var site = data.sites.filter(function (st) { return st.id === arg.siteId; })[0];

      html += '<div class="cd-arg-card" style="border-left-color:' + sc.border + '">';

      /* Header: site name + badges */
      html += '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:8px">';
      if (site) {
        html += siteLink(site);
      } else {
        html += '<span style="font-weight:600">' + escapeHtml(arg.name || arg.siteId) + '</span>';
      }
      if (arg.argumentType) {
        html += '<span class="cd-pill cd-pill-purple">' + escapeHtml(arg.argumentType) + '</span>';
      }
      html += strengthPill(arg.strength || 'moderate');
      if (arg.claimScope) {
        html += '<span class="cd-pill cd-pill-slate">' + escapeHtml(arg.claimScope) + '</span>';
      }
      html += '</div>';

      /* Evidence basis */
      if (arg.evidenceBasis) {
        html += '<div style="font-size:0.85rem;color:' + COLORS.textDim + ';margin-bottom:6px"><strong>' + escapeHtml(ui.evidenceBasis) + ':</strong> ' + escapeHtml(arg.evidenceBasis) + '</div>';
      }

      /* Key claim */
      if (arg.keyClaim) {
        html += '<div style="font-size:0.9rem;color:' + COLORS.text + ';margin-bottom:6px;font-style:italic">\u201C' + escapeHtml(arg.keyClaim) + '\u201D</div>';
      }

      /* Premises */
      if (arg.premises && arg.premises.length > 0) {
        html += '<div style="font-size:0.82rem;color:' + COLORS.textDim + ';margin-bottom:4px"><strong>' + escapeHtml(ui.premises) + ':</strong></div>';
        html += '<ul class="cd-list">';
        arg.premises.forEach(function (p) { html += '<li>' + escapeHtml(p) + '</li>'; });
        html += '</ul>';
      }

      /* Weak link callout */
      if (arg.weakLink) {
        html += '<div style="margin-top:8px;padding:8px 12px;background:' + COLORS.redLight + ';border-radius:6px;font-size:0.82rem;color:#991b1b">';
        html += '\u26A0\uFE0F <strong>' + escapeHtml(ui.weakLink) + ':</strong> ' + escapeHtml(arg.weakLink);
        html += '</div>';
      }

      html += '</div>';
    });

    return html;
  }

  /* ── 5. Gaps ── */
  function renderGaps() {
    if (data.sites.length === 0) {
      return '<div class="cd-card" style="text-align:center;color:' + COLORS.textMuted + '">No site data available</div>';
    }

    var dimensions = ['description', 'significance', 'values', 'integrity', 'threats', 'comparisons'];
    var dimLabels = {
      description:  ui.description,
      significance: ui.significance,
      values:       ui.values,
      integrity:    ui.integrity,
      threats:      ui.threats2,
      comparisons:  ui.comparisons
    };

    var html = '';
    html += '<div class="cd-card" style="overflow-x:auto"><div class="cd-card-title">' + escapeHtml(ui.gapMatrix) + '</div>';
    html += '<table class="cd-table"><thead><tr>';
    html += '<th>' + escapeHtml(ui.site) + '</th>';
    dimensions.forEach(function (dim) {
      html += '<th style="text-align:center">' + escapeHtml(dimLabels[dim] || dim) + '</th>';
    });
    html += '<th style="text-align:center">' + escapeHtml(ui.completeness) + '</th>';
    html += '</tr></thead><tbody>';

    data.sites.forEach(function (site) {
      html += '<tr>';
      html += '<td>' + siteLink(site) + '</td>';

      var presentCount = 0;
      dimensions.forEach(function (dim) {
        var status = gapStatus(site, dim);
        var gc = GAP_COLORS[status] || GAP_COLORS.missing;
        if (status === 'present') presentCount++;
        else if (status === 'partial') presentCount += 0.5;
        html += '<td style="text-align:center"><span class="cd-val-cell" style="background:' + gc.bg + ';color:' + gc.text + '">' + gc.icon + '</span></td>';
      });

      var pct = Math.round((presentCount / dimensions.length) * 100);
      var pctColor = pct >= 80 ? '#065f46' : (pct >= 50 ? '#92400e' : '#991b1b');
      html += '<td style="text-align:center;font-weight:600;color:' + pctColor + '">' + pct + '%</td>';

      html += '</tr>';
    });

    html += '</tbody></table></div>';

    return html;
  }

  /* ── 6. AI Query ── */
  function renderAiQuery() {
    var starters = [
      'What value patterns are shared across this collection?',
      'How are the sites distributed geographically?',
      'What assessment methods were used?',
      'What are the biggest data gaps in this collection?',
      'Are there management clusters that suggest shared needs?'
    ];

    var html = '';
    html += '<div class="cd-card"><div class="cd-card-title">' + escapeHtml(ui.aiQueryTitle) + '</div>';
    html += '<p style="font-size:0.88rem;color:' + COLORS.textDim + ';margin-bottom:16px">' + escapeHtml(ui.aiQueryMsg) + '</p>';

    starters.forEach(function (q) {
      html += '<div class="cd-ai-card" style="margin-bottom:10px">';
      html += '<div class="cd-ai-card-q">\uD83D\uDCAC ' + escapeHtml(q) + '</div>';
      html += '</div>';
    });

    html += '</div>';
    return html;
  }

  /* ── Tab renderer map ── */
  var TAB_RENDERERS = {
    overview:  renderOverview,
    map:       renderMap,
    values:    renderValues,
    arguments: renderArguments,
    gaps:      renderGaps,
    aiQuery:   renderAiQuery
  };

  /* ══════════════════════════════════════════════════════════════
     MAIN RENDER
     ══════════════════════════════════════════════════════════════ */
  function render() {
    var root = document.getElementById('dashboard-root');
    if (!root) return;

    var visibleTabs = TAB_DEFS;

    var activeValid = visibleTabs.some(function (t) { return t.id === state.activeTab; });
    if (!activeValid) state.activeTab = visibleTabs[0].id;

    /* Sidebar */
    var sidebar = '<div class="cd-sidebar">';
    sidebar += '<div class="cd-sidebar-header">Collection Dashboard</div>';
    visibleTabs.forEach(function (tab) {
      var active = tab.id === state.activeTab ? ' is-active' : '';
      var label = ui[TAB_LABELS[tab.id]] || tab.id;
      sidebar += '<button class="cd-sidebar-tab' + active + '" data-tab="' + tab.id + '">';
      sidebar += '<span class="cd-tab-indicator"></span>';
      sidebar += '<span class="cd-tab-icon">' + tab.icon + '</span>';
      sidebar += '<span>' + escapeHtml(label) + '</span>';
      sidebar += '</button>';
    });
    sidebar += '</div>';

    /* Header */
    var header = '<div class="cd-header">';
    header += '<div class="cd-header-name">' + escapeHtml(data.collection.name || 'Collection Dashboard') + '</div>';
    var metaParts = [];
    if (data.collection.source) metaParts.push(data.collection.source);
    if (data.collection.depth) metaParts.push(data.collection.depth);
    if (data.collection.date) metaParts.push(data.collection.date);
    if (data.collection.itemCount) metaParts.push(data.collection.itemCount + ' ' + ui.sites.toLowerCase());
    if (metaParts.length > 0) {
      header += '<div class="cd-header-meta">' + escapeHtml(metaParts.join(' \u00B7 ')) + '</div>';
    }
    header += '</div>';

    /* Content */
    var renderer = TAB_RENDERERS[state.activeTab];
    var content = renderer ? renderer() : '';

    var html = '<div class="cd-shell">';
    html += sidebar;
    html += '<div class="cd-main">';
    html += header;
    html += '<div class="cd-content">' + content + '</div>';
    html += '</div></div>';

    root.innerHTML = html;

    attachEvents();
  }

  /* ══════════════════════════════════════════════════════════════
     EVENT HANDLING
     ══════════════════════════════════════════════════════════════ */
  function attachEvents() {
    /* Tab switching */
    var tabBtns = document.querySelectorAll('.cd-sidebar-tab[data-tab]');
    for (var i = 0; i < tabBtns.length; i++) {
      tabBtns[i].addEventListener('click', function () {
        var tab = this.getAttribute('data-tab');
        if (tab && tab !== state.activeTab) {
          state.previousTab = null;
          state.expandedSite = null;
          state.activeTab = tab;
          render();
        }
      });
    }

    /* Depth filter */
    var filterBtns = document.querySelectorAll('[data-depth-filter]');
    for (var j = 0; j < filterBtns.length; j++) {
      filterBtns[j].addEventListener('click', function () {
        var f = this.getAttribute('data-depth-filter');
        state.depthFilter = f;
        /* Update button styles without full re-render */
        var allBtns = document.querySelectorAll('[data-depth-filter]');
        for (var k = 0; k < allBtns.length; k++) {
          allBtns[k].classList.toggle('is-active', allBtns[k].getAttribute('data-depth-filter') === f);
        }
        applyDepthFilter();
      });
    }

    /* Site name click → navigate to map */
    var siteLinks = document.querySelectorAll('[data-nav-site]');
    for (var m = 0; m < siteLinks.length; m++) {
      siteLinks[m].addEventListener('click', function (e) {
        e.preventDefault();
        var siteId = this.getAttribute('data-nav-site');

        /* If we're on the values tab, toggle expand instead */
        if (state.activeTab === 'values') {
          state.expandedSite = (state.expandedSite === siteId) ? null : siteId;
          render();
          return;
        }

        navigateToSite(siteId);
      });
    }

    /* Back button */
    var backBtns = document.querySelectorAll('[data-action="go-back"]');
    for (var n = 0; n < backBtns.length; n++) {
      backBtns[n].addEventListener('click', function () {
        goBack();
      });
    }
  }

  /* ══════════════════════════════════════════════════════════════
     INIT
     ══════════════════════════════════════════════════════════════ */
  function init() {
    norm();

    /* RTL detection */
    var testStr = (data.collection.name || '') + ' ' + (data.sites.length > 0 ? (data.sites[0].name || '') : '');
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
