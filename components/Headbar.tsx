"use client";

import Link from "next/link";

export default function Headbar() {
  return (
    <div className="headbar-wrapper">
      <div className="headbar">
        <div className="headbar-title">Xuecong Wang</div>
        <div className="headbar-titlesc">王雪聪</div>
      </div>
      <div className="menubar">
        <div className="menubarcol">
          <Link href="/" className="subtitle">
            Art <span className="subtitlesc">艺术</span>
          </Link>
        </div>
        <div className="menubarcol">
          <Link href="/blog" className="subtitle">
            Blog <span className="subtitlesc">博客</span>
          </Link>
        </div>
        <div className="menubarcol">
          <Link href="/about" className="subtitle">
            About <span className="subtitlesc">关于</span>
          </Link>
        </div>
        <div className="menubarcol">
          <Link href="/cv" className="subtitle">
            CV <span className="subtitlesc">简历</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
