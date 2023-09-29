export interface IVersions {
  numberVersion: number | null,
  dateVersion: string | null,
  listNews: Array<object> | null
}

export interface IListNews {
  title: string | null,
  descript: string | null,
  img: string | null,
}
