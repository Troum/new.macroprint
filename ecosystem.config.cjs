module.exports = {
    apps: [
        {
            name: 'Macroprint',
            port: '4206',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
