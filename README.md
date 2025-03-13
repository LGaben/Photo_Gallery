# Photo Gallery Web Application
Портфолио для фотографа

Это веб-приложение было сделано как портфолио для фотографа. https://alexandrafilina-photographer.ru/
Приложение состоит из двух основных частей: бэкенд на Django REST Framework для управления данными и API,
а также фронтенд на React/Vite для интерактивного пользовательского интерфейса.
Проект был успешно контейнеризирован с использованием Docker Compose, что обеспечивает легкую развертываемость и масштабируемость.
А так же был настроен CI/CD/.

![screenshot](https://github.com/LGaben/Photo_Gallery/blob/main/docs/screenshot.gif)

### **Используемые технологии**

- **Backend:** Django, Django REST Framework, PostgreSQL
- **Frontend:** React, Vite, TailwindCSS
- **Инфраструктура:** Docker, Nginx, gunicorn
- **Дополнительные инструменты:** Axios, Framer Motion, Swiper для React

### Как запустить проект на сервере:

    Установить на сервере docker и docker-compose.
    Создать в конре папку Photo_Gallery.
    Скопировать в Photo_Gallery файл docker-compose.production.yml.
    В Photo_Gallery создать папку nginx и скопировать в нее файл nginx.conf.
    Отредактируйте файл nginx.conf заменив на свой домен.
    В nginx создать папку ssl.
    Установите Certbot. 
    ```sudo apt update
    sudo apt install certbot -y```
    Получите сертификаты для вашего домена:
    ```sudo certbot certonly --standalone -d your-domain.com```
    Замените ```your-domain.com``` на ваш реальный домен.
    Скопируйте сертификаты в папку ssl:
    ```
    cp /etc/letsencrypt/live/alexandrafilina-photographer.ru/fullchain.pem ./nginx/ssl/cert.pem
    cp /etc/letsencrypt/live/alexandrafilina-photographer.ru/privkey.pem ./nginx/ssl/key.pem
    ```
    Создайте файл .env по примеру в .env.exampl
    
    Должна получиться следущая структура:
    ``` Photo_Gallery
        ├── .env
        ├── docker-compose.production.yml
        └── nginx
            ├── ssl
            │   ├── cert.pem
            │   └── key.pem
            └── nginx.conf```
    Добавить в Secrets на Github следующие данные:

    ```
    DOCKER_PASSWORD # Пароль от аккаунта на DockerHub
    DOCKER_USERNAME # Username в аккаунте на DockerHub
    HOST # IP удалённого сервера
    USER # Логин на удалённом сервере
    SSH_KEY # SSH-key компьютера, с которого будет происходить подключение к удалённому серверу
    SSH_PASSPHRASE #Если для ssh используется фраза-пароль
    TELEGRAM_TO #ID пользователя в Telegram
    TELEGRAM_TOKEN #токен бота в Telegram

    Выполнить команды:

    *   git add .
    *   git commit -m "*комментарий*"
    *   git push

    Далее будут запущены процессы workflow:
    *   сборка и доставка докер-образа для контейнера web на Docker Hub
    *   автоматический деплой проекта на боевой сервер
    *   отправка уведомления в Telegram о том, что процесс деплоя успешно завершился

    Cоздайте супер пользователя:

    ```sudo docker-compose exec web python manage.py createsuperuser```


    ### Автор проекта

    **Филин Иван.**
