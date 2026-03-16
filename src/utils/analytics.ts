/**
 * USRad Marketing Analytics Helper
 * All Astro components use this helper — never write raw gtag() calls in components.
 * See /docs/analytics/analytics-event-contract.md for all event definitions.
 */

type MarketingEventParams = Record<string, string | number | boolean>;

export function trackMarketingEvent(
  eventName: string,
  params: MarketingEventParams = {}
): void {
  if (typeof window === 'undefined') return;
  if (typeof (window as any).gtag === 'undefined') return;

  (window as any).gtag('event', eventName, {
    app_surface: 'marketing',
    ...params,
  });
}