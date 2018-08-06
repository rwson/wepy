# wepy-source-plugin

[wepy]的资源路径解决方案

## 使用

```bash
npm install wepy-source-plugin --save-dev
```

## 配置`wepy.config.js`

```javascript
module.exports = {
    //  ...
    plugins: {
        source: {
        relative: true
        }
    },
    //   ...
}
```