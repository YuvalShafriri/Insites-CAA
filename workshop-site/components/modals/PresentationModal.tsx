import React from 'react';
import { Modal } from '../common/Modal';
import { WorkshopOpeningViewV3 } from '../views/WorkshopOpeningViewV3';

export interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (route: string) => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ isOpen, onClose, onNavigate }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Workshop Opening" fullscreen>
    <WorkshopOpeningViewV3 onNavigate={onNavigate} />
  </Modal>
);
