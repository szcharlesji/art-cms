import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Xuecong Wang",
  description: "Learn about artist Xuecong Wang, their artistic practice, and contact information",
  openGraph: {
    title: "About - Xuecong Wang",
    description: "Learn about artist Xuecong Wang, their artistic practice, and contact information",
  },
};

export default function AboutPage() {
  const imageCdnBaseUrl = "https://images.xuecong.art/";
  const profileImg = `${imageCdnBaseUrl}MewithTheyWhisper.JPG`;
  const instaIcon = `${imageCdnBaseUrl}instaicon.svg`;
  const emailIcon = `${imageCdnBaseUrl}email.svg`;

  return (
    <div>
      <div className="profilecol">
        <img className="profilepic" src={profileImg} alt="profile" />
        <div className="des-wrapper">
          <div className="header">Artist Statement:</div>
          <div className="generaldes">
            Xuecong Wang <span className="generaldessc">王雪聪</span> (IPA:/wɑŋ
            çyɛ tsʰʊŋ/) lives and works in Sichuan, China, and New York,
            US.
          </div>
          <div className="generaldes">
            In an era marked by the rapid advancement of technology in domains
            such as the internet, social media, and artificial intelligence, the
            nature of things and people becomes ambiguous. Our knowledge and
            beliefs are heavily influenced by our surroundings—the tangible
            world and the cultural and historical contexts in which we find
            ourselves. There is no absolute truth, only the truth we believe in.
            This realization can make one feel small and seemingly irrelevant,
            but it also provides an advantage, allowing for a momentary retreat
            from the turmoil to observe the world from a distance. This is what
            I do in art—to find the &ldquo;observed truth&rdquo;.
          </div>
          <div className="generaldes">
            In my work, I reimagine the physical, cultural, and social
            environments that surround me. My pieces feature realistic
            portrayals of subjects and settings, yet they are situated within a
            surreal, dream-like pseudo-reality. The ambiguity of these spaces is
            achieved through the manipulation of light, which can be either
            insufficient or excessive.
          </div>
          <div className="generaldes">
            Occasionally, I employ a first-person perspective to reveal my
            cognitive and emotional responses to an environment. Through this
            approach, I explore the multifaceted nature of my own identity and
            dissect my psyche. I hope that the audience will gain insights about
            the multifaceted nature of the world from these perspectives as
            well.
          </div>
        </div>
      </div>
      <div className="contact-wrapper">
        <div className="header">Contact and Social Media:</div>
        <div className="contact">
          <a
            className="icon-wrapper"
            href="https://www.instagram.com/xc_wang.art?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src={instaIcon} alt="instagram icon" />
          </a>
          <a className="icon-wrapper" href="mailto:inquiry@xuecong.art">
            <img className="icon" src={emailIcon} alt="email icon" />
          </a>
        </div>
      </div>
    </div>
  );
}