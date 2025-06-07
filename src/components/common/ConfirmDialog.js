import React from 'react';
import styles from './ConfirmDialog.module.css';

const ConfirmDialog = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  dangerous = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button 
            onClick={onCancel}
            className={styles.cancelButton}
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            className={`${styles.confirmButton} ${dangerous ? styles.dangerous : ''}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;