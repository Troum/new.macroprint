import {useBreakpoints} from '@vueuse/core'

export function useBreakpoint() {
    return useBreakpoints({
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1280,
    })
}
