import Filter from 'bad-words-es'

/**
 * Checks if the content of a note has profane vocabulary.
 * @param noteContent The content of the note.
 * @returns true if it does, false otherwise.
 */
export const hasBadWords = (noteContent: string) => {
  const filter = new Filter()
  const isProfane = filter.isProfane(noteContent)
  return isProfane
}

/**
 * Retrieves the title of a note by splitting its content
 * until the first line break, or the first six words.
 * @param noteContent The content of the note.
 * @returns The resulting title.
 */
export const getTitle = (noteContent: string) => {
  let [title] = noteContent.split('\n')
  const splitted = title.split(' ')
  if (splitted.length > 6) title = splitted.slice(0, 6).join(' ')
  return title
}

/**
 * Formats the date of creation of a note according
 * to the current language locale set in the app.
 * @param noteCreation The date of creation, in ISO format.
 * @param locale The language locale.
 * @returns The formatted date.
 */
export const getDate = (noteCreation: string, locale: 'en' | 'es' = 'en') => {
  return new Date(noteCreation).toLocaleString(locale, { dateStyle: 'long', timeStyle: 'medium' })
}

/**
 * Retrieves the body of a note by removing its title and
 * getting the remaining words.
 * @param noteContent The content of the note.
 * @returns The resulting body.
 */
export const getBody = (noteContent: string) => {
  const title = getTitle(noteContent)
  const body = noteContent.replaceAll('\n', ' ').replaceAll(title, '')
  return body
}
