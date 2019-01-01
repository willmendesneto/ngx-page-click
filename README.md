# NGX Page Click

[![Dependency Status](https://david-dm.org/willmendesneto/ngx-page-click.svg)](https://david-dm.org/willmendesneto/ngx-page-click)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-page-click-sample)

[![NPM](https://nodei.co/npm/ngx-page-click.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ngx-page-click)
[![NPM](https://nodei.co/npm-dl/ngx-page-click.png?height=3&months=3)](https://npmjs.org/ngx-page-click)

[![Build Status](https://circleci.com/gh/willmendesneto/ngx-page-click.svg?style=shield)](https://circleci.com/gh/willmendesneto/ngx-page-click)
[![Coverage Status](https://coveralls.io/repos/willmendesneto/ngx-page-click/badge.svg?branch=master)](https://coveralls.io/r/willmendesneto/ngx-page-click?branch=master)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-page-click.svg)](https://bundlephobia.com/result?p=ngx-page-click)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

![ngx-page-click in action](https://user-images.githubusercontent.com/1252570/50573610-9bb19580-0e2b-11e9-9306-0378196108fa.gif)

> Angular module to detect page events outside your wrapped component. Flexible and easy, how it should be ⇢

## Why a module to handle click outside the element?

The idea of this component is make the process flexible, transparent and easier. So the main point is integrate this component with other components, such as:

- Slide menu;
- Modals elements in the page;
- Wizards;
- Anything else. Use your imagination 😉

It's totally transparent for you and you can integrate easier in your application, improving your user experience 🎉

- [Demo](#demo)
- [Install](#install)
- [Setup](#setup)
- [Development](#development)
- [Contribute](#contribute)

## Demo

Try out our [demo on Stackblitz](https://ngx-page-click-sample.stackblitz.io)!

## Install

You can get it on NPM installing `ngx-page-click` module as a project dependency.

```shell
npm install ngx-page-click --save
```

## Setup

You'll need to add `NgxPageClickModule` to your application module. So that, the `<ngx-page-click>` components will be accessible in your application.

```typescript
@NgModule({
  declarations: [
    YourAppComponent
  ],
  imports: [
    NgxPageClickModule,
    ...
  ],
  providers: [],
  bootstrap: [YourAppComponent]
})

export class YourAppComponent {}

```

After that, you can use the component in your templates, passing the configuration data into the component itself.

- `ngx-page-click`: Handle the user clicks when it clicks outside your wrapped component;

```html
<div class="item">
  <ngx-page-click
    [disabled]="disabled"
    [outsideClickHandler]="outsideClickHandler"
    [listenTo]="on"
  >
    <div><p>Content goes here</p></div>
  </ngx-page-click>
</div>
```

## Development

### Run demo locally

1. This project uses [Angular CLI](https://cli.angular.io/) as base. That means you just need to run `npm start` and access the link `http://localhost:4200` in your browser

### Run tests

1. Run `npm test` for run tests. In case you want to test using watch, please use `npm run tdd`

### Publish

this project is using `np` package to publish, which makes things straightforward. EX: `np <patch|minor|major> --contents=dist/ngx-page-click`

> For more details, [please check np package on npmjs.com](https://www.npmjs.com/package/np)

## Contribute

For any type of contribution, please follow the instructions in [CONTRIBUTING.md](https://github.com/willmendesneto/ngx-page-click/blob/master/CONTRIBUTING.md) and read [CODE_OF_CONDUCT.md](https://github.com/willmendesneto/ngx-page-click/blob/master/CODE_OF_CONDUCT.md) files.

## Author

**Wilson Mendes (willmendesneto)**

- <https://plus.google.com/+WilsonMendes>
- <https://twitter.com/willmendesneto>
- <http://github.com/willmendesneto>
