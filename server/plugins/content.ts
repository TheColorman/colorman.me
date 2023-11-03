export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('content:file:afterParse', (file) => {
        // Add raw file content to the file object
        function recursiveConcat(obj: Object): string {
            return Object.keys(obj).reduce((acc, key) => {
                if (key.startsWith('_')) {
                    return acc
                }
                if (typeof obj[key as keyof typeof obj] === 'object') {
                    return acc + recursiveConcat(obj[key as keyof typeof obj])
                }
                if (typeof obj[key as keyof typeof obj] === 'string') {
                    return acc + " " + obj[key as keyof typeof obj].toString().toLowerCase()
                }
                return acc
            }, '')
        }
        file.rawContent = recursiveConcat(file)
    })
})