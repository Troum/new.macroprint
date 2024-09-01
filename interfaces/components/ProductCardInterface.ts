import type {SanityImageInterface} from "~/interfaces/SanityImageInterface";
import type {SanitySlugInterface} from "~/interfaces/SanitySlugInterface";

export interface ProductCardInterface {
    icon: SanityImageInterface;
    title: string;
    slug: SanitySlugInterface;
    main_content: any;
    preview_content: any;
    preview_image?: SanityImageInterface;
    main_images: SanityImageInterface[];
}