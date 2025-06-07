// import React from 'react';
// import styles from './StatCard.module.css';

// const StatCard = ({ 
//   title, 
//   value, 
//   change, 
//   changeType = 'positive', 
//   icon: Icon,
//   description,
//   color = 'blue'
// }) => {
//   return (
//     <div className={styles.cardContainer}>
//       <div className={styles.cardContent}>
//         <div className={styles.cardInfo}>
//           <p className={styles.cardTitle}>
//             {title}
//           </p>
//           <p className={styles.cardValue}>
//             {typeof value === 'number' ? value.toLocaleString() : value}
//           </p>
          
//           {change && (
//             <div className={styles.cardChange}>
//               <span className={`${styles.changeValue} ${
//                 changeType === 'positive' ? styles.changePositive : styles.changeNegative
//               }`}>
//                 {changeType === 'positive' ? '+' : ''}{change}%
//               </span>
//               <span className={styles.changeLabel}>
//                 vs mois dernier
//               </span>
//             </div>
//           )}
          
//           {description && (
//             <p className={styles.cardDescription}>
//               {description}
//             </p>
//           )}
//         </div>
        
//         {Icon && (
//           <div className={`${styles.cardIcon} ${styles[`cardIcon${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
//             <Icon className={styles.iconSvg} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StatCard;

import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon,
  description,
  color = 'blue',
  loading = false
}) => {
  if (loading) {
    return (
      <div className={`${styles.cardContainer} ${styles.cardLoading}`}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSkeleton}></div>
          <div className={styles.loadingSkeletonSmall}></div>
          <div className={styles.loadingSkeletonMini}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.cardContainer} ${styles[`card${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
      <div className={styles.cardContent}>
        <div className={styles.cardInfo}>
          <p className={styles.cardTitle}>
            {title}
          </p>
          <p className={styles.cardValue}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          
          {/* {change && (
            <div className={styles.cardChange}>
              <span className={`${styles.changeValue} ${
                changeType === 'positive' ? styles.changePositive : styles.changeNegative
              }`}>
                <span className={styles.changeIcon}>
                  {changeType === 'positive' ? '↗' : '↘'}
                </span>
                {changeType === 'positive' ? '+' : ''}{change}%
              </span>
              <span className={styles.changeLabel}>
                vs mois dernier
              </span>
            </div>
          )} */}
          
          {description && (
            <p className={styles.cardDescription}>
              {description}
            </p>
          )}
        </div>
        
        {Icon && (
          <div className={`${styles.cardIcon} ${styles[`cardIcon${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
            <Icon className={styles.iconSvg} />
          </div>
        )}
      </div>
      
      {/* Élément décoratif subtil */}
      <div className={styles.cardGlow}></div>
    </div>
  );
};

export default StatCard;


