import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '@/views/CodeInput/CodeInput.css'

const SHEET_URL = import.meta.env.VITE_SHEETS_CODIGOS_URL

export default function CodeInput() {
  const [codigo, setCodigo] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateCode = async () => {
    const input = codigo.trim().toUpperCase()
    if (!input) return

    setLoading(true)

    try {
      const res = await fetch(SHEET_URL)
      const data = await res.json()

      const found = data.codigos.find(
        (c: any) => String(c.codigo).trim().toUpperCase() === input
      )

      if (!found) {
        navigate('/error-invalid')
        return
      }

      const isUsed = String(found.usado).trim().toLowerCase()
      if (isUsed === 'true' || isUsed === '1') {
        navigate('/error-used')
        return
      }

      navigate('/form', { state: { codigo: input } })
    } catch (err) {
      console.error('Error al validar el código:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Enter') validateCode()
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [codigo])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
      <div className="bg-[#1c1b2a]/80 p-8 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
      <h1 className="text-2xl font-semibold text-white text-center mb-4">🎁 Valida tu código</h1>
        <input
          type="text"
          className="codeinput-input"
          placeholder="Ingresa tu código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          disabled={loading}
          id="codeinput-input"
        />
        <button
          className="codeinput-button"
          onClick={validateCode}
          disabled={loading}
          id="codeinput-button"
        >
          {loading ? 'Validando...' : 'Validar código'}
        </button>
      </div>
    </div>
  )
}
