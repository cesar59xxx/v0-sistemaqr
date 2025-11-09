import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WhatsApp SaaS</h1>
          <p className="text-gray-600">Sistema de Atendimento</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
