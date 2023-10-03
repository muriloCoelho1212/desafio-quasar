export interface IVersions {
  numberVersion: string,
  dateVersion: string,
  listNews: Array<object>
}

export interface IListNews {
  title: string,
  descript: string,
  img: string | ArrayBuffer | null,
}
