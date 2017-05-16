从字符串中获取单个字符
```$xslt
return 'cat'.charAt(1); // returns "a"
```
另一种 (在ECMAScript 5中有所介绍) 是把字符串当作一个类似数组的对象，其中的每个字符对应一个数值索引：
```$xslt
return 'cat'[1]; // returns "a"
```
字符串比较
```$xslt
var a = "a";
var b = "b";
if (a < b) // true
  print(a + " is less than " + b);
else if (a > b)
  print(a + " is greater than " + b);
else
  print(a + " and " + b + " are equal.");
```
当基本字符串需要调用一个字符串对象才有的方法或者查询值的时候(基本字符串是没有这些方法的)，JavaScript 会自动将基本字符串转化为字符串对象并且调用相应的方法或者执行查询。
```$xslt
var s_prim = "foo";
var s_obj = new String(s_prim);

console.log(typeof s_prim); // Logs "string"
console.log(typeof s_obj);  // Logs "object"
```
属性
```$xslt
String.prototype
```
可以为 String 对象增加新的属性。
```$xslt
String.prototype.constructor
```
用于创造对象的原型对象的特定的函数。
```$xslt
String.prototype.length
```
返回了字符串的长度。

```$xslt
String.prototype.charAt()
```
返回特定位置的字符。
```$xslt
String.prototype.charCodeAt()
```
返回表示给定索引的字符的Unicode的值。
```$xslt
String.prototype.codePointAt() 
```
返回使用UTF-16编码的给定位置的值的非负整数。
```$xslt
String.prototype.concat()
```
连接两个字符串文本，并返回一个新的字符串。
```$xslt
String.prototype.includes() 
```
判断一个字符串里是否包含其他字符串。
```$xslt
String.prototype.endsWith() 
```
判断一个字符串的结尾是否包含其他字符串中的字符。
```$xslt
String.prototype.indexOf()
```
从字符串对象中返回首个被发现的给定值的索引值，如果没有找到则返回-1。
```$xslt
String.prototype.lastIndexOf()
```
从字符串对象中返回最后一个被发现的给定值的索引值，如果没有找到则返回-1。
```$xslt
String.prototype.localeCompare()
```
返回一个数字表示是否引用字符串在排序中位于比较字符串的前面，后面，或者二者相同。
```$xslt
String.prototype.match()
```
使用正则表达式与字符串相比较。
```$xslt
String.prototype.normalize() 
```
返回调用字符串值的Unicode标准化形式。
```$xslt
String.prototype.repeat()
``` 
返回指定重复次数的由元素组成的字符串对象。
```$xslt
String.prototype.replace()
```
被用来在正则表达式和字符串直接比较，然后用新的子串来替换被匹配的子串。
```$xslt
String.prototype.search()
```
对正则表达式和指定字符串进行匹配搜索，返回第一个出现的匹配项的下标。
```$xslt
String.prototype.slice()
```
摘取一个字符串区域，返回一个新的字符串。
```$xslt
String.prototype.split()
```
通过分离字符串成字串，将字符串对象分割成字符串数组。
```$xslt
String.prototype.startsWith()
``` 
判断字符串的起始位置是否匹配其他字符串中的字符。
```$xslt
String.prototype.substr()
```
通过指定字符数返回在指定位置开始的字符串中的字符。
```$xslt
String.prototype.substring()
```
返回在字符串中指定另个下标之间的字符。
```$xslt
String.prototype.toLocaleLowerCase()
```
根据当前区域设置，将符串中的字符转换成小写。对于大多数语言来说，toLowerCase的返回值是一致的。
```$xslt
String.prototype.toLocaleUpperCase()
```
根据当前区域设置，将字符串中的字符转换成大写，对于大多数语言来说，toUpperCase的返回值是一致的。
```$xslt
String.prototype.toLowerCase()
```
将字符串转换成小写并返回。
```$xslt
String.prototype.toSource() 
```
返回一个对象文字代表着特定的对象。你可以使用这个返回值来创建新的对象。重写 Object.prototype.toSource 方法。
```$xslt
String.prototype.toString()
```
返回用字符串表示的特定对象。重写 Object.prototype.toString 方法。
```$xslt
String.prototype.toUpperCase()
```
将字符串转换成大写并返回。
```$xslt
String.prototype.trim()
```
从字符串的开始和结尾去除空格。参照部分 ECMAScript 5 标准。
```$xslt
String.prototype.trimLeft() 
```
从字符串的左侧去除空格。
```$xslt
String.prototype.trimRight() 
```
从字符串的右侧去除空格。
```$xslt
String.prototype.valueOf()
```
返回特定对象的原始值。重写 Object.prototype.valueOf 方法。
