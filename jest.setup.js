import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mock mapbox-gl
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: jest.fn(),
  Marker: jest.fn(),
}));

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;

// Mock IndexedDB
const indexedDB = {
  open: jest.fn(),
};

global.indexedDB = indexedDB;

// Mock service worker registration
const mockServiceWorker = {
  register: jest.fn(),
  ready: Promise.resolve({
    pushManager: {
      subscribe: jest.fn(),
    },
  }),
};

global.navigator.serviceWorker = mockServiceWorker;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
