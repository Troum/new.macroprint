import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
    state: () => {
        return {
            address: {} as object,
            contacts: [] as object[],
        }
    },
    getters: {
        getAddress: state => state.address,
        getContacts: state => state.contacts,
    },
    actions: {
        async setAddress(address: object) {
            this.address = address
        },
        async setContacts(contacts: object[]) {
            this.contacts = contacts
        }
    }
})