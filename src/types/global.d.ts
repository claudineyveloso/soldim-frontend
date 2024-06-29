declare module 'bootstrap/dist/js/bootstrap.bundle.min.js' {
    const bootstrap: any;
    export default bootstrap;
  }
  
  declare global {
    interface Window {
      bootstrap: any;
    }
  }
  
  export {};