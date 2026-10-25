import Script from "next/script";
import { SITE } from "@/lib/site";

// Google Analytics 4 measurement IDs look like G-XXXXXXXXXX. Reject anything else
// so a bad environment value can never be injected into the inline script below.
const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;

export default function Analytics() {
  if (!GA_ID_PATTERN.test(SITE.gaId)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', '${SITE.gaId}');`}
      </Script>
    </>
  );
}