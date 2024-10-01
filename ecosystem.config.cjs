module.exports = {
    apps: [
        {
            name: 'Macroprint',
            port: '4210',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
