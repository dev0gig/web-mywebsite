const appsData = [
    {
        id: "FinanzOnline",
        iconUrl: "https://play-lh.googleusercontent.com/QQdz7x2gcVhe88tgzfT-2CNfh3nD6YNB8_ATmlvmItBZX4hcavVUUbVrODLyYDqQjmg=w240-h480-rw",
        targetUrl: "https://finanzonline.bmf.gv.at/fon/",
        ariaLabel: "FinanzOnline"
    },
    {
        id: "Post",
        iconUrl: "https://play-lh.googleusercontent.com/LCn0zMVjJXauMDNclMVMv8Ht-TNHHLqbCA61Xa7OR3X489dtOgpdFpzXT7H8KM_yTppO=s48-rw",
        targetUrl: "https://www.post.at/s/sendungsuebersicht#panelEmpfangen",
        ariaLabel: "Post"
    },
    {
        id: "WienerStädtische",
        iconUrl: "https://play-lh.googleusercontent.com/w_Q8D-sCwYn5eKykRC-0377S9V8a2a_syDJ64hfDsenJmtjHAdLTZ7FEEaJWRQrgHzs=s48-rw",
        targetUrl: "https://losleben.wienerstaedtische.at/app/dashboard",
        ariaLabel: "WienerStädtische"
    },
    {
        id: "SmartMeter",
        iconUrl: "https://www.wienernetze.at/documents/34846/0/raute_freigestellt.png/198df669-6c8c-b05a-df7c-ef0be7a027ee?version=1.0&t=1583916092746&imagePreview=1",
        targetUrl: "https://smartmeter-web.wienernetze.at/uebersicht",
        ariaLabel: "SmartMeter"
    },
    {
        id: "WienEnergie",
        iconUrl: "https://avatars.githubusercontent.com/u/55399799?s=200&v=4",
        targetUrl: "https://meine.wienenergie.at/privat/meine-produkte",
        ariaLabel: "WienEnergie"
    },
    {
        id: "Passwords",
        iconUrl: "https://img.icons8.com/fluent/600/google-password.png",
        targetUrl: "https://passwords.google.com/",
        ariaLabel: "Passwords"
    },
    {
        id: "Office365",
        iconUrl: "https://play-lh.googleusercontent.com/Cf6rGlvAZJx2iG4c5f5H5N5XWGKFk5XZ_uz0A0YIIyuFPFybIfQaxSlDIQyU2W8btfv6=w240-h480-rw",
        targetUrl: "https://m365.cloud.microsoft/?auth=1",
        ariaLabel: "Office365"
    },
    {
        id: "Github",
        iconUrl: "https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU=s48-rw",
        targetUrl: "https://github.com/dev0gig",
        ariaLabel: "Github"
    },
    {
        id: "Paypal",
        iconUrl: "https://play-lh.googleusercontent.com/xOKbvDt362x1uzW-nnggP-PgO9HM4L1vwBl5HgHFHy_n1X3mqeBtOSoIyNJzTS3rrj70=w240-h480-rw",
        targetUrl: "https://www.paypal.com/myaccount/summary",
        ariaLabel: "Paypal"
    },
    {
        id: "GoogleCalendar",
        iconUrl: "https://play-lh.googleusercontent.com/_bh6XK3B7TAk7kBXC1GHC0j9eS9cw9wQo2K7fiP7FDGAQlcOqgUPT2lx3WgZ0JlOJh8=w240-h480",
        targetUrl: "https://calendar.google.com/",
        ariaLabel: "GoogleCalendar"
    },
    {
        id: "Udemy",
        iconUrl: "https://play-lh.googleusercontent.com/dsCkmJE2Fa8IjyXERAcwc5YeQ8_NvbZ4_OI8LgqyjILpXUfS5YhEcnAMajKPrZI-og=s48-rw",
        targetUrl: "https://www.udemy.com/home/my-courses/learning/",
        ariaLabel: "Udemy"
    },
    {
        id: "Tolino",
        iconUrl: "https://play-lh.googleusercontent.com/gj2xFcVsPRfjeAMMX0zG9_9TqcHeH30YbR3FdtPo2cHhcHbU6OGKsEqERriVuo8OCpg=s48-rw",
        targetUrl: "https://webreader.mytolino.com/library/",
        ariaLabel: "Tolino"
    },
    {
        id: "NotebookLM",
        iconUrl: "https://pbs.twimg.com/profile_images/1861084152054849547/uKBhfKBo_400x400.jpg",
        targetUrl: "https://notebooklm.google.com/",
        ariaLabel: "NotebookLM"
    },
    {
        id: "Bitpanda",
        iconUrl: "https://play-lh.googleusercontent.com/0J5yWiMExRQ5wB92-KOpE42PoohTLw-IcPdq5GBLGAPmHMkuvD9EIUNt11bedYI_OcM=w240-h480-rw",
        targetUrl: "https://account.bitpanda.com/login",
        ariaLabel: "Bitpanda"
    },
    {
        id: "CoinMarketCap",
        iconUrl: "https://play-lh.googleusercontent.com/kCKeckQNFF9P2470x4lF9v3OW_ZZtvk1SIo9RmvJDa6WtBboqfzyefEZ2_rwWRYgM_M=s48-rw",
        targetUrl: "https://coinmarketcap.com/",
        ariaLabel: "CoinMarketCap"
    },
    {
        id: "GeorgeErsteBank",
        iconUrl: "https://play-lh.googleusercontent.com/iO3mw3CXFdTFhH_IMBirs-caiJO301aEeOXzPgr13J22W1U0z-PWr6GSnTgbZeu6vCA=w240-h480-rw",
        targetUrl: "https://george.sparkasse.at/r/index.html?at=c#/overview",
        ariaLabel: "GeorgeErsteBank"
    },
    {
        id: "Revolut",
        iconUrl: "https://play-lh.googleusercontent.com/Zk8VcibrnwxdnlEydb5ytJOPGQuCVwceanusUprYjF06eLaPqO-pqYfkq7-LwMhMo7ZF=w240-h480-rw",
        targetUrl: "https://sso.revolut.com/signin?client_id=o3r08ao16zvdlf2y5fdc&code_challenge=7EVFQ49eb3I_mM8CF4VSd5ZXTG0xKJ18eWYZrycWhas&code_challenge_method=S256&response_type=code&redirect_uri=https%3A%2F%2Fapp.revolut.com%2Fhome&response_mode=query&ui_color_scheme=dark&ui_locales=en&state=KPbgwrh2iBUue1C4",
        ariaLabel: "Revolut"
    },
    {
        id: "N26",
        iconUrl: "https://play-lh.googleusercontent.com/pCFXCIyrT0zxLral7LuFhBj6K2Bwl4Xj_zH_BXNKOJ7IJ2Gl8fE6cQ4IbQzX4uDSSw=w240-h480-rw",
        targetUrl: "https://app.n26.com/login",
        ariaLabel: "N26"
    },
    {
        id: "pCloud",
        iconUrl: "https://play-lh.googleusercontent.com/5C2U8bk9x9-SzmJqy4xb9urLqwY1JvX-kU4EEVL-bSSEjv1wyM7IT7o4svuAKbsHUoA=w240-h480-rw",
        targetUrl: "https://my.pcloud.com/",
        ariaLabel: "pCloud"
    },
    {
        id: "GoogleDrive",
        iconUrl: "https://play-lh.googleusercontent.com/t-juVwXA8lDAk8uQ2L6d6K83jpgQoqmK1icB_l9yvhIAQ2QT_1XbRwg5IpY08906qEw=w240-h480-rw",
        targetUrl: "https://drive.google.com/",
        ariaLabel: "GoogleDrive"
    },
    {
        id: "OneDrive",
        iconUrl: "https://play-lh.googleusercontent.com/6AWr-qrhGT0ohjw0koq3bM8GHEFg1gTurald4FjCDg2RulTp4y_VVsYWUtw7Fo6lsQo=s48-rw",
        targetUrl: "https://onedrive.live.com/?id=root&cid=0C6CCA416C0AEF80",
        ariaLabel: "OneDrive"
    },
    {
        id: "Perplexity",
        iconUrl: "https://play-lh.googleusercontent.com/6STp0lYx2ctvQ-JZpXA1LeAAZIlq6qN9gpy7swLPlRhmp-hfvZePcBxqwVkqN2BH1g=s48-rw",
        targetUrl: "https://www.perplexity.ai/",
        ariaLabel: "Perplexity"
    },
    {
        id: "ChatGPT",
        iconUrl: "https://play-lh.googleusercontent.com/lmG9HlI0awHie0cyBieWXeNjpyXvHPwDBb8MNOVIyp0P8VEh95AiBHtUZSDVR3HLe3A=w240-h480-rw",
        targetUrl: "https://chatgpt.com/",
        ariaLabel: "ChatGPT"
    },
    {
        id: "Gemini",
        iconUrl: "https://play-lh.googleusercontent.com/Pkwn0AbykyjSuCdSYCbq0dvOqHP-YXcbBLTZ8AOUZhvnRuhUnZ2aJrw_YCf6kVMcZ4PM=w240-h480-rw",
        targetUrl: "https://gemini.google.com/app",
        ariaLabel: "Gemini"
    },
    {
        id: "DeepL",
        iconUrl: "https://play-lh.googleusercontent.com/0IH4L3pX-jqQXKYCDmxTM5t3Tvak2cb_zUuIs9nKCHPeOqkaRJ_bRTq1qKawsSvunw=w240-h480-rw",
        targetUrl: "https://www.deepl.com/en/translator",
        ariaLabel: "DeepL"
    },
    {
        id: "DeepSeek",
        iconUrl: "https://play-lh.googleusercontent.com/d2zqBFBEymSZKaVg_dRo1gh3hBFn7_Kl9rO74xkDmnJeLgDW0MoJD3cUx0QzZN6jdsg=w240-h480-rw",
        targetUrl: "https://chat.deepseek.com/",
        ariaLabel: "DeepSeek"
    },
    {
        id: "Copilot",
        iconUrl: "https://play-lh.googleusercontent.com/p8R1lAZI5_WCOzmvBYnOQasCWcjc9d2vM7z4PaVku8b9AfxGhqQqM0ldJ8KULHblVj-g=w240-h480-rw",
        targetUrl: "https://copilot.microsoft.com/",
        ariaLabel: "Copilot"
    },
    {
        id: "Hoyolab",
        iconUrl: "https://play-lh.googleusercontent.com/rkfVCuPdNJwhNj4-_jfueW56NM4fFohqVF-Y_ynFesGQVy-Jco84Opxp_UPxpeC5EeaH=s48-rw",
        targetUrl: "https://www.hoyolab.com/home",
        ariaLabel: "Hoyolab"
    },
    {
        id: "Game8",
        iconUrl: "https://storage.googleapis.com/accesswire/logos/subaccounts/37677.png?v=1",
        targetUrl: "https://game8.co",
        ariaLabel: "Game8"
    },
    {
        id: "DeckStats",
        iconUrl: "https://pbs.twimg.com/profile_images/1170359141312974848/Dx2dTRcl_400x400.jpg",
        targetUrl: "https://deckstats.net/",
        ariaLabel: "DeckStats"
    },
    {
        id: "Chess",
        iconUrl: "https://play-lh.googleusercontent.com/a7R5nyeaX8lIEWdBOxjlvbyq9LcFwh3XMvNtBPEKR3LPGgdvgGrec4sJwn8tUaaSkw=s48-rw",
        targetUrl: "https://www.chess.com/daily-chess-puzzle",
        ariaLabel: "Chess"
    },
    {
        id: "EpicGames",
        iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYIn8lRMcFqpozaGneuqfI8-3cgRtKMUk9uw&s",
        targetUrl: "https://store.epicgames.com/de/",
        ariaLabel: "EpicGames"
    },
    {
        id: "AmazonGaming",
        iconUrl: "https://cdn-1.webcatalog.io/catalog/amazon-prime-gaming/amazon-prime-gaming-icon-filled-256.webp?v=1714773207214",
        targetUrl: "https://gaming.amazon.com/home",
        ariaLabel: "AmazonGaming"
    },
    {
        id: "Steam",
        iconUrl: "https://play-lh.googleusercontent.com/52_DMY5417awaEgJf3_9mWgEuO2t1JfkGab8kM-LD6l5u6cGm_1-GsoQ_IyWFHdbkA=w240-h480-rw",
        targetUrl: "https://store.steampowered.com/",
        ariaLabel: "Steam"
    },
    {
        id: "Itch.io",
        iconUrl: "https://static-00.iconduck.com/assets.00/itch-io-icon-2048x2048-i6hzclad.png",
        targetUrl: "https://itch.io/my-purchases",
        ariaLabel: "Itch.io"
    },
    {
        id: "Youtube",
        iconUrl: "https://play-lh.googleusercontent.com/6am0i3walYwNLc08QOOhRJttQENNGkhlKajXSERf3JnPVRQczIyxw2w3DxeMRTOSdsY=s48-rw",
        targetUrl: "https://www.youtube.com/", // Beachte: Die URL sieht aus wie eine Usercontent-URL, stelle sicher, dass sie korrekt ist.
        ariaLabel: "Youtube"
    },
    {
        id: "Netflix",
        iconUrl: "https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI=w240-h480-rw",
        targetUrl: "https://www.netflix.com",
        ariaLabel: "Netflix"
    },
    {
        id: "Crunchyroll",
        iconUrl: "https://play-lh.googleusercontent.com/Fnor8mzNEsiWTfSTI_RXUmsaZW0eYw0RkIgIhSCphG4Y0ZgwC-zK2qzik-9VIxQDWQ=s48-rw",
        targetUrl: "https://www.crunchyroll.com/de/",
        ariaLabel: "Crunchyroll"
    },
    {
        id: "Pinterest",
        iconUrl: "https://play-lh.googleusercontent.com/6CFQQ0b9r5fzF1v6f0gIirWsOGL7sGWkJifuUQxxhbCMcBx5aSG_cNXpjDKDn5c1jwjq=w240-h480-rw",
        targetUrl: "https://at.pinterest.com/",
        ariaLabel: "Pinterest"
    },
    {
        id: "Reddit",
        iconUrl: "https://play-lh.googleusercontent.com/6Bexlvoh-v0z0YnxzXo_U5e5A6UdAETe8pIYyQ2E2KfhVf2BK5J83pFXKZbt125FHHQ=w240-h480-rw",
        targetUrl: "https://www.reddit.com",
        ariaLabel: "Reddit"
    },
    {
        id: "Temu",
        iconUrl: "https://play-lh.googleusercontent.com/Nz5sdWyh7jn4eTy_GSaRBDgaKhLC1pvYywC6fklDOlPGbopmeFN9NkqgKGjsvJMbKVEI=w240-h480-rw",
        targetUrl: "https://www.temu.com",
        ariaLabel: "Temu"
    },
    {
        id: "Hockerty",
        iconUrl: "https://s3-eu-west-1.amazonaws.com/tpd/logos/5cdad622334459000156b02a/0x0.png",
        targetUrl: "https://www.hockerty.at",
        ariaLabel: "Hockerty"
    },
    {
        id: "Willhaben",
        iconUrl: "https://play-lh.googleusercontent.com/_35j5GWebpnajJ5jCHVEtvbBm6Xt5CrkeTZ2mWqX-p7e2iCvNSO3qMf6mDWF6x5ZPg=w240-h480-rw",
        targetUrl: "https://www.willhaben.at",
        ariaLabel: "Willhaben"
    },
    {
        id: "Amazon",
        iconUrl: "https://play-lh.googleusercontent.com/1Ns1T_qN0pEXMvZeZ5lQNAR8z4blP7ce2J2Nn5doXvt2T1g_W7VMORdWHaApkOooupI=s48-rw",
        targetUrl: "https://www.amazon.de",
        ariaLabel: "Amazon"
    },
    {
        id: "Thalia",
        iconUrl: "https://play-lh.googleusercontent.com/Z2mljIDYihYbBWuyp-rcUAi-G-ThgexF1wekQboFfxkTBIoSEfj8M_6LdZJfwqMYhUk=w240-h480-rw",
        targetUrl: "https://www.thalia.at/",
        ariaLabel: "Thalia"
    },
    {
        id: "GoogleTranslate",
        iconUrl: "https://play-lh.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA=w240-h480-rw",
        targetUrl: "https://translate.google.com/",
        ariaLabel: "GoogleTranslate"
    },
    {
        id: "GoogleContacts",
        iconUrl: "https://play-lh.googleusercontent.com/fvhPW8dpGXM42Y-6aQU8Yl25L1l_mVgeoM-n08FxAkM7umAHkNs8wcs4MA49E67a7WVt=w240-h480-rw",
        targetUrl: "https://contacts.google.com/",
        ariaLabel: "GoogleContacts"
    },
    {
        id: "GoogleMaps",
        iconUrl: "https://play-lh.googleusercontent.com/Kf8WTct65hFJxBUDm5E-EpYsiDoLQiGGbnuyP6HBNax43YShXti9THPon1YKB6zPYpA=w240-h480-rw",
        targetUrl: "https://www.google.com/maps/", // Beachte: Die URL sieht aus wie eine Usercontent-URL, stelle sicher, dass sie korrekt ist.
        ariaLabel: "GoogleMaps"
    },
    {
        id: "GoogleKeep",
        iconUrl: "https://play-lh.googleusercontent.com/9bJoeaPbGTB8Tz_h4N-p-6ReRd8vSS-frZb2tmJulaGIoTKElKj3zpmcFJvnS96ANZP5=w240-h480-rw",
        targetUrl: "https://keep.google.com/",
        ariaLabel: "GoogleKeep"
    },
    {
        id: "GoogleSheets",
        iconUrl: "https://play-lh.googleusercontent.com/keE2gN0Hqh8-Tsf_RYZ_-yS2uo6ToqYVyRBv_UZaLXsgeeHBd2YPcEUWEF4DEtfGyb1h=s48-rw",
        targetUrl: "https://docs.google.com/spreadsheets/u/0/",
        ariaLabel: "GoogleSheets"
    },
    {
        id: "GoogleDocs",
        iconUrl: "https://play-lh.googleusercontent.com/emmbClh_hm0WpWZqJ0X59B8Pz1mKoB9HVLkYMktxhGE6_-30SdGoa-BmYW73RJ8MGZQ=s48-rw",
        targetUrl: "https://docs.google.com/document/u/0/",
        ariaLabel: "GoogleDocs"
    },
    {
        id: "GooglePlay",
        iconUrl: "https://cdn-icons-png.flaticon.com/512/732/732208.png",
        targetUrl: "https://play.google.com/",
        ariaLabel: "GooglePlay"
    },
    {
        id: "GoogleTasks",
        iconUrl: "https://play-lh.googleusercontent.com/pjUulZ-Vdo7qPKxk3IRhnk8SORPlgSydSyYEjm7fGcoXO8wDyYisWXwQqEjMryZ_sqK2=w240-h480-rw",
        targetUrl: "https://tasks.google.com/tasks/",
        ariaLabel: "GoogleTasks"
    },
    {
        id: "A1",
        iconUrl: "https://play-lh.googleusercontent.com/DG25DF36wwa7-TR1K5Zi-WnCziIwlPt4_ydYkxuYIY1nWG-L_sGhAyHTqwAmWeicgg=w240-h480-rw",
        targetUrl: "https://www.a1.net/mein-a1",
        ariaLabel: "Mein A1"
    },
    {
        id: "Heritage",
        iconUrl: "https://play-lh.googleusercontent.com/TOeUOcW7cqu-2RSLp9514ETSQctPv0CY5rhWVLKqrMD5cJbsGTwYRZjDhtWAB857Zw=w240-h480-rw",
        targetUrl: "https://www.myheritage.com/",
        ariaLabel: "My Heritage"
    }
];