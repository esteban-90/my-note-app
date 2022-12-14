import { hasBadWords, getBody, getDate, getTitle } from '@/helpers'
import { makeMockNote, mockNote } from '@/mocks'
import { setName } from '@/tests'

describe('Helpers test cases:', () => {
  const mockContentPart1 = 'this part should be the title'
  const mockContentPart2 = 'and this the body'

  describe(setName(getTitle), () => {
    describe('should get the title from a note by retrieving:', () => {
      it('its content until the first line break', () => {
        const { content } = makeMockNote(`${mockContentPart1}\n${mockContentPart2}`)
        const title = getTitle(content)
        expect(title).toBe(mockContentPart1)
      })

      it('its first six words if there is not line break', () => {
        const { content } = makeMockNote(`${mockContentPart1} ${mockContentPart2}`)
        const title = getTitle(content)
        expect(title).toBe(mockContentPart1)
      })

      it('its first six words if there is a line break after more than that number of words', () => {
        const { content } = makeMockNote(`${mockContentPart1} ${mockContentPart2}\n...`)
        const title = getTitle(content)
        expect(title).toBe(mockContentPart1)
      })
    })
  })

  describe(setName(getDate), () => {
    describe('should get the date in correct format in:', () => {
      it('English', () => {
        const date = getDate(mockNote.createdAt)
        const result = 'December 17, 1995 at 3:24:00 AM'
        expect(date).toBe(result)
      })

      it('Spanish', () => {
        const date = getDate(mockNote.createdAt, 'es')
        const result = '17 de diciembre de 1995, 3:24:00'
        expect(date).toBe(result)
      })
    })
  })

  describe(setName(getBody), () => {
    describe('should get the body from a note by retrieving:', () => {
      it('its content after the first line break', () => {
        const { content } = makeMockNote(`${mockContentPart1}\n${mockContentPart2}`)
        const body = getBody(content)
        expect(body).toBe(` ${mockContentPart2}`)
      })

      it('its content after its first six words if there is not line break', () => {
        const { content } = makeMockNote(`${mockContentPart1} ${mockContentPart2}`)
        const title = getTitle(content)
        expect(title).toBe(mockContentPart1)
      })
    })
  })

  describe(setName(hasBadWords), () => {
    describe('should return:', () => {
      describe('"true" if there are profane words in:', () => {
        it('English', () => {
          const { content: badContent } = makeMockNote('fucking note')
          expect(hasBadWords(badContent)).toBe(true)
        })

        it('Spanish', () => {
          const { content: badContent } = makeMockNote('put4 nota')
          expect(hasBadWords(badContent)).toBe(true)
        })
      })

      describe('"false" if there are no profane words in:', () => {
        it('English', () => {
          const { content: goodContent } = makeMockNote('what a lovely day!')
          expect(hasBadWords(goodContent)).toBe(false)
        })

        it('Spanish', () => {
          const { content: goodContent } = makeMockNote('??qu?? hermoso d??a!')
          expect(hasBadWords(goodContent)).toBe(false)
        })
      })
    })
  })
})
