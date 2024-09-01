import type {SanityImageInterface} from "~/interfaces/SanityImageInterface";
import type {SanitySlugInterface} from "~/interfaces/SanitySlugInterface";

export interface PublicationCardInterface {
    title: string;
    slug: SanitySlugInterface;
    preview_image: SanityImageInterface;
    preview_content: string;
    main_content: any;
    _createdAt: string;
}