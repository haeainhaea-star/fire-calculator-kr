import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { blogPosts } from '@/lib/blog-posts'
import { SITE_URL } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'FIRE 블로그 | 조기은퇴 가이드',
  description:
    '한국 직장인을 위한 FIRE 실전 가이드. FIRE 넘버 계산법, 4% 룰의 한계, 자녀 교육비 전략까지 파이어족이 알아야 할 모든 것.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'FIRE 블로그 | 조기은퇴 가이드',
    description: '한국 직장인을 위한 FIRE 실전 가이드.',
    url: `${SITE_URL}/blog`,
  },
}

export default function BlogPage() {
  return (
    <main className="pb-8">
      <Header />
      <Breadcrumb items={[{ label: '블로그', href: '/blog' }]} />

      <div className="px-4 pt-4 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-slate-800">FIRE 블로그</h1>
          <p className="text-sm text-slate-500 mt-1">
            한국 직장인 맞춤 조기은퇴 실전 가이드
          </p>
        </div>

        <div className="space-y-4">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl mt-0.5">{post.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-primary-50 text-primary-700 font-medium px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.readingTime}분 읽기</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-800 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">
                    {post.description}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">{post.publishedAt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary-600 to-blue-700 rounded-2xl p-6 text-white text-center">
          <p className="text-sm opacity-80">글을 읽었다면 직접 계산해보세요</p>
          <p className="text-lg font-bold mt-1">나의 FIRE 달성 시점은?</p>
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
      </div>

      <Footer />
    </main>
  )
}
