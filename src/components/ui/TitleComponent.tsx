import { useTranslations } from "next-intl";

interface TitleComponentProps {
    namespace: string;
}

export default function TitleComponent({ namespace }: TitleComponentProps) {
    const t = useTranslations(`Views.${namespace}`);

    return (
        <header className="page-title">
            <h1 className="page-title__heading">{t("title")}</h1>
            <p className="page-title__description">{t("description")}</p>
        </header>
    );
}
