import esApi from "@/i18n/locales/es/api.json";
import enApi from "@/i18n/locales/en/api.json";
import frApi from "@/i18n/locales/fr/api.json";

type ApiTodosMessages = typeof esApi.Api.Todos;

const messages: Record<string, ApiTodosMessages> = {
    es: esApi.Api.Todos,
    en: enApi.Api.Todos,
    fr: frApi.Api.Todos,
};

export function getApiTodosMessages(locale: string) {
    const t = messages[locale] ?? messages.es;
    return {
        ...t,
        todoNotFound: (id: string) => t.todoNotFound.replace("{id}", id),
        duplicateTitle: (title: string) => t.duplicateTitle.replace("{title}", title),
    };
}
