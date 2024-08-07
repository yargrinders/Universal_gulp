# Фикс от 25.03.2024

Фикс в тасках 'html:dev' и 'html:docs' от Вячеслав Сидоров из чата ВебКадеми

Добавлен фикс который выравнивает теги img в одну строку, если они написаны не наесколько строк. Ранее это вызывало ошибку и не срабатывание плагина webpHTML 'gulp-webp-retina-html'.

```js
.pipe(
    replace(/<img(?:.|\n|\r)*?>/g, function(match) {
        return match
            .replace(/\r?\n|\r/g, '')
            .replace(/\s{2,}/g, ' ');
    })
) //удаляет лишние пробелы и переводы строк внутри тега <img>
```

# Фикс от 14.08.2024

### Добавлен prettier в режиме разработки в таск 'html:dev'

```js
.pipe(
    prettier({
        tabWidth: 4,
        useTabs: true,
        printWidth: 182,
        trailingComma: 'es5',
        bracketSpacing: false,
    })
)
```


### Заметка. При прописывании тега img не обязательно прописывать srcset

Плагин 'gulp-webp-retina-html' в таске 'html:dev' и так добавляет тег picture и source для 2x изображений.
!Важно. Плагин прописывает @2x ко всем изображениям, кроме SVG. Поэтому нужно !ОБЯЗАТЕЛЬНО сохранять всю графику в 1 и @2x.

### Правка в тасках 'html:dev' и 'html:docs'

Теперь src выглядит вот так:

```js
.src([
    './src/html/**/*.html',
    '!./**/blocks/**/*.*',
    '!./**/docs/**/*.*'
])
```

Что это дает. В html файлах в любой папке можно создавать папку blocks и она не будет собираться. Это все будут partials файлы, которые не собираются в самостоятельные страницы.

Был нюанс с сборкой partials файлов внутри папки docs.

Также от отдельной сборки отключена папка docs.

### Поправлен таск 'sass:docs'

Изменен порядок вызова плагинов, чтобы устранить ошибку с SCSS комментариями в CSS

## Замена плагина по переименовыванию файлов

Вместо gulp-ext-replace который не работал на Windows использован 'gulp-rename'

```js
const rename = require('gulp-rename');
// ...
.pipe(rename({ extname: '.webp' }))
```

# Обновленная версия от 05.08.2024

# Установил npm i gulp-webp-retina-html

https://www.npmjs.com/package/gulp-webp-retina-html

Будет вместо `const webpHTML = require('gulp-webp-html');`
Работает с перенесенными тегами <img>
Настроил для retina webp

```js
.pipe(
    webpHTML({
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        retina: {
            1: '',
            2: '@2x'
        },
    })
)
```

# Качество сжатия webp

Ставлю пакет npm i imagemin-webp@6.0.1

По итогу в таске `gulp.task('images:docs' ...)`
сначала перевожу картинки в формат webp с помощью imageminи меняю расширение,
потом обрабатываю картинки в jpg / png оптимизируя вес.
Решение взято из https://stackoverflow.com/questions/46390199/generating-and-optimizing-webp-via-gulp

Пакет gulp-webp удалил, потому что не понятно как задавать в нем настройки сжатия webp формата

# webp в html & retina

Заменил пакет на gulp-webp-retina-html, прошлый не работал с retina и srcset @2x

# webp в CSS & retina

Не нашел рабочего решения. Плагин для CSS дописывает медиазапрос под
.webp .classname и по итогу в браузере грузится и jpg и webp картинка. Получается 2 запроса вместо одного, и больше веса, так как грузятся обе картинки. Поэтому закомментировал код который с этим связан. Потму как цель webp сократить вес страницы, а выходит и веса больше и запросов тоже.

# imagemin

Плагины которые оптимизируют графику
https://www.npmjs.com/search?q=keywords:imageminplugin

`imagemin.gifsicle({ interlaced: true }),`
Interlace gif for progressive rendering.
https://www.npmjs.com/package/imagemin-gifsicle#interlaced

`imagemin.mozjpeg({ quality: 75, progressive: true }),`
Качество после сжатия, 0 (худшее качество, сильное сжатие) - 100 (низкое сжатие, идеальное качество).
https://www.npmjs.com/package/imagemin-mozjpeg#quality

`imagemin.optipng({ optimizationLevel: 5 }),`
Уровень оптимизации png от 0 до 7
0 - минимальное и самое быстрое сжатие,
7 - максимальное и самое долгое сжатие
Оптимальное: 5
https://www.npmjs.com/package/imagemin-optipng#optimizationlevel

`verbose: true`
Выводить логи по каждой оптимизированной картирнке
https://github.com/sindresorhus/gulp-imagemin?tab=readme-ov-file#verbose

# Установил типограф

gulp-typograf
https://www.npmjs.com/package/gulp-typograf

Добавить неразрывные пробелы меджу словами и предлогами, дефисами. И т.д.

Пример текста:
Раздобудь к утру ковёр - Шитый золотом узор!.. Государственное дело, - Расшибись, а будь добёр!
Чтоб на ём была видна, Как на карте, вся страна, Потому как мне с балкону Нет обзору ни хрена!
Леонид Филатов "Про Федота-стрельца"

# SVG спрайты

https://www.npmjs.com/package/gulp-svg-sprite
`npm i gulp-svg-sprite -D`

Включил два режима:

-   stack и symbol
    Stack - для иконок без эффекта по ховеру
    symbol - когда нужен ховер

## Сделал 2 таска

Первый с сборкой SVG стека, в который иконки собираются без удаления атрибутов, в них сохраняется цвет заливки и рамки, из готорого можно использовать иконки, для которых не надо контролировать цвет через CSS.

Второй таск для сборки symbol спрайта. В нем удаляются заливка и stroke, их надо восстанавливать через CSS, но зато можно менять цвет по ховеру.

## Настройки svgo

https://svgo.dev/docs/plugins/remove-attrs/
Можно прописать config и в случае ошибки увидеть подсказку с примером конфига в консоли. Удобно.
https://www.youtube.com/watch?v=nUYznYXsf3w

## Использование SVG стаков

## Использование спрайтов

Описал в документации.

# Конвертация шрифтов

Решение от подписчика Max Voron.

# Правка относительных путей, для картинок в таске html:dev

Решение от подписчика Max Voron.

```js
.pipe(
    replace(
        /(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        '$1./$4$5$7$1'
    )
)
```

# Правка относительных путей, для картинок в таске sass:dev

Решение от подписчика Max Voron.

```js
.pipe(
    replace(
        /(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        '$1$2$3$4$6$1'
    )
)
```
