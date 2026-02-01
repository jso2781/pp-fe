import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

export type ContactAreaProps = {
  contactDepNm?: string | null;
  contactPersonNm?: string | null;
  contactPhoneNum?: string | null;
};

export default function ContactArea({
  contactDepNm = null,
  contactPersonNm = null,
  contactPhoneNum = null
}: ContactAreaProps) {
  const { t } = useTranslation();

  return (
    <Box className="contact-box">
      {contactDepNm && (
        <div className="info-item">
          <span className="info-label">{t("contactDepartment")}</span>
          <span className="info-value">{contactDepNm}</span>
        </div>
      )}

      {contactPersonNm && (
        <div className="info-item">
          <span className="info-label">{t("contactPerson")}</span>
          <span className="info-value">{contactPersonNm}</span>
        </div>
      )}

      {contactPhoneNum && (
        <div className="info-item">
          <span className="info-label">{t("contactPhone")}</span>
          <span className="info-value">
            <a href={`tel:${contactPhoneNum}`} className="info-tel">{contactPhoneNum}</a>
            <span className="info-sub">{t("contactPhoneTime")}</span>
          </span>
        </div>
      )}
    </Box>
  );
}