

import React from 'react';
import { Row, Col } from 'antd';
import { transform } from '@babel/core';



// 随机给出数组
// 如 [1234, 1234567, 1234, 12, 12, 1234567812345, 12]；排列完 [[1234,1234],[1234567],[12,12,12],[1234567812345]]
// 再如 [1, 12, 1234, 3, 1314, 1234567812345, 12]；排列完 [[1,12,3],[1234,1314],[1234567812345],[12]]
// 请仔细阅读下面三个条件！根据数字长度，实现方法，能够对各元素进行组合排列，实现瀑布流的展示，数组元素以红块包裹，要求：每行最多容纳三个红块（数组元素）
// 每行最多容纳 8 个数字长度，超出需换行（仅100%宽度红块可换行）d
// 每个数组元素有三种宽度形式33% 宽度，最多容纳 2 个数字长度，最少容纳 1 个数字长度；
// 50% 宽度，最多容纳 4 个数字长度，最少容纳 3 个数字长度；
// 100% 宽度，最大容纳无限制，最少容纳 5 个数字长度；
// 提示：先做排列，再做渲染，排序最重要的是理清楚换行的条件。
enum Rank {
  TenBits = 'TenBits',
  Hundred = 'Hundred',
  
}


function  transformData(data:number[]) {

let result = [];
let count = 0;
let tenBits = {
  data:[],
  index:0
}
let Hundred = {
  data:[],
  index:0
}
let Bilin = {
  data:[],
  index:0
}
const isFirst = true;
  data.forEach((item)=>{
     if(item.toString.length<=2){
      if(tenBits.data.length>=3){
        result[tenBits.index] = tenBits.data;
        tenBits.data = [];
        tenBits.index = count++
      }else{
        tenBits.data.push(item);
        tenBits.index = count++
      }
      // const tenBits =  data.filter((it)=>it.toString.length<=2)
      // result.push(tenBits.slice(0,3))
     }else if(item.toString.length>=3&& item.toString.length<=4){

      if(Hundred.data.length>=3){
        result[Hundred.index] = Hundred.data;
        Hundred.data = [];
        // Hundred.index = count++
      }else{
        Hundred.data.push(item);
        Hundred.index = count++
      }
      // const tenBits =  data.filter((it)=>it.toString.length>=3&& it.toString.length<=4)
      // result.push(tenBits.slice(0,2))
     }else if(item>=10000){
      if(Bilin.data.length>=3){
        result[Bilin.index] = Bilin.data;
        Bilin.data = [];
        Bilin.index = count++
      }else{
        Bilin.data.push(item);
        Bilin.index = count++
      }
      // const tenBits =  data.filter((it)=>it>0&&it<100)
      // result.push(tenBits.slice(0,2))
     }
  })
  
}
function arrangeAndRenderArray(arr) {
    // 将数组按照长度进行排序
    arr.sort((a, b) => a.length - b.length);
    
    // 创建一个空数组，用于存放最终的 JSX 结构
    let rows = [];
    
    // 创建一个空数组，用于存放当前行的元素
    let currentRow = [];
    
    // 循环遍历排序后的数组
    for (let i = 0; i < arr.length; i++) {
        // 判断当前元素的宽度形式
        let span = 24; // 默认宽度为100%
        if (arr[i].length <= 2) {
            span = 8; // 33% 宽度
        } else if (arr[i].length <= 4) {
            span = 12; // 50% 宽度
        }
        
        // 生成红色块的 JSX 结构，并添加到当前行数组中
        currentRow.push(
            <Col span={span} key={i}>
                <div className="red-block">{arr[i]}</div>
            </Col>
        );
        
        // 判断是否需要换行
        if (currentRow.length === 3 || currentRow.join('').length > 8) {
            // 如果当前行已满或者超出最大宽度限制，则将当前行的 JSX 结构添加到最终的数组中，并重新创建一个空数组存放下一行的元素
            rows.push(
                <Row key={i} gutter={[16, 16]}>
                    {currentRow}
                </Row>
            );
            currentRow = [];
        }
    }
    
    // 如果最后一行还有元素，则将其添加到最终的 JSX 结构中
    if (currentRow.length > 0) {
        rows.push(
            <Row key="last" gutter={[16, 16]}>
                {currentRow}
            </Row>
        );
    }
    
    return rows;
}

function arrangeArray(arr) {
  // 将数组按照长度进行排序
  arr.sort((a, b) => a.toString().length - b.toString().length);
  
  // 创建一个空数组，用于存放最终的结果
  let result = [];
  
  // 创建一个对象，用于存放不同长度的数字数组
  let groups = {};
  
  // 循环遍历排序后的数组
  for (let i = 0; i < arr.length; i++) {
      const num = arr[i];
      const length = num.toString().length;
      
      if (!groups[length]) {
          // 如果当前长度的数组不存在，则创建一个空数组
          groups[length] = [];
      }
      
      // 将当前数字添加到对应长度的数组中
      groups[length].push(num);
  }
  
  // 将分组后的数组按照长度存入最终结果数组
  for (let key in groups) {
      result.push(groups[key]);
  }
  
  return result;
}

// 测试示例
const example1 = [1234, 1234567, 1234, 12, 12, 1234567812345, 12];
console.log(arrangeArray(example1)); // [[1234,1234],[1234567],[12,12,12],[1234567812345]]

const example2 = [1, 12, 1234, 3, 1314, 1234567812345, 12];
console.log(arrangeArray(example2)); // [[1,12,3],[1234,1314],[1234567812345],[12]]

function Waterfall() {
    const example1 = [1234, 1234567, 1234, 12, 12, 1234567812345, 12];
    const example1Rows = arrangeAndRenderArray(example1);
    const data1 = arrangeArray(example1);
    console.log('data1',data1)
    const example2 = [1, 12, 1234, 3, 1314, 1234567812345, 12];
    const example2Rows = arrangeAndRenderArray(example2);
    const data2 = arrangeArray(example2);
    console.log('data2',data2)
    return (
        <div className="App">
            <h2>Example 1</h2>
            {example1Rows}
            
            <h2>Example 2</h2>
            {example2Rows}
        </div>
    );
}

export default Waterfall;


