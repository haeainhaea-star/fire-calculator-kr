/** JSON-LD 구조화 데이터 렌더링 컴포넌트 (서버 컴포넌트) */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
