import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { getFAQSchema, getBreadcrumbSchema } from '@/lib/jsonld'
import JsonLd from '@/components/JsonLd'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import SalaryPageClient from './page-client'

export const metadata: Metadata = {
  title: pageMetadata.salary.title,
  description: pageMetadata.salary.description,
  alternates: { canonical: '/salary' },
  openGraph: {
    title: '2026 연봉 실수령액표 | 내 연봉으로 몇 살에 은퇴 가능?',
    description: pageMetadata.salary.description,
  },
}

const salaryFaqs = [
  {
    question: '2026년 연봉 3000만원 실수령액은?',
    answer:
      '연봉 3,000만원의 2026년 월 실수령액은 약 222만원입니다. 국민연금(11만), 건강보험(9만), 장기요양(1만), 고용보험(2만), 소득세(3만), 지방소득세(0.3만) 등이 공제됩니다.',
  },
  {
    question: '연봉 5000만원이면 몇 살에 은퇴 가능?',
    answer:
      '연봉 5,000만원(실수령 약 350만원)에서 월 200만원 생활비를 유지하면 저축률 약 43%로, 30세 시작 기준 약 20년 후(50세) FIRE 달성이 가능합니다.',
  },
  {
    question: '저축률을 높이면 FIRE 달성이 얼마나 빨라지나요?',
    answer:
      '저축률의 효과는 극적입니다. 저축률을 30%에서 50%로 올리면 FIRE까지 약 10년이 단축됩니다. 이는 더 많은 돈을 모으는 효과와 생활비가 줄어 필요 은퇴자금도 줄어드는 이중 효과 때문입니다.',
  },
]

export default function SalaryPage() {
  const faqSchema = getFAQSchema(salaryFaqs)
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '홈', url: '/' },
    { name: '연봉 실수령액', url: '/salary' },
  ])

  return (
    <main className="pb-8">
      <Header />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumb items={[{ label: '연봉 실수령', href: '/salary' }]} />

      <SalaryPageClient faqs={salaryFaqs} />

      <Footer />
    </main>
  )
}
