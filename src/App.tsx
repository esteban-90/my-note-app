import type { FC } from 'react'
import { Suspense } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Header } from '@/components'
import { NoteProvider, ThemeProvider } from '@/contexts'
import { Layout } from '@/layout'
import { NoteDetail, NoteList, NotFound } from '@/pages'
import { ReloadPrompt } from '@/pwa'
import { GlobalStyles } from '@/styles'

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
    <Suspense fallback={null}>
      <GlobalStyles />
      <ThemeProvider>
        <Layout>
          <Header />
          <NoteProvider>
            <RouterProvider router={router} />
          </NoteProvider>
          <ReloadPrompt />
        </Layout>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
