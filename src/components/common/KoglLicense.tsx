import { useTranslation } from 'react-i18next';
import React, { useMemo } from 'react';
import { Box, Typography, Link } from '@mui/material';

type KoglConfig = {
  url: string | undefined;
  title: string | undefined;
  image: string | undefined;
  imageAlt: string | undefined;
  description: string | undefined;
};

function getKoglConfigForType(
  typeCd: string,
  lang: string,
  t: (key: string) => string
): Pick<KoglConfig, 'title' | 'url' | 'image' | 'imageAlt' | 'description'> {
  const prefix = `koglCprgtType${typeCd}`;
  const mid = lang === 'ko' ? 'Ko' : 'En';
  const key = (suffix: string) => t(`${prefix}${mid}${suffix}`);
  return {
    title: key('Title'),
    url: key('Url'),
    image: key('Image'),
    imageAlt: key('ImageAlt'),
    description: key('Description'),
  };
}

export type KoglLicenseProps = {
  /** KOGL 저작권 유형 코드 (1~4). 미전달 시 '4' 사용 */
  menuKoglCprgtTypeCd?: string;
};

export default function KoglLicense({ menuKoglCprgtTypeCd = '4' }: KoglLicenseProps) {
  const { t, i18n } = useTranslation();

  const config = useMemo<KoglConfig>(() => {
    const lang = i18n.language;
    const typeCd = menuKoglCprgtTypeCd && menuKoglCprgtTypeCd !== '' ? menuKoglCprgtTypeCd : '4';
    return {
      ...getKoglConfigForType(typeCd, lang, t),
    };
  }, [i18n.language, t, menuKoglCprgtTypeCd]);

  return (
    <Box className="kogl-license-wrap">
      <Box className="kogl-container">
        <Link
          href={config.url}
          underline="none"
          target="_blank"
          title={config.title}
          rel="noopener noreferrer"
        >
          <Box className="kogl-image">
            <img src={config.image} alt={config.imageAlt} />
          </Box>
        </Link>
        <Box className="kogl-text">
          <Typography component="p">{config.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
