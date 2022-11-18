import { hasBadWords, getBody, getTitle, makeKey } from '@/helpers'
import { makeMockNote } from '@/mocks'

describe('helpers test cases:', () => {
  const mockContentPart1 = 'this part should be the title'
  const mockContentPart2 = 'and this the body'

  describe(getTitle.name, () => {
    describe('should get the title from a note by retrieving:', () => {
      it('its content until the first line break', () => {
        const { content } = makeMockNote(mockContentPart1 + '\n' + mockContentPart2)
        const title = getTitle(content)
        expect(title).toBe(mockContentPart1)
      })

      it('its first six words if there is not line break', () => {
        const { content } = makeMockNote(mockContentPart1 + ' ' + mockContentPart2)
        const title = getTitle(content)
        expect(title).toBe(mockContentPart1)
      })

      it('its first six words if there is a line break after more than that number of words', () => {
        const { content } = makeMockNote(mockContentPart1 + ' ' + mockContentPart2 + '\n' + '...')
        const title = getTitle(content)
        expect(title).toBe(mockContentPart1)
      })
    })
  })

  describe(getBody.name, () => {
    describe('should get the body from a note by retrieving:', () => {
      it('its content after the first line break', () => {
        const { content } = makeMockNote(mockContentPart1 + '\n' + mockContentPart2)
        const body = getBody(content)
        expect(body).toBe(' ' + mockContentPart2)
      })

      it('its content after its first six words if there is not line break', () => {
        const { content } = makeMockNote(mockContentPart1 + ' ' + mockContentPart2)
        const title = getTitle(content)
        expect(title).toBe(mockContentPart1)
      })
    })
  })

  describe(hasBadWords.name, () => {
    describe('should return:', () => {
      describe('"true" if there are profane words in:', () => {
        it('English', () => {
          const { content: badContent } = makeMockNote('this shit is expected to be profane')
          expect(hasBadWords(badContent)).toBe(true)
        })

        it('Spanish', () => {
          const { content: badContent } = makeMockNote('esta mierda debe retornar true')
          expect(hasBadWords(badContent)).toBe(true)
        })
      })

      describe('"false" if there are no profane words in:', () => {
        it('English', () => {
          const { content: goodContent } = makeMockNote('what a lovely day!')
          expect(hasBadWords(goodContent)).toBe(false)
        })

        it('Spanish', () => {
          const { content: goodContent } = makeMockNote('¡qué hermoso día!')
          expect(hasBadWords(goodContent)).toBe(false)
        })
      })
    })
  })

  describe(makeKey.name, () => {
    describe('should return:', () => {
      it('the correct storage key for notes', () => {
        expect(makeKey('notes')).toBe('note-app:notes')
      })

      it('the correct storage key for language', () => {
        expect(makeKey('language')).toBe('note-app:language')
      })

      it('the correct storage key for theme', () => {
        expect(makeKey('theme')).toBe('note-app:theme')
      })
    })
  })
})
