import React, { useState } from 'react'
import { Check, Copy, FileText, ExternalLink, ChevronDown, ChevronUp, Table, Maximize2, Minimize2 } from 'lucide-react'
import type { SourceDetail } from './api'

interface MarkdownViewProps {
  content: string
  onCitationClick?: (citationId: string) => void
}

/**
 * Tokenize and render inline formatting:
 * - Code: `code`
 * - Citations: [S1], [S2], etc.
 * - Links: [label](url)
 * - Bold italic: ***text***
 * - Bold: **text**
 * - Italic: *text*
 * - Math: $x^2$
 */
export function renderInline(
  text: string,
  onCitationClick?: (citationId: string) => void
): React.ReactNode[] {
  const tokenRegex = /(`[^`]+`)|(\[S\d+\])|(\[[^\]]+\]\([^)]+\))|(\*\*\*[^*]+\*\*\*)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\$[^$]+\$)/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const token = match[0]
    const key = `tok-${match.index}`

    if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(
        <code key={key} className="inline-code">
          {token.slice(1, -1)}
        </code>
      )
    } else if (/^\[S\d+\]$/.test(token)) {
      const citeId = token.slice(1, -1)
      nodes.push(
        <button
          key={key}
          type="button"
          className="citation-chip"
          onClick={() => onCitationClick?.(citeId)}
          title={`Jump to source ${citeId}`}
        >
          {token}
        </button>
      )
    } else if (token.startsWith('[') && token.includes('](')) {
      const closingBracket = token.indexOf('](')
      const label = token.slice(1, closingBracket)
      const url = token.slice(closingBracket + 2, -1)
      nodes.push(
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="markdown-link"
        >
          {label} <ExternalLink size={10} style={{ display: 'inline', verticalAlign: 'baseline' }} />
        </a>
      )
    } else if (token.startsWith('***') && token.endsWith('***')) {
      nodes.push(
        <strong key={key}>
          <em>{token.slice(3, -3)}</em>
        </strong>
      )
    } else if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>)
    } else if (token.startsWith('$') && token.endsWith('$')) {
      nodes.push(
        <span key={key} className="math-inline">
          {token.slice(1, -1)}
        </span>
      )
    } else {
      nodes.push(token)
    }

    lastIndex = tokenRegex.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

/**
 * Fenced Code Block with syntax tag and Copy button
 */
export function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback if clipboard API is restricted
      const ta = document.createElement('textarea')
      ta.value = code
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="markdown-code-card">
      <div className="code-header">
        <span className="code-lang-tag">
          <FileText size={12} />
          {language || 'code'}
        </span>
        <button type="button" className="code-copy-btn" onClick={handleCopy}>
          {copied ? (
            <>
              <Check size={12} className="copy-success" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="code-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}

/**
 * Fully Scrollable & Expandable Markdown Table Component
 * Ensures multi-column research tables don't truncate or squish row contents.
 */
export function MarkdownTable({
  headers,
  alignments,
  rows,
  onCitationClick,
}: {
  headers: string[]
  alignments: string[]
  rows: string[][]
  onCitationClick?: (citationId: string) => void
}) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleCopyCsv = async () => {
    try {
      const csv = [
        headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
        ...rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')),
      ].join('\n')
      await navigator.clipboard.writeText(csv)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={`markdown-table-container ${expanded ? 'table-container-expanded' : ''}`}>
      <div className="table-toolbar">
        <div className="table-meta-tag">
          <Table size={13} className="text-brand" />
          <span>
            <b>Structured Table</b> ({headers.length} columns × {rows.length} rows)
          </span>
          <span className="table-scroll-hint">↔ Scroll horizontally for full row data</span>
        </div>
        <div className="table-actions">
          <button
            type="button"
            className="table-tool-btn"
            onClick={() => setExpanded(!expanded)}
            title={expanded ? 'Collapse to standard width' : 'Expand to full width'}
          >
            {expanded ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
            <span>{expanded ? 'Collapse' : 'Expand full width'}</span>
          </button>
          <button
            type="button"
            className="table-tool-btn"
            onClick={handleCopyCsv}
            title="Copy as CSV"
          >
            {copied ? (
              <>
                <Check size={11} className="copy-success" />
                <span>Copied CSV!</span>
              </>
            ) : (
              <>
                <Copy size={11} />
                <span>Copy CSV</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="markdown-table-wrapper">
        <table className="markdown-table">
          <thead>
            <tr>
              {headers.map((h, colIdx) => (
                <th
                  key={colIdx}
                  style={{ textAlign: (alignments[colIdx] || 'left') as any }}
                >
                  {renderInline(h, onCitationClick)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {headers.map((_, colIdx) => {
                  const cellVal = row[colIdx] ?? ''
                  return (
                    <td
                      key={colIdx}
                      style={{ textAlign: (alignments[colIdx] || 'left') as any }}
                    >
                      {renderInline(cellVal, onCitationClick)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * Parse and render complete Markdown document into structured React nodes
 */
export function MarkdownView({ content, onCitationClick }: MarkdownViewProps) {
  if (!content) return null

  const lines = content.split(/\r?\n/)
  const elements: React.ReactNode[] = []
  let i = 0

  const parseTableCells = (line: string): string[] => {
    let raw = line.trim()
    if (raw.startsWith('|')) raw = raw.slice(1)
    if (raw.endsWith('|')) raw = raw.slice(0, -1)
    return raw.split('|').map(c => c.trim())
  }

  const isTableSeparator = (line: string): boolean => {
    const trimmed = line.trim()
    return (
      trimmed.includes('|') &&
      trimmed.replace(/[:|\-\s]/g, '').length === 0 &&
      trimmed.includes('-')
    )
  }

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // 1. Fenced Code Block
    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      if (i < lines.length) i++ // Skip closing ```
      elements.push(
        <CodeBlock
          key={`code-${elements.length}`}
          language={language}
          code={codeLines.join('\n')}
        />
      )
      continue
    }

    // 2. Table Block
    if (
      trimmed.includes('|') &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1])
    ) {
      const headers = parseTableCells(trimmed)
      const separatorRow = parseTableCells(lines[i + 1])
      const alignments = separatorRow.map(col => {
        const starts = col.startsWith(':')
        const ends = col.endsWith(':')
        if (starts && ends) return 'center'
        if (ends) return 'right'
        return 'left'
      })

      i += 2 // Skip header & separator
      const dataRows: string[][] = []

      while (i < lines.length && lines[i].trim().includes('|') && lines[i].trim() !== '') {
        dataRows.push(parseTableCells(lines[i]))
        i++
      }

      elements.push(
        <MarkdownTable
          key={`table-${elements.length}`}
          headers={headers}
          alignments={alignments}
          rows={dataRows}
          onCitationClick={onCitationClick}
        />
      )
      continue
    }

    // 3. Headings (#, ##, ###, ####)
    if (trimmed.startsWith('#')) {
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/)
      if (match) {
        const level = match[1].length
        const headingText = match[2]
        const inlineNodes = renderInline(headingText, onCitationClick)
        const key = `heading-${elements.length}`
        if (level === 1) {
          elements.push(<h3 key={key} className="markdown-h1">{inlineNodes}</h3>)
        } else if (level === 2) {
          elements.push(<h4 key={key} className="markdown-h2">{inlineNodes}</h4>)
        } else if (level === 3) {
          elements.push(<h5 key={key} className="markdown-h3">{inlineNodes}</h5>)
        } else {
          elements.push(<h6 key={key} className="markdown-h4">{inlineNodes}</h6>)
        }
        i++
        continue
      }
    }

    // 4. Horizontal Rule (---, ***, ___)
    if (/^(\-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      elements.push(<hr key={`hr-${elements.length}`} className="markdown-hr" />)
      i++
      continue
    }

    // 5. Blockquote (> ...)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      elements.push(
        <blockquote key={`quote-${elements.length}`} className="markdown-blockquote">
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx} className="markdown-blockquote-p">
              {renderInline(ql, onCitationClick)}
            </p>
          ))}
        </blockquote>
      )
      continue
    }

    // 6. Unordered List (- , * , + )
    if (/^[\*\-\+]\s+/.test(trimmed)) {
      const listItems: string[] = []
      while (i < lines.length && /^[\*\-\+]\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[\*\-\+]\s+/, ''))
        i++
      }
      elements.push(
        <ul key={`ul-${elements.length}`} className="markdown-ul">
          {listItems.map((item, lIdx) => (
            <li key={lIdx}>{renderInline(item, onCitationClick)}</li>
          ))}
        </ul>
      )
      continue
    }

    // 7. Ordered List (1. , 2. )
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''))
        i++
      }
      elements.push(
        <ol key={`ol-${elements.length}`} className="markdown-ol">
          {listItems.map((item, lIdx) => (
            <li key={lIdx}>{renderInline(item, onCitationClick)}</li>
          ))}
        </ol>
      )
      continue
    }

    // 8. Blank line
    if (!trimmed) {
      i++
      continue
    }

    // 9. Standard Paragraph
    const paragraphLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('>') &&
      !/^[\*\-\+]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !(lines[i].trim().includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) &&
      !/^(\-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i])
      i++
    }

    if (paragraphLines.length > 0) {
      elements.push(
        <p key={`p-${elements.length}`} className="markdown-p">
          {paragraphLines.map((pl, plIdx) => (
            <React.Fragment key={plIdx}>
              {renderInline(pl, onCitationClick)}
              {plIdx < paragraphLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      )
    }
  }

  return <div className="markdown-body">{elements}</div>
}

/**
 * Interactive Source Cards Component
 */
export function SourceDetailsView({
  sources,
  sourceDetails,
  highlightedId,
  onSourceClick,
}: {
  sources?: string[]
  sourceDetails?: SourceDetail[]
  highlightedId?: string | null
  onSourceClick?: (id: string) => void
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedPath, setCopiedPath] = useState<string | null>(null)

  const handleCopyPath = async (path: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(path)
      setCopiedPath(path)
      setTimeout(() => setCopiedPath(null), 2000)
    } catch {}
  }

  if (sourceDetails && sourceDetails.length > 0) {
    return (
      <div className="source-cards-container">
        {sourceDetails.map((src, idx) => {
          const badgeId = src.id || `S${idx + 1}`
          const isHighlighted = highlightedId === badgeId
          const isExpanded = expandedId === badgeId

          return (
            <div
              key={badgeId}
              id={`source-card-${badgeId}`}
              className={`source-detail-card ${isHighlighted ? 'source-card-highlighted' : ''}`}
              onClick={() => {
                onSourceClick?.(badgeId)
                setExpandedId(isExpanded ? null : badgeId)
              }}
            >
              <div className="source-detail-header">
                <span className="source-detail-badge">{badgeId}</span>
                <span className="source-detail-name" title={src.path}>
                  {src.name || src.path.split(/[\\/]/).pop()}
                </span>
                {typeof src.score === 'number' && (
                  <span
                    className="source-detail-score"
                    title={`Relevance score: ${src.score.toFixed(3)}`}
                  >
                    {Math.round(src.score * 100)}% match
                  </span>
                )}
                <button
                  type="button"
                  className="source-copy-btn"
                  title="Copy file path"
                  onClick={e => handleCopyPath(src.path, e)}
                >
                  {copiedPath === src.path ? (
                    <span className="copy-success-tag">Copied!</span>
                  ) : (
                    <Copy size={11} />
                  )}
                </button>
                {src.snippet && (
                  <button
                    type="button"
                    className="source-expand-btn"
                    title={isExpanded ? 'Collapse excerpt' : 'Expand excerpt'}
                  >
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                )}
              </div>

              <div className="source-detail-path">{src.path}</div>

              {src.snippet && isExpanded && (
                <div className="source-detail-snippet">
                  <div className="snippet-quote-bar" />
                  <div className="snippet-text">{src.snippet}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  if (sources && sources.length > 0) {
    return (
      <div className="source-list">
        {sources.map((s, j) => (
          <span key={j} className="source-fallback-item">
            <FileText size={12} />
            <code>{s}</code>
          </span>
        ))}
      </div>
    )
  }

  return <div className="no-sources">No source paths were returned with this response.</div>
}
