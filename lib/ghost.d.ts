declare module "@tryghost/content-api" {
  interface GhostAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  interface BrowseOptions {
    limit?: string | number;
    include?: string;
  }

  interface ReadOptions {
    slug?: string;
    id?: string;
    include?: string;
  }

  interface Tag {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  }

  interface Author {
    id: string;
    name: string;
    slug: string;
    bio?: string | null;
    profile_image?: string | null;
  }

  interface PostOrPage {
    id: string;
    title?: string | null;
    slug: string;
    html?: string | null;
    published_at?: string | null;
    updated_at?: string | null;
    excerpt?: string | null;
    feature_image?: string | null;
    tags?: Tag[];
    authors?: Author[];
  }

  class GhostContentAPI {
    constructor(options: GhostAPIOptions);
    pages: {
      browse(options?: BrowseOptions): Promise<PostOrPage[]>;
      read(options: ReadOptions): Promise<PostOrPage>;
    };
    posts: {
      browse(options?: BrowseOptions): Promise<PostOrPage[]>;
      read(options: ReadOptions): Promise<PostOrPage>;
    };
    authors: {
      browse(options?: BrowseOptions): Promise<Author[]>;
      read(options: ReadOptions): Promise<Author>;
    };
  }

  export default GhostContentAPI;
}
