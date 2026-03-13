import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { getBreadcrumbSchema } from '@/lib/jsonld'
import JsonLd from '@/components/JsonLd'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import SavingsRatePageClient from './page-client'

export const metadata: Metadata = {
  title: pageMetadata.savingsRate.title,
  description: pageMetadata.savingsRate.description,
  alternates: { canonical: '/savings-rate' },
  keywords: [
    '저축률 FIRE',
    '저축률별 은퇴',
    '조기은퇴 저축률',
    'FIRE 달성 기간',
    '저축률 시뮬레이터',
  ],
  openGraph: {
    title: '저축률별 FIRE 달성 시점 비교 | 저축률이 은퇴를 앞당기는 힘',
    description: pageMetadata.savingsRate.description,
  },
}

export default function SavingsRatePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '홈', url: '/' },
    { name: '저축률 비교', url: '/savings-rate' },
  ])

  return (
    <main className="pb-8">
      <Header />
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumb items={[{ label: '저축률 비교', href: '/savings-rate' }]} />

      <SavingsRatePageClient />

      <Footer />
    </main>
  )
}
