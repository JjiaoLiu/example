## 一、变量的声明
声明变量的时候，变量名前面要加两根连词线（--）。
```
body {
     --foo: #7F583F;
     --bar: #F7EFD2;
   }
```
变量名大小写敏感，--header-color和--Header-Color是两个不同变量。
```$xslt
:root{
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --logo-border-color: rebeccapurple;

  --header-height: 68px;
  --content-padding: 10px 20px;

  --base-line-height: 1.428571429;
  --transition-duration: .35s;
  --external-link: "external link";
  --margin-top: calc(2vh + 20px);
}
```
## 二、var() 函数
var()函数用于读取变量。
```$xslt
a {
  color: var(--foo);
  text-decoration-color: var(--bar);
}
```
var()函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。
```$xslt
color: var(--foo, #7F583F);
```
第二个参数不处理内部的逗号或空格，都视作参数的一部分。
````$xslt
var(--font-stack, "Roboto", "Helvetica");
var(--pad, 10px 15px 20px);
````
注意，变量值只能用作属性值，不能用作属性名。
```$xslt
.foo {
  --side: margin-top;
  /* 无效 */
  var(--side): 20px;
}
```
上面代码中，变量--side用作属性名，这是无效的。

链接 http://www.ruanyifeng.com/blog/2017/05/css-variables.html
