import { Routes, Route } from 'react-router-dom'
import DocsLayout, { DocPage } from '../docs/DocsLayout.jsx'
import { lazy, Suspense } from 'react'

const Landing = lazy(() => import('./pages/Landing.jsx'))

export default function App() {
  return (
    <Suspense
      fallback={<div className="h-screen flex items-center justify-center">Loading page...</div>}
    >
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/docs/*"
          element={
            <DocsLayout>
              <DocPage />
            </DocsLayout>
          }
        />
      </Routes>
    </Suspense>
  )
}
