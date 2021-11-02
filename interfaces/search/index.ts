export enum SearchType {
  KEYWORD = 'keyword',
  TAG = 'tag',
}

export interface ISearch {
  keyword: string;
  type: 'keyword' | 'tag';
}
