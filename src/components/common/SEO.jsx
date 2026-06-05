import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Nitty Gritty Media';

export default function SEO({ title, description, keywords, canonical }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}
