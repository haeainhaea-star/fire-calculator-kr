import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { blogPosts, getBlogPost } from '@/lib/blog-posts'
import { SITE_URL } from '@/lib/metadata'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug)

  return (
    <main className="pb-8">
      <Header />
      <Breadcrumb
        items={[
          { label: '블로그', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <article className="px-4 pt-4 space-y-6 animate-fade-in">
        {/* 헤더 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-primary-50 text-primary-700 font-medium px-2 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-slate-400">{post.readingTime}분 읽기</span>
            <span className="text-xs text-slate-400">· {post.publishedAt}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 leading-snug">
            {post.emoji} {post.title}
          </h1>
          <p className="text-sm text-slate-500 mt-2">{post.description}</p>
        </div>

        {/* 본문 */}
        <div className="space-y-5">
          {post.sections.map((section, i) => (
            <div key={i} className="space-y-2">
              {section.heading && (
                <h2 className="text-base font-bold text-slate-800 mt-4">
                  {section.heading}
                </h2>
              )}
              {section.highlight && (
                <div className="bg-primary-50 border-l-4 border-primary-500 px-4 py-3 rounded-r-xl">
                  <p className="text-sm font-semibold text-primary-800">{section.highlight}</p>
                </div>
              )}
              <p className="text-sm text-slate-600 leading-relaxed">{section.content}</p>

              {section.table && (
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-xs border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        {section.table.headers.map((h, j) => (
                          <th
                            key={j}
                            className="text-left px-3 py-2.5 font-semibold text-slate-700 border-b border-slate-200"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, j) => (
                        <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          {row.map((cell, k) => (
                            <td
                              key={k}
                              className="px-3 py-2.5 text-slate-600 border-b border-slate-100"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.list && (
                <ul className="space-y-2 mt-2">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-primary-500 mt-0.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary-600 to-blue-700 rounded-2xl p-6 text-white text-center">
          <p className="text-sm opacity-80">직접 계산해보세요</p>
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

        {/* 관련 글 */}
        {otherPosts.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-700">다른 글도 읽어보세요</h3>
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
              >
                <span className="text-2xl">{other.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{other.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{other.readingTime}분 읽기</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/blog" className="text-sm text-primary-600 hover:underline">
            ← 블로그 목록으로
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  )
}
