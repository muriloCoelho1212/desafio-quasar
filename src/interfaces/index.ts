export interface IListNews {
  id: string,
  title: string,
  descript: string,
  img?: string
}

export interface IVersions {
  id: number
  numberVersion: string,
  dateVersion: string,
  listNews: IListNews[]
}
