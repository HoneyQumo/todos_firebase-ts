export interface IDeed {
  title: string,
  desc: string,
  image: string | ArrayBuffer,
  done: boolean,
  key: string
  createdAt: string
}