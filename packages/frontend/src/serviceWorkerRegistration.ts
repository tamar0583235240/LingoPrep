// מבוסס על CRA - תומך ב־PWA

// eslint-disable-next-line @typescript-eslint/ban-types
export function register(config?: { onUpdate?: Function; onSuccess?: Function }) {
    if ('serviceWorker' in navigator) {
      const publicUrl = new URL(
        (import.meta as any).env ? (import.meta as any).env.BASE_URL || '' : '',
        window.location.href
      );
      if (publicUrl.origin !== window.location.origin) return;
  
      window.addEventListener('load', () => {
        const swUrl = '/service-worker.js';
  
        navigator.serviceWorker
          .register(swUrl)
          .then(registration => {
            if (registration.waiting) {
              config?.onUpdate?.(registration);
            } else {
              config?.onSuccess?.(registration);
            }
          })
          .catch(error => {
            console.error('Error during service worker registration:', error);
          });
      });
    }
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
      });
    }
  }
  