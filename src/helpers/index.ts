import Filter from 'bad-words-es'

export const hasBadWords = (noteContent: string) => {
  const filter = new Filter()
  const isProfane = filter.isProfane(noteContent)
  return isProfane
}

export const getTitle = (noteContent: string) => {
  let [title] = noteContent.split('\n')

  const splitted = title.split(' ')
  if (splitted.length > 6) title = splitted.slice(0, 6).join(' ')

  return title
}

export const getBody = (noteContent: string) => {
  const title = getTitle(noteContent)
  const body = noteContent.replaceAll('\n', ' ').replaceAll(title, '')
  return body
}

type Feature = 'notes' | 'theme' | 'language'

export const makeKey = (feature: Feature) => `note-app:${feature}`
