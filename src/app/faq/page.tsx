import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '@/lib/metadata'
import { getFAQSchema, getBreadcrumbSchema } from '@/lib/jsonld'
import JsonLd from '@/components/JsonLd'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import FAQAccordion from './faq-accordion'

export const metadata: Metadata = {
  title: pageMetadata.faq.title,
  description: pageMetadata.faq.description,
  alternates: { canonical: '/faq' },
  openGraph: {
    title: pageMetadata.faq.title,
    description: pageMetadata.faq.description,
  },
}

const faqs = [
  {
    question: 'FIRE란 무엇인가요?',
    answer:
      'FIRE는 Financial Independence, Retire Early의 약자로, 경제적 독립을 달성해 기존의 은퇴 연령보다 빨리 일에서 자유로워지는 것을 목표로 하는 재무 전략입니다. 핵심은 높은 저축률과 투자를 통해 생활비의 25~30배에 해당하는 자산을 모으는 것입니다. 이 자산에서 매년 3~4%를 인출하면 원금을 유지하면서 생활할 수 있다는 연구 결과에 기반합니다.',
  },
  {
    question: '파이어족이 되려면 얼마가 필요한가요?',
    answer:
      '필요 자금은 은퇴 후 월 생활비에 따라 달라집니다. 4% 룰 기준으로 월 생활비 × 12개월 × 25배가 필요합니다. 예를 들어 월 250만원 생활비라면 약 7억 5천만원, 월 300만원이라면 9억원이 필요합니다. 다만 한국에서는 건강보험료, 국민연금 등을 고려하면 이보다 10~20% 더 필요할 수 있습니다. 부가수입이나 국민연금이 있다면 필요 금액은 줄어듭니다.',
  },
  {
    question: '4% 룰(안전 인출률)이란 무엇인가요?',
    answer:
      '4% 룰은 미국 트리니티 연구(Trinity Study)에서 유래한 은퇴 인출 전략입니다. 은퇴 자산의 4%를 첫해에 인출하고, 이후 매년 인플레이션만큼 인출액을 조정하면 30년 동안 자산이 고갈되지 않을 확률이 95% 이상이라는 연구 결과입니다. 다만 한국 실정(낮은 금리, 높은 물가 상승률)을 고려하면 3~3.5%가 더 안전한 인출률로 권장됩니다.',
  },
  {
    question: 'FIRE 달성에 필요한 저축률은 얼마인가요?',
    answer:
      '저축률이 FIRE 달성 속도를 결정하는 가장 중요한 변수입니다. 연 5% 실질 수익률 기준으로, 저축률 20%면 약 37년, 30%면 약 28년, 50%면 약 17년, 70%면 약 8.5년 만에 FIRE에 도달할 수 있습니다. 저축률이 높을수록 이중 효과가 있습니다: 더 많이 저축하면서 동시에 지출을 줄이므로 필요 은퇴 자금도 줄어듭니다.',
  },
  {
    question: '조기은퇴 후 건강보험료는 어떻게 되나요?',
    answer:
      '퇴직 후 직장 건보료 자격을 잃으면 지역가입자로 전환됩니다. 배당소득이 연 2,000만원을 넘으면 금융소득종합과세 대상이 되어 건보료 부담이 크게 늘어납니다. 이를 "건보료 폭탄"이라고 합니다. 이 계산기에서는 배당소득 대신 ETF 매도(자가배당) 전략을 사용하면 건보료를 절약할 수 있음을 시뮬레이션합니다. 자가배당 시 양도소득은 건보료 부과 대상이 아닙니다.',
  },
  {
    question: 'FIRE 후 국민연금은 받을 수 있나요?',
    answer:
      '네, 조기은퇴해도 이미 납부한 국민연금은 수령 가능합니다. 단, 10년(120개월) 이상 가입해야 노령연금을 받을 수 있습니다. 수령 시작 나이는 출생연도에 따라 63~65세이며, 조기수령(최대 5년 앞당김) 시 월 0.5%씩 감액됩니다. FIRE 후 국민연금을 추가 소득원으로 계획하면 필요 은퇴 자금을 줄일 수 있습니다.',
  },
  {
    question: 'Lean FIRE, Fat FIRE, Barista FIRE의 차이는?',
    answer:
      'FIRE에는 여러 변형이 있습니다. Lean FIRE는 최소한의 생활비(월 150~200만원)로 검소하게 은퇴하는 방식입니다. Fat FIRE는 넉넉한 생활비(월 400만원 이상)를 유지하는 여유로운 은퇴입니다. Barista FIRE는 완전한 은퇴가 아닌 파트타임 근무로 부족한 생활비를 보충하는 반(半)은퇴 방식입니다. Coast FIRE는 더 이상 저축하지 않아도 복리 효과로 은퇴 시점에 충분한 자산이 되는 상태를 말합니다.',
  },
  {
    question: '한국에서 FIRE가 가능한가요?',
    answer:
      '충분히 가능합니다. 다만 한국 특유의 변수를 고려해야 합니다. 높은 주거비(전세/월세), 자녀 교육비, 건강보험료 체계, 국민연금 등이 미국과 다릅니다. 한국의 장점은 국민건강보험과 국민연금이라는 사회안전망이 있다는 점입니다. 이 계산기는 이러한 한국 실정을 반영하여 현실적인 FIRE 시뮬레이션을 제공합니다.',
  },
  {
    question: 'FIRE 계산 시 인플레이션은 어떻게 반영하나요?',
    answer:
      '이 계산기는 실질수익률(명목수익률 - 인플레이션율)을 사용합니다. 예를 들어 기대수익률 7%, 인플레이션 3%라면 실질수익률 약 3.88%로 계산합니다. 이렇게 하면 미래의 모든 금액이 "오늘 가치"로 표시되어 직관적으로 이해할 수 있습니다. 기본 인플레이션율은 3%로 설정되어 있으며, Step 3에서 조정 가능합니다.',
  },
  {
    question: '이 계산기의 계산 방식은 어떻게 되나요?',
    answer:
      'FIRE 필요 자금 = (월 생활비 × 12) ÷ 인출률로 계산합니다. 자산 성장은 매년 [현재 자산 × (1 + 실질수익률) + 연간 저축]으로 시뮬레이션합니다. 세금은 배당소득세(15.4%), 해외주식 양도소득세(22%, 250만원 공제 후), 건보료(7.09%, 2,000만원 초과분)를 각각 계산합니다. 달성 확률은 인출률, 부가수입, 연금 등을 종합한 간이 판단 모델을 사용합니다.',
  },
]

export default function FAQPage() {
  const faqSchema = getFAQSchema(faqs)
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '홈', url: '/' },
    { name: 'FAQ', url: '/faq' },
  ])

  return (
    <main className="pb-8">
      <Header />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumb items={[{ label: 'FAQ', href: '/faq' }]} />

      <div className="px-4 pt-4 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            FIRE 자주 묻는 질문
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            파이어족이 되기 위해 알아야 할 핵심 정보
          </p>
        </div>

        {/* FAQ 아코디언 */}
        <FAQAccordion faqs={faqs} />

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary-600 to-blue-700 rounded-2xl p-6 text-white text-center">
          <p className="text-sm opacity-80">나의 FIRE 달성 시점이 궁금하다면?</p>
          <p className="text-lg font-bold mt-1">지금 바로 계산해보세요!</p>
          <div className="flex gap-3 mt-4">
            <Link
              href="/"
              className="flex-1 bg-white text-primary-700 rounded-xl py-3 font-semibold text-sm hover:bg-blue-50 transition-all"
            >
              🔥 상세 계산
            </Link>
            <Link
              href="/quick"
              className="flex-1 bg-white/20 text-white rounded-xl py-3 font-semibold text-sm hover:bg-white/30 transition-all"
            >
              ⚡ 30초 간편 계산
            </Link>
          </div>
        </div>

        {/* 내부 링크 */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/salary"
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl">💰</span>
            <p className="text-sm font-bold text-slate-700 mt-2">연봉 실수령액</p>
            <p className="text-xs text-slate-500 mt-1">2026년 기준</p>
          </Link>
          <Link
            href="/savings-rate"
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl">📊</span>
            <p className="text-sm font-bold text-slate-700 mt-2">저축률 시뮬레이터</p>
            <p className="text-xs text-slate-500 mt-1">저축률의 힘</p>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
