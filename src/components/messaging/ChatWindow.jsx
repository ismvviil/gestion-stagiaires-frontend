import React from 'react';
import { useMessages } from '../../hooks/useMessages';
import { useConversations } from '../../hooks/useConversations';
import ChatBox from './ChatBox';

const ChatWindow = ({ conversationId, otherUser, onClose }) => {
  const { markAsRead } = useConversations();
  const {
    messages,
    loading: messagesLoading,
    sendingMessage,
    hasMore,
    typingUsers,
    sendMessage,
    sendTypingIndicator,
    loadMoreMessages
  } = useMessages(conversationId);

  // Créer un objet conversation compatible avec ChatBox
  const conversation = {
    id: conversationId,
    autre_participant: otherUser
  };

  return (
    <ChatBox
      conversation={conversation}
      messages={messages}
      onSendMessage={sendMessage}
      onSendTyping={sendTypingIndicator}
      typingUsers={typingUsers}
      loading={messagesLoading}
      hasMore={hasMore}
      onLoadMore={loadMoreMessages}
      onMarkAsRead={markAsRead}
    />
  );
};

export default ChatWindow;