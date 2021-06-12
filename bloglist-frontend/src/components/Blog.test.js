import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

// Shows title and then author url and likes after button click unlike the exercise instructions
test('renders title initially and renders author, url and likes after buttonclick', () => {
  const blog = {
    title: 'A new Pope',
    author: 'Hermann Machaoski',
    url: 'www.bob.com',
    likes: 32,
    user: {
      username: 'bob',
      name: 'billy'
    }
  }

  const username = 'bob'

  const component = render(
    <Blog blog={blog} username = {username}/>
  )

  expect(component.container).toHaveTextContent(
    'A new Pope'
  )
  expect(component.container).not.toHaveTextContent(
    'Hermann Machaoski'
  )
  expect(component.container).not.toHaveTextContent(
    'www.bob.com'
  )
  expect(component.container).not.toHaveTextContent(
    '32'
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Hermann Machaoski'
  )
  expect(component.container).toHaveTextContent(
    'www.bob.com'
  )
  expect(component.container).toHaveTextContent(
    '32'
  )

})

test('clicking the like button twice calls event handler twice', () => {
  const blog = {
    title: 'A new Pope',
    author: 'Hermann Machaoski',
    url: 'www.bob.com',
    likes: 32,
    user: {
      username: 'bob',
      name: 'billy'
    }
  }

  const username = 'bob'

  const likeHandler = jest.fn()

  const component = render(
    <Blog blog={blog} username = {username} addLikes={likeHandler}/>
  )

  //Show the like button first
  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(likeHandler.mock.calls).toHaveLength(2)
})