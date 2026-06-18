export const environment = {
  // Local dev: VITE_API_BASE_URL points at the token-proxy (:8085), which mints
  // /api/token and forwards the rest to the OAN backend (:8000).
  apiUrl: import.meta.env.VITE_API_BASE_URL || 'https://chat-vistaar.da.gov.in',
  notificationApiUrl: import.meta.env.VITE_NOTIFICATION_API_URL || 'https://registry-sandbox-vistaar.da.gov.in/notification-api',
  maintenanceMode: false,
  guestUserLimit: 10,
  suggestionsDisabled: true,
  chatMessageMaxLength: 1000,
};
