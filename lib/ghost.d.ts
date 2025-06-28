declare module "@tryghost/content-api" {
  interface GhostAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  interface PageBrowseOptions {
    limit?: string | number;
    include?: string;
  }

  interface PageReadOptions {
    slug: string;
    include?: string;
  }

  class GhostContentAPI {
    constructor(options: GhostAPIOptions);
    pages: {
      browse(options?: PageBrowseOptions): Promise<any[]>;
      read(options: PageReadOptions): Promise<any>;
    };
    posts: {
      browse(options?: any): Promise<any[]>;
      read(options: any): Promise<any>;
    };
    authors: {
      browse(options?: any): Promise<any[]>;
      read(options: any): Promise<any>;
    };
  }

  export default GhostContentAPI;
}
