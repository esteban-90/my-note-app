import type { FC } from 'react'
import { Suspense, lazy } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Header } from '@/components'
import { NoteProvider, ThemeProvider } from '@/contexts'
import { Layout } from '@/layout'
import { ReloadPrompt } from '@/pwa'
import { GlobalStyles } from '@/styles'

const NoteList = lazy(() => import('@/pages/NoteList'))
const NoteDetail = lazy(() => import('@/pages/NoteDetail'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const routes = createRoutesFromElements(
  <Route path='/'>
    <Route index element={<NoteList />} />
    <Route path='notes'>
      <Route index element={<NoteDetail />} />
      <Route path=':id' element={<NoteDetail />} />
    </Route>
    <Route path='*' element={<NotFound />} />
  </Route>
)

const router = createBrowserRouter(routes)

const App: FC = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <Layout>
          <Header />
          <Suspense fallback={null}>
            <NoteProvider>
              <RouterProvider router={router} />
            </NoteProvider>
          </Suspense>
          <ReloadPrompt />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default App
