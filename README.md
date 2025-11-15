
# OAuth2 Authentication Service



```bash
# Клонувати та встановити залежності
git clone <посилання-на-репозиторій>
cd oauth2-service
npm install

# Запустити сервер
npm start

 Приклади запитів (їх можна одразу використати)

 Отримання токенів

User токен:
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "password": "password"}'

Admin токен:
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

 Збережіть токен з відповіді для наступних запитів!

 Тестування доступу до профілю

Без токена (має бути 401):
curl http://localhost:3000/profile

З токеном (має бути 200):
curl http://localhost:3000/profile \
  -H "Authorization: Bearer ВСТАВТЕ_ВАШ_ТОКЕН_ТУТ"

Тестування ролей

User намагається видалити (має бути 403):
curl -X DELETE http://localhost:3000/users/123 \
  -H "Authorization: Bearer USER_ТОКЕН"

Admin видаляє (має бути 200):
curl -X DELETE http://localhost:3000/users/123 \
  -H "Authorization: Bearer ADMIN_ТОКЕН"

 Тестові обліковкі

· User: user / password
· Admin: admin / admin123

 Docker запуск
docker-compose up
# або
docker run -p 3000:3000 oauth2-app



Сервер працює на: http://localhost:3000

Тепер можна просто:
1. Скопіювати будь-який запит
2. Вставити в термінал  
3. Замінити `ВСТАВТЕ_ВАШ_ТОКЕН_ТУТ` на реальний токен
4. Виконати! 
