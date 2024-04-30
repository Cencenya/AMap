


function aaa(callback: (str: string) => void, delay: number = 500) {
  let timeout: any = null
  function bar() {
      if(timeout) {
          clearTimeout(timeout)
          timeout = null
      }
      timeout = setTimeout(() => {
          callback("aaa")
      }, delay)
  }
  return bar
}

const fn: Function = aaa(() => {

}, 2000)

fn('ss')


export function debounce<F extends (...args: any[]) => any>(func: F, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
      func.call(this,...args);
    }, delay);
  };
}



const handle = debounce(()=>{},500);

// func怎么定？
// Function ？自定义参数？
// 如何提取函数参数的类型？
// 如何知道setTimeout的返回类型
type Fun = (age:number,name:string)=> void
function  debounceCustom<T extends (...args: any[]) => any >(func:T,delay:number) {
  let timeoutId:ReturnType<typeof setTimeout>;

  return function (...args:Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(args);
    }, delay);
  }
  
}

const handle1 = debounceCustom((str)=>{
  console.log(this)

},500);

function click(params) {
  
}

const obj = {

}
const handle2 = debounceCustom(function(params) {
  console.log(this)
},500);
const handle3 = debounceCustom(click.apply(obj,'sss'),500);


type fn = Function;
