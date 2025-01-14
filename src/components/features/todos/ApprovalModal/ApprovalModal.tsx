import './ApprovalModal.css';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  todoTitle: string;
}

export const ApprovalModal = ({ isOpen, onClose, onApprove, todoTitle }: ApprovalModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Confirm Status Change</h2>
        
        <p className="modal-message">
          Are you sure you want to mark "{todoTitle}" as Done?
        </p>

        <div className="modal-actions">
          <button
            onClick={onClose}
            className="modal-button modal-button-cancel"
            aria-label="Cancel status change"
          >
            Cancel
          </button>
          <button
            onClick={onApprove}
            className="modal-button modal-button-approve"
            aria-label="Approve status change"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}; 