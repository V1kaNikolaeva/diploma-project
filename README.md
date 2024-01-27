# Запуск 
Зависимости
Для начала нужно настроить виртуальное окружение. Для его установки в корне проекта ввести команды
```
pip install virtualenv
```
```
python -m venv env 
```
Затем активировать
```
.\env\scripts\activate   
```
После активации установить зависимости
```
pip install -r requirements.txt
```
В директории backend запустить сервер
```
python manage.py runserver
```
Затем перейти в директорию frontend и установить node_modules
```
npm install
```
И запустить сервер
```
npm run dev
```
Перейти по ссылке localhost