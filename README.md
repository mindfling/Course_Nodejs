# node-template-project

## Course_Nodejs

## Стартовый шаблон node.js by Leskin Quper24

## Lesson08 Lets make CLI node js Application

```bash
#!/usr/bin/env node
```

```bash
chmod +x index.js
```

using bash:

```sh
node cli --help
```

```sh
node cli -h --help
node cli -a --ask
node cli --length=12 -l 12
node cli --uppercase --upper -u
node cli --numbers --number -n
node cli --specials --special --spec -s
```

## colorized console.log()

```js
Reset = "\x1b[0m"

Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"   BgBlack = "\x1b[40m"
FgRed = "\x1b[31m"     BgRed = "\x1b[41m"
FgGreen = "\x1b[32m"   BgGreen = "\x1b[42m"
FgYellow = "\x1b[33m"  BgYellow = "\x1b[43m"
FgBlue = "\x1b[34m"    BgBlue = "\x1b[44m"
FgMagenta = "\x1b[35m" BgMagenta = "\x1b[45m"
FgCyan = "\x1b[36m"    BgCyan = "\x1b[46m"
FgWhite = "\x1b[37m"   BgWhite = "\x1b[47m"
FgGray = "\x1b[90m"    BgGray = "\x1b[100m"
```
