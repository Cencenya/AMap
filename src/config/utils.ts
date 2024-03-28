
export function debounce<F extends (...args: any[]) => any>(func: F, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
  
    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }