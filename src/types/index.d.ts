export {};

declare module '*.jpg' {
    export default "" as string;
}

declare global {
  interface Window {
    paypal: any;
  }
}

