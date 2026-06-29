import { Routes, Route } from 'react-router-dom'
import DocsLayout, { DocPage } from '../docs/DocsLayout.jsx'
import { lazy, Suspense } from 'react'

const Landing = lazy(() => import('./pages/Landing.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const Verify = lazy(() => import('./pages/Verify.jsx'))

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-[#060913] text-white flex items-center justify-center font-mono">
          Loading page...
        </div>
      }
    >
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Email Verification Page */}
        <Route path="/verify" element={<Verify />} />

        {/* Documentation Layout Layout Track */}
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
