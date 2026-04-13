/**
 * pages / components / AuthContext / routes 에서 (재귀적으로) import 되지 않는
 * src/features 아래 Thunks.ts 파일을 찾고, https 호출 단서를 추출해 Word(.docx)로 출력.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  HeadingLevel,
  WidthType,
} from 'docx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

function walkTsFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules') continue
      walkTsFiles(p, acc)
    } else if (/\.(ts|tsx)$/.test(ent.name)) acc.push(p)
  }
  return acc
}

function getSeedFiles() {
  const files = []
  const pages = path.join(projectRoot, 'src/pages')
  const components = path.join(projectRoot, 'src/components')
  const authCtx = path.join(projectRoot, 'src/contexts/AuthContext.tsx')
  const routes = path.join(projectRoot, 'src/routes')
  files.push(...walkTsFiles(pages))
  files.push(...walkTsFiles(components))
  if (fs.existsSync(authCtx)) files.push(authCtx)
  files.push(...walkTsFiles(routes))
  return [...new Set(files.map((f) => path.normalize(f)))]
}

function resolveFeatureModule(spec) {
  const clean = spec.replace(/\.(tsx?)$/, '').replace(/^\//, '')
  const base = path.join(projectRoot, 'src/features', clean)
  const candidates = [
    base + '.ts',
    base + '.tsx',
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
  ]
  for (const c of candidates) {
    if (fs.existsSync(c)) return path.normalize(c)
  }
  return null
}

const importFromFeaturesRe = /from\s+['"]@\/features\/([^'"]+)['"]/g

function extractFeatureImports(content) {
  const out = []
  let m
  importFromFeaturesRe.lastIndex = 0
  while ((m = importFromFeaturesRe.exec(content)) !== null) {
    out.push(m[1])
  }
  return out
}

function bfsReachableFeatureFiles() {
  const featRoot = path.normalize(path.join(projectRoot, 'src/features'))
  const visitedFeature = new Set()
  const queue = [...getSeedFiles()]

  while (queue.length) {
    const filePath = path.normalize(queue.shift())
    let content
    try {
      content = fs.readFileSync(filePath, 'utf8')
    } catch {
      continue
    }
    for (const spec of extractFeatureImports(content)) {
      const resolved = resolveFeatureModule(spec)
      if (!resolved || !resolved.startsWith(featRoot)) continue
      if (visitedFeature.has(resolved)) continue
      visitedFeature.add(resolved)
      queue.push(resolved)
    }
  }
  return visitedFeature
}

function allThunkFiles() {
  const feat = path.join(projectRoot, 'src/features')
  const all = walkTsFiles(feat)
  return all.filter((f) => f.endsWith('Thunks.ts'))
}

function extractHttpCalls(content) {
  const lines = []
  const re = /https\.(post|get|put|delete|patch)\s*\(\s*([^,)\n]+)/gi
  let m
  while ((m = re.exec(content)) !== null) {
    const arg = m[2].trim().replace(/\s+/g, ' ')
    lines.push(`${m[1].toUpperCase()} ${arg}`)
  }
  // axios 직접 URL (Any-ID logout 등)
  const ax = /axios\.(post|get)\s*\(\s*[`'"]([^`'"]+)[`'"]/gi
  while ((m = ax.exec(content)) !== null) {
    lines.push(`AXIOS.${m[1].toUpperCase()} ${m[2]}`)
  }
  return [...new Set(lines)]
}

function extractThunkExportNames(content) {
  const names = []
  const re = /export\s+const\s+(\w+)\s*=\s*createAsyncThunk/g
  let m
  while ((m = re.exec(content)) !== null) names.push(m[1])
  return names
}

async function main() {
  const reachable = bfsReachableFeatureFiles()
  const thunks = allThunkFiles()
  const unused = thunks.filter((f) => !reachable.has(path.normalize(f)))
  unused.sort((a, b) => a.localeCompare(b))

  const rows = []
  for (const file of unused) {
    const rel = path.relative(projectRoot, file).replace(/\\/g, '/')
    const content = fs.readFileSync(file, 'utf8')
    const apis = extractHttpCalls(content)
    const exports = extractThunkExportNames(content)
    rows.push({ rel, apis, exports })
  }

  const generatedAt = new Date().toISOString()

  const children = [
    new Paragraph({
      text: 'PP-FE: 미사용 Feature Thunks (REST 호출 후보)',
      heading: HeadingLevel.TITLE,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '생성일시: ', bold: true }),
        new TextRun(generatedAt),
      ],
      spacing: { after: 120 },
    }),
    new Paragraph({
      text: '분석 범위: src/pages, src/components, src/contexts/AuthContext.tsx, src/routes 에서 @/features/… import를 재귀 추적했을 때 도달하지 않는 src/features/**/*Thunks.ts',
      spacing: { after: 120 },
    }),
    new Paragraph({
      text: '주의: store/rootReducer, main.tsx, src/screens 등은 시드에 포함하지 않았습니다. Thunk는 Slice만 등록되고 다른 경로에서 dispatch되면 미사용으로 잘못 분류될 수 있습니다.',
      spacing: { after: 240 },
    }),
  ]

  if (rows.length === 0) {
    children.push(new Paragraph({ text: '미사용 Thunks 파일이 없습니다.', spacing: { after: 200 } }))
  }

  for (const { rel, apis, exports } of rows) {
    children.push(
      new Paragraph({
        text: rel,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 120 },
      })
    )
    if (exports.length) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: 'createAsyncThunk exports: ', bold: true }), new TextRun(exports.join(', '))],
          spacing: { after: 80 },
        })
      )
    }
    if (apis.length === 0) {
      children.push(new Paragraph({ text: '(https/axios 호출 패턴 미검출 — 수동 확인)', spacing: { after: 120 } }))
    } else {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: 'HTTP 호출 인자(요약):', bold: true })],
          spacing: { after: 80 },
        })
      )
      for (const line of apis) {
        children.push(
          new Paragraph({
            text: `· ${line}`,
            spacing: { after: 40 },
          })
        )
      }
    }
  }

  // 요약 표
  children.push(
    new Paragraph({
      text: '요약 표',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    })
  )

  const tableRows = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 38, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [new TextRun({ text: '파일', bold: true })] })],
        }),
        new TableCell({
          width: { size: 42, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [new TextRun({ text: '대표 REST 경로/호출', bold: true })] })],
        }),
        new TableCell({
          width: { size: 20, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [new TextRun({ text: 'Thunk 개수', bold: true })] })],
        }),
      ],
    }),
  ]

  for (const { rel, apis, exports } of rows) {
    const apiSummary = apis.length
      ? apis
          .map((a) => a.replace(/^POST\s+|^GET\s+/i, ''))
          .slice(0, 3)
          .join('; ')
      : '-'
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: rel })],
          }),
          new TableCell({
            children: [new Paragraph({ text: apiSummary })],
          }),
          new TableCell({
            children: [new Paragraph({ text: String(exports.length || 0) })],
          }),
        ],
      })
    )
  }

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: tableRows,
    })
  )

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  })

  const outDir = path.join(projectRoot, 'docs')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'unused-feature-rest-apis-report.docx')
  const buf = await Packer.toBuffer(doc)
  fs.writeFileSync(outPath, buf)

  console.log(`Wrote ${outPath}`)
  console.log(`Unused Thunks count: ${unused.length}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
