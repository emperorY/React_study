// 1.请用递归的方式遍历树形数据结构中的每一个节点
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
];

function recursion (data,ck){
    if(!Array.isArray(data)){
        typeof ck === 'function' && ck(data);
    }else {
        data.forEach(item=>{
            typeof ck === 'function' && ck(item);
            if(item.children){
                recursion(item.children,ck);
            }
        })
    }
}

recursion (options,(data)=>{
    console.log(data,'1')
})

// 2.将类似以下JSON表示的树状结构(可以无限层级)通过parseDOM函数(使用document.createElement,
//  document.createTextNode,appendChild等方法)生成一颗DOM树(返回一个element元素)
const JsonTree= {
    "tagName":"body", // dom树的跟节点
    "children":[{
        "tagName":"ul",
        "props":{
            "className":"list",
            "data-name":"jsontree"
        },
    },{
        "tagName":"a",
        "props":{
            "href":"https://www.aliyun.com",
            "target":"_blank"
        },
        "children":[
                {
                    "tagName":'div',
                    "props":{
                        "className":"getit"
                    },
                    "children":[
                        {
                            "tagName":"h1",
                        }
                    ]
                },
                {
                    "tagName":"div",
                    "props":{
                        "data-id":"3424"
                    },
                    "children":"hello world"
                }
            ]
      } ]
}
function createDom (tagName,props,children){
    let dom = document.createElement(tagName);
    if(!props){
        return dom;
    }
    let prop = Object.entries(props);
    prop.forEach(item=>{
        dom.setAttribute(item[0],item[1]);
    })
    if(!children){
        return dom;
    }
    if(typeof children === 'string'||typeof children === 'number'){
        dom.innerHTML = children;
    }else if(typeof children === 'object'){
        if(Array.isArray(children)){
            children.forEach(item=>{
                dom.appendChild(item);
            })
        }else{
            dom.appendChild(children);
        }
    }
    return dom;
}
function createTree (JsonTree){  // 递归树
    let domtree = {};
   domtree =  JsonTree.map(item=>{
        console.log(item,'2');
        if(!item.children){
            return createDom(item.tagName,item.props)
        }else if(!Array.isArray(item.children)){
            return createDom(item.tagName,item.props,item.children)
        }else if(Array.isArray(item.children)){
            return createDom(item.tagName,item.props,createTree(item.children));
        }
    })
    return domtree;
}

function parseDom(JsonTree){
    let html = createDom(JsonTree.tagName)
    let b = createTree(JsonTree.children);
    console.log(b,'22');
    b.forEach(item=>{
        html.appendChild(item);
    });
    return html;
}

let a = parseDom(JsonTree);
console.log(a,'222');