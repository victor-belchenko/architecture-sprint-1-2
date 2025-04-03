import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'; // Добавляем useState
import Modal_place from './Modal_place'; // Импортируем компонент модального окна

function App() {
  // Состояние для управления видимостью модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функции для открытия/закрытия модального окна
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        {/* Кнопка для открытия модального окна */}
        <button 
          className="modal-trigger"
          onClick={openModal}
        >
          Открыть модальное окно
        </button>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* Модальное окно */}
        <Modal_place 
          isOpen={isModalOpen} 
          onClose={closeModal}
        >
          {/* Дочерний контент модального окна */}
          <div className="modal-content">
            <h3>Информация о месте</h3>
            <p>Здесь может быть подробное описание выбранного места.</p>
            <p>Можно добавить любые React-элементы.</p>
          </div>
        </Modal_place>
      </header>
    </div>
  );
}

export default App;