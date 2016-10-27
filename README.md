# babel-plugin-vue-jsx-hot-reload
Babel plugin for hot reloading Vue 2.0 JSX component.

> This plugin only works with Vue 2.0 JSX and it's in very early stage.

## Installation
```shell
npm install --save-dev babel-plugin-vue-jsx-hot-reload
```

## Usage
In your `.babelrc`:

``` json
{
  "plugins": ["vue-jsx-hot-reload"]
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
```
## License
MIT
