export function echo(message: string): string {
  return message;
}

export type TextStats = {
  words: number;
  characters: number;
};

export function textStats(text: string): TextStats {
  const trimmed = text.trim();
  return {
    words: trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length,
    characters: text.length
  };
}
