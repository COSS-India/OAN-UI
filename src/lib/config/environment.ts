export const environment = {
  // Same-origin by default. Set VITE_API_BASE_URL to a path prefix (e.g. "/bv")
  // to coexist under a shared host; api-service appends "/api/..." to this value,
  // so use the prefix only ("/bv" -> "/bv/api/token"), never "/bv/api".
  apiUrl: import.meta.env.VITE_API_BASE_URL || '',
  notificationApiUrl: import.meta.env.VITE_NOTIFICATION_API_URL || 'https://registry-vistaar.da.gov.in/notification-api',
  maintenanceMode: false,
  guestUserLimit: 10,
  suggestionsDisabled: true,
  chatMessageMaxLength: 1000,
};
