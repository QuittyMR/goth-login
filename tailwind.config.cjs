const userTheme = {
    primary: [80, 120, 80],
    secondary: [100, 140, 120],
    text: [200,200,200]
}
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,html,svelte}',
    ],
    theme: {
        extend: {
            colors: {
                primary: from('rgb', userTheme.primary),
                secondary: from('rgb', userTheme.secondary),
                text: from('rgb', userTheme.text),
                contrast: from('rgb', contrast(userTheme.primary))
            },
        },
    },
    plugins: [],
}

function from(cssFunction, colorTriplet) {
    return ({ opacityValue }) => {
        if (opacityValue === undefined) {
            return `${cssFunction}(${colorTriplet.join(' ')})`
        }
        return `${cssFunction}(${colorTriplet.join(' ')} / ${opacityValue})`
    }
}

function contrast(colorTriplet) {
    return colorTriplet.reduce((a, b) => a + b) >= 255 * 3 / 2 ? [10, 10, 10] : [240, 240, 240]
}