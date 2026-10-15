"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "ua", label: "UA", name: "Українська" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "pl", label: "PL", name: "Polski" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "es", label: "ES", name: "Español" },
] as const;

export type LangCode = (typeof languages)[number]["code"];

const en = {
  "nav.explore": "Explore",
  "nav.how": "How it works",
  "nav.browse": "Browse resources",
  "nav.resources": "Resources",
  "nav.about": "About",

  "hero.eyebrow": "THE COMMUNITY RESOURCE HUB",
  "hero.title1": "Build something",
  "hero.title2": "extraordinary.",
  "hero.copy":
    "Discover scripts, models, and UI kits made for your next Roblox project. Find your next starting point.",
  "hero.cta": "Explore resources",
  "hero.note": "Curated resources. New ideas. More possibilities.",

  "catalog.kicker": "THE LIBRARY",
  "catalog.title": "Explore resources",
  "catalog.subtitle": "Useful building blocks for your next creation.",
  "catalog.count": "resources",
  "catalog.all": "All resources",
  "catalog.scripts": "Scripts",
  "catalog.models": "Models",
  "catalog.ui": "UI",
  "catalog.search": "Search resources...",
  "catalog.view": "View resource",
  "catalog.empty.title": "No resources found",
  "catalog.empty.text": "Try another search or choose a different category.",
  "catalog.empty.clear": "Clear filters",

  "how.kicker": "SIMPLE BY DESIGN",
  "how.title": "From discovery to download",
  "how.subtitle": "A straightforward path to the resources you need.",
  "how.s1.title": "Find your resource",
  "how.s1.text": "Explore the library and choose a script, model, or UI kit.",
  "how.s2.title": "Complete the steps",
  "how.s2.text": "Follow the access requirements shown on the resource page.",
  "how.s3.title": "Get your access",
  "how.s3.text": "Unlock an available download or receive your access key.",

  "footer.tagline": "A hub for your next idea.",
  "footer.copy": "© {year} NoNameHub",
  "footer.product": "Product",
  "footer.company": "Company",
  "footer.legal": "Legal",
  "footer.allResources": "All resources",
  "footer.about": "About",
  "footer.terms": "Terms of Service",
  "footer.privacy": "Privacy Policy",

  "notfound.kicker": "ERROR / 404",
  "notfound.title": "Page not found",
  "notfound.text":
    "Looks like this page got lost somewhere between dimensions of Roblox Studio. The link may be outdated or the resource was removed.",
  "notfound.home": "← Back to home",
  "notfound.catalog": "Browse resources",
  "notfound.code": "Code",
  "notfound.status": "Status",
  "notfound.tip": "Tip",
  "notfound.statusValue": "Not found",
  "notfound.tipValue": "Try again",

  "error.kicker": "RUNTIME / ERROR",
  "error.title": "Something went wrong",
  "error.text":
    "An error occurred while loading this page. Try refreshing or go back to the catalog.",
  "error.code": "Error code:",
  "error.retry": "↻ Try again",
  "error.home": "← Back to home",

  "resources.back": "← Back to catalog",
  "resources.kicker": "THE LIBRARY",
  "resources.title": "All resources",
  "resources.subtitle":
    "Useful building blocks for your next Roblox Studio project.",
  "resources.open": "Open",
  "resources.empty.title": "No resources yet",
  "resources.empty.text":
    "The catalog is empty for now. New scripts and models will appear here soon.",

  "about.back": "← Back to catalog",
  "about.kicker": "ABOUT / NONAMEHUB",
  "about.title": "Resource hub for Roblox.",
  "about.text":
    "NoNameHub is a community project with useful scripts, models, and UI kits for Roblox Studio developers.",
  "about.resources": "Resources",
  "about.categories": "Categories",
  "about.price": "Price",
  "about.free": "Free",
  "about.cta.title": "Looking for something specific?",
  "about.cta.text":
    "Browse the full catalog and find the building blocks you need.",
  "about.cta.button": "Browse catalog →",

  "resource.back": "← Back to catalog",
  "resource.version": "Version",
  "resource.steps": "Access steps",
  "resource.price": "Price",
  "resource.free": "Free",
  "resource.access.title": "Getting access",
  "resource.access.text":
    "Complete a quick step to receive your personal access key. Keep it safe — you'll need it to use the resource.",
  "resource.similar": "Similar resources",
  "resource.getKey": "Get key",
  "resource.getKeyHint":
    "You'll be redirected to complete a quick step. Then come back and press 'Already watched' to see your key.",
  "resource.keyLabel": "YOUR KEY",
  "resource.copy": "Copy",
  "resource.copied": "Copied!",
  "resource.alreadyWatched": "Already watched? Show key",
  "resource.loadingKey": "Loading...",
  "resource.keyError": "Couldn't load the key. Try again.",
  "resource.err.workerDown":
    "The key server is currently unavailable. Please try again later.",
  "resource.err.rateLimited":
    "Too many requests. Wait a minute and try again.",
  "resource.err.notFound": "Resource not found.",
  "resource.err.notConfigured":
    "Server configuration error. Contact the administrator.",
  "resource.err.network":
    "Network error. Check your connection and try again.",

  "adblock.title": "Ad blocker detected",
  "adblock.text":
    "Please disable your ad blocker to unlock this resource. Ads are what keep NoNameHub free.",
  "adblock.how":
    "Turn off any ad-blocking extensions (uBlock, AdBlock Plus, Brave Shields) and reload the page.",

  "terms.kicker": "LEGAL",
  "terms.title": "Terms of Service",
  "terms.updated": "Last updated: October 2025",
  "terms.intro":
    "By using NoNameHub, you agree to these terms. Please read them carefully.",
  "terms.s1.title": "Use of resources",
  "terms.s1.text":
    "All resources on NoNameHub are provided as-is for educational and development purposes. You are responsible for how you use them in your own projects.",
  "terms.s2.title": "User responsibility",
  "terms.s2.text":
    "You confirm that your use of any resource does not violate any laws or third-party rights.",
  "terms.s3.title": "Limitation of liability",
  "terms.s3.text":
    "NoNameHub is not responsible for any damage or loss resulting from the use of resources available on the site.",
  "terms.s4.title": "Changes to terms",
  "terms.s4.text":
    "We may update these terms from time to time. Continued use of the site means you accept the updated terms.",

  "privacy.kicker": "LEGAL",
  "privacy.title": "Privacy Policy",
  "privacy.updated": "Last updated: October 2025",
  "privacy.intro":
    "Your privacy matters to us. This policy explains what data we collect and how we use it.",
  "privacy.s1.title": "Data we collect",
  "privacy.s1.text":
    "We only collect the information you provide directly — such as your email if you choose to contact us.",
  "privacy.s2.title": "How we use your data",
  "privacy.s2.text":
    "Your data is used solely to respond to your messages. We do not sell or rent your data to third parties.",
  "privacy.s3.title": "Cookies",
  "privacy.s3.text":
    "We use minimal local storage (such as language preference) to improve your experience. No third-party tracking cookies are used.",
  "privacy.s4.title": "Your rights",
  "privacy.s4.text":
    "You can request access, correction, or deletion of your personal data at any time.",
};

type Dict = typeof en;

const ua: Dict = {
  "nav.explore": "Огляд",
  "nav.how": "Як це працює",
  "nav.browse": "До ресурсів",
  "nav.resources": "Ресурси",
  "nav.about": "Про нас",

  "hero.eyebrow": "ХАБ РЕСУРСІВ СПІЛЬНОТИ",
  "hero.title1": "Створи щось",
  "hero.title2": "неймовірне.",
  "hero.copy":
    "Знаходь скрипти, моделі та UI-кіти для свого наступного проєкту в Roblox. Обери свою відправну точку.",
  "hero.cta": "Дивитись ресурси",
  "hero.note": "Дібрані ресурси. Нові ідеї. Більше можливостей.",

  "catalog.kicker": "БІБЛІОТЕКА",
  "catalog.title": "Оглянь ресурси",
  "catalog.subtitle": "Корисні будівельні блоки для твоєї наступної роботи.",
  "catalog.count": "ресурсів",
  "catalog.all": "Усі ресурси",
  "catalog.scripts": "Скрипти",
  "catalog.models": "Моделі",
  "catalog.ui": "UI",
  "catalog.search": "Пошук ресурсів...",
  "catalog.view": "Відкрити ресурс",
  "catalog.empty.title": "Ресурсів не знайдено",
  "catalog.empty.text": "Спробуй інший пошук або вибери іншу категорію.",
  "catalog.empty.clear": "Скинути фільтри",

  "how.kicker": "ПРОСТО ЗА ЗАДУМОМ",
  "how.title": "Від пошуку до завантаження",
  "how.subtitle": "Прямий шлях до потрібних ресурсів.",
  "how.s1.title": "Знайди свій ресурс",
  "how.s1.text": "Переглянь бібліотеку та вибери скрипт, модель або UI-кіт.",
  "how.s2.title": "Пройди кроки",
  "how.s2.text": "Виконай умови доступу, вказані на сторінці ресурсу.",
  "how.s3.title": "Отримай доступ",
  "how.s3.text": "Відкрий завантаження або отримай персональний ключ.",

  "footer.tagline": "Хаб для твоєї наступної ідеї.",
  "footer.copy": "© {year} NoNameHub",
  "footer.product": "Продукт",
  "footer.company": "Компанія",
  "footer.legal": "Правове",
  "footer.allResources": "Усі ресурси",
  "footer.about": "Про нас",
  "footer.terms": "Умови використання",
  "footer.privacy": "Політика конфіденційності",

  "notfound.kicker": "ПОМИЛКА / 404",
  "notfound.title": "Сторінку не знайдено",
  "notfound.text":
    "Схоже, ця сторінка загубилась десь між вимірами Roblox Studio. Можливо, посилання застаріле або ресурс видалено.",
  "notfound.home": "← На головну",
  "notfound.catalog": "До каталогу ресурсів",
  "notfound.code": "Код",
  "notfound.status": "Статус",
  "notfound.tip": "Порада",
  "notfound.statusValue": "Не знайдено",
  "notfound.tipValue": "Спробуй ще",

  "error.kicker": "ПОМИЛКА / RUNTIME",
  "error.title": "Щось пішло не так",
  "error.text":
    "Під час завантаження сторінки сталася помилка. Спробуй оновити сторінку або повернутися до каталогу.",
  "error.code": "Код помилки:",
  "error.retry": "↻ Спробувати ще раз",
  "error.home": "← На головну",

  "resources.back": "← Назад до каталогу",
  "resources.kicker": "БІБЛІОТЕКА",
  "resources.title": "Усі ресурси",
  "resources.subtitle":
    "Корисні будівельні блоки для твого наступного проєкту в Roblox Studio.",
  "resources.open": "Відкрити",
  "resources.empty.title": "Ресурсів поки немає",
  "resources.empty.text":
    "Каталог наразі порожній. Нові скрипти та моделі з'являться тут найближчим часом.",

  "about.back": "← Назад до каталогу",
  "about.kicker": "ПРО ПРОЄКТ / NONAMEHUB",
  "about.title": "Хаб ресурсів для Roblox.",
  "about.text":
    "NoNameHub — це спільнотний проєкт, у якому зібрані корисні скрипти, моделі та UI-кіти для розробників Roblox Studio.",
  "about.resources": "Ресурсів",
  "about.categories": "Категорій",
  "about.price": "Ціна",
  "about.free": "Безкоштовно",
  "about.cta.title": "Шукаєш щось конкретне?",
  "about.cta.text":
    "Переглянь повний каталог і знайди потрібні тобі будівельні блоки.",
  "about.cta.button": "Переглянути каталог →",

  "resource.back": "← Назад до каталогу",
  "resource.version": "Версія",
  "resource.steps": "Етапи доступу",
  "resource.price": "Ціна",
  "resource.free": "Безкоштовно",
  "resource.access.title": "Отримання доступу",
  "resource.access.text":
    "Пройди короткий крок, щоб отримати персональний ключ доступу. Збережи його — він знадобиться для використання ресурсу.",
  "resource.similar": "Схожі ресурси",
  "resource.getKey": "Отримати ключ",
  "resource.getKeyHint":
    "Тебе буде перенаправлено на короткий крок. Потім повернись і натисни «Вже переглянув», щоб побачити ключ.",
  "resource.keyLabel": "ТВІЙ КЛЮЧ",
  "resource.copy": "Копіювати",
  "resource.copied": "Скопійовано!",
  "resource.alreadyWatched": "Вже переглянув? Показати ключ",
  "resource.loadingKey": "Завантаження...",
  "resource.keyError": "Не вдалося завантажити ключ. Спробуй ще.",
  "resource.err.workerDown":
    "Сервер ключів зараз недоступний. Спробуй пізніше.",
  "resource.err.rateLimited":
    "Забагато запитів. Зачекай хвилину і спробуй знову.",
  "resource.err.notFound": "Ресурс не знайдено.",
  "resource.err.notConfigured":
    "Помилка конфігурації сервера. Звернись до адміністратора.",
  "resource.err.network":
    "Помилка мережі. Перевір з'єднання і спробуй ще.",

  "adblock.title": "Виявлено блокувальник реклами",
  "adblock.text":
    "Будь ласка, вимкни блокувальник реклами, щоб розблокувати цей ресурс. Саме реклама тримає NoNameHub безкоштовним.",
  "adblock.how":
    "Вимкни розширення (uBlock, AdBlock Plus, Brave Shields) і перезавантаж сторінку.",

  "terms.kicker": "ПРАВОВЕ",
  "terms.title": "Умови використання",
  "terms.updated": "Оновлено: жовтень 2025",
  "terms.intro":
    "Користуючись NoNameHub, ти погоджуєшся з цими умовами. Будь ласка, прочитай їх уважно.",
  "terms.s1.title": "Використання ресурсів",
  "terms.s1.text":
    "Усі ресурси на NoNameHub надаються «як є» для освітніх і розробницьких цілей. Ти самостійно відповідаєш за їх використання у своїх проєктах.",
  "terms.s2.title": "Відповідальність користувача",
  "terms.s2.text":
    "Ти підтверджуєш, що твоє використання будь-якого ресурсу не порушує закони чи права третіх осіб.",
  "terms.s3.title": "Обмеження відповідальності",
  "terms.s3.text":
    "NoNameHub не несе відповідальності за будь-які збитки чи втрати, спричинені використанням ресурсів сайту.",
  "terms.s4.title": "Зміни до умов",
  "terms.s4.text":
    "Ми можемо час від часу оновлювати ці умови. Подальше користування сайтом означає згоду з оновленими умовами.",

  "privacy.kicker": "ПРАВОВЕ",
  "privacy.title": "Політика конфіденційності",
  "privacy.updated": "Оновлено: жовтень 2025",
  "privacy.intro":
    "Твоя приватність для нас важлива. Ця політика пояснює, які дані ми збираємо та як їх використовуємо.",
  "privacy.s1.title": "Які дані ми збираємо",
  "privacy.s1.text":
    "Ми збираємо лише інформацію, яку ти надаєш безпосередньо — наприклад, email, якщо ти вирішиш зв'язатися з нами.",
  "privacy.s2.title": "Як ми використовуємо дані",
  "privacy.s2.text":
    "Дані використовуються виключно для відповіді на твої повідомлення. Ми не продаємо і не передаємо їх третім особам.",
  "privacy.s3.title": "Cookies",
  "privacy.s3.text":
    "Ми використовуємо мінімальне локальне сховище (наприклад, вибір мови). Сторонні трекінгові cookies не використовуються.",
  "privacy.s4.title": "Твої права",
  "privacy.s4.text":
    "Ти можеш у будь-який момент запросити доступ, виправлення або видалення своїх персональних даних.",
};

const ru: Dict = {
  "nav.explore": "Обзор",
  "nav.how": "Как это работает",
  "nav.browse": "К ресурсам",
  "nav.resources": "Ресурсы",
  "nav.about": "О нас",

  "hero.eyebrow": "ХАБ РЕСУРСОВ СООБЩЕСТВА",
  "hero.title1": "Создай что-то",
  "hero.title2": "невероятное.",
  "hero.copy":
    "Находи скрипты, модели и UI-киты для своего следующего проекта в Roblox. Выбери свою отправную точку.",
  "hero.cta": "Смотреть ресурсы",
  "hero.note": "Отобранные ресурсы. Новые идеи. Больше возможностей.",

  "catalog.kicker": "БИБЛИОТЕКА",
  "catalog.title": "Изучи ресурсы",
  "catalog.subtitle": "Полезные строительные блоки для твоей следующей работы.",
  "catalog.count": "ресурсов",
  "catalog.all": "Все ресурсы",
  "catalog.scripts": "Скрипты",
  "catalog.models": "Модели",
  "catalog.ui": "UI",
  "catalog.search": "Поиск ресурсов...",
  "catalog.view": "Открыть ресурс",
  "catalog.empty.title": "Ресурсы не найдены",
  "catalog.empty.text": "Попробуй другой поиск или выбери другую категорию.",
  "catalog.empty.clear": "Сбросить фильтры",

  "how.kicker": "ПРОСТО ПО ЗАДУМКЕ",
  "how.title": "От поиска до загрузки",
  "how.subtitle": "Прямой путь к нужным ресурсам.",
  "how.s1.title": "Найди свой ресурс",
  "how.s1.text": "Просмотри библиотеку и выбери скрипт, модель или UI-кит.",
  "how.s2.title": "Пройди шаги",
  "how.s2.text": "Выполни условия доступа, указанные на странице ресурса.",
  "how.s3.title": "Получи доступ",
  "how.s3.text": "Открой загрузку или получи персональный ключ.",

  "footer.tagline": "Хаб для твоей следующей идеи.",
  "footer.copy": "© {year} NoNameHub",
  "footer.product": "Продукт",
  "footer.company": "Компания",
  "footer.legal": "Правовое",
  "footer.allResources": "Все ресурсы",
  "footer.about": "О нас",
  "footer.terms": "Условия использования",
  "footer.privacy": "Политика конфиденциальности",

  "notfound.kicker": "ОШИБКА / 404",
  "notfound.title": "Страница не найдена",
  "notfound.text":
    "Похоже, эта страница потерялась где-то между измерениями Roblox Studio. Возможно, ссылка устарела.",
  "notfound.home": "← На главную",
  "notfound.catalog": "К каталогу ресурсов",
  "notfound.code": "Код",
  "notfound.status": "Статус",
  "notfound.tip": "Совет",
  "notfound.statusValue": "Не найдено",
  "notfound.tipValue": "Попробуй ещё",

  "error.kicker": "ОШИБКА / RUNTIME",
  "error.title": "Что-то пошло не так",
  "error.text":
    "При загрузке страницы произошла ошибка. Попробуй обновить или вернуться в каталог.",
  "error.code": "Код ошибки:",
  "error.retry": "↻ Попробовать снова",
  "error.home": "← На главную",

  "resources.back": "← Назад в каталог",
  "resources.kicker": "БИБЛИОТЕКА",
  "resources.title": "Все ресурсы",
  "resources.subtitle":
    "Полезные строительные блоки для твоего следующего проекта в Roblox Studio.",
  "resources.open": "Открыть",
  "resources.empty.title": "Ресурсов пока нет",
  "resources.empty.text":
    "Каталог пока пуст. Новые скрипты и модели появятся здесь скоро.",

  "about.back": "← Назад в каталог",
  "about.kicker": "О ПРОЕКТЕ / NONAMEHUB",
  "about.title": "Хаб ресурсов для Roblox.",
  "about.text":
    "NoNameHub — сообщный проект с полезными скриптами, моделями и UI-китами для разработчиков Roblox Studio.",
  "about.resources": "Ресурсов",
  "about.categories": "Категорий",
  "about.price": "Цена",
  "about.free": "Бесплатно",
  "about.cta.title": "Ищешь что-то конкретное?",
  "about.cta.text":
    "Просмотри полный каталог и найди нужные тебе строительные блоки.",
  "about.cta.button": "Открыть каталог →",

  "resource.back": "← Назад в каталог",
  "resource.version": "Версия",
  "resource.steps": "Этапы доступа",
  "resource.price": "Цена",
  "resource.free": "Бесплатно",
  "resource.access.title": "Получение доступа",
  "resource.access.text":
    "Пройди короткий шаг, чтобы получить персональный ключ доступа. Сохрани его — он понадобится для использования ресурса.",
  "resource.similar": "Похожие ресурсы",
  "resource.getKey": "Получить ключ",
  "resource.getKeyHint":
    "Ты будешь перенаправлен на короткий шаг. Потом вернись и нажми «Уже посмотрел», чтобы увидеть ключ.",
  "resource.keyLabel": "ТВОЙ КЛЮЧ",
  "resource.copy": "Копировать",
  "resource.copied": "Скопировано!",
  "resource.alreadyWatched": "Уже посмотрел? Показать ключ",
  "resource.loadingKey": "Загрузка...",
  "resource.keyError": "Не удалось загрузить ключ. Попробуй ещё.",
  "resource.err.workerDown":
    "Сервер ключей сейчас недоступен. Попробуй позже.",
  "resource.err.rateLimited":
    "Слишком много запросов. Подожди минуту и попробуй снова.",
  "resource.err.notFound": "Ресурс не найден.",
  "resource.err.notConfigured":
    "Ошибка конфигурации сервера. Обратись к администратору.",
  "resource.err.network":
    "Ошибка сети. Проверь соединение и попробуй ещё.",

  "adblock.title": "Обнаружен блокировщик рекламы",
  "adblock.text":
    "Пожалуйста, отключи блокировщик рекламы, чтобы разблокировать ресурс. Именно реклама держит NoNameHub бесплатным.",
  "adblock.how":
    "Отключи расширения (uBlock, AdBlock Plus, Brave Shields) и перезагрузи страницу.",

  "terms.kicker": "ПРАВОВОЕ",
  "terms.title": "Условия использования",
  "terms.updated": "Обновлено: октябрь 2025",
  "terms.intro":
    "Используя NoNameHub, ты соглашаешься с этими условиями. Пожалуйста, прочитай их внимательно.",
  "terms.s1.title": "Использование ресурсов",
  "terms.s1.text":
    "Все ресурсы на NoNameHub предоставляются «как есть» для образовательных и разработческих целей. Ты сам отвечаешь за их использование.",
  "terms.s2.title": "Ответственность пользователя",
  "terms.s2.text":
    "Ты подтверждаешь, что твоё использование любого ресурса не нарушает законы и права третьих лиц.",
  "terms.s3.title": "Ограничение ответственности",
  "terms.s3.text":
    "NoNameHub не несёт ответственности за ущерб или потери, вызванные использованием ресурсов сайта.",
  "terms.s4.title": "Изменения условий",
  "terms.s4.text":
    "Мы можем время от времени обновлять эти условия. Дальнейшее использование сайта означает согласие с обновлёнными условиями.",

  "privacy.kicker": "ПРАВОВОЕ",
  "privacy.title": "Политика конфиденциальности",
  "privacy.updated": "Обновлено: октябрь 2025",
  "privacy.intro":
    "Твоя приватность важна для нас. Эта политика объясняет, какие данные мы собираем и как их используем.",
  "privacy.s1.title": "Какие данные мы собираем",
  "privacy.s1.text":
    "Мы собираем только информацию, которую ты предоставляешь напрямую — например, email, если решишь связаться с нами.",
  "privacy.s2.title": "Как мы используем данные",
  "privacy.s2.text":
    "Данные используются исключительно для ответа на твои сообщения. Мы не продаём их третьим лицам.",
  "privacy.s3.title": "Cookies",
  "privacy.s3.text":
    "Мы используем минимальное локальное хранилище (например, выбор языка). Сторонние трекинговые cookies не используются.",
  "privacy.s4.title": "Твои права",
  "privacy.s4.text":
    "Ты можешь в любой момент запросить доступ, исправление или удаление своих персональных данных.",
};

const pl: Dict = {
  "nav.explore": "Przeglądaj",
  "nav.how": "Jak to działa",
  "nav.browse": "Zasoby",
  "nav.resources": "Zasoby",
  "nav.about": "O nas",

  "hero.eyebrow": "HUB ZASOBÓW SPOŁECZNOŚCI",
  "hero.title1": "Zbuduj coś",
  "hero.title2": "wyjątkowego.",
  "hero.copy":
    "Odkrywaj skrypty, modele i zestawy UI dla swojego kolejnego projektu w Roblox.",
  "hero.cta": "Przeglądaj zasoby",
  "hero.note": "Wyselekcjonowane zasoby. Nowe pomysły. Więcej możliwości.",

  "catalog.kicker": "BIBLIOTEKA",
  "catalog.title": "Przeglądaj zasoby",
  "catalog.subtitle": "Przydatne klocki do twojej kolejnej pracy.",
  "catalog.count": "zasobów",
  "catalog.all": "Wszystkie",
  "catalog.scripts": "Skrypty",
  "catalog.models": "Modele",
  "catalog.ui": "UI",
  "catalog.search": "Szukaj zasobów...",
  "catalog.view": "Otwórz zasób",
  "catalog.empty.title": "Nie znaleziono zasobów",
  "catalog.empty.text": "Spróbuj innego wyszukiwania lub wybierz inną kategorię.",
  "catalog.empty.clear": "Wyczyść filtry",

  "how.kicker": "PROSTO Z ZAŁOŻENIA",
  "how.title": "Od odkrycia do pobrania",
  "how.subtitle": "Prosta droga do potrzebnych zasobów.",
  "how.s1.title": "Znajdź zasób",
  "how.s1.text": "Przejrzyj bibliotekę i wybierz skrypt, model lub UI.",
  "how.s2.title": "Wykonaj kroki",
  "how.s2.text": "Spełnij warunki dostępu na stronie zasobu.",
  "how.s3.title": "Odbierz dostęp",
  "how.s3.text": "Odblokuj pobieranie lub odbierz osobisty klucz.",

  "footer.tagline": "Hub dla twojego kolejnego pomysłu.",
  "footer.copy": "© {year} NoNameHub",
  "footer.product": "Produkt",
  "footer.company": "Firma",
  "footer.legal": "Prawne",
  "footer.allResources": "Wszystkie zasoby",
  "footer.about": "O nas",
  "footer.terms": "Regulamin",
  "footer.privacy": "Polityka prywatności",

  "notfound.kicker": "BŁĄD / 404",
  "notfound.title": "Nie znaleziono strony",
  "notfound.text":
    "Wygląda na to, że ta strona zgubiła się między wymiarami Roblox Studio.",
  "notfound.home": "← Powrót do domu",
  "notfound.catalog": "Katalog zasobów",
  "notfound.code": "Kod",
  "notfound.status": "Status",
  "notfound.tip": "Wskazówka",
  "notfound.statusValue": "Nie znaleziono",
  "notfound.tipValue": "Spróbuj ponownie",

  "error.kicker": "BŁĄD / RUNTIME",
  "error.title": "Coś poszło nie tak",
  "error.text":
    "Wystąpił błąd podczas wczytywania strony. Odśwież lub wróć do katalogu.",
  "error.code": "Kod błędu:",
  "error.retry": "↻ Spróbuj ponownie",
  "error.home": "← Powrót do domu",

  "resources.back": "← Powrót do katalogu",
  "resources.kicker": "BIBLIOTEKA",
  "resources.title": "Wszystkie zasoby",
  "resources.subtitle":
    "Przydatne klocki do twojego kolejnego projektu w Roblox Studio.",
  "resources.open": "Otwórz",
  "resources.empty.title": "Brak zasobów",
  "resources.empty.text":
    "Katalog jest na razie pusty. Nowe skrypty i modele pojawią się wkrótce.",

  "about.back": "← Powrót do katalogu",
  "about.kicker": "O PROJEKCIE / NONAMEHUB",
  "about.title": "Hub zasobów dla Roblox.",
  "about.text":
    "NoNameHub to projekt społeczności z przydatnymi skryptami, modelami i zestawami UI dla twórców w Roblox Studio.",
  "about.resources": "Zasobów",
  "about.categories": "Kategorii",
  "about.price": "Cena",
  "about.free": "Za darmo",
  "about.cta.title": "Szukasz czegoś konkretnego?",
  "about.cta.text":
    "Przejrzyj pełny katalog i znajdź potrzebne klocki.",
  "about.cta.button": "Otwórz katalog →",

  "resource.back": "← Powrót do katalogu",
  "resource.version": "Wersja",
  "resource.steps": "Kroki dostępu",
  "resource.price": "Cena",
  "resource.free": "Za darmo",
  "resource.access.title": "Uzyskiwanie dostępu",
  "resource.access.text":
    "Wykonaj krótki krok, aby otrzymać osobisty klucz dostępu. Zachowaj go — będzie potrzebny do korzystania z zasobu.",
  "resource.similar": "Podobne zasoby",
  "resource.getKey": "Pobierz klucz",
  "resource.getKeyHint":
    "Zostaniesz przekierowany do krótkiego kroku. Potem wróć i kliknij „Już obejrzałem”, aby zobaczyć klucz.",
  "resource.keyLabel": "TWÓJ KLUCZ",
  "resource.copy": "Kopiuj",
  "resource.copied": "Skopiowano!",
  "resource.alreadyWatched": "Już obejrzałem? Pokaż klucz",
  "resource.loadingKey": "Ładowanie...",
  "resource.keyError": "Nie udało się załadować klucza. Spróbuj ponownie.",
  "resource.err.workerDown":
    "Serwer kluczy jest niedostępny. Spróbuj później.",
  "resource.err.rateLimited":
    "Zbyt wiele żądań. Poczekaj minutę i spróbuj ponownie.",
  "resource.err.notFound": "Nie znaleziono zasobu.",
  "resource.err.notConfigured":
    "Błąd konfiguracji serwera. Skontaktuj się z administratorem.",
  "resource.err.network":
    "Błąd sieci. Sprawdź połączenie i spróbuj ponownie.",

  "adblock.title": "Wykryto blokadę reklam",
  "adblock.text":
    "Wyłącz blokadę reklam, aby odblokować ten zasób. To reklamy utrzymują NoNameHub za darmo.",
  "adblock.how":
    "Wyłącz rozszerzenia (uBlock, AdBlock Plus, Brave Shields) i odśwież stronę.",

  "terms.kicker": "PRAWNE",
  "terms.title": "Regulamin",
  "terms.updated": "Zaktualizowano: październik 2025",
  "terms.intro":
    "Korzystając z NoNameHub, akceptujesz ten regulamin. Przeczytaj go uważnie.",
  "terms.s1.title": "Korzystanie z zasobów",
  "terms.s1.text":
    "Wszystkie zasoby na NoNameHub są udostępniane „tak jak są” do celów edukacyjnych i rozwojowych.",
  "terms.s2.title": "Odpowiedzialność użytkownika",
  "terms.s2.text":
    "Potwierdzasz, że korzystanie z zasobów nie narusza prawa ani praw osób trzecich.",
  "terms.s3.title": "Ograniczenie odpowiedzialności",
  "terms.s3.text":
    "NoNameHub nie odpowiada za szkody wynikające z korzystania z zasobów.",
  "terms.s4.title": "Zmiany regulaminu",
  "terms.s4.text":
    "Możemy od czasu do czasu aktualizować regulamin. Dalsze korzystanie oznacza akceptację.",

  "privacy.kicker": "PRAWNE",
  "privacy.title": "Polityka prywatności",
  "privacy.updated": "Zaktualizowano: październik 2025",
  "privacy.intro":
    "Twoja prywatność jest dla nas ważna. Ta polityka wyjaśnia, jakie dane zbieramy.",
  "privacy.s1.title": "Jakie dane zbieramy",
  "privacy.s1.text":
    "Zbieramy tylko informacje, które podajesz bezpośrednio — np. email, jeśli zdecydujesz się z nami skontaktować.",
  "privacy.s2.title": "Jak używamy danych",
  "privacy.s2.text":
    "Dane służą wyłącznie do odpowiedzi na twoje wiadomości. Nie sprzedajemy ich osobom trzecim.",
  "privacy.s3.title": "Cookies",
  "privacy.s3.text":
    "Używamy minimalnego magazynu lokalnego (np. preferencji języka). Nie stosujemy zewnętrznych cookies.",
  "privacy.s4.title": "Twoje prawa",
  "privacy.s4.text":
    "Możesz w każdej chwili poprosić o dostęp, poprawienie lub usunięcie swoich danych.",
};

const de: Dict = {
  "nav.explore": "Entdecken",
  "nav.how": "So funktioniert's",
  "nav.browse": "Ressourcen",
  "nav.resources": "Ressourcen",
  "nav.about": "Über uns",

  "hero.eyebrow": "DAS COMMUNITY-RESSOURCEN-HUB",
  "hero.title1": "Baue etwas",
  "hero.title2": "Außergewöhnliches.",
  "hero.copy":
    "Entdecke Skripte, Modelle und UI-Kits für dein nächstes Roblox-Projekt.",
  "hero.cta": "Ressourcen entdecken",
  "hero.note": "Kuratierte Ressourcen. Neue Ideen. Mehr Möglichkeiten.",

  "catalog.kicker": "DIE BIBLIOTHEK",
  "catalog.title": "Ressourcen entdecken",
  "catalog.subtitle": "Nützliche Bausteine für dein nächstes Projekt.",
  "catalog.count": "Ressourcen",
  "catalog.all": "Alle Ressourcen",
  "catalog.scripts": "Skripte",
  "catalog.models": "Modelle",
  "catalog.ui": "UI",
  "catalog.search": "Ressourcen suchen...",
  "catalog.view": "Ressource öffnen",
  "catalog.empty.title": "Keine Ressourcen gefunden",
  "catalog.empty.text": "Versuche eine andere Suche oder Kategorie.",
  "catalog.empty.clear": "Filter zurücksetzen",

  "how.kicker": "EINFACH VON GRUND AUF",
  "how.title": "Vom Fund zum Download",
  "how.subtitle": "Ein direkter Weg zu den Ressourcen, die du brauchst.",
  "how.s1.title": "Finde deine Ressource",
  "how.s1.text": "Durchsuche die Bibliothek und wähle Skript, Modell oder UI.",
  "how.s2.title": "Schritte abschließen",
  "how.s2.text": "Erfülle die Zugangsbedingungen auf der Ressourcenseite.",
  "how.s3.title": "Erhalte deinen Zugang",
  "how.s3.text": "Schalte den Download frei oder erhalte deinen Schlüssel.",

  "footer.tagline": "Ein Hub für deine nächste Idee.",
  "footer.copy": "© {year} NoNameHub",
  "footer.product": "Produkt",
  "footer.company": "Unternehmen",
  "footer.legal": "Rechtliches",
  "footer.allResources": "Alle Ressourcen",
  "footer.about": "Über uns",
  "footer.terms": "Nutzungsbedingungen",
  "footer.privacy": "Datenschutz",

  "notfound.kicker": "FEHLER / 404",
  "notfound.title": "Seite nicht gefunden",
  "notfound.text":
    "Diese Seite hat sich zwischen den Dimensionen von Roblox Studio verloren.",
  "notfound.home": "← Zur Startseite",
  "notfound.catalog": "Ressourcen durchsuchen",
  "notfound.code": "Code",
  "notfound.status": "Status",
  "notfound.tip": "Tipp",
  "notfound.statusValue": "Nicht gefunden",
  "notfound.tipValue": "Versuch es erneut",

  "error.kicker": "FEHLER / RUNTIME",
  "error.title": "Etwas ist schiefgelaufen",
  "error.text":
    "Beim Laden dieser Seite ist ein Fehler aufgetreten. Aktualisiere oder gehe zurück.",
  "error.code": "Fehlercode:",
  "error.retry": "↻ Erneut versuchen",
  "error.home": "← Zur Startseite",

  "resources.back": "← Zurück zum Katalog",
  "resources.kicker": "DIE BIBLIOTHEK",
  "resources.title": "Alle Ressourcen",
  "resources.subtitle":
    "Nützliche Bausteine für dein nächstes Roblox-Studio-Projekt.",
  "resources.open": "Öffnen",
  "resources.empty.title": "Noch keine Ressourcen",
  "resources.empty.text":
    "Der Katalog ist vorerst leer. Neue Skripte und Modelle erscheinen bald.",

  "about.back": "← Zurück zum Katalog",
  "about.kicker": "ÜBER / NONAMEHUB",
  "about.title": "Ressourcen-Hub für Roblox.",
  "about.text":
    "NoNameHub ist ein Community-Projekt mit nützlichen Skripten, Modellen und UI-Kits für Roblox-Studio-Entwickler.",
  "about.resources": "Ressourcen",
  "about.categories": "Kategorien",
  "about.price": "Preis",
  "about.free": "Kostenlos",
  "about.cta.title": "Suchst du etwas Bestimmtes?",
  "about.cta.text":
    "Durchsuche den vollständigen Katalog und finde die Bausteine, die du brauchst.",
  "about.cta.button": "Katalog öffnen →",

  "resource.back": "← Zurück zum Katalog",
  "resource.version": "Version",
  "resource.steps": "Zugangsschritte",
  "resource.price": "Preis",
  "resource.free": "Kostenlos",
  "resource.access.title": "Zugang erhalten",
  "resource.access.text":
    "Absolviere einen kurzen Schritt, um deinen persönlichen Zugangsschlüssel zu erhalten. Bewahre ihn sicher auf.",
  "resource.similar": "Ähnliche Ressourcen",
  "resource.getKey": "Schlüssel erhalten",
  "resource.getKeyHint":
    "Du wirst zu einem kurzen Schritt weitergeleitet. Komm dann zurück und klicke „Bereits angesehen“, um den Schlüssel zu sehen.",
  "resource.keyLabel": "DEIN SCHLÜSSEL",
  "resource.copy": "Kopieren",
  "resource.copied": "Kopiert!",
  "resource.alreadyWatched": "Bereits angesehen? Schlüssel zeigen",
  "resource.loadingKey": "Wird geladen...",
  "resource.keyError": "Schlüssel konnte nicht geladen werden.",
  "resource.err.workerDown":
    "Der Schlüsselserver ist derzeit nicht erreichbar. Versuche es später.",
  "resource.err.rateLimited":
    "Zu viele Anfragen. Warte eine Minute und versuche es erneut.",
  "resource.err.notFound": "Ressource nicht gefunden.",
  "resource.err.notConfigured":
    "Serverkonfigurationsfehler. Kontaktiere den Administrator.",
  "resource.err.network":
    "Netzwerkfehler. Prüfe deine Verbindung.",

  "adblock.title": "Ad-Blocker erkannt",
  "adblock.text":
    "Bitte deaktiviere deinen Ad-Blocker, um diese Ressource freizuschalten. Werbung hält NoNameHub kostenlos.",
  "adblock.how":
    "Deaktiviere Erweiterungen (uBlock, AdBlock Plus, Brave Shields) und lade die Seite neu.",

  "terms.kicker": "RECHTLICHES",
  "terms.title": "Nutzungsbedingungen",
  "terms.updated": "Zuletzt aktualisiert: Oktober 2025",
  "terms.intro":
    "Mit der Nutzung von NoNameHub stimmst du diesen Bedingungen zu.",
  "terms.s1.title": "Nutzung der Ressourcen",
  "terms.s1.text":
    "Alle Ressourcen werden „wie besehen“ für Bildungs- und Entwicklungszwecke bereitgestellt.",
  "terms.s2.title": "Verantwortung des Nutzers",
  "terms.s2.text":
    "Du bestätigst, dass deine Nutzung keine Gesetze oder Rechte Dritter verletzt.",
  "terms.s3.title": "Haftungsbeschränkung",
  "terms.s3.text":
    "NoNameHub haftet nicht für Schäden aus der Nutzung der Ressourcen.",
  "terms.s4.title": "Änderungen",
  "terms.s4.text":
    "Wir können diese Bedingungen aktualisieren. Weitere Nutzung bedeutet Zustimmung.",

  "privacy.kicker": "RECHTLICHES",
  "privacy.title": "Datenschutzerklärung",
  "privacy.updated": "Zuletzt aktualisiert: Oktober 2025",
  "privacy.intro":
    "Deine Privatsphäre ist uns wichtig. Diese Erklärung zeigt, welche Daten wir sammeln.",
  "privacy.s1.title": "Erhobene Daten",
  "privacy.s1.text":
    "Wir sammeln nur Informationen, die du direkt gibst — z. B. Email, wenn du uns kontaktierst.",
  "privacy.s2.title": "Wie wir Daten nutzen",
  "privacy.s2.text":
    "Daten werden nur zur Beantwortung genutzt. Kein Verkauf an Dritte.",
  "privacy.s3.title": "Cookies",
  "privacy.s3.text":
    "Wir nutzen minimalen lokalen Speicher (z. B. Spracheinstellung). Keine Tracking-Cookies.",
  "privacy.s4.title": "Deine Rechte",
  "privacy.s4.text":
    "Du kannst jederzeit Zugriff, Korrektur oder Löschung deiner Daten anfordern.",
};

const es: Dict = {
  "nav.explore": "Explorar",
  "nav.how": "Cómo funciona",
  "nav.browse": "Recursos",
  "nav.resources": "Recursos",
  "nav.about": "Acerca de",

  "hero.eyebrow": "EL HUB DE RECURSOS DE LA COMUNIDAD",
  "hero.title1": "Construye algo",
  "hero.title2": "extraordinario.",
  "hero.copy":
    "Descubre scripts, modelos y kits de UI para tu próximo proyecto de Roblox.",
  "hero.cta": "Explorar recursos",
  "hero.note": "Recursos seleccionados. Nuevas ideas. Más posibilidades.",

  "catalog.kicker": "LA BIBLIOTECA",
  "catalog.title": "Explora recursos",
  "catalog.subtitle": "Bloques útiles para tu próxima creación.",
  "catalog.count": "recursos",
  "catalog.all": "Todos",
  "catalog.scripts": "Scripts",
  "catalog.models": "Modelos",
  "catalog.ui": "UI",
  "catalog.search": "Buscar recursos...",
  "catalog.view": "Abrir recurso",
  "catalog.empty.title": "No se encontraron recursos",
  "catalog.empty.text": "Prueba otra búsqueda o elige otra categoría.",
  "catalog.empty.clear": "Limpiar filtros",

  "how.kicker": "SIMPLE POR DISEÑO",
  "how.title": "Del descubrimiento a la descarga",
  "how.subtitle": "Un camino directo a los recursos que necesitas.",
  "how.s1.title": "Encuentra tu recurso",
  "how.s1.text": "Explora la biblioteca y elige un script, modelo o kit.",
  "how.s2.title": "Completa los pasos",
  "how.s2.text": "Sigue los requisitos de acceso en la página del recurso.",
  "how.s3.title": "Obtén tu acceso",
  "how.s3.text": "Desbloquea la descarga o recibe tu clave de acceso.",

  "footer.tagline": "Un hub para tu próxima idea.",
  "footer.copy": "© {year} NoNameHub",
  "footer.product": "Producto",
  "footer.company": "Compañía",
  "footer.legal": "Legal",
  "footer.allResources": "Todos los recursos",
  "footer.about": "Acerca de",
  "footer.terms": "Términos de servicio",
  "footer.privacy": "Política de privacidad",

  "notfound.kicker": "ERROR / 404",
  "notfound.title": "Página no encontrada",
  "notfound.text":
    "Esta página se perdió entre las dimensiones de Roblox Studio.",
  "notfound.home": "← Volver al inicio",
  "notfound.catalog": "Explorar recursos",
  "notfound.code": "Código",
  "notfound.status": "Estado",
  "notfound.tip": "Consejo",
  "notfound.statusValue": "No encontrado",
  "notfound.tipValue": "Inténtalo de nuevo",

  "error.kicker": "ERROR / RUNTIME",
  "error.title": "Algo salió mal",
  "error.text":
    "Ocurrió un error al cargar esta página. Actualiza o vuelve al catálogo.",
  "error.code": "Código de error:",
  "error.retry": "↻ Reintentar",
  "error.home": "← Volver al inicio",

  "resources.back": "← Volver al catálogo",
  "resources.kicker": "LA BIBLIOTECA",
  "resources.title": "Todos los recursos",
  "resources.subtitle":
    "Bloques útiles para tu próximo proyecto en Roblox Studio.",
  "resources.open": "Abrir",
  "resources.empty.title": "Aún no hay recursos",
  "resources.empty.text":
    "El catálogo está vacío por ahora. Nuevos scripts y modelos aparecerán pronto.",

  "about.back": "← Volver al catálogo",
  "about.kicker": "ACERCA DE / NONAMEHUB",
  "about.title": "Hub de recursos para Roblox.",
  "about.text":
    "NoNameHub es un proyecto comunitario con scripts, modelos y kits de UI para desarrolladores de Roblox Studio.",
  "about.resources": "Recursos",
  "about.categories": "Categorías",
  "about.price": "Precio",
  "about.free": "Gratis",
  "about.cta.title": "¿Buscas algo concreto?",
  "about.cta.text":
    "Explora el catálogo completo y encuentra los bloques que necesitas.",
  "about.cta.button": "Abrir catálogo →",

  "resource.back": "← Volver al catálogo",
  "resource.version": "Versión",
  "resource.steps": "Pasos de acceso",
  "resource.price": "Precio",
  "resource.free": "Gratis",
  "resource.access.title": "Obtener acceso",
  "resource.access.text":
    "Completa un paso rápido para recibir tu clave de acceso personal. Guárdala bien — la necesitarás para usar el recurso.",
  "resource.similar": "Recursos similares",
  "resource.getKey": "Obtener clave",
  "resource.getKeyHint":
    "Serás redirigido a un paso rápido. Luego vuelve y pulsa «Ya lo vi» para ver tu clave.",
  "resource.keyLabel": "TU CLAVE",
  "resource.copy": "Copiar",
  "resource.copied": "¡Copiado!",
  "resource.alreadyWatched": "¿Ya lo viste? Mostrar clave",
  "resource.loadingKey": "Cargando...",
  "resource.keyError": "No se pudo cargar la clave. Inténtalo de nuevo.",
  "resource.err.workerDown":
    "El servidor de claves no está disponible. Inténtalo más tarde.",
  "resource.err.rateLimited":
    "Demasiadas solicitudes. Espera un minuto y vuelve a intentarlo.",
  "resource.err.notFound": "Recurso no encontrado.",
  "resource.err.notConfigured":
    "Error de configuración del servidor. Contacta al administrador.",
  "resource.err.network":
    "Error de red. Comprueba tu conexión e inténtalo de nuevo.",

  "adblock.title": "Bloqueador de anuncios detectado",
  "adblock.text":
    "Desactiva tu bloqueador de anuncios para desbloquear este recurso. Los anuncios mantienen NoNameHub gratis.",
  "adblock.how":
    "Desactiva las extensiones (uBlock, AdBlock Plus, Brave Shields) y recarga la página.",

  "terms.kicker": "LEGAL",
  "terms.title": "Términos de servicio",
  "terms.updated": "Última actualización: octubre 2025",
  "terms.intro":
    "Al usar NoNameHub, aceptas estos términos. Léelos con atención.",
  "terms.s1.title": "Uso de los recursos",
  "terms.s1.text":
    "Todos los recursos se proporcionan «tal cual» con fines educativos y de desarrollo.",
  "terms.s2.title": "Responsabilidad del usuario",
  "terms.s2.text":
    "Confirmas que tu uso no viola ninguna ley ni derechos de terceros.",
  "terms.s3.title": "Limitación de responsabilidad",
  "terms.s3.text":
    "NoNameHub no se responsabiliza por daños derivados del uso de los recursos.",
  "terms.s4.title": "Cambios en los términos",
  "terms.s4.text":
    "Podemos actualizar estos términos. El uso continuado implica aceptación.",

  "privacy.kicker": "LEGAL",
  "privacy.title": "Política de privacidad",
  "privacy.updated": "Última actualización: octubre 2025",
  "privacy.intro":
    "Tu privacidad nos importa. Esta política explica qué datos recopilamos.",
  "privacy.s1.title": "Datos que recopilamos",
  "privacy.s1.text":
    "Solo recopilamos la información que proporcionas directamente — por ejemplo, tu email si decides contactarnos.",
  "privacy.s2.title": "Cómo usamos tus datos",
  "privacy.s2.text":
    "Los datos se usan solo para responder tus mensajes. No los vendemos a terceros.",
  "privacy.s3.title": "Cookies",
  "privacy.s3.text":
    "Usamos almacenamiento local mínimo (como preferencia de idioma). Sin cookies de terceros.",
  "privacy.s4.title": "Tus derechos",
  "privacy.s4.text":
    "Puedes solicitar acceso, corrección o eliminación de tus datos en cualquier momento.",
};

export const translations: Record<LangCode, Dict> = {
  en,
  ua,
  ru,
  pl,
  de,
  es,
};

type Vars = Record<string, string | number>;

type LanguageContextValue = {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: (key: keyof Dict, vars?: Vars) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "nonamehub.lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
      if (saved && translations[saved]) {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = code;
  }, []);

  const t = useCallback(
    (key: keyof Dict, vars?: Vars) => {
      const dict = translations[lang] ?? translations.en;
      let str: string = dict[key] ?? translations.en[key] ?? String(key);
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(`{${k}}`, String(v));
        }
      }
      return str;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}