import {getSiteSettings} from '@/lib/api';
import {metadata} from '@/lib/metadata';
import {system} from '@/lib/system';
import {IPage, IPost} from '@/types/contentful';
import Script from 'next/script';
import React from 'react';
import ReactDOM from 'react-dom';

interface IHeadProps {
  isArticle?: boolean;
  entry: IPage | IPost;
  amp?: boolean;
  canonical?: string;
  description?: string;
  schema?: boolean;
  seoDescription?: string;
  seoTitle?: string;
  sharingImage?: string;
  sharingImageAlt?: string;
  socialDescription?: string;
  socialTitle?: string;
  title?: string;
}

export const preloadResources = (
  url: string,
  opts?: {productionOnly?: boolean; requiredId?: string | undefined},
) => {
  const embedPreloadLinks = () => {
    ReactDOM.preconnect(url);
    ReactDOM.prefetchDNS(url);
  };

  if (opts?.productionOnly) {
    if (system.environment === 'production' && opts.requiredId) {
      embedPreloadLinks();
    }
  }

  if (!opts?.productionOnly) {
    embedPreloadLinks();
  }

  return null;
};

const PageHead = async () => {
  const settings = await getSiteSettings();

  return (
    <>
      {preloadResources('https://consent.cookiebot.com', {
        productionOnly: true,
        requiredId: settings?.fields.cookieBotId,
      })}
      {preloadResources('https://www.googletagmanager.com', {
        productionOnly: true,
        requiredId: settings?.fields.googleAnalyticsId || metadata.analytics.google_analytics_id,
      })}
      {preloadResources('https://images.ctfassets.net')}

      {/* Google Tag Manager */}
      {system.environment === 'production' &&
        (settings?.fields?.googleTagManagerId || metadata.analytics?.google_tag_manager_id) && (
          <Script
            id="script-google-tag-manager"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${
                settings?.fields?.googleTagManagerId || metadata.analytics?.google_tag_manager_id
              }');`,
            }}
          />
        )}

      {/* Google analytics scripts */}
      {system.environment === 'production' &&
        (settings?.fields.googleAnalyticsId || metadata.analytics.google_analytics_id) && (
          <Script
            id="google-analytics-id-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${
              settings?.fields.googleAnalyticsId || metadata.analytics.google_analytics_id
            }`}
          />
        )}

      {system.environment === 'production' &&
        (settings?.fields.googleAnalyticsId || metadata.analytics.google_analytics_id) && (
          <Script
            id="google-analytics-id-inline"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${
              settings?.fields.googleAnalyticsId || metadata.analytics.google_analytics_id
            }');`,
            }}
          />
        )}

      {/* Synchronous JavaScript */}
      <Script
        id="script-js"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            // eslint-disable-next-line quotes
            "var b = document.documentElement; b.className = b.className.replace(/\bno-js\b/,'js'); b.setAttribute('data-useragent', navigator.userAgent); b.setAttribute(\"data-platform\", navigator.platform );",
        }}
      />

      {/* Google Tag Manager NoScript */}
      {system.environment === 'production' &&
        (settings?.fields?.googleTagManagerId || metadata.analytics?.google_tag_manager_id) && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id='${
                settings?.fields?.googleTagManagerId || metadata.analytics?.google_tag_manager_id
              }" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}
    </>
  );
};

export default PageHead;
