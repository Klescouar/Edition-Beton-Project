import { FluidObject } from "gatsby-image";

export interface Article {
  id: string;
  title: string;
  creationDate: Date;
  fields: {
    imageUrl: string;
  };
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

export type ArticlesType = {
  allArticleType: {
    edges: [
      {
        node: Article;
      }
    ];
  };
};

export type ArticlesListType = Article[];
