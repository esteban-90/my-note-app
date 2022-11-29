import '@testing-library/jest-dom'
import '@/icons'
import { vi } from 'vitest'

Object.defineProperty(navigator, 'vibrate', { value: vi.fn(() => true) })
Object.defineProperty(window, 'matchMedia', { value: vi.fn().mockImplementation(() => ({ matches: true })) })
