// TODO: move to shared library
import { useState } from 'react'
import { clearToken } from '@app/utils/auth'

const MENU = [
  { label: 'Home', href: '/', external: true },
  {
    label: 'Feature A',
    external: true,
    children: [
      { label: 'Página A1', href: '/feature-a/page-a1' },
      { label: 'Página A2', href: '/feature-a/page-a2' },
    ],
  },
  {
    label: 'Feature B',
    external: true,
    children: [
      { label: 'Página B1', href: '/feature-b/page-b1' },
      { label: 'Página B2', href: '/feature-b/page-b2' },
      { label: 'Página B3', href: '/feature-b/page-b3' },
    ],
  },
]

export function Sidebar() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  function toggle(label: string) {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  function handleLogout() {
    clearToken()
    window.location.href = '/login'
  }

  return (
    <aside className="w-56 min-h-screen flex flex-col bg-[var(--color-sidebar-bg)] text-[var(--color-sidebar-text)]">
      <div className="px-4 py-5 text-lg font-bold tracking-wide border-b border-white/10">
        MFE Portal
      </div>
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {MENU.map((item) => {
          if (!item.children) {
            return (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm hover:bg-white/10 transition-colors"
              >
                {item.label}
              </a>
            )
          }

          const isOpen = expanded[item.label] ?? false
          return (
            <div key={item.label}>
              <button
                onClick={() => toggle(item.label)}
                className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-white/10 transition-colors flex justify-between items-center"
              >
                {item.label}
                <span className="text-xs opacity-60">{isOpen ? '▲' : '▼'}</span>
              </button>
              {isOpen && (
                <div className="ml-3 mt-1 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="px-3 py-1.5 rounded-md text-sm hover:bg-white/10 transition-colors opacity-90"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
      <div className="px-2 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-white/10 transition-colors opacity-80"
        >
          Sair
        </button>
      </div>
    </aside>
  )
}
