#### TS 优势

1. 编译时暴露潜在问题（开发时发现问题，而非运行时发现）
2. 更友好的代码提示（更友好的开发提示和错误提示）
3. 代码语义更清晰易懂（阅读代码更清晰）

#### 开发环境搭建

1. node LTS 安装
2. 检测 node -v & npm -v
3. vscode Prettier 插件安装 （编辑器设置自动保存格式化，Tab 两个空格，单引号）
4. npm install typescript -g
5. 检测 tsc -v
6. npm install ts-node -g 
7. 检测 ts-node -v

#### 语法定义

1. 静态基本类型 - 确定了开发时期能更好的代码提示，基本类型的上的方法和属性固定
2. 基础类型：number, string, boolean, null, undefined, symbol, void
3. 对象类型： object, array, class, function, 

#### 类型注解 VS 类型推断

类型注解，我们来告诉 TS 变量是什么类型, 显式声明类型

类型推断，TS 会自动的去尝试分析变量的类型

如果 TS 能够自动分析变量的类型，我们就什么也不需要做

如果 TS 无法分析变量类型，我们就需要使用类型注解

1. 初始化并赋值类型推断可推断

#### 函数

##### 函数声明：

1. 添加返回值约束：新增类型 nerver

```

function add(f: number, s: number): number{
	return f + s
}

function sayHello(): void {
	console.log('hello')
}

function error():nerver { // 抛出错误，不继续执行
	throw new Error('message')
}

function whileLoop():nerver { // 无限循环，不继续执行
	while(true){}
}

// 解构赋值
function add({f, s}: {f: string, s: string}):string {
	return s + f
}
```

2. 函数类型注解

```
// 返回值可以类型推断
const fun = (s: string) => {
	return parseInt(s, 10)
}

const fun1 = (s: string) => number = (s) => {
	return parseInt(s, 10)
}
```

### 联合类型

```
let a: string | number = 'a'
a = 1
```

### 数组 & 元组

```
const n: number[] = [1, 2, 3]

const sn = (number | string)[] = [1, '2', 30]

const o = {name string}[] = [{name: 'coder'}]

// 元组 - 固定长度， 每个位置固定类型
const t: [string, string, number] = ['1', '2', 15]

元组应用场景：
读取 csv , execl, 后端返回列表数据

// 元组，数组相结合
const TurpleArr:([string, string, number])[] = [
	['10', '2', 3]
]
```

#### 类型别名

```
// type alias

type User = {name: string, age: number}

const arr: User[] = [{
	name: 'coder',
	age: 18
}]

class Teacher {
	name: string
	age: number
}

const t: Teacher[] = [{
	name: 'coder',
	age: 15
}] 
```

#### Interface 接口

```
// 抽出公共类型声明
interface Person {
	// readonly name: string // 只读属性 修饰符
	name: string
	age?: number // 可有可无属性
	// [propName: string]: any // 可扩展 属性
	say(): string
}

const getName = (p: Person) => {
	console.log(p.name)
}

const setName = (p: Person, name: string) => {
	p.name = name
} 


// 函数调用时，如果传入的是对象字面量的形式 {} 进行强校验
getName({
	name: 'coder',
	say() {
		return 'hello'
	}
	sex: 'male' // 提示 不存在这个属性
})

// 如果中间通过变量缓存一步，进行可选校验
const p = {
	name: 'coder',
	sex: 'male',
	say() {
		return 'hello'
	}
}
getName(p) // 正常通过

// 类实现接口
class User implements Person {
	name = 'coder'
	say() {
		return this.name + 'hello.'
	}
}

// 接口继承接口
interface Teacher extends Person {
	teach(): string
}

// 接口定义函数
interface SayHi {
	(word: string): string
}

const say：SayHi = (word) => {
	return 'say hi!'
}
```

##### Interface & type 

1. interface 不能定义基础类型， type 可以
2. 能用接口，尽量用接口

#### Class 类

1. 类的访问类型：private, protected, public
2. 默认是 public
3. public 允许在类的内外被调用
4. private 允许在类内使用
5. protected 允许在类内及子类中使用

```
class Person {
	name: string
	sayHi() {
		console.log('Hi')
	}
}

const p = new Person()
p.name = 'coder' // 默认 - public 正常使用

p.name = 'coder' // private 不能使用

p.name = 'coder' // protected 不能使用

class Teacher extends Person {
	sayBye() {
		return this.name
	}
}

const t = new Teacher()

t.sayBye() // private 不能使用 - this.name

t.satBye() // protected 正常使用 - this.name

t.satBye() // 默认 - public 正常使用 - this.name

// 构造函数赋值
class A {
	public name: string
	constructor(name: string) {
		this.name = name
	}
}

// 简化
class B {
	constructor(public name: string) {}	
}
```

##### static 

```
// 单例模式
class Demo {
	pivate static instance: Demo
	private constructor() {}
	
	static getInstance() {
		if(!this.instance) {
			this.instance = new Demo
		}
		
		return this.instance
	}
}
```

##### set - get

```
class Person {
	private _name: string
	get name() {
		return this.name
	}
	set name(value) {
		this._name = value
	}
}
```

##### 抽象类 - readonly

```
class Person {
	public readonly name: string
}

const p = new Person()
p.name = 'coder' // 只读属性不能赋值

// 抽象类 - 只能被继承 不能实例化
abstract class Geom {
	width: number
	abstract getArea(): number
	getType() {
		return 'Geom'
	}
}

class Circle extends Geom {
	getArea() {
		return 1
	}
}

class Square {
	getArea() {
		return 2,,npm
	}	
}
```

#### 重新配置

1. 将 ts-node 拆分
2. 安装 nodemon 监听 js 变化
3. 配置 dev:build: tsc -w 监听 ts 变化
4. 配置 dev:start nodemon node ./build/crowller.js
5. 安装 concurrently 
6. 联合 两个命令 dev: npm:dev:*
7. tsconfig.json 配置 outDir: './build'

#### 配置文件

1. 命令行中使用 tsc ./demo.ts 不能使用 tsconfig.json 配置文件

2. 使用 tsc 可以使用 tsconfig.json

3. 想要限制 编译文件 可以使用 include/files/exclude/rootDir 配置项

4. ts-node ./demo.js 可以使用 配置文件

   ```
   {
       "compilerOptions": {
   		"outDir": "./build", // 配置输出文件夹
   		"rootDir": "./src", // 编译入口
   		"removeComments": true, // 编译后去除注释
           "incremental": true,  // 只编译新增的文件 
           "allowJs": true,  // 允许编译 js 内容 es6 -> es5
           "checkJs": true, // 检测 js 语法
           "sourceMap": true, // 开启 sourceMap 
           "noUnusedLocals": true, // 未使用的变量 报警告
       }
   }
   ```

   

#### 联合类型 和 类型保护

1. 类型断言
2. in 语法
3. typeof 语法
4. instanceof 语法

```
interface Bird {
	fly: boolean,
	sing: () => {}
}

interface Dog {
	fly: boolean
	bark: () => {}
}

// 类型断言 来做类型保护
function trainAnimal(animal: Bird | Dog) {
	if(animal.fly) {
		(animal as Bird).sing()
	} else {
		(animal as Dog).bark()
	}
}

// in 语法来做类型保护
function train(animal: Bird | Dog) {
	if('sing' in animal) {
		animal.sing()
	} else {
		animal.bark()
	}
}

// typeof 语法来做类型保护
function add(f: string | number, s: string | number) {
	if(typeof f === 'string' || typeof s === 'string') {
		return `${f}${s}`
	}
	return f + s
}

// instanceof 语法
class NumberObj {
	count: number
}

function adds(f: object | NumberObj, s: object | NumberObj) {
	if(f instanceof NumberObj && s instanceof NumberObj) {
		return f.count + s.count
	}
	return 0
}

```

#### 枚举

```
enum Status {
	ONLINE，
    OFFLINE,
    DELETED
}

Status.ONLINE // 0
Status.OFFLINE // 1
Status.DELETE // 2

enum Status {
	ONLINE，
    OFFLINE = 3,
    DELETED
}

Status.ONLINE // 0
Status.OFFLINE // 3
Status.DELETE // 4
```

#### 泛型

1. 函数泛型

```
// 泛型 generic 泛指类型

function join<ABC>(f: ABC, s:ABC) {
	return `${f}${s}`
}

join<string>('1', '2')
// join('1', '2') 类型推断 ABC 类型

// Array<T> => T[]
function map<T>(p: Array<T>) {
	return p
}

map<string>(['123'])

function join1<P, T>(f: T, s: P) {
	return `${f}${s}`
}

join1('1', 1)
// join1<number, string>('1', 1)
```

2. 类泛型

```
class DataManager<T> {
	constructor(private data: T[]){}
	getItem(index: number): T {
		return this.data[index]
	}
}

new DataManager(['1'])
// 泛型继承
interface Item {
	name: string
}

class DataManager1<T extends Item> {
	constructor(private data: T[]){}
	getItem(index: number): string {
		return this.data[index].name
	}
}

new DataManager1([{
	name: 'coder'
}])

class DataManager2<T extends string | number> {
	constructor(private data: T[]){}
	getItem(index: number): string {
		return this.data[index].name
	}
}

new DataManager2<string>([])

const func: <T>(params: T) => T = <T>(params: T) => { return params }
```

#### namepsace 命名空间

```
namespace Home {
	class Header{
		constructor() {
			console.log('Header')
		}
	}
	
    class Footer{
		constructor() {
			console.log('Footer')
		}
	}
	
 	export class Page { // 需要导出入口
        constructor() {
            new Header()
            new Footer()
        }
	}
}

// 访问 
Home.Page()


namepage Component {
	export class Header{
		constructor() {
			console.log('Header')
		}
	}
	
    export class Footer{
		constructor() {
			console.log('Footer')
		}
}

/// <Reference path="./Component" />
namspace Pages {
	export class Page { // 需要导出入口
        constructor() {
            new Component.Header()
            new Component.Footer()
        }
	}
}

new Pages.Page()
```

#### 描述文件中全局类型

```
jquery.d.ts

// 定义全局变量
declare var $ = (params: () => void) => void

// 定义全局函数
declare function $(params: () => void): void

$(function() {
	alert(123)
})

// 定义全局函数 - 重载
declare function $(params: string): {
	html: (param: string) => void
}

$(function() {
	$('body').html('<div>123123</div>')
})
```

```
interface JqueryInstance {
	html: (html: string) => JqueryInstance;
}

// 或者 使用 interface 方式实现函数重载
interface JQuery {
	(readyFunc: () => void): void;
	(selector" string): JqueryInstance;
}

declare var $: JQuery
```

```
$.fn.init()

// 如果 $ 即是 对象又是函数 不能使用 interface

// 对对象进行类型定义
// 对类进行类型定义
// 对命名空间的嵌套
declare namespace $ {
	namespace fn {
		class init {}
	}
}
```

```
import $ from 'jquery'

declare module 'jquery' {
	interface JqueryInstance {
        html: (html: string) => JqueryInstance;
    }

    // 或者 使用 interface 方式实现函数重载
    declare function $(params: () => void): void
    
    namespace $ {
        namespace fn {
            class init {}
        }
    }
    
    export = $
}
```

#### keyof  泛型

```
interface Person {
	name: string
	age: number
	gender: string
}

class Teacher {
	constructor(priate info: Person) {}
	getInfo<T extends keyof Person>(key: T): Person[T] {
		return this.info[key]
	}
}

const t = new Teacher({
	name: 'coder',
	age: 15,
	gender: 'male'
})

t.getInfo('name')

// 类型也可以是字符串
type NAME = 'name'

const a: NAME = 'a' // 警告
const a: NAME = 'name' // 正常
```

#### Express 问题

1. express 库的类型定义文件  .d.ts 文件类型描述不准确
2. 当我们使用中间件的时候，对 req 或者 res 做了修改之后，实际上类型不能改变

```
1. 扩展之前的 类型注解
interface RequestWithBody extends Request {
	body: {
		[key: string]: string | undefined
	}
}
```

```
2. 类型融合 custom.d.ts 融合 node_modules 中的类型定义

declare namespace Express {
	interface Request {
		teacherName: string
	}
}

```

#### 装饰器

```
"experimentalDecorators": true,        
"emitDecoratorMetadata": true, 

// 先打开这两个配置 tsconfig.json 选项
```



1. 装饰器通过 @ 符号来使用
2. 装饰器本身就是一个函数
3. 顺序 从下到上 从右到左
4. 装饰器 是 定义后就装饰 而非实例化或者运行时 装饰

##### 类的装饰器

1. 类装饰器 接受的是参数 是构造函数

```
// 装饰器
function testDecorator(constructor: any) {
    constructor.prototype.getName = () => {
    	console.log('coder')
    }
}

@testDecorator
class Test {}

// 传参 通过参数控制 装饰器
function testDecorator(flag: boolean){
	if(flag) return function(){}
	return function(constructor: any) {
		constructor.prototype.getName = () => {
			console.log('coder')
		}
	}
} 

@testDecorator(true)
class Test {}

const test = new Test()
(test as any).getName()

// 进一步写法
function testDecorator<T extends new (...args: any[]) => any>(constrcutor: T) {
	return class extends constructor {
		name: 'abc'
		getName() {
			return this.name
		}
	}
}

class Test {
	name: string
	constructor(name: string) {
		this.name = name
	}
}

const test = new Test()
(test as any).getName()

// 带提示的写法
function testDecorator() {
	return function <T extends new (...args: any[]) => any>(constrcutor: T) {
        return class extends constructor {
            name: 'abc'
            getName() {
                return this.name
            }
        }
    }
}

const Test = testDecorator()(
    class {
        name: string
        constructor(name: string) {
            this.name = name
        }
    }
)

const test = new Test()
test.getName()

// 自我总结： 多个 装饰器函数 嵌套太多
```

##### 方法装饰器

1. 普通 target 对应时 类的 prototype 
2. 静态方法 对应的类的 构造函数

```
function getNameDecorator(target: any, key: string, descriptor: PropertyDecorator) {
	const oldValue = descriptor.value
	descriptor.value = function () {
		return  oldValue() + 'coder!'
	}
	
    descriptor.writable = false
}

// 普通 target 对应时 类的 prototype 
// 静态方法 对应的类的 构造函数
class Test {
    name: string
    constructor(name: string) {
    	this.name = name
    }
    @getNameDecorator
    getName() {
    	return this.name
    }
}
```

##### 访问器装饰器

1. set get 不能同时使用 装饰器

```
function visitDecorator(target: any, key: string, descriptor: PropertyDecorator) {
	descriptor.writable = false
}

class Test {
    private _name: string
    constructor(name: string) {
    	this._name = name
    }
    get name() {
    	return this._name
    }
    @visitDecorator
    set name() {
    	this._name = name
    }
}

```

##### 属性装饰器

1. target 代表原型 装饰器 原型上的修改不会影响 实例上的修改

```

function(target: any, key: string): any {
	target[key] = 'some' // 原型上修改 不会影响 正常实例上修改
	const decorator: PropertyDecorator = {
		writable: false
	}
	return decorator // 可以返回一个描述对象 覆盖原来的描述对象 
}

class Test {
	@nameDecorator
	name = "test"
}
```

##### 参数装饰器

1. 原型对象， 方法名， 参数的位置

```
function paramsDecorator(target: any, method: any, paramsIndex: number) {

}

class Test {
	getName = (@paramsDecorator a, b) => "test"
}
```

##### 例子

```

const userInfo:any = undefined

function catchError(msg: string) {
 return function (target: any, key: string, decorator: PropertyDecorator) {
 	const oldValue = decorator.value
	try {
		oldValue()
	} catch(e) {
		
	}
 }
}

class Test {
	getName() {
		return userInfo.name
	}
	getAge() {
		return userInfo.age
	}
}
```

#### 前端 项目 React

1. 卸载 create-react-app 防止下载旧版 影响新命令下载新的模板

   ```
   npm uninstall create-react-app -g // 全局安装的加 -g 非全局的不加
   ```

2. 使用 npm 下载 create-react-app 脚手架 并 下载 ts 模板的项目

   ```
   npx create-react-app reactPorject --template typescript --use-npm
   ```

   























