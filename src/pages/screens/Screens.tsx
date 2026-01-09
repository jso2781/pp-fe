import React, { useMemo, useState } from 'react';
import {
  Box,
  Card,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { screens, type ScreenMeta } from '@/screens/meta';

export default function Screens() {
  const [q, setQ] = useState('');

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    const arr = screens as ScreenMeta[];
    if (!query) return arr;
    return arr.filter((s) => {
      const hay = `${s.id} ${s.title ?? ''} ${s.uiType ?? ''}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q]);

  return (
    <Box sx={{ p: 2 }} className="container">
      <Stack spacing={2}>
        <Typography variant="h5">Screens</Typography>

        <Card variant="outlined" sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              size="small"
              label="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              fullWidth
            />
            <Chip label={`${rows.length}`} />
          </Stack>
        </Card>

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width={220}>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell width={140}>UI Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>
                    <Link to={`/screens/${encodeURIComponent(s.id)}`}>{s.id}</Link>
                  </TableCell>
                  <TableCell>{s.title}</TableCell>
                  <TableCell>{s.uiType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}
