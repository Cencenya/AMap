import ReactDOM from "react-dom";


export const render = (element, selector: string) => {
    const interval = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        ReactDOM.render(element, el);
        clearInterval(interval);
      }
    });
  };