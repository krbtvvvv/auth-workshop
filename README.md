Проблема з різним шрифтом та дивними символами виникає через копіювання тексту з різних джерел або неправильне кодування.

Ось чистий, правильний README.md:
# OAuth2 Authentication Service

## Зміст
- [Локальний запуск](#локальний-запуск)
- [Запуск через Docker](#запуск-через-docker)
- [Приклади запитів](#приклади-запитів)
- [Тестові облікові дані](#тестові-облікові-дані)

## Локальний запуск

### 1. Клонування та встановлення залежностей
```bash
git clone <посилання-на-репозиторій>
cd oauth2-service
npm install

2. Налаштування змінних оточення

Створіть файл .env у корені проекту:
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_PASSWORD=admin123
USER_PASSWORD=password

3. Запуск сервера
# Режим розробки
npm run dev

# Або продакшн режим
npm start

Запуск через Docker

Варіант 1: Без docker-compose
docker build -t oauth2-app .
docker run -p 3000:3000 oauth2-app

Варіант 2: З docker-compose
docker-compose up

Приклади запитів

Автентифікація

Успішний login для user
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "password": "password"}'

Успішний login для admin
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

Доступ до захищених ресурсів

Запит профілю без токена (401 Unauthorized)
curl http://localhost:3000/profile

Запит профілю з токеном (200 OK)
curl http://localhost:3000/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"

Тестування рівнів доступу

DELETE запит з токеном user (403 Forbidden)
curl -X DELETE http://localhost:3000/users/123 \
  -H "Authorization: Bearer USER_ACCESS_TOKEN_HERE"

DELETE запит з токеном admin (200 OK)
curl -X DELETE http://localhost:3000/users/123 \
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN_HERE"

Тестові облікові дані

Роль Логін Пароль
User user password
Admin admin admin123

Сервер доступний за адресою: http://localhost:3000
