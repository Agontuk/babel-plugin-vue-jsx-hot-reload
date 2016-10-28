# babel-plugin-vue-jsx-hot-reload
Babel plugin for hot reloading Vue 2.0 JSX component.

> This plugin only works with Vue 2.0 JSX and it's in very early stage. Use this for development only.

## Installation
```shell
npm install --save-dev babel-plugin-vue-jsx-hot-reload
```

## Usage
In your `.babelrc`:

``` json
{
  "plugins": [
        ["vue-jsx-hot-reload", { "debug": false }]
    ]
}
```

Then write your component like this
``` js
// You can't use export default { render(h) {} } directly
const Component = {
    prop: {....},
    render(h) {
        return (
            <div>Hello World</div>
        );
    }
};

export default Component;
// That's it !!
```

## Options
Setting `debug: true` will log the JSX component name in terminal

## License
MIT
