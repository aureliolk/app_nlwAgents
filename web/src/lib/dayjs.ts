import lib from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Configurar locale de forma condicional
if (typeof window !== 'undefined') {
  // No cliente, importar o locale
  import("dayjs/locale/pt-br").then(() => {
    lib.locale("pt-BR");
  });
} else {
  // No servidor/build, usar locale padrão
  lib.locale("en");
}

lib.extend(relativeTime);

export const dayjs = lib;