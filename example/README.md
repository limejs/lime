# example demo project

## start

stay in upward lime core directory

```bash
npm install
npm start
```

then you will see:

```bash
[nodemon] 1.18.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./example/app.js`
[WARN] [ 路由: get /api/test --- controller中缺少路由定义的action(test)，该路由将返回404 ]
[INFO] [ NODE_ENV: undefined ]
[ OK ] [Congratulations! LIME is listening at http://127.0.0.1:3000]
```


## browser

open your browser, then type `http://localhost:3000`, you will see:

```
hello lime!
```

and then type `http://localhosst:3000/api/test`, and you will see:

```js
{
"name": "lime",
"isCool": true
}
```

That's OK.
