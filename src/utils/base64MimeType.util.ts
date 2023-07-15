export function base64MimeType(encoded: string): string | undefined {
  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  return mime?.[1];
}
