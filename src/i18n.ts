import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            nav: {
                model: "MODEL", parts: "PARTS", about: "ABOUT US", faq: "FAQ", bag: "BAG", privacy: "PRIVACY POLICY",
                enduro: "ENDURO", cross: "CROSS", street: "STREET", configurator: "CONFIGURATOR"
            },
            ui: { buy: "BUY", send: "SEND", viewModels: "VIEW MODELS" },
            hero: {
                subtitle: "Experience the future of mobility with our lightweight, powerful electric motorcycles. Engineered for those who demand excellence.",
                chargeText: "Charge: The battery capacity is sufficient for active driving"
            },
            about: {
                text: "The main uniqueness of our company is our own innovative frame, created using special technology. It provides increased rigidity, lightness of construction, and maximum controllability, making each of our motorcycles stable and reliable at any speed."
            },
            footer: {
                address: "Lviv, 6 Stepan Bandera Street", products: "Products", info: "Info", legal: "Legal",
                rights: "© CHEETAH, 2026. Design by Valeriia Sachuk | Frontend: Yaroslav | Backend: Volodymyr.", copied: "Copied: "
            },
            support: {
                intro: "If you would like to place a pre-order or get a consultation, please provide your phone number if you prefer a call, or your email address for correspondence.",
                phonePlaceholder: "Phone", emailPlaceholder: "Email", or: "or", consultation: "Consultation", preOrder: "Pre-order",
                send: "SEND", alertEmpty: "Please provide either a phone number or an email address.",
                alertPhone: "Please enter a valid full phone number (+380XXXXXXXXX)", alertSuccess: "Sent! (demo)"
            },
            faqData: {
                q1: "How long to wait for delivery?", a1: "It depends on the configuration and production load. Real deadlines will be provided later.",
                q2: "Can I make a custom build?", a2: "Yes — you can change the configuration, plastic, battery, suspension, and other components.",
                q3: "Is there a controller included?", a3: "Yes, the controller is carefully selected for the motor and battery."
            },
            models: {
                weight: "Weight", maxSpeed: "Maximum speed", cooling: "Cooling", liquid: "Liquid",
                withHeadlights: "With headlights?", wheelDiameter: "Wheel diameter (front, back)",
                frameColor: "Motorcycle frame colour", plasticColor: "Plastic colour", tyrePattern: "Tyre pattern",
                black: "BLACK", purple: "PURPLE", white: "WHITE", graphite: "GRAPHITE", type1: "TYPE 1", type2: "TYPE 2", type3: "TYPE 3",
                yes: "YES", no: "NO", leadTime: "The lead time for this motorcycle with these configurations is 3 months.", price: "Price:"
            },
            parts: {
                subtitle: "You might need this for this motorcycle", battery: "BATTERY", plastic: "PLASTIC", charger: "CHARGER",
                tires: "Tires", completeSet: "Complete set", fastCharger: "Fast charger", summer: "Summer", offRoad: "Off-road",
                outOfStock: "Out of stock", colour: "Colour"
            },
            // --- НОВІ ПЕРЕКЛАДИ ДЛЯ СТОРІНОК ---
            cart: {
                title: "BAG",
                subtitle1: "Place your order quickly and securely. Please note: once you have\npurchased a motorbike, we will call or email you to confirm the order details.",
                subtitle2: "Please read our privacy policy",
                empty: "Your bag is empty",
                specs: "Specifications",
                config: "Configurator",
                qty: "Quantity",
                price: "Price:",
                selectAll: "Select all",
                placingTitle: "Placing an order",
                production: "Production time: 3 months after payment.",
                motoLabel: "Motorcycle",
                partLabel: "Part"
            },
            checkout: {
                title: "PLACING AN ORDER",
                c1Title: "1. Contact Information",
                c1Desc: "We need this information so we can keep you updated on the status of your order.",
                namePlc: "Name *", lastPlc: "Last Name *", phonePlc: "Phone *", emailPlc: "Email *",
                c2Title: "2. Payment",
                c2Desc: "Select a payment method",
                payStore: "Payment from store", payGpay: "Google Pay/Apple Pay", payCard: "Card",
                cardNum: "Card Number *", valid: "Validity period *", cvv: "CVV2/CVC2 *",
                c3Title: "3. Delivery",
                warningTitle: "Please note! We do not delivery motorcycles.",
                warningBoth: "Please stop by our store to pick up your motorcycle once you receive a notification that it is ready. If you would like us to ship the parts to you, please fill out the shipping form below.",
                warningMoto: "Please come to our store to pick up your purchase after you receive the notification that it is ready.",
                addressPlc: "Delivery Address *",
                pickup: "Pickup in store", nova: "Nova Poshta", ukr: "Ukrposhta",
                btn: "PLACE AN ORDER",
                alertPhone: "Please enter a valid phone number (+380XXXXXXXXX)"
            },
            orderPlaced: {
                title: "Order placed",
                sub1: "You will receive an email notification with a unique order code.",
                botText: "You can check the preparation status of your motorcycle using\nthe unique order code prior to shipment here",
                link: "link to the bot",
                checkTitle: "Check:"
            },
            privacy: {
                title: "PRIVACY POLICY",
                sub1: "We value your trust and are committed to protecting your personal data. In this Policy, we explain how we collect, use and protect the information you provide on our website.",
                sub2: "By using the website, you agree to these terms. If you do not agree with this Policy, please refrain from using the website. We may update this document from time to time in line with changes to legislation or the operation of the website, so we recommend that you review it periodically.",
                sec1Title: "What data we collect and why?",
                sec1Text1: "We only collect the data that is necessary to provide you with our services and to improve your experience on the website.",
                sec1Sub1: "The information you provide to us:",
                sec1Li1: "Personal and contact details — such as your telephone number and email address — are provided by you when you complete feedback forms, pre-order forms or registration forms. We use this information to provide advice, confirm order details and keep you informed of your order's status.",
                sec1Li2: "Payment details — card details are provided when you place and pay for your order directly on the website. They are used solely for the secure processing of your payment.",
                sec1Sub2: "Data collected automatically:",
                sec1Text2: "When you visit our website, we collect certain technical information, such as:",
                sec1Li3: "Your device's IP address", sec1Li4: "Browser type and version", sec1Li5: "The time and duration of your visit to the website", sec1Li6: "Pages viewed",
                sec1Text3: "This data is collected automatically and used for analytical purposes to improve the website and better understand the needs of our audience. All this data is anonymised, so we cannot identify you directly from these metrics.",
                sec2Title: "How do we use your data?",
                sec2Text: "We use your personal data for specific purposes, and we never collect more than we need.",
                sec2Li1: "To improve the website: Your technical data is used to help us optimise the website, resolve any issues and ensure you have a pleasant experience.",
                sec2Li2: "To provide our services: personal, contact and payment details are used to process purchases, take pre-orders and provide advice.",
                sec3Title: "What cookies do we use?",
                sec3Text1: "🍪 Cookies are small files stored in your browser, and we use them to collect statistics on how you use our website. This helps us understand which pages are the most popular, how much time you spend on the site, and how you interact with the content.",
                sec3Li1: "We only use basic analytics cookies provided by Google Analytics. These cookies do not store any personal information and are not used for advertising purposes.",
                sec3Li2: "Google Analytics helps us collect anonymous statistics, such as the number of visitors, pages viewed and time spent on the website. This data is used to improve the website's performance.",
                sec3Text2: "You can opt out of cookies if you do not want us to collect this data.",
                sec4Title: "Your rights.",
                sec4Text: "You have a number of important rights regarding your personal data:",
                sec4Li1: "Right of access: you have the right to know what data we hold about you.",
                sec4Li2: "Right to rectification: if your data is incomplete or incorrect, you have the right to have it rectified.",
                sec4Li3: "Right to erasure: you have the right to ask us to erase your data.",
                sec4Li4: "Right to withdraw consent: if you have given your consent to the processing of your data, you may withdraw it at any time.",
                sec4Li5: "Right to restrict processing: you may restrict the specific data we process about you.",
                sec4End: "To exercise your rights, simply",
                sec4Link: "get in touch with us."
            }
        }
    },
    uk: {
        translation: {
            nav: {
                model: "МОДЕЛІ", parts: "ЗАПЧАСТИНИ", about: "ПРО НАС", faq: "ПИТАННЯ", bag: "КОШИК", privacy: "ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ",
                enduro: "ENDURO", cross: "CROSS", street: "STREET", configurator: "КОНФІГУРАТОР"
            },
            ui: { buy: "КУПИТИ", send: "ВІДПРАВИТИ", viewModels: "ПЕРЕГЛЯНУТИ МОДЕЛІ" },
            hero: {
                subtitle: "Відчуйте майбутнє мобільності з нашими легкими та потужними електромотоциклами. Створені для тих, хто вимагає досконалості.",
                chargeText: "Заряд: Ємності акумулятора вистачає для активного катання"
            },
            about: {
                text: "Головна унікальність нашої компанії — власна інноваційна рама, створена за спеціальною технологією. Вона забезпечує підвищену жорсткість, легкість конструкції та максимальну керованість, роблячи кожен наш мотоцикл стабільним і надійним на будь-якій швидкості."
            },
            footer: {
                address: "Львів, вул. Степана Бандери, 6", products: "Продукти", info: "Інформація", legal: "Документи",
                rights: "© CHEETAH, 2026. Дизайн: Валерія Сачук | Фронтенд: Ярослав | Бекенд: Володимир.", copied: "Скопійовано: "
            },
            support: {
                intro: "Якщо ви бажаєте оформити передзамовлення або отримати консультацію, залиште свій номер телефону для дзвінка або email для листування.",
                phonePlaceholder: "Телефон", emailPlaceholder: "Електронна пошта", or: "або", consultation: "Консультація", preOrder: "Передзамовлення",
                send: "ВІДПРАВИТИ", alertEmpty: "Будь ласка, вкажіть номер телефону або електронну пошту.",
                alertPhone: "Будь ласка, введіть коректний номер телефону (+380XXXXXXXXX)", alertSuccess: "Відправлено! (демо)"
            },
            faqData: {
                q1: "Скільки часу чекати на відправлення?", a1: "Залежить від комплектації та завантаження виробництва. Пізніше підставиш реальні терміни.",
                q2: "Чи можна зробити унікальну збірку?", a2: "Так — можна змінювати комплектацію, пластик, батарею, підвіску та інші вузли.",
                q3: "Чи є контролер?", a3: "Так, контролер підбирається під мотор і батарею. Пізніше додаси конкретику."
            },
            models: {
                weight: "Вага", maxSpeed: "Макс. швидкість", cooling: "Охолодження", liquid: "Рідинне",
                withHeadlights: "З фарами?", wheelDiameter: "Діаметр коліс (перед, зад)",
                frameColor: "Колір рами", plasticColor: "Колір пластику", tyrePattern: "Тип протектора",
                black: "ЧОРНИЙ", purple: "ФІОЛЕТОВИЙ", white: "БІЛИЙ", graphite: "ГРАФІТ", type1: "ТИП 1", type2: "ТИП 2", type3: "ТИП 3",
                yes: "ТАК", no: "НІ", leadTime: "Термін виготовлення мотоцикла в такій комплектації становить 3 місяці.", price: "Ціна:"
            },
            parts: {
                subtitle: "Це може знадобитися для цього мотоцикла", battery: "АКУМУЛЯТОР", plastic: "ПЛАСТИК", charger: "ЗАРЯДНИЙ ПРИСТРІЙ",
                tires: "Шини", completeSet: "Повний комплект", fastCharger: "Швидка зарядка", summer: "Літні", offRoad: "Позашляхові",
                outOfStock: "Немає в наявності", colour: "Колір"
            },
            // --- НОВІ ПЕРЕКЛАДИ ДЛЯ СТОРІНОК ---
            cart: {
                title: "КОШИК",
                subtitle1: "Оформіть замовлення швидко та безпечно. Зверніть увагу: після\nоформлення покупки мотоцикла, ми зв'яжемося з вами для підтвердження деталей.",
                subtitle2: "Будь ласка, ознайомтеся з політикою конфіденційності",
                empty: "Ваш кошик порожній",
                specs: "Характеристики",
                config: "Конфігуратор",
                qty: "Кількість",
                price: "Ціна:",
                selectAll: "Обрати все",
                placingTitle: "Оформлення замовлення",
                production: "Час виготовлення: 3 місяці після оплати.",
                motoLabel: "Мотоцикл",
                partLabel: "Запчастина"
            },
            checkout: {
                title: "ОФОРМЛЕННЯ ЗАМОВЛЕННЯ",
                c1Title: "1. Контактна інформація",
                c1Desc: "Ця інформація потрібна нам, щоб тримати вас в курсі статусу вашого замовлення.",
                namePlc: "Ім'я *", lastPlc: "Прізвище *", phonePlc: "Телефон *", emailPlc: "Електронна пошта *",
                c2Title: "2. Оплата",
                c2Desc: "Оберіть спосіб оплати",
                payStore: "Оплата в магазині", payGpay: "Google Pay/Apple Pay", payCard: "Картка",
                cardNum: "Номер картки *", valid: "Термін дії *", cvv: "CVV2/CVC2 *",
                c3Title: "3. Доставка",
                warningTitle: "Зверніть увагу! Ми не доставляємо мотоцикли.",
                warningBoth: "Будь ласка, завітайте до нашого магазину, щоб забрати мотоцикл після сповіщення про готовність. Якщо ви бажаєте доставку запчастин, заповніть форму нижче.",
                warningMoto: "Будь ласка, завітайте до нашого магазину, щоб забрати покупку після отримання сповіщення про готовність.",
                addressPlc: "Адреса доставки *",
                pickup: "Самовивіз", nova: "Нова Пошта", ukr: "Укрпошта",
                btn: "ОФОРМИТИ ЗАМОВЛЕННЯ",
                alertPhone: "Будь ласка, введіть коректний номер телефону (+380XXXXXXXXX)"
            },
            orderPlaced: {
                title: "Замовлення оформлено",
                sub1: "Ви отримаєте сповіщення на email з унікальним кодом замовлення.",
                botText: "Ви можете перевірити статус підготовки мотоцикла за допомогою\nунікального коду до моменту відправки тут",
                link: "посилання на бота",
                checkTitle: "Чек:"
            },
            privacy: {
                title: "ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ",
                sub1: "Ми цінуємо вашу довіру та зобов'язуємося захищати ваші персональні дані. У цій Політиці ми пояснюємо, як ми збираємо, використовуємо та захищаємо інформацію, яку ви надаєте на нашому вебсайті.",
                sub2: "Використовуючи вебсайт, ви погоджуєтеся з цими умовами. Якщо ви не згодні з цією Політикою, будь ласка, утримайтеся від використання сайту. Ми можемо час від часу оновлювати цей документ відповідно до змін у законодавстві, тому рекомендуємо періодично переглядати його.",
                sec1Title: "Які дані ми збираємо і чому?",
                sec1Text1: "Ми збираємо лише ті дані, які необхідні для надання наших послуг і покращення вашого досвіду на сайті.",
                sec1Sub1: "Інформація, яку ви нам надаєте:",
                sec1Li1: "Особисті та контактні дані — такі як ваш номер телефону та email — надаються вами під час заповнення форм зворотного зв'язку, передзамовлення або реєстрації. Ми використовуємо цю інформацію для консультацій, підтвердження замовлень та інформування.",
                sec1Li2: "Платіжні реквізити — дані картки надаються під час оплати замовлення безпосередньо на сайті. Вони використовуються виключно для безпечної обробки вашого платежу.",
                sec1Sub2: "Дані, що збираються автоматично:",
                sec1Text2: "Коли ви відвідуєте наш вебсайт, ми збираємо певну технічну інформацію, таку як:",
                sec1Li3: "IP-адреса вашого пристрою", sec1Li4: "Тип і версія браузера", sec1Li5: "Час і тривалість вашого візиту на сайт", sec1Li6: "Переглянуті сторінки",
                sec1Text3: "Ці дані збираються автоматично і використовуються для аналітичних цілей, щоб покращити вебсайт. Всі ці дані анонімізовані, тому ми не можемо ідентифікувати вас за цими метриками.",
                sec2Title: "Як ми використовуємо ваші дані?",
                sec2Text: "Ми використовуємо ваші персональні дані для конкретних цілей і ніколи не збираємо більше, ніж нам потрібно.",
                sec2Li1: "Для покращення вебсайту: ваші технічні дані допомагають нам оптимізувати сайт, вирішувати проблеми та забезпечувати зручність використання.",
                sec2Li2: "Для надання послуг: особисті, контактні та платіжні дані використовуються для обробки покупок, передзамовлень та надання консультацій.",
                sec3Title: "Які файли cookie ми використовуємо?",
                sec3Text1: "🍪 Cookie — це невеликі файли, що зберігаються у вашому браузері. Ми використовуємо їх для збору статистики про те, як ви користуєтесь сайтом. Це допомагає нам зрозуміти, які сторінки найпопулярніші.",
                sec3Li1: "Ми використовуємо лише базові аналітичні файли cookie від Google Analytics. Вони не зберігають особисту інформацію і не використовуються для реклами.",
                sec3Li2: "Google Analytics допомагає нам збирати анонімну статистику, таку як кількість відвідувачів та час, проведений на сайті. Ці дані використовуються для покращення роботи.",
                sec3Text2: "Ви можете відмовитися від використання файлів cookie, якщо не бажаєте, щоб ми збирали ці дані.",
                sec4Title: "Ваші права.",
                sec4Text: "Ви маєте низку важливих прав щодо ваших персональних даних:",
                sec4Li1: "Право на доступ: ви маєте право знати, які дані ми зберігаємо про вас.",
                sec4Li2: "Право на виправлення: якщо ваші дані неповні або неправильні, ви маєте право на їх виправлення.",
                sec4Li3: "Право на видалення: ви маєте право вимагати видалення ваших даних.",
                sec4Li4: "Право на відкликання згоди: ви можете відкликати згоду на обробку даних у будь-який час.",
                sec4Li5: "Право на обмеження обробки: ви можете обмежити конкретні дані, які ми обробляємо.",
                sec4End: "Щоб скористатися своїми правами, просто",
                sec4Link: "зв'яжіться з нами."
            }
        }
    }
};

i18n
    .use(LanguageDetector) // 3. ДОДАЄМО ДЕТЕКТОР
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        detection: {
            // Вказуємо, що зберігати мову треба в localStorage
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        }
    });

export default i18n;