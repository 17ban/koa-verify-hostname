# Installation

#### npm

```
npm i -S koa-verify-hostname
```

#### yarn

```
yarn add koa-verify-hostname
```



# Usage

```javascript
const app = new Koa()

const verifyHostname = require('koa-verify-hostname')
app.use(verifyHostname('localhost'))
// access 'localhost' -> next middleware
// access '127.0.0.1' -> response status 403
// access '[::1]' -> response status 403
```

You can also pass into a `RegExp`, or an `Array` contains `string ` and `RegExp `.

```javascript
app.use(verifyHostname(/[a-z]+\.example\.com/i))
// access 'example.com' -> response status 403
// access 'foo.example.com' -> next middleware
// access 'bar.example.com' -> next middleware
// access 'barexample.com' -> response status 403
```

```javascript
app.use(verifyHostname(['example.com', /[a-z]+\.example\.com/i]))
// access 'example.com' -> next middleware
// access 'foo.example.com' -> next middleware
// access 'bar.example.com' -> next middleware
// access 'barexample.com' -> response status 403
```

If you want to customize the response, you can pass a function into `verifyHostname()` as the second argument.

```javascript
app.use(verifyHostname('example.com', async (ctx, next, isValid) => {
	// isValid will be true when accessed by valid hostname
  if(!isValid) {
  	ctx.status = 403
  	ctx.body = 'Invalid Hostname.'
  }
  else
  	await next()
})))
```

