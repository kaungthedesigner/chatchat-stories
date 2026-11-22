/* ============ LANGUAGE (English / Burmese) ============
   A story's lines live in stories/<story>/text/<chapter>.json, one entry per line ID with its English and
   Burmese; the build turns them into TEXT_EN / TEXT_MY, ID_CH (ID prefix -> chapter number) and TEXT_OWN
   (just above). The flow files use the IDs; at start the steps get their English back (idStatic) and each ID
   is remembered, so Burmese mode shows that ID's own Burmese (trS in lang.js). Only scene descriptions, chats
   and spoken lines (and the reply options Min picks) are translated; the interface, names, captions, titles
   and dates stay English. MY_STORY is the older English-keyed map, rebuilt here for the few places that still
   look a line up by its English (scroll-back, photo-walk spot names, switching language mid-scene). Lines
   with a Burmese of their own for that one place (own: true, TEXT_OWN) are left out of it. */
const MY_STORY=(()=>{const o={};for(const id in TEXT_MY){if(TEXT_OWN.has(id))continue;const ch=ID_CH[id.split('.')[0]],en=TEXT_EN[id];if(en===undefined)continue;const d=o[ch]=o[ch]||{};if(d[en]===undefined)d[en]=TEXT_MY[id]}return o})();
