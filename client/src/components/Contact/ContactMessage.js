import React, { useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { findSpecifiqueConversation } from '../../api/ConversationRequest'
import { getMessages } from '../../api/MessagesRequest'
import { useStateValue } from '../../reducers/StateProvider'

// eslint-disable-next-line arrow-body-style
const ContactMessage = ({ current }) => {
  // Fetch for get last message in conversation
  const [{ user }] = useStateValue()
  const [lastMessage, setLastMessage] = useState('')
  const [loading, SetIsLoading] = useState(true)

  // getMessages
  const takeMessages = async () => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const { data } = await findSpecifiqueConversation(current._id, user._id)
      //   console.log('contact data convers', data)
      if (data !== null) {
        // eslint-disable-next-line no-underscore-dangle
        getMessages(data._id)
          .then((chat) => {
            setLastMessage(chat.data[chat.data.length - 1].content)
          })
          .catch((error) => {
            console.log('error ', error)
          })
          .finally(() => SetIsLoading(false))
      } else {
        SetIsLoading(false)
      }
    } catch (error) {
      // error
    }
  }

  if (current !== null) takeMessages()

  return (
    <div>
      {loading ? (
        <Skeleton animation="wave" height={10} width="40%" />
      ) : (
        <small>
          {lastMessage?.length < 15 ? lastMessage : `${lastMessage}...`}
        </small>
      )}
    </div>
  )
}

export default ContactMessage
