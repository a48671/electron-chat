import React, { useCallback, useEffect, useRef } from 'react';
import { ChatMessagesList } from "../components/chat-messages-list";
import { ViewTitle } from "../components/shared/view-title";
import { ChatUsersList } from "../components/chat-users-list";
import { useParams } from "react-router-dom";
import { BaseLayout } from "../components/layouts/base-layout";
import { sendMessage, subscribeChat, subscribeToMessagesByChatId } from "../actions/chats";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToUserChanges } from "../actions/auth";
import { LoadingView } from '../components/shared/loading.view'
import { Messenger } from "../components/messenger";
import { REGISTER_UNSUB_OF_CHAT_MESSAGES } from "../actions/action-types";

export const ChatView = () => {
  const { id } = useParams();
  const messagesList = useRef();

  const chat = useSelector(({ chats }) => chats.activeChats[id])
  const messages = useSelector(({ chats }) => chats.messages[id])
  const isAlreadySubscribedToMessages = useSelector(({ chats }) => !!chats.registeredSubs[id]);
  const joinedUsers = chat?.joinedUsers;

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeFromChat = dispatch(subscribeChat(id));

    return () => {
      void unsubscribeFromChat();
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!isAlreadySubscribedToMessages) {
      const unsubscribeFromMessages = dispatch(subscribeToMessagesByChatId(id));
      dispatch({ type: REGISTER_UNSUB_OF_CHAT_MESSAGES, unsub: unsubscribeFromMessages, chatId: id });
    }
  }, [id, dispatch, isAlreadySubscribedToMessages]);

  useEffect(() => {
    const unsubscribes = [];

    if (joinedUsers) {
      joinedUsers.forEach(({ uid }) => {
        unsubscribes.push(dispatch(subscribeToUserChanges(uid)));
      });
    }
    return () => {
      unsubscribes.forEach(fn => fn());
    }
  }, [joinedUsers, dispatch]);

  const handleSendMessage = useCallback(message => {
    dispatch(sendMessage(message, id)).then(() => {
      messagesList.current?.scrollIntoView(false);
    });
  }, [id, dispatch]);


  if (!chat) {
    return <LoadingView message="Chat is loading..." />;
  }

  return (
    <BaseLayout>
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <ChatUsersList users={chat?.joinedUsers} />
        </div>
        <div className="col-9 fh">
          <ViewTitle text={chat?.name || 'Name is not defined'} />
          <ChatMessagesList innerRef={messagesList} messages={messages || []} />
          <Messenger onSubmit={handleSendMessage} />
        </div>
      </div>
    </BaseLayout>
  );
};
