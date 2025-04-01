import React, { useState, useEffect } from 'react';

function ImagePopup({ card, onClose }) {
  const [RemoteModal, setRemoteModal] = useState(null);
  const [loading, setLoading] = useState(true); // Состояние загрузки модуля
  const [error, setError] = useState(null); // Состояние ошибки загрузки

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

  // Если модуль загружается, показываем индикатор
  if (loading) {
    return <div>Загрузка модального окна...</div>;
  }

  // Если произошла ошибка, показываем её
  if (error) {
    return <div>Ошибка загрузки: {error.message}</div>;
  }

  // Если модуль не загружен, уведомляем об этом
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
          isOpen={!!card} // Открываем модальное окно, если card передан
          onClose={onClose} // Передаём функцию закрытия из пропсов
        >
          <div className="modal-content">
            <h3>Данные карточки</h3>
            {card ? (
              <div>
                <p>ID владельца: {card.owner._id  || 'Нет ID'}</p>
                <p>Название: {card.name || 'Нет названия'}</p>
                <p>Ссылка: {card.link || 'Нет ссылки'}</p>
              </div>
            ) : (
              <p>Карточка не выбрана</p>
            )}
          </div>
        </RemoteModal>
      </div>
    </div>
  );
}

export default ImagePopup;