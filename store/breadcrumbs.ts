import { defineStore } from 'pinia'

export const useBreadcrumbsStore = defineStore('breadcrumbs', {
    state: () => {
        return {
            list: [] as object[],
        }
    },
    getters: {
        getList: state => state.list
    },
    actions: {
        async setList(breadcrumbs: object[]) {
            this.list = breadcrumbs
        }
    }
})