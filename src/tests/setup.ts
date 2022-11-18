import '@testing-library/jest-dom'
import { vi } from 'vitest'
import '@/icons'

Object.defineProperty(navigator, 'vibrate', { value: vi.fn(() => true) })

vi.stubGlobal(
  'matchMedia',
  vi.fn(() => ({ matches: true }))
)
