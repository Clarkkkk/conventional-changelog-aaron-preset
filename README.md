# [![NPM version][npm-image]][npm-url] [![NPM Downloads][npm-download]][npm-url]

This is a conventional-changelog preset for personal use, forked from [conventional-changelog-angular]([conventional-changelog-angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)).

Note: The latest version supports conventional-changelog v5 only. If you are using v4 and below, please use v0.2.2

## Features and difference

- Different commit types (feat, fix, perf, chore, style, docs, refactor, test)
- Commit types renaming and sorting (order: 'Features', 'Bug Fixes', 'Styles', 'Refactor', 'Performance Improvements', 'Documentation', 'Test', 'Chores')
- description scope
- Do not support auto links for issue close (i.e. missing `close [#123](issue link)`)
- Do not support revert description

## Usage

```sh
npm i -D conventional-changelog conventional-changelog-aaron-preset conventional-recommended-bump
```

## Format

```
<type>(<scope>): <commit message>
<BLANK LINE>
- commit description list
<BLANK LINE>
BREAKING CHANGE
- breaking changes description
```

`scope`, description scope and breaking change scope are optional.

## Example
```
feat(app): revise the styles of the website

- adjust the height of the navbar
- change the theme color to `rgb(87, 13, 248)`

BREAKING CHANGE
- drop support for IE browser
```
In CHANGELOG.md:
```
# 2.0.0    (2023-10-20)


## **Features**

* revise the styles of the website ([f3a28e59](https://example.com/commit/f3a28e59))

    ### **Description**
    
    - adjust the height of the navbar
    - change the theme color to `rgb(87, 13, 248)`

    ### **BREAKING CHANGE**
    
    - drop support for IE browser
```

Check [here](https://github.com/Clarkkkk/paroles/blob/main/CHANGELOG.md) to take a closer look in a real project.

[npm-url]: https://npmjs.org/package/conventional-changelog-aaron-preset
[npm-image]: https://badge.fury.io/js/conventional-changelog-aaron-preset.svg
[npm-download]: https://img.shields.io/npm/dw/conventional-changelog-aaron-preset
