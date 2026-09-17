/**
 * DevVault Analytics Abstraction
 * Decouples application UI events from external analytics providers (GA4, PostHog, Plausible).
 */

export type AnalyticsEventName =
  | 'resource_view'
  | 'resource_click'
  | 'resource_save'
  | 'resource_unsave'
  | 'search'
  | 'filter_used'
  | 'category_view'
  | 'collection_created'
  | 'collection_resource_added'
  | 'stack_created'
  | 'contribution_started'
  | 'external_link_clicked'
  | 'social_import_simulated';

export interface AnalyticsPayload {
  [key: string]: string | number | boolean | undefined | null;
}

class AnalyticsService {
  private isEnabled: boolean = true;

  public track(event: AnalyticsEventName, payload?: AnalyticsPayload) {
    if (!this.isEnabled) return;

    // Structured development logger
    if (process.env.NODE_ENV !== 'production') {
      // Intentionally silent or light dev logging
      // console.debug(`[Analytics] ${event}`, payload);
    }

    // Future hook for Google Analytics 4 (window.gtag)
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
      (window as unknown as { gtag: Function }).gtag('event', event, payload);
    }

    // Future hook for PostHog (window.posthog)
    if (typeof window !== 'undefined' && (window as unknown as { posthog?: { capture: Function } }).posthog) {
      (window as unknown as { posthog: { capture: Function } }).posthog.capture(event, payload);
    }
  }

  public pageView(pageName: string, path: string) {
    this.track('category_view', { page: pageName, path });
  }
}

export const analytics = new AnalyticsService();
