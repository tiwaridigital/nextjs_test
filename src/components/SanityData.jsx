'use client'
import React, { useEffect, useState } from 'react'
import { sanityClient } from '../../sanityClient'
import Button from './Button'
import { TableWithStripedRows } from './Table'
import { arr } from '../../arr'

const SanityData = () => {
  const [manga, setManga] = useState(null)

  const allMangas = async () => {
    console.log('allMangas called')
    const query = '*[_type == "incompleteManga"] | order(_createdAt asc)'
    const result = await sanityClient.fetch(query)
    console.log(result)
    setManga(result)
  }

  useEffect(() => {
    allMangas()
  }, [])

  const allChapters = async () => {
    console.log('allChapters called')
    const id = 'hcPd9DU4IcfM8v35xUiiAM'
    const query = `*[_type == "chapters" && url._ref == "${id}"]`
    const result = await sanityClient.fetch(query)
    console.log('chapters', result)

    result.forEach(async (x) => {
      const res = await sanityClient
        .patch(x._id)
        .set({
          url: {
            _ref: id,
            _type: 'reference',
            _weak: true,
          },
        })
        .commit()
      console.log('res', res)
    })

    //delete chapters
    result.forEach(async (x) => {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const result = await sanityClient.delete(x._id)
      console.log('deleted', result)
    })
  }

  /*
   * Table Initialization
   */
  const tabledHead = ['ID', 'Title', 'Created At', 'Delete']

  const chapterMutation = async (id) => {
    const query = '*[_type == "chapters"] | order(_createdAt asc)'
    const chapters = await sanityClient.fetch(query)
    console.log('all chapters', chapters)

    for (const chapter of chapters) {
      const idx = chapters.indexOf(chapter)
      const result = await sanityClient
        .patch(chapter._id)
        .set({
          totalEpisodes: 25,
          hasNextEp: true,
        })
        .commit()
      console.log('result', result)
    }
  }

  const mangaDelete = async () => {
    try {
      const result = await sanityClient.delete('yOOeEOatiAHhlMRDl9GZRt')
      console.log('deleted', result)
      throw new Error('meri marzi error')
      console.log('hello manag')
    } catch (err) {
      console.log('catch block', err)
      console.log('aise throw and catch karo errors')
    }
  }

  const createChapters = async () => {
    console.log('createChapters', arr)
    const name = 'The Genius Assassin Who Takes it All'
    const totalChapters = 14
    for (const chapter of arr) {
      const idx = arr.indexOf(chapter)
      const chapterObj = {
        _type: 'chapters',
        slug: slugify(`${name} ${4 - idx}`),
        url: {
          _ref: 'hcPd9DU4IcfM8v35xTSo1a',
          _type: 'reference',
          _weak: true,
        },
        data: chapter.map((xx, idx) => ({
          _key: idx.toString(),
          id: idx.toString(),
          src_origin: xx.src_origin,
          delete_url: xx.delete_url,
        })),
        title: `${name} ${4 - idx}`,
        hasNextEp:
          idx === 0
            ? false
            : true /* Inserted false for 0th idx => because chaptersArr is reversed in descending order */,
        totalEpisodes: totalChapters,
      }

      const chapterResult = await sanityClient.create(chapterObj)
      console.log('chapterResult', chapterResult)
    }
  }

  const createChaptersForManga = async () => {
    const query = '*[_type == "chapters"] | order(_createdAt asc)'
    const chapters = await sanityClient.fetch(query)
    console.log('all chapters', chapters)

    const nArr = chapters.slice(0, 10).map((chapter, idx) => {
      const objArr = chapter.data.map((x) => {
        return {
          id: x.id,
          src_origin: x.src_origin,
        }
      })

      return {
        title: `Chapter ${14 - idx}`,
        url: 'hcPd9DU4IcfM8v35xTSo1a',
        data: objArr,
        slug: `${chapter.slug}-${14 - idx}`,
        hasNextEp:
          idx === 0
            ? false
            : true /* Inserted false for 0th idx => because chaptersArr is reversed in descending order */,
        totalEpisodes: 14,
      }
    })

    console.log('nArr', nArr)
  }

  return (
    <div className='flex justify-center items-center flex-col'>
      <h1 className='text-center text-[40px]'>Sanity Data</h1>
      <div className='w-[1024px] mb-12'>
        <TableWithStripedRows head={tabledHead} data={manga} />
      </div>
      <div className='flex justify-center flex-col gap-12'>
        <Button onClick={allChapters} text={'Get All Chapters'} />
        <Button onClick={mangaDelete} text={'Delete Manga'} />
        <Button onClick={createChapters} text={'Create Chapter'} />
      </div>
    </div>
  )
}

export default SanityData

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
