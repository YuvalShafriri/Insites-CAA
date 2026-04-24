// Pre-built Knowledge Graph data for sample texts
// Loaded instantly when user clicks a sample button — no API call needed

export interface KGNode {
  id: string;
  name: string;
  type: string;
  meaning: string;
}

export interface KGEdge {
  from: string;
  to: string;
  label: string;
}

export interface KGData {
  nodes: KGNode[];
  edges: KGEdge[];
}

/**
 * Zaira — Italo Calvino's "Invisible Cities"
 * A philosophical text about how cities contain their past through spatial relationships,
 * not through physical descriptions.
 */
const ZAIRA_KG: KGData = {
  nodes: [
    { id: "zaira", name: "Zaira", type: "site", meaning: "Imaginary city whose high bastions contain its past through relationships, not descriptions" },
    { id: "kublai", name: "Kublai Khan", type: "person", meaning: "The listener — the ruler who asks for a description of the city" },
    { id: "hanged_man", name: "The Hanged Usurper", type: "person", meaning: "Figure hung from the street lamp — violence inscribed in space" },
    { id: "queen", name: "The Queen", type: "person", meaning: "Royal figure whose bridal procession passed through the street" },
    { id: "lover", name: "The Lover", type: "person", meaning: "Leaps over the railing at dawn — forbidden love inscribed in height" },
    { id: "old_men", name: "Three Old Men", type: "social_group", meaning: "Sitting on the dock, mending nets, telling stories — keepers of memory" },
    { id: "gunship", name: "The Gunboat", type: "event", meaning: "Appeared suddenly and destroyed the gutter — violence inscribed in structure" },
    { id: "wedding", name: "Bridal Procession", type: "event", meaning: "Celebration that passed through the street — joy inscribed in ribbons and space" },
    { id: "street_lamp", name: "The Street Lamp", type: "architectural_element", meaning: "Origin point of spatial relationships — tension between light and the hanged" },
    { id: "balcony", name: "The Balcony & Railing", type: "architectural_element", meaning: "Boundary between inside and outside — witness to love and death" },
    { id: "memory", name: "Collective Memory", type: "cultural_value", meaning: "The city does not tell its past but contains it like the lines of a hand" },
    { id: "palimpsest", name: "Urban Palimpsest", type: "narrative", meaning: "Every segment marked with scratches, indentations, cuts, notches — layers upon layers" },
  ],
  edges: [
    { from: "zaira", to: "memory", label: "embodies" },
    { from: "zaira", to: "palimpsest", label: "structured_as" },
    { from: "kublai", to: "zaira", label: "seeks_to_understand" },
    { from: "hanged_man", to: "street_lamp", label: "hung_from" },
    { from: "queen", to: "wedding", label: "celebrated_in" },
    { from: "wedding", to: "balcony", label: "passed_beneath" },
    { from: "lover", to: "balcony", label: "leaps_over" },
    { from: "gunship", to: "balcony", label: "destroyed" },
    { from: "old_men", to: "gunship", label: "retells_story_of" },
    { from: "old_men", to: "memory", label: "preserves" },
    { from: "hanged_man", to: "queen", label: "rumored_son_of" },
    { from: "street_lamp", to: "balcony", label: "connected_by_wire" },
    { from: "palimpsest", to: "zaira", label: "inscribed_in" },
  ]
};

/**
 * Chaco Culture NHP — real heritage site from workshop simulation
 * UNESCO World Heritage archaeological landscape, ancestral Puebloan regional center.
 */
const CHACO_KG: KGData = {
  nodes: [
    { id: "ccnhp", name: "Chaco Culture NHP", type: "site", meaning: "UNESCO World Heritage archaeological landscape, ancestral Puebloan regional center" },
    { id: "pueblo_bonito", name: "Pueblo Bonito", type: "structure", meaning: "Largest great house — 600+ rooms, monumental masonry construction" },
    { id: "casa_rinconada", name: "Casa Rinconada", type: "structure", meaning: "Great kiva closed in 1996 at tribal request to prevent desecration" },
    { id: "fajada_butte", name: "Fajada Butte", type: "structure", meaning: "Sacred site with astronomical markers, closed to public since 1982" },
    { id: "chaco_canyon", name: "San Juan Basin", type: "site", meaning: "Semiarid basin containing the canyon and 39 outlier protection sites" },
    { id: "mesa_verde", name: "Mesa Verde", type: "site", meaning: "Migration destination and comparative site with cliff dwellings" },
    { id: "puebloans", name: "Ancestral Puebloans", type: "social_group", meaning: "Builders of the great houses, A.D. 400–1300" },
    { id: "hopi_pueblo", name: "Hopi & Pueblo Peoples", type: "social_group", meaning: "Living descendants maintaining pilgrimage practices since 13th century" },
    { id: "navajo", name: "Navajo Nation", type: "social_group", meaning: "Inhabited canyon for 400 years; displaced by NPS in 1930s–1940s" },
    { id: "nps", name: "National Park Service", type: "social_group", meaning: "Federal agency managing CCNHP since 1916" },
    { id: "antiquities_act", name: "Antiquities Act 1906", type: "event", meaning: "First U.S. heritage law, catalyzed by excavation controversies at Chaco" },
    { id: "wh_inscription", name: "WH Inscription 1987", type: "event", meaning: "UNESCO recognition under criterion C(iii)" },
    { id: "chaco_phenom", name: "Chaco Phenomenon", type: "narrative", meaning: "A.D. 700–1300 regional system of roads, outliers, and ceremonial networks" },
    { id: "val_scientific", name: "Scientific Value", type: "cultural_value", meaning: "Century-deep archaeological archive with ongoing research potential" },
    { id: "val_historical", name: "Historical Value", type: "cultural_value", meaning: "Site that catalyzed American heritage protection law" },
  ],
  edges: [
    { from: "ccnhp", to: "chaco_canyon", label: "located_in" },
    { from: "pueblo_bonito", to: "ccnhp", label: "part_of" },
    { from: "casa_rinconada", to: "ccnhp", label: "part_of" },
    { from: "fajada_butte", to: "ccnhp", label: "part_of" },
    { from: "ccnhp", to: "puebloans", label: "built_by" },
    { from: "hopi_pueblo", to: "ccnhp", label: "pilgrimage_to" },
    { from: "navajo", to: "chaco_canyon", label: "inhabited" },
    { from: "nps", to: "ccnhp", label: "manages" },
    { from: "ccnhp", to: "antiquities_act", label: "catalyzed" },
    { from: "wh_inscription", to: "ccnhp", label: "recognizes" },
    { from: "chaco_phenom", to: "ccnhp", label: "defines" },
    { from: "ccnhp", to: "val_scientific", label: "expresses_value" },
    { from: "ccnhp", to: "val_historical", label: "expresses_value" },
    { from: "hopi_pueblo", to: "casa_rinconada", label: "sacred_to" },
    { from: "hopi_pueblo", to: "fajada_butte", label: "sacred_to" },
    { from: "puebloans", to: "hopi_pueblo", label: "ancestors_of" },
    { from: "puebloans", to: "chaco_phenom", label: "created" },
    { from: "mesa_verde", to: "chaco_canyon", label: "connected_to" },
    { from: "nps", to: "navajo", label: "displaced" },
    { from: "antiquities_act", to: "nps", label: "established_framework" },
  ]
};

/**
 * Map sample identifiers to their pre-built KG data.
 * Used by generateKnowledgeGraph() to skip API calls for known samples.
 */
export const PREBUILT_GRAPHS: Record<string, KGData> = {
  zaira: ZAIRA_KG,
  chaco: CHACO_KG,
};
