export type Row = Record<string, unknown>

export interface SourceDetail {
    id?: string;
    path: string;
    name?: string;
    score?: number;
    page?: number | null;
    snippet?: string;
}

export interface ChatMessageHistory {
    role: 'user' | 'assistant';
    content: string;
}

export interface ChatResponse {
    question: string;
    answer: string;
    sources?: string[];
    source_details?: SourceDetail[];
    tools_used?: string[];
    provider?: string;
    model?: string;
    confidence?: number;
}

export const DEFAULT_NGROK_BACKEND = 'https://preposterous-luetta-nonspecifically.ngrok-free.dev'
const apiBase = (import.meta.env.VITE_API_BASE_URL || DEFAULT_NGROK_BACKEND).replace(/\/$/, '')
const assistantBase = (import.meta.env.VITE_ASSISTANT_BASE_URL || apiBase).replace(/\/$/, '')

export const backendHost = (() => {
    try {
        return new URL(apiBase).host
    } catch {
        return 'ngrok-free.dev'
    }
})()

async function request<T = any>(base: string, path: string, init: RequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers)
    headers.set('ngrok-skip-browser-warning', '1')
    const key = import.meta.env.VITE_API_KEY
    if (key && base === apiBase) headers.set('X-API-Key', key)
    if (init.body && !(init.body instanceof FormData) && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
    let response: Response
    try {
        response = await fetch(`${base}${path}`, {...init, headers})
    } catch {
        throw new Error(`Cannot reach backend at ${base}. Check that the ngrok tunnel is online.`)
    }
    const body = await response.text()
    let data: any
    try {
        data = body ? JSON.parse(body) : {}
    } catch {
        data = body
    }
    if (!response.ok) throw new Error(typeof data === 'object' ? data.detail || data.message || `Request failed (${response.status})` : `Request failed (${response.status})`)
    return data as T
}

const queryString = (params: Record<string, string | number | undefined>) => {
    const q = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && String(v).trim()) q.set(k, String(v))
    })
    const value = q.toString()
    return value ? `?${value}` : ''
}
export const api = {
    get: <T = any>(path: string) => request<T>(apiBase, path),
    post: <T = any>(path: string, body: unknown) => request<T>(apiBase, path, {
        method: 'POST',
        body: JSON.stringify(body)
    }),
    upload: <T = any>(path: string, file: File) => {
        const form = new FormData();
        form.append('file', file);
        return request<T>(apiBase, path, {method: 'POST', body: form})
    },
    assistantGet: <T = any>(path: string) => request<T>(assistantBase, path),
    assistantPost: <T = any>(path: string, body: unknown) => request<T>(assistantBase, path, {
        method: 'POST',
        body: JSON.stringify(body)
    }),
    chat: (question: string, history?: ChatMessageHistory[]) =>
        request<ChatResponse>(apiBase, '/api/v1/chat', {
            method: 'POST',
            body: JSON.stringify({
                question,
                ...(history && history.length ? { history } : {})
            })
        }),
    url: apiBase,
    backendHost,
}
export const qs = queryString
export const rowsOf = (data: any): Row[] => Array.isArray(data) ? data : data?.items || data?.results || data?.models || data?.datasets || []
export const pretty = (value: unknown) => value == null || value === '' ? '—' : typeof value === 'object' ? JSON.stringify(value) : String(value)
