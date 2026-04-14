import { useTranslations } from "next-intl";

export default function LoadingSpinner() {
    const t = useTranslations("Labels");

    return (
        <div className="spinner" role="status" aria-label={t("loading")}>
            <div className="spinner__rings" aria-hidden="true">
                <span className="spinner__ring spinner__ring--outer" />
                <span className="spinner__ring spinner__ring--inner" />
                <span className="spinner__logo">i</span>
            </div>
            <p className="spinner__text">{t("loading")}<span className="spinner__dots" /></p>
        </div>
    );
}
