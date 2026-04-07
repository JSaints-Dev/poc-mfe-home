import { Sidebar } from '@app/components/Sidebar/Sidebar'

export function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="mt-2 text-muted-foreground">Bem-vindo ao portal MFE.</p>
      </main>
    </div>
  )
}
