import { Helmet } from "react-helmet-async";

const SITE = "https://mufadz-app.vercel.app";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export default function SEO({
  title,
  description,
  path = "",
  image = "/og-default.png",
}: SEOProps) {
  const fullTitle = title ? `${title} | Mufadz` : "Mufadz — Asisten Islami Digital";
  const url = `${SITE}${path}`;
  const img = image.startsWith("http") ? image : `${SITE}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content="Mufadz" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
}
