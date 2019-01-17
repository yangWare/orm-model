## BaseModel
基础模型，封装了一些通用方法。其他自定义Model可以继承BaseModel来使用。

#### toInstance
静态方法。可以将普通的js对象转化成Model实例。在需要处理类嵌套的情况下比较有用。  
  
```
	class CustomModel extends Model {
		// some property
		// some methord
	}
	const instance: CustomModel = CustomModedl.toInstance(params)
```  
  
#### toList
静态方法。可以将普通的js对象转化成ListWrapper封装对象。 
  
```
	interface ListWrapper<T> {
		items: T[],
		otherProperty: any
	}
	
	class User {
		misId: string
		name: string
	}
	
	// 转化前
	const params = {
		items: {
			misId: string,
			name: string
		}[],
		otherProperty: any
	}
	
	// 转化后
	conole.log(User.toList(params))
	/**
		{
			items: User[],
			otherProperty: any
		}
	*/
```  
  
#### findAll
批量查询。abstract方法,由CustomModel各自实现,只约束了参数和return
  
```
	findAll(p: Params) => ListWrapper<CustomModel>
	// 参数，一般是各种过滤、分页、排序等参数
	interface Params {
		[key: string]: any
	}
	
	// return，可以调用toList直接转化
	interface ListWrapper<T> {
		items: T[]
		[key: string]: any
	}
```
  
#### find
查询单个。abstract方法，由CustomModel各自实现，只约束了参数和return
  
```
	findAll(p: Params) => CustomModel
	// 参数
	interface Params {
		[key: string]: any
	}
	
	// return，可以调用toInstance直接转化
```
  
#### resolveCtor
构造函数解析函数
  
```
	class CustomModel extends BaseModel {
		constructor (p: any) {
			super()
			// 会自动实例化嵌套类
			this.resolveCtor(p)
		}
	}
```

## 对象关系
类似ORM，当两个Model存在引用关系时，可以使用装饰器来解决。

#### hasOne
```
	class AuthorModel extends BaseModel {
		constructor (p: any) {
			super()
			// 会自动实例化嵌套类
			this.resolveCtor(p)
		}
	}
	
	class BookModel extends BaseModel {
		@hasOne(Author, 'book')
		author: AuthorModel
	
		constructor (p: any) {
			super()
			// 会自动实例化嵌套类
			this.resolveCtor(p)
		}
	}
```
在使用hasOne，表示该属性的值是另一个Model的实例。在调用resolveCtor、toInstance、toList等函数创建实例时，会同时将该属性实例化。  
hasOne第一参数表示该属性对应的Model，第二个参数表示外键

#### hasMany
```
	class BookModel extends BaseModel {
		@hasOne(Author, 'book')
		author: AuthorModel
	
		constructor (p: any) {
			super()
			// 会自动实例化嵌套类
			this.resolveCtor(p)
		}
	}
	
	class AuthorModel extends BaseModel {
		@hasMany(Book, 'author')
		books: ListWrapper<Book>
		
		constructor (p: any) {
			super()
			// 会自动实例化嵌套类
			this.resolveCtor(p)
		}
	}
```
在使用hasMany，表示该属性的值是另一个Model的列表，由于除列表外可能还包含其他参数，所以使用ListWrapper结构来保存，ListWrapper在前文已介绍。在调用resolveCtor、toInstance、toList等函数创建实例时，会同时将该属性实例化。  
hasMany第一参数表示该属性对应的Model，第二个参数表示外键

## 外键
当使用hasOne、hasMany时可以指定外键，那么外键有什么用呢？在说明前先介绍一个函数

#### getChild
```
	class BookModel extends BaseModel {
		@hasOne(Author, 'book')
		author: AuthorModel
	
		constructor (p: any) {
			super()
			// 会自动实例化嵌套类
			this.resolveCtor(p)
		}
	}
```
  
在上例中，也许author属性并不是随着book数据一起从后端传来的，那么此时可以在需要的调用: bookInstance.getChild('author')
实际上，这只是一个sugar。
  
```
	bookInstance.getChild('author')
	
	===>
	
	// 如果是hasMany则会调用findAll
	const author = await AuthorMode.find({
		// key 'book' 就是 外键'book'
		book: bookInstance
	})
	bookInstance.author = author
```