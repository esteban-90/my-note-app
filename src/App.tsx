import type { FC } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Header, Layout } from '@/components'
import { NoteProvider, ThemeProvider, LanguageProvider } from '@/contexts'
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
    <>
      <GlobalStyles />
      <ThemeProvider>
        <LanguageProvider>
          <ReloadPrompt />
          <Layout>
            <Header />
            <NoteProvider>
              <RouterProvider router={router} />
            </NoteProvider>
          </Layout>
        </LanguageProvider>
      </ThemeProvider>
    </>
  )
}

export default App
