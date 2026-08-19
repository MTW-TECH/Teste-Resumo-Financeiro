/*
  Normaliza nomes de arquivo antes de usa-los em chaves do S3.
  Remove acentos, troca espacos por "_" e descarta qualquer caractere
  que nao seja letra, numero, "_", "-" ou ".", evitando falhas de upload
  causadas por nomes de arquivo com espacos ou caracteres especiais.
*/

// Faixa Unicode dos sinais diacriticos combinaveis (acentos, til, cedilha...)
// gerados por String.normalize('NFD'). Construida via code point para evitar
// caracteres invisiveis literais no codigo-fonte.
const COMBINING_MARKS_START = String.fromCodePoint(0x0300);
const COMBINING_MARKS_END = String.fromCodePoint(0x036f);
const DIACRITICS_REGEX = new RegExp(
  `[${COMBINING_MARKS_START}-${COMBINING_MARKS_END}]`,
  'g'
);

export const sanitizeFileName = (fileName = '') => {
  const sanitized = fileName
    .normalize('NFD')
    .replace(DIACRITICS_REGEX, '')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_.-]/g, '')
    .replace(/_+/g, '_');

  return sanitized || 'arquivo';
};
