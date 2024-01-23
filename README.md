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
Затем перейти в директорию frontend и установить node_modules
```
npm install
```
