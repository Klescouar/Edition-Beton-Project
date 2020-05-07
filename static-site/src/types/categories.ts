export interface Category {
  name: string;
  fields: {
    slug: string;
  };
}

export type Categories = {
  allCategoryType: {
    edges: [
      {
        node: Category;
      }
    ];
  };
};
