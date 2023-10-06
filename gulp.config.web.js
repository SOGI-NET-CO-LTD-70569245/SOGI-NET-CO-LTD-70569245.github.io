const baseName = '';

module.exports = {
    app: { name: baseName },
    css: {
        sourcePaths: [
            `./src/scss/${baseName}/**/*.scss`
        ],
        exportPath: `./dist/${baseName}/assets/stylesheets/`
    },
    media: {
        sourcePaths: [
            `./src/images/${baseName}/**/*.{jpg,png,svg,json}`
        ],
        exportPath: `./dist/${baseName}/assets/images/`
    },
    js: {
        sourcePaths: [
            `./src/javascripts/${baseName}/**/*.js`
        ],
        exportPath: `./dist/${baseName}/assets/javascripts/`
    },
};