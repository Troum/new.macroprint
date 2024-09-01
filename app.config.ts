export default defineAppConfig({
    ui: {
        primary: 'black-pearl',
        strategy: 'override',
        icons: {
          dynamic: true
        },
        dropdown: {
            width: 'w-fit'
        },
        input: {
            color: {
                gray: {
                    outline: 'bg-[#f7f7f7] dark:bg-[#f7f7f7] text-gray-200 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-gray-200 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-400'
                }
            },
            variant: {
                outline: 'bg-[#f7f7f7] dark:bg-[#f7f7f7] ring-1 ring-gray-200',
            }
        },
        textarea: {
            color: {
                gray: {
                    outline: 'bg-[#f7f7f7] dark:bg-[#f7f7f7] text-gray-200 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-gray-200 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-400'
                }
            },
            variant: {
                outline: 'bg-[#f7f7f7] dark:bg-[#f7f7f7] ring-1 ring-gray-200',
            }
        }
    }
})
