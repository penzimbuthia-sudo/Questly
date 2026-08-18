export function formatCompact(number) {
  if (number === null || number === undefined) return "—";

  if (number < 1000) {
    return String(number);
  }

  if (number < 1_000_000) {
    const thousands = number / 1000;
    return `${thousands.toFixed(1).replace(/\.0$/, "")}k`;
  }

  const millions = number / 1_000_000;
  return `${millions.toFixed(1).replace(/\.0$/, "")}M`;
}

export function formatXP(number) {
  return `${number.toLocaleString()} XP`;
}

export function formatCount(number) {
  return number.toLocaleString();
}

export function toSentenceCase(text) {
  if (!text) return "";
  const firstLetter = text.charAt(0).toUpperCase();
  const restOfText = text.slice(1).toLowerCase();
  return firstLetter + restOfText;
}

export function truncate(text, maxLength = 60) {
  if (!text || text.length <= maxLength) return text;

  const cutText = text.slice(0, maxLength);
  const lastSpaceIndex = cutText.lastIndexOf(" ");

  const cleanCut = lastSpaceIndex > 0 ? cutText.slice(0, lastSpaceIndex) : cutText;
  return cleanCut + "…";
}