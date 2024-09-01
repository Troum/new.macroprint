export interface FooterInterface {
    address?: {
        address_text: string,
        address_link: string
    },
    schedule?: {
        start: string,
        end: string,
        weekend: string,
        factory: string
    },
    socialNetworks?: [
        {
            title: string,
            value: string,
            url: string
        }
    ],
    contacts?: [{
        contact: string,
        href: string
    }];
}