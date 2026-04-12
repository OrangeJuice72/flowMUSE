import { detectFamilyKeys, fieldProfiles } from "../data/genreProfiles";

export const shuffle = (items) => {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const normalize = (value) => value.trim().toLowerCase();
export const uniquePush = (list, item) => !item || list.some((entry) => normalize(entry) === normalize(item)) ? list : [...list, item];
export const getFilteredPool = ({ pool, selected, exclude = [] }) => { const blocked = [...selected, ...exclude].map(normalize); return pool.filter((item) => !blocked.includes(normalize(item))); };
export const getRelatedCandidates = ({ selectedGenres, fieldKey, pool, selected, exclude = [] }) => {
  const familyKeys = detectFamilyKeys(selectedGenres);
  const profile = fieldProfiles[fieldKey] || {};
  const related = familyKeys.flatMap((family) => profile[family] || []);
  const available = getFilteredPool({ pool, selected, exclude });
  return related.filter((item) => available.includes(item));
};
export const buildSuggestions = ({ pool, selected, exclude = [], selectedGenres = [], fieldKey, size = 5, cycleIndex = 0, query = "" }) => {
  const available = getFilteredPool({ pool, selected, exclude }).filter((item) => item.toLowerCase().includes(query.trim().toLowerCase()));
  const related = getRelatedCandidates({ selectedGenres, fieldKey, pool: available, selected, exclude });
  let first = null;
  if (related.length > 0) first = related[cycleIndex % related.length];
  else if (available.length > 0) first = available[cycleIndex % available.length];
  const restPool = shuffle(available.filter((item) => item !== first));
  const suggestions = first ? [first, ...restPool.slice(0, Math.max(size - 1, 0))] : restPool.slice(0, size);
  return { suggestions, relatedCount: related.length };
};
export const joinOrFallback = (items, fallback = "none specified") => items.length ? items.join(", ") : fallback;
export const copyToClipboard = async (value) => { await navigator.clipboard.writeText(value); };
export const moveStructure = (current, option) => [...current, option];
