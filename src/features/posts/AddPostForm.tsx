import React, { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { type Post } from './postsSlice'
import { selectCurrentUsername } from '../auth/authSlice'
import { addNewPost } from './postsSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  // postAuthor: HTMLSelectElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'pending'>('idle')
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectCurrentUsername)!

  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value
    const form = e.currentTarget

    // const newPost: Post = {
    //   id: nanoid(),
    //   title: title,
    //   content: content,
    // }
    //dispatch(postAdded(title, content, userId))

    try {
      setAddRequestStatus('pending')
      await dispatch(addNewPost({ title, content, user: userId })).unwrap()
      form.reset()
    } catch (err) {
      console.error('Failed to save the post: ', err)
    } finally {
      setAddRequestStatus('idle')
    }

    e.currentTarget.reset()
  }

  // const usersOptions = users.map((user) => (
  //   <option key={user.id} value={user.id}>
  //     {user.name}
  //   </option>
  // ))

  return (
    <section>
      <h2>Add a new Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        {/* <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" name="postAuthor" required>
          <option value=""></option>
          {usersOptions}
        </select> */}
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button>Save Post</button>
      </form>
    </section>
  )
}
