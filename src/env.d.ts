/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SHEETS_CAMPOS_URL: string;
    readonly VITE_SHEETS_CODIGOS_URL: string;
    readonly VITE_SHEETS_REGISTRO_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  