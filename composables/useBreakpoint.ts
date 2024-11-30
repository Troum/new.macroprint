import {useBreakpoints} from '@vueuse/core'

export function useBreakpoint() {
    const breakpoints = useBreakpoints({
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1366,
        xl: 1920,
        xxl: 2040
    })
    const isMobile = breakpoints.between('mobile', 'tablet')
    const isTablet = breakpoints.between('tablet', 'laptop')
    const isLaptop = breakpoints.between('laptop', 'desktop')
    const isDesktop = breakpoints.between('desktop', 'xl')
    const isFull = breakpoints.between('xl', 'xxl')
    const is2KAndMore = breakpoints.greater('xxl')

    return {
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        isFull,
        is2KAndMore
    }
}
