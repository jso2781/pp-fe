import { useTranslation } from 'react-i18next';
import React, { useMemo } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';

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

export default function KoglLicense() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { getMenuInfo } = useAuth();

  const config = useMemo<KoglConfig>(() => {
    const lang = i18n.language;
    const menuInfo = getMenuInfo(location.pathname);
    const typeCd = menuInfo?.menuKoglCprgtTypeCd && menuInfo.menuKoglCprgtTypeCd !== '' ? menuInfo.menuKoglCprgtTypeCd : '4';

    return{
      ...getKoglConfigForType(typeCd, lang, t),
    };
  }, [i18n.language, t, location.pathname, getMenuInfo]);

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
