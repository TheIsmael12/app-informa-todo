import { useTranslations } from "next-intl";

interface TitleComponentProps {
    namespace: string;
}

export default function TitleComponent({ namespace }: TitleComponentProps) {
    const t = useTranslations(`Views.${namespace}`);

    return (
        <header className="title">
            <h1 className="title__heading">{t("title")}</h1>
            <p className="title__description">{t("description")}</p>
        </header>
    );
}
