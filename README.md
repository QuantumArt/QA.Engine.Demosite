# Introduction 
Это демосайт для презентации возможностей виджетной платформы на базе .net core.

# Getting Started
Проект с сайтом - QA.DemoSite
Он может работать с QP как MSSQL, так и Postgre, в зависимости от настройки в appsettings.json.
С этим связана особенность, что в проекте есть одновременно 2 проекта DAL: один для базы MSSQL, другой - Postgre.
Для автогенерации кода кештегов QP используется CacheTags.tt, в нём прописана строка подключения к MSSQL базе.
Основные dependency проекта, помимо пакетов Microsoft
- QP8.EntityFrameworkCore (генерация контекстов EF.Core по маппингам QP)
- QA.DotNetCore.Engine.* (виджетная платформа)
