// import React from "react";
// import { formatMessageDate, getParticipantName } from "../../types/messaging.types";
// import styles from "./ConversationsList2.module.css";

// const ConversationList = ({ 
//   conversations = [], 
//   selectedConversationId, 
//   onSelectConversation, 
//   loading,
//   onlineUsers = [] 
// }) => {
//   if (loading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h3 className={styles.title}>Conversations</h3>
//         </div>
//         <div className={styles.loading}>
//           <div className={styles.loadingSpinner}></div>
//           <span>Chargement...</span>
//         </div>
//       </div>
//     );
//   }

//   if (conversations?.length === 0) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h3 className={styles.title}>Conversations</h3>
//         </div>
//         <div className={styles.empty}>
//           <div className={styles.emptyIcon}>💬</div>
//           <p>Aucune conversation</p>
//           <span className={styles.emptySubtext}>
//             Commencez une nouvelle conversation
//           </span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h3 className={styles.title}>Conversations</h3>
//         <div className={styles.onlineCount}>
//           {onlineUsers.length} en ligne
//         </div>
//       </div>

//       <div className={styles.conversationList}>
//         {conversations?.map((conversation) => {
//           const isSelected = conversation.id === selectedConversationId;
//           const participant = conversation.autre_participant;
//           const lastMessage = conversation.dernier_message;
//           const isOnline = onlineUsers.includes(participant?.id);
//           const hasUnread = conversation.messages_non_lus > 0;

//           return (
//             <div
//               key={conversation.id}
//               className={`${styles.conversationItem} ${
//                 isSelected ? styles.selected : ""
//               } ${hasUnread ? styles.unread : ""}`}
//               onClick={() => onSelectConversation(conversation)}
//             >
//               <div className={styles.avatar}>
//                 <div className={styles.avatarCircle}>
//                   {participant?.prenom?.[0]?.toUpperCase() || "?"}
//                 </div>
//                 {isOnline && <div className={styles.onlineIndicator}></div>}
//               </div>

//               <div className={styles.conversationInfo}>
//                 <div className={styles.conversationHeader}>
//                   <span className={styles.participantName}>
//                     {getParticipantName(participant)}
//                   </span>
//                   {lastMessage && (
//                     <span className={styles.lastMessageTime}>
//                       {formatMessageDate(lastMessage.date)}
//                     </span>
//                   )}
//                 </div>

//                 <div className={styles.conversationPreview}>
//                   {lastMessage ? (
//                     <span className={styles.lastMessage}>
//                       {lastMessage.contenu}
//                     </span>
//                   ) : (
//                     <span className={styles.noMessages}>
//                       Aucun message
//                     </span>
//                   )}
                  
//                   {hasUnread && (
//                     <div className={styles.unreadBadge}>
//                       {conversation.messages_non_lus}
//                     </div>
//                   )}
//                 </div>

//                 {participant?.type && (
//                   <div className={styles.participantType}>
//                     {participant.type.replace("_", " ")}
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ConversationList;

import React from "react";
import { formatMessageDate, getParticipantName } from "../../types/messaging.types";
import styles from "./ConversationsList2.module.css";

const ConversationList = ({ 
  conversations = [], // 🔥 Valeur par défaut pour éviter l'erreur
  selectedConversationId, 
  onSelectConversation, 
  loading,
  onlineUsers = [] 
}) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Conversations</h3>
        </div>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <span>Chargement...</span>
        </div>
      </div>
    );
  }

  // 🔥 Vérification supplémentaire pour être sûr
  if (!conversations || !Array.isArray(conversations) || conversations.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Conversations</h3>
        </div>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>💬</div>
          <p>Aucune conversation</p>
          <span className={styles.emptySubtext}>
            Commencez une nouvelle conversation
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Conversations</h3>
        <div className={styles.onlineCount}>
          {onlineUsers.length} en ligne
        </div>
      </div>

      <div className={styles.conversationList}>
        {conversations.map((conversation) => {
          const isSelected = conversation.id === selectedConversationId;
          const participant = conversation.autre_participant;
          const lastMessage = conversation.dernier_message;
          const isOnline = onlineUsers.includes(participant?.id);
          const hasUnread = conversation.messages_non_lus > 0;

          return (
            <div
              key={conversation.id}
              className={`${styles.conversationItem} ${
                isSelected ? styles.selected : ""
              } ${hasUnread ? styles.unread : ""}`}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className={styles.avatar}>
                <div className={styles.avatarCircle}>
                  {participant?.prenom?.[0]?.toUpperCase() || "?"}
                </div>
                {isOnline && <div className={styles.onlineIndicator}></div>}
              </div>

              <div className={styles.conversationInfo}>
                <div className={styles.conversationHeader}>
                  <span className={styles.participantName}>
                    {getParticipantName(participant)}
                  </span>
                  {lastMessage && (
                    <span className={styles.lastMessageTime}>
                      {formatMessageDate(lastMessage.date)}
                    </span>
                  )}
                </div>

                <div className={styles.conversationPreview}>
                  {lastMessage ? (
                    <span className={styles.lastMessage}>
                      {lastMessage.contenu}
                    </span>
                  ) : (
                    <span className={styles.noMessages}>
                      Aucun message
                    </span>
                  )}
                  
                  {hasUnread && (
                    <div className={styles.unreadBadge}>
                      {conversation.messages_non_lus}
                    </div>
                  )}
                </div>

                {participant?.type && (
                  <div className={styles.participantType}>
                    {participant.type.replace("_", " ")}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationList;