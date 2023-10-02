export interface IVersions {
  numberVersion: number | null,
  dateVersion: string | null,
  listNews: Array<object> | null
}

export interface IListNews {
  title: string,
  descript: string | null,
  img: string | ArrayBuffer | null,
}
