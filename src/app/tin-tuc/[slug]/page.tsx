import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/shared/Breadcrumb';
import PostCard from '@/components/shared/PostCard';
import { getPost, getPosts } from '@/lib/data';
import { formatDateVi } from '@/lib/format';
import { site } from '@/lib/site';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Không tìm thấy bài viết' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImageUrl],
      publishedTime: post.publishedAt,
    },
  };
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = (await getPosts({ category: post.category, limit: 4 })).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Breadcrumb title={post.title} items={[{ label: 'Tin tức', href: '/tin-tuc' }]} />

      <section className="py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="d-flex align-items-center tw-gap-4 flex-wrap tw-mb-6">
                <span className="bg-secondary-new text-heading tw-py-2 tw-px-5 rounded-pill">{post.category}</span>
                <span className="text-neutral-500">{formatDateVi(post.publishedAt)}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-500">{post.author}</span>
              </div>

              <div className="tw-rounded-2xl overflow-hidden tw-mb-10">
                {/* TODO ảnh: ảnh bìa bài viết — xem docs/IMAGE-GUIDE.md */}
                <img src={post.coverImageUrl} alt={post.title} className="w-100 h-100 object-fit-cover" />
              </div>

              <div className="post-content tw-text-lg text-neutral-600 tw-leading-155" dangerouslySetInnerHTML={{ __html: post.content }} />

              <div className="tw-mt-12 bg-neutral-50 tw-rounded-2xl tw-p-8">
                <h3 className="h4 tw-mb-3">Cần tư vấn cho sản phẩm của bạn?</h3>
                <p className="text-neutral-600 tw-mb-6">
                  Gọi {site.hotline} hoặc gửi yêu cầu báo giá — đội thiết kế sẽ dựng mẫu miễn phí cho đơn in tại xưởng.
                </p>
                <Link href="/bao-gia" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600">
                  <span className="btn-text">Gửi yêu cầu báo giá</span>
                </Link>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="tw-mt-20">
              <h3 className="h3 tw-mb-10">Bài viết liên quan</h3>
              <div className="row gy-5">
                {related.map((p) => (
                  <div className="col-lg-4 col-md-6" key={p.slug}>
                    <PostCard post={p} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
