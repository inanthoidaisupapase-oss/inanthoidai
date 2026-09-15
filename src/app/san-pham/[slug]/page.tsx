import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/shared/Breadcrumb';
import ProductCard from '@/components/shared/ProductCard';
import ProductGallery from '@/components/shared/ProductGallery';
import AddToCart from '@/components/shared/AddToCart';
import { getCategory, getProduct, getProducts, getRelatedProducts } from '@/lib/data';
import { formatVnd } from '@/lib/format';
import { site } from '@/lib/site';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: 'Không tìm thấy sản phẩm' };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { title: product.name, description: product.shortDescription, images: [product.images[0]] },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [category, related] = await Promise.all([
    getCategory(product.categorySlug),
    getRelatedProducts(product),
  ]);

  return (
    <>
      <Breadcrumb
        title={product.name}
        items={[
          { label: 'Sản phẩm', href: '/san-pham' },
          ...(category ? [{ label: category.name, href: `/san-pham?danh-muc=${category.slug}` }] : []),
        ]}
      />

      <section className="py-120">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-6">
              <ProductGallery images={product.images} alt={product.name} />
            </div>

            <div className="col-lg-6">
              <h2 className="h2">{product.name}</h2>
              <span className="text-main-600 d-block fw-semibold tw-text-2xl tw-mt-4 price-vnd">
                {formatVnd(product.priceMin)} – {formatVnd(product.priceMax)}
              </span>
              <p className="text-neutral-600 tw-mt-5 tw-text-lg tw-leading-155">{product.shortDescription}</p>

              <AddToCart product={product} />

              <div className="tw-mt-10 border-top border-neutral-100 tw-pt-8">
                <h3 className="h4 tw-mb-5">Thông số kỹ thuật</h3>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key}>
                          <th className="fw-medium text-neutral-600" style={{ width: '45%' }}>{key}</th>
                          <td className="text-heading">{value}</td>
                        </tr>
                      ))}
                      {product.sku && (
                        <tr>
                          <th className="fw-medium text-neutral-600">Mã sản phẩm</th>
                          <td className="text-heading">{product.sku}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="tw-mt-8 bg-neutral-50 tw-rounded-xl tw-p-6">
                <p className="text-neutral-600 tw-mb-2">
                  <strong>Đặt số lượng lớn?</strong> Liên hệ Zalo{' '}
                  <a href={`https://zalo.me/${site.zalo.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-main-600 hover-common-underline">
                    {site.zalo}
                  </a>{' '}
                  (Ms. Tuyền) để nhận giá ưu đãi cho đơn trên 500 hộp.
                </p>
                <p className="text-neutral-600 mb-0">
                  Hotline: <a href={`tel:${site.hotlineTel}`} className="text-main-600 hover-common-underline">{site.hotline}</a>
                </p>
              </div>
            </div>
          </div>

          <div className="tw-mt-20">
            <h3 className="h3 tw-mb-6">Mô tả sản phẩm</h3>
            <div className="text-neutral-600 tw-text-lg tw-leading-155 product-description" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          {related.length > 0 && (
            <div className="tw-mt-20">
              <div className="d-flex align-items-center justify-content-between tw-gap-4 tw-mb-10 flex-wrap">
                <h3 className="h3 mb-0">Sản phẩm cùng danh mục</h3>
                <Link href={`/san-pham?danh-muc=${product.categorySlug}`} className="text-main-600 hover-common-underline fw-medium">
                  Xem tất cả
                </Link>
              </div>
              <div className="row gy-5">
                {related.map((p) => (
                  <div className="col-xl-3 col-lg-4 col-sm-6" key={p.slug}>
                    <ProductCard product={p} />
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
