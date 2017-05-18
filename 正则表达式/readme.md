## 语法
字面量, 构造函数和工厂符号都是可以的：
```
 /pattern/flags 
  // 字面量: 模式 标志
  new RegExp(pattern [, flags])
  // 构造函数: 模式 标志
  RegExp(pattern [, flags])
 // 工厂符号: 模式 标志
```
| 名词 flags         | 描述           
| ------------- |:-------------
| g | 全局匹配;找到所有匹配，而不是在第一个匹配后停止
| i | 忽略大小写
| m | 多行; 将开始和结束字符（^和$）视为在多行上工作（例如，分别匹配每一行的开始和结束（由 \n 或 \r 分割），而不只是只匹配整个输入字符串的最开始和最末尾处。
| u | Unicode; 将模式视为Unicode序列点的序列
| y | 粘性匹配; 仅匹配目标字符串中此正则表达式的lastIndex属性指示的索引(并且不尝试从任何后续的索引匹配)。
### 创建一个RegExp对象
```
/ab+c/i;
new RegExp('ab+c', 'i');
new RegExp(/ab+c/, 'i');
```
当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。比如，以下是等价的：
```angular2html
let re = new RegExp("\\w+");
const re = /\w+/;
```
### 正则表达式中特殊字符的含义
| 字符          | 含义           
| ------------- |:-------------
|字符类别（Character Classes）
| \d |  匹配基本拉丁字母表（basic Latin alphabet）中的一个数字字符。等价于[0-9]。
| \D |  匹配任意一个不是基本拉丁字母表中数字的字符。等价于[^0-9]。
| \w |  匹配任意来自基本拉丁字母表中的字母数字字符，还包括下划线。等价于 [A-Za-z0-9_]。
| \W |  匹配任意不是基本拉丁字母表中单词（字母数字下划线）字符的字符。等价于 [^A-Za-z0-9_]。
| \s |  匹配一个空白符，包括空格、制表符、换页符、换行符和其他 Unicode 空格。
| \S |  匹配一个非空白符。
| \r |  匹配一个回车符（carriage return）
| \t |  匹配一个水平制表符（tab）
| \n |  匹配一个换行符（linefeed）
| \v |  匹配一个垂直制表符（vertical tab）
| \f |  匹配一个换页符（form-feed）
| [\b] |  匹配一个退格符（backspace）（不要与 \b 混淆）
| \0 |  匹配一个 NUL 字符。不要在此后面跟小数点。
| \cX |  X 是 A - Z 的一个字母。匹配字符串中的一个控制字符。例如，/\cM/ 匹配字符串中的 control-M。
| \xhh |  匹配编码为 hh （两个十六进制数字）的字符。
| \uhhhh |  匹配 Unicode 值为 hhhh （四个十六进制数字）的字符。
| 字符集合（Character Sets） 
| [xyz] |  一个字符集合，也叫字符组。匹配集合中的任意一个字符。你可以使用连字符'-'指定一个范围。例如，[abcd] 等价于 [a-d]，匹配"brisket"中的'b'和"chop"中的'c'。
| [^xyz] |  一个反义或补充字符集，也叫反义字符组。也就是说，它匹配任意不在括号内的字符。你也可以通过使用连字符 '-' 指定一个范围内的字符。例如，[^abc] 等价于 [^a-c]。 第一个匹配的是 "bacon" 中的'o' 和 "chop" 中的 'h'。
| 边界（Boundaries）
| ^ | 匹配输入开始。
| $ | 匹配输入结尾。
| * | 匹配前一个表达式0次或多次。等价于 {0,}。 
| + | 匹配前面一个表达式1次或者多次。等价于 {1,}。
| ? |  匹配前面一个表达式0次或者1次。等价于 {0,1}。例如，对 "123abc" 应用 /\d+/ 将会返回 "123"，如果使用 /\d+?/,那么就只会匹配到 "1"。
| . | （小数点）匹配除换行符之外的任何单个字符。例如，/.n/将会匹配 "nay, an apple is on the tree" 中的 'an' 和 'on'，但是不会匹配 'nay'。
| \b | 匹配一个零宽单词边界（zero-width word boundary），如一个字母与一个空格之间。 /\bno/ 匹配 "at noon" 中的 "no"，/ly\b/ 匹配 "possibly yesterday." 中的 "ly"。
| \B | 匹配输入开始。匹配一个非单词边界。他匹配一个前后字符都是相同类型的位置：都是单词或者都不是单词。一个字符串的开始和结尾都被认为是非单词。例如，/\B../匹配"noonday"中得'oo', 而/y\B./匹配"possibly yesterday"中得’ye‘

### exec方法
一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回null）。
```
var myRe = /d(b+)d/g;
var myArray = myRe.exec("cdbbdbsbz");

myArray
["dbbd", "bb"]
```
```apple js
var myRe = /ab*/g;
var str = 'abbcdefabh';
var myArray;
while ((myArray = myRe.exec(str)) !== null) {
  var msg = 'Found ' + myArray[0] + '. ';
  msg += 'Next match starts at ' + myRe.lastIndex;
  console.log(msg);
}
```
```
Found abb. Next match starts at 3
Found ab. Next match starts at 9
```
```apple js
var myArray = /d(b+)d/g.exec("cdbbdbsbz");
```
```apple js
var myRe = new RegExp("d(b+)d", "g");
var myArray = myRe.exec("cdbbdbsbz");
```
```apple js
var myRe = /d(b+)d/g;
var myArray = myRe.exec("cdbbdbsbz");
console.log("The value of lastIndex is " + myRe.lastIndex);
```
| 对象     |      属性  | 含义           
| ---------| ---------- |:-------------
|  myRe    |  lastIndex |  下一个匹配的索引值。
|  myArray |  index     |  在输入的字符串中匹配到的以0开始的索引值。
|  myArray |  input     |  初始字符串。
|  myArray |  [0]       |  匹配到的所有字符串
使用replace()方法来转换字符串中的单词。在匹配到的替换文本中，脚本使用替代的$ 1,$ 2表示第一个和第二个括号的子字符串匹配。
```apple js
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
console.log(newstr);
Smith,John 
```
包含一个标志的正则表达式，使用这个表达式：
```apple js
var re = /pattern/flags;
```
```apple js
var re = new RegExp("pattern", "flags");
```
标志是一个正则表达式的一部分，它们在接下来的时间将不能添加或删除。
```apple js
var re = /\w+\s/g;
var str = "fee fi fo fum";
var myArray = str.match(re);
console.log(myArray);
```
```apple js
var re = /\w+\s/g;
```
```apple js
var re = new RegExp("\\w+\\s", "g");
```
### test
一个在字符串中测试是否匹配的RegExp方法，它返回true或false。
```apple js
function testinput(re, str) {
  var midstring;
  if (re.test(str)) {
    midstring = ' contains ';
  } else {
    midstring = ' does not contain ';
  }
  console.log(str + midstring + re.source);
}
```
### match
```apple js
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);
console.log(found);
```
```apple js
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);
console.log(matches_array);
// ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
```
```apple js
var str = "Nothing will come of nothing.";
str.match();   // returns [""]
```
```apple js
var str1 = "NaN means not a number. Infinity contains -Infinity and +Infinity in JavaScript.",
    str2 = "My grandfather is 65 years old and My grandmother is 63 years old.",
    str3 = "The contract was declared null and void.";
str1.match("number");   // "number" is a string. returns ["number"]
str1.match(NaN);        // the type of NaN is the number. returns ["NaN"]
str1.match(Infinity);   // the type of Infinity is the number. returns ["Infinity"]
str1.match(+Infinity);  // returns ["Infinity"]
str1.match(-Infinity);  // returns ["-Infinity"]
str2.match(65);         // returns ["65"]
str2.match(+65);        // A number with a positive sign. returns ["65"]
str3.match(null);       // returns ["null"]
```
### search
一个在字符串中测试匹配的String方法，它返回匹配到的位置索引，或者在失败时返回-1。
```apple js
function testinput(re, str) {
  var midstring;
  if (str.search(re) != -1) {
    midstring = ' contains ';
  } else {
    midstring = ' does not contain ';
  }
  console.log(str + midstring + re);
}
```
### replace
一个在字符串中执行查找匹配的String方法，并且使用替换字符串替换掉匹配到的子字符串。
```apple js
var str = 'Twas the night before Xmas...';
var newstr = str.replace(/xmas/i, 'Christmas');
console.log(newstr);  // Twas the night before Christmas...
```
```apple js
var re = /apples/gi;
var str = "Apples are round, and apples are juicy.";
var newstr = str.replace(re, "oranges");

// oranges are round, and oranges are juicy.
console.log(newstr);
```
```apple js
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
// Smith, John
console.log(newstr);
```
### split 
一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的String方法。
```apple js
var names = "Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ; Chris Hand ";
var pattern = /\s*;\s*/; 
var nameList = names.split(pattern);
console.log("nameList:"+nameList);
pattern = /(\w+)\s+(\w+)/;
var bySurnameList = [];
var i, len;
var output = [];
for (i = 0, len = nameList.length; i < len; i++){
  bySurnameList[i] = nameList[i].replace(pattern, "$2 $1");
}
console.log("bySurnameList:"+bySurnameList);
output = bySurnameList.sort();
console.log("output:"+output);
```