
  type DebouncedFunction = (...args: any[]) => void;

  const debounce = (func: Function, timeout: number = 300): DebouncedFunction => {
    let timer: string | number | NodeJS.Timeout | undefined;
    return (...args: any[]): void => {
        clearTimeout(timer);
        timer = setTimeout(function() { func.apply(this, args); }, timeout);
    };
}

export default debounce;