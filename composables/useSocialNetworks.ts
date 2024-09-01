import _ from 'lodash';
import Facebook from "~/components/icons/Facebook.vue";
import X from "~/components/icons/X.vue";
import Instagram from "~/components/icons/Instagram.vue";
import Linkedin from "~/components/icons/Linkedin.vue";
import Youtube from "~/components/icons/Youtube.vue";
import TikTok from "~/components/icons/TikTok.vue";
import Telegram from '~/components/icons/Telegram.vue';

const socialNetworks = [
    { value: 'facebook', icon: Facebook },
    { value: 'twitter', icon: X },
    { value: 'instagram', icon: Instagram },
    { value: 'linkedin', icon: Linkedin },
    { value: 'youtube', icon: Youtube },
    { value: 'tiktok', icon: TikTok },
    { value: 'telegram', icon: Telegram },
];

export const useSocialNetworks = (value: string) => {
    return _.find(socialNetworks, (item) => {
        return item.value === value;
    });
};