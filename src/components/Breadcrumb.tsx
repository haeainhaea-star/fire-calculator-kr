'use client'

import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb" className="px-4 py-2">
      <ol className="flex items-center gap-1 text-xs text-slate-400">
        <li>
          <Link href="/" className="hover:text-slate-600 transition-colors">
            홈
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            <span>/</span>
            {i === items.length - 1 ? (
              <span className="text-slate-600 font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-slate-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
