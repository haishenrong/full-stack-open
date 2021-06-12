import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Form calls eventHandler with correct props when new blog is created', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Pinapple: The guesty fruit' }
  })
  fireEvent.change(author, {
    target: { value: 'Shawn Spencer' }
  })
  fireEvent.change(url, {
    target: { value: 'psych' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Pinapple: The guesty fruit')
  expect(createBlog.mock.calls[0][0].author).toBe('Shawn Spencer')
  expect(createBlog.mock.calls[0][0].url).toBe('psych')
})