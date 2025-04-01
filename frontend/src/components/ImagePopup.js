import React, { useState, useEffect } from 'react';

function ImagePopup({ card, onClose }) {
  const [RemoteModal, setRemoteModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Предполагается
  const [selectedCard, setSelectedCard] = useState(null); // Предполагается

  useEffect(() => {
    import('remoteModal/Modal_place')
      .then((module) => {
        setRemoteModal(() => module.default);
      })
      .catch((err) => {
        console.error('Ошибка загрузки RemoteModal:', err);
      });
  }, []);

  if (!RemoteModal) return null;

  return (
    <div className={`popup popup_type_image ${card ? 'popup_is-opened' : ''}`}>
      <div className="popup__content popup__content_content_image">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img alt={card ? card.name : ''} src={card ? card.link : ''} className="popup__image" />
        <p className="popup__caption">{card ? card.name : ''}</p>
        <RemoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="modal-content">
            <h3>Данные карточки</h3>
            {selectedCard && (
              <div>
                <p>ID: {selectedCard.id}</p>
                <p>Название: {selectedCard.title}</p>
              </div>
            )}
          </div>
        </RemoteModal>
      </div>
    </div>
  );
}

export default ImagePopup;