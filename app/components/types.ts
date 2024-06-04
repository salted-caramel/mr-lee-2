// types.ts
export interface LanguageChangeProps {
  currentLanguage: string;
  onChange: (event: React.MouseEvent<HTMLButtonElement>) => void; // Update type with MouseEvent
}
