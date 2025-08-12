import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footerdes">
        This website was created by Xuecong Wang and all rights are reserved.
        For permission to use any images or to acquire works displayed on this
        site, please contact the artist directly.
      </div>
      <div className="footerdessc">
        这个网站由王雪聪创建，所有权利均已保留。若需使用网站上显示的任何图片或获取作品，请直接联系艺术家。
      </div>
      <div className="footerlinks">
        <Link href="/" className="footerdessc">
          Art 艺术
        </Link>
        <Link href="/blog" className="footerdessc">
          Blog 博客
        </Link>
        <Link href="/about" className="footerdessc">
          About 关于
        </Link>
        <Link href="/cv" className="footerdessc">
          CV 简历
        </Link>
      </div>
    </div>
  );
}
