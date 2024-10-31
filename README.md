# Описание 
<p>Сайт позволяет вести учет своих доходов и расходов, смотреть свою статистику по годам, которая удобно отображена в разных графиках на выбор.<p/> 
<p>Свои расходы можно удобно сортировать по категории/месяцу/в общем, удалять, изменять. Так же есть компонент истории доходов (как модальное окно), где можно посмотреть дату и изменять или удалить доход.<p/> 
<p>Реализована адаптивная верстка всех макетов, валидация в формах. Статистика общего количества доходов и расходов в профиле, так же там есть небольшие настройки модальных окон.<p/> 
<p>Frontend общается с backend`ом с помощью api.<p/>


# Технологии
<h3>Frontend:</h3>
<li>vue 
<li>js, html, css
<li>pinia
<li>vue router
<li>axios
<li>vuelidate
<li>chart js, vue chart js
  
<h3>Backend:</h3>
<li>django 
<li>drf

# Запуск (Windows)
Для начала нужно настроить виртуальное окружение. Для его установки в корне проекта ввести команды
```
pip install virtualenv
```
```
python -m venv venv
```
Затем активировать
```
.\venv\scripts\activate   
```
После активации установить зависимости в директории backend
```
pip install -r requirements.txt
```
В директории backend запустить сервер
```
python manage.py runserver
```
Если возникает проблема с setuptools, то:
```
pip install --upgrade pippip install --force-reinstall -U setuptools
```
Затем перейти в директорию frontend и установить node_modules
```
npm install
```
И запустить сервер
```
npm run dev
```
Перейти по ссылке `http://localhost:5173/`
# Результат



https://github.com/user-attachments/assets/8a4875b2-036b-4dbe-aa7a-12758e375d6f


https://github.com/user-attachments/assets/8e95a7ed-a059-4fc0-a43b-1ad076cfaf41


