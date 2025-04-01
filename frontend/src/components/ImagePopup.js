import React, { useState, useEffect } from 'react';

function ImagePopup({ card, onClose }) {
  const [RemoteModal, setRemoteModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
  const [error, setError] = useState(null); // Добавляем состояние ошибки

  useEffect(() => {
    console.log('useEffect срабатывает, пытаюсь загрузить remoteModal/Modal_place');
    setLoading(true);
    import('remoteModal/Modal_place')
      .then((module) => {
        console.log('Модуль успешно загружен:', module.default);
        setRemoteModal(() => module.default);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки remoteModal/Modal_place:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // Обновляем состояние модального окна и выбранной карточки на основе пропса card
  useEffect(() => {
    if (card) {
      setIsModalOpen(true);
      setSelectedCard(card); // Используем card как selectedCard
    } else {
      setIsModalOpen(false);
      setSelectedCard(null);
    }
  }, [card]);

  if (loading) {
    return <div>Загрузка модального окна...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки: {error.message}</div>;
  }

  if (!RemoteModal) {
    return <div>Модуль RemoteModal не загружен</div>;
  }

  return (
    <div className={`popup popup_type_image ${card ? 'popup_is-opened' : ''}`}>
      <div className="popup__content popup__content_content_image">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img
          alt={card ? card.name : ''}
          src={card ? card.link : ''}
          className="popup__image"
        />
        <p className="popup__caption">{card ? card.name : ''}</p>
        <RemoteModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            onClose(); // Закрываем popup при закрытии модального окна
          }}
        >
          <div className="modal-content">
            <h3>Данные карточки</h3>
            {selectedCard && (
              <div>
                <p>ID: {selectedCard.id || 'Нет ID'}</p>
                <p>Название: {selectedCard.name || selectedCard.title || 'Нет названия'}</p>
              </div>
            )}
          </div>
        </RemoteModal>
      </div>
    </div>
  );
}

export default ImagePopup;