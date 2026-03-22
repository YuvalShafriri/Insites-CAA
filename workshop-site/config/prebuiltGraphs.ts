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
    { id: "zaira", name: "זאירה", type: "site", meaning: "עיר דמיונית שחומותיה נשגבות — מכילה את עברה ביחסים, לא בתיאורים" },
    { id: "kublai", name: "קובלאי חאן", type: "person", meaning: "הנמען — השליט שמבקש לשמוע תיאור של העיר" },
    { id: "hanged_man", name: "הגזלן שנתלה", type: "person", meaning: "דמות שנתלתה על הפנס — עברה אלימה חקוקה במרחב" },
    { id: "queen", name: "המלכה", type: "person", meaning: "דמות מלכותית שתהלוכת נישואיה עברה ברחוב" },
    { id: "lover", name: "המאהב", type: "person", meaning: "מדלג מעל המעקה עם שחר — אהבה אסורה חקוקה בגובה" },
    { id: "old_men", name: "שלושת הזקנים", type: "social_group", meaning: "יושבים על הרציף, מתקנים רשתות, מספרים סיפורים — שומרי הזיכרון" },
    { id: "gunship", name: "ספינת התותחים", type: "event", meaning: "הופיעה לפתע והרסה את המרזב — אלימות שחקוקה במבנה" },
    { id: "wedding", name: "תהלוכת הנישואין", type: "event", meaning: "חגיגה שעברה ברחוב — שמחה חקוקה בסרטים ובמרחב" },
    { id: "street_lamp", name: "הפנס", type: "architectural_element", meaning: "נקודת מוצא של יחסים מרחביים — מתח בין אור לתליין" },
    { id: "balcony", name: "המרפסת והמעקה", type: "architectural_element", meaning: "גבול בין פנים לחוץ — עד לאהבה ולמוות" },
    { id: "memory", name: "זיכרון קולקטיבי", type: "cultural_value", meaning: "העיר אינה אומרת את עברה אלא מכילה אותו כרשת קווים של כף יד" },
    { id: "palimpsest", name: "פלימפססט עירוני", type: "narrative", meaning: "כל קטע מחורט בשריטות, ניסורים, חיתוכים ופסיקים — שכבות על שכבות" },
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
 * Ayelet HaShachar Water Tower — real heritage site
 * Kibbutz in Upper Galilee, founded 1918. Water tower built 1923-24.
 * Rich narrative of water struggle, Second Aliya ideology, and construction heritage.
 */
const AYELET_KG: KGData = {
  nodes: [
    { id: "water_tower", name: "מגדל המים", type: "structure", meaning: "הוקם 1923 — בטון מזויין עם עיטורים ניאו-קלאסיים, נקודת ציון בישוב" },
    { id: "ayelet", name: "קיבוץ אילת השחר", type: "site", meaning: "נוסד 1918 בגליל העליון — ישוב חלוצי של העלייה השנייה" },
    { id: "horseshoe", name: "כביש הפרסה", type: "architectural_element", meaning: "תכנון בצורת פרסה מקיף את הגרעין ההיסטורי — חותם המהנדס של יק\"א" },
    { id: "wadi", name: "ואדי ווקאז (נחל חצור)", type: "natural_phenomenon", meaning: "מקור המים היחיד בשנים הראשונות — מוקד לעימותים עם ערביי הסביבה" },
    { id: "pica", name: "יק\"א / פיק\"א", type: "social_group", meaning: "מימנו התיישבות ותשתיות — יחסים מורכבים עם הקיבוץ על תקציבים" },
    { id: "achva", name: "קבוצת אחווה", type: "social_group", meaning: "מגדוד העבודה ע\"ש טרומפלדור — בנו את המבנים הראשונים ב1923" },
    { id: "erlich", name: "מיכאל ארליך", type: "person", meaning: "מפקח הבניה — קבלן חלוצי, ממייסדי תל אביב, עיצב את המגדל" },
    { id: "well_a", name: "באר א׳", type: "structure", meaning: "נחפרה בעבודת ידיים, הופעלה 1936 — שמחה ספונטנית בכל הישוב" },
    { id: "water_struggle", name: "מאבק על המים", type: "event", meaning: "עימותים עם שכנים ערבים ועם פיק\"א על זכויות וחלוקת מים" },
    { id: "second_aliya", name: "אידאולוגיית העלייה השנייה", type: "narrative", meaning: "כיבוש עבודה, חיי שותפות ושוויון — עולים ברגל לגליל" },
    { id: "mekorot", name: "מקורות", type: "social_group", meaning: "הקימה מפעלי מים 1951-1957 — סוף מצוקת המים" },
    { id: "solel_boneh", name: "סולל בונה", type: "social_group", meaning: "המשרד לעבודות ציבוריות של ההסתדרות — מסר העבודה לקבוצת אחווה" },
    { id: "construction_value", name: "ערך הבנייה החלוצית", type: "cultural_value", meaning: "בנייה בידיים, ללא ניסיון, בתנאים קשים — ״כבש הפועל את המקצוע בסערה״" },
    { id: "um_juni", name: "אום ג׳וני 1910", type: "event", meaning: "ארליך מצולם בצריף המכונן — קשר נסתר לרגע ההקמה" },
  ],
  edges: [
    { from: "water_tower", to: "ayelet", label: "landmark_of" },
    { from: "water_tower", to: "horseshoe", label: "centered_in" },
    { from: "water_tower", to: "wadi", label: "fed_by" },
    { from: "achva", to: "water_tower", label: "built" },
    { from: "erlich", to: "achva", label: "supervised" },
    { from: "erlich", to: "water_tower", label: "designed" },
    { from: "erlich", to: "um_juni", label: "documented_in" },
    { from: "pica", to: "ayelet", label: "funded" },
    { from: "solel_boneh", to: "achva", label: "contracted" },
    { from: "water_struggle", to: "wadi", label: "centered_on" },
    { from: "water_struggle", to: "pica", label: "appealed_to" },
    { from: "well_a", to: "water_tower", label: "pumped_to" },
    { from: "mekorot", to: "water_struggle", label: "resolved" },
    { from: "second_aliya", to: "ayelet", label: "motivated" },
    { from: "second_aliya", to: "construction_value", label: "expressed_through" },
    { from: "construction_value", to: "water_tower", label: "embodied_in" },
    { from: "achva", to: "second_aliya", label: "exemplifies" },
  ]
};

/**
 * תחנת הקמח "הטוחן הישן" — fictional heritage site
 * An old flour mill on the Yarkon River, Tel Aviv. Founded 1922.
 * Social tensions between preservation and development.
 */
const DEMO_KG: KGData = {
  nodes: [
    { id: "mill", name: "תחנת הקמח", type: "structure", meaning: "מבנה תעשייתי בן 3 קומות — סיליקט וכורכר, גג קרוס בחלקו" },
    { id: "yarkon", name: "נחל הירקון", type: "natural_phenomenon", meaning: "גדת הנחל — מיקום אסטרטגי לתעשייה מוקדמת" },
    { id: "greenberg", name: "יצחק גרינברג", type: "person", meaning: "מקים התחנה — חלק מניסיון התיעוש העברי בשנות ה-20" },
    { id: "machinery", name: "מכונות גריסה גרמניות", type: "artwork", meaning: "חברת Amme, Giesecke & Konegen — שריד טכנולוגי מקורי" },
    { id: "hagana", name: "סליק נשק ההגנה", type: "event", meaning: "שימוש צבאי סמוי בשנות ה-40 — שמועות על מרתף נסתר" },
    { id: "eucalyptus", name: "עצי האקליפטוס", type: "natural_phenomenon", meaning: "עתיקים, שורשיהם מאיימים על היסודות — טבע כורת את המבנה" },
    { id: "luxury_towers", name: "מגדלי היוקרה", type: "event", meaning: "לחץ פיתוח — להרוס לטובת ריאה ירוקה או חניון" },
    { id: "veterans", name: "תושבים ותיקים", type: "social_group", meaning: "טוענים שזהו השריד האחרון לתעשייה המוקדמת באזור" },
    { id: "graffiti", name: "אמני גרפיטי", type: "social_group", meaning: "שימוש בלתי רשמי — מקום מפגש, יצירה על חורבן" },
    { id: "industrial_value", name: "ערך תעשייתי-חלוצי", type: "cultural_value", meaning: "עדות לתיעוש עברי מוקדם — שכבה נשכחת בסיפור תל אביב" },
  ],
  edges: [
    { from: "mill", to: "yarkon", label: "located_on" },
    { from: "greenberg", to: "mill", label: "founded" },
    { from: "machinery", to: "mill", label: "housed_in" },
    { from: "hagana", to: "mill", label: "concealed_in" },
    { from: "eucalyptus", to: "mill", label: "threatens" },
    { from: "luxury_towers", to: "mill", label: "threatens_to_replace" },
    { from: "veterans", to: "mill", label: "advocates_for" },
    { from: "veterans", to: "luxury_towers", label: "opposes" },
    { from: "graffiti", to: "mill", label: "reappropriates" },
    { from: "industrial_value", to: "mill", label: "embodied_in" },
    { from: "mill", to: "industrial_value", label: "carries" },
    { from: "greenberg", to: "industrial_value", label: "represents" },
  ]
};

/**
 * Map sample identifiers to their pre-built KG data.
 * Used by generateKnowledgeGraph() to skip API calls for known samples.
 */
export const PREBUILT_GRAPHS: Record<string, KGData> = {
  zaira: ZAIRA_KG,
  ayelet: AYELET_KG,
  demo: DEMO_KG,
};
