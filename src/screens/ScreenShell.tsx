import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Stack,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';

type ScreenShellProps = {
  screenId: string;
  title?: string;
  uiType?: string;
  children?: React.ReactNode;
  /** Optional explicit PDF url. If omitted, defaults to public/portal/<SCREEN_ID>.pdf */
  pdfUrl?: string;
};

export default function ScreenShell({ screenId, title, uiType, children, pdfUrl }: ScreenShellProps) {
  const [showPdf, setShowPdf] = useState(false);

  const resolvedPdfUrl = useMemo(() => {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '/');
    const pdfPath = `${base}portal/${screenId}.pdf`;

    console.log('uiType=' + uiType + ', pdfPath=' + pdfPath);

    if (pdfUrl) return pdfUrl;
    if (!screenId) return null;

    return pdfPath;
  }, [pdfUrl, screenId, uiType]);

  return (
    <Box>
      <Card>
        <CardContent>
          <Stack direction="column" spacing={1}>
            {/* Header Row */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ width: '100%', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <Typography variant="h6" sx={{ m: 0 }}>
                {title}
              </Typography>

              <Chip label={screenId} color="primary" size="small" />
              {uiType ? <Chip label={uiType} size="small" /> : null}

              {resolvedPdfUrl ? (
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<PictureAsPdf />}
                  onClick={() => setShowPdf((v) => !v)}
                  sx={{ ml: 'auto' }}
                >
                  {showPdf ? 'PDF 닫기' : 'PDF 보기'}
                </Button>
              ) : null}
            </Stack>

            <Typography variant="body2" color="text.secondary">
              이 화면은 PDF 화면설계 기반으로 자동 생성된 템플릿입니다. 필드/컬럼 정의를 채워서 구현을 완료하세요.
            </Typography>

            {/* PDF Panel */}
            {resolvedPdfUrl ? (
              <Collapse in={showPdf} timeout="auto" unmountOnExit>
                <Grid spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{xs: 12}}>
                    <Box sx={{ mb: 1 }}>
                      <a href={resolvedPdfUrl} target="_blank" rel="noreferrer">
                        새 창에서 열기
                      </a>
                    </Box>
                    <iframe
                      title={`${screenId}-pdf`}
                      src={resolvedPdfUrl}
                      style={{
                        width: '100%',
                        height: 820,
                        border: '1px solid #e5e7eb',
                        borderRadius: 8,
                      }}
                    />
                  </Grid>
                </Grid>
              </Collapse>
            ) : null}
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ height: 12 }} />
      {children}
    </Box>
  );
}