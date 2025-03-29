const categories = [
    {
        title: "ADMIN",
        buttons: [
            { label: "Post", url: "https://www.post.at/s/sendungsuebersicht#panelEmpfangen", img: "https://play-lh.googleusercontent.com/LCn0zMVjJXauMDNclMVMv8Ht-TNHHLqbCA61Xa7OR3X489dtOgpdFpzXT7H8KM_yTppO=s48-rw" },
            { label: "Simplr", url: "https://login.simplr.de/", img: "https://play-lh.googleusercontent.com/2lDYD2Gd75L9qSeGKQgHp2enMlLGOopURlA2cEqbS7zyQakEg0Z2eo-C_z9mTpt5Gg=w240-h480-rw" },
            { label: "Wiener Städtische", url: "https://losleben.wienerstaedtische.at/app/dashboard", img: "https://play-lh.googleusercontent.com/w_Q8D-sCwYn5eKykRC-0377S9V8a2a_syDJ64hfDsenJmtjHAdLTZ7FEEaJWRQrgHzs=s48-rw" },
            { label: "SmartMeter", url: "https://smartmeter-web.wienernetze.at/uebersicht", img: "https://www.wienernetze.at/documents/34846/0/raute_freigestellt.png/198df669-6c8c-b05a-df7c-ef0be7a027ee?version=1.0&t=1583916092746&imagePreview=1" },
            { label: "WienEnergie", url: "https://meine.wienenergie.at/privat/meine-produkte", img: "https://avatars.githubusercontent.com/u/55399799?s=200&v=4" },
        
        ]
    },
    {
        title: "Office",
        buttons: [
            { label: "Gmail", url: "https://mail.google.com/mail/u/0/#inbox", img: "https://play-lh.googleusercontent.com/KSuaRLiI_FlDP8cM4MzJ23ml3og5Hxb9AapaGTMZ2GgR103mvJ3AAnoOFz1yheeQBBI=w240-h480-rw" },
            { label: "Outlook", url: "https://outlook.live.com/mail/0//", img: "https://play-lh.googleusercontent.com/Zk9elS0eGXDr0L4W6-Ey7YwHbRNjkyezHC8iCc8rWp64lNIjlByS8TDF9qDSZbiEWY4=w240-h480-rw" },
            { label: "Office.com", url: "https://m365.cloud.microsoft/?auth=1", img: "https://play-lh.googleusercontent.com/Cf6rGlvAZJx2iG4c5f5H5N5XWGKFk5XZ_uz0A0YIIyuFPFybIfQaxSlDIQyU2W8btfv6=w240-h480-rw" },
            { label: "Github", url: "https://github.com/dev0gig", img: "https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU=s48-rw" },
            { label: "AFFiNE", url: "https://app.affine.pro/", img: "https://app.affine.pro/api/workspaces/qf73AF6vzWphbTJdN7KiX/blobs/zaFAx1uVZi_n4TTnQtMo2zC1JgPOBZnYf2BxYVInhc0=" },
            { label: "Google Calendar", url: "https://calendar.google.com/", img: "https://play-lh.googleusercontent.com/_bh6XK3B7TAk7kBXC1GHC0j9eS9cw9wQo2K7fiP7FDGAQlcOqgUPT2lx3WgZ0JlOJh8=w240-h480" },

        ]
    },
    {
        title: "crypto",
        buttons: [
            { label: "Bitpanda", url: "https://account.bitpanda.com/login", img: "https://play-lh.googleusercontent.com/0J5yWiMExRQ5wB92-KOpE42PoohTLw-IcPdq5GBLGAPmHMkuvD9EIUNt11bedYI_OcM=w240-h480-rw" },
            { label: "Coinmarketcap", url: "https://coinmarketcap.com/", img: "https://play-lh.googleusercontent.com/kCKeckQNFF9P2470x4lF9v3OW_ZZtvk1SIo9RmvJDa6WtBboqfzyefEZ2_rwWRYgM_M=s48-rw" },
        ]
    },
    {
        title: "CloudStorage",
        buttons: [
            { label: "pCloud", url: "https://my.pcloud.com/", img: "https://play-lh.googleusercontent.com/5C2U8bk9x9-SzmJqy4xb9urLqwY1JvX-kU4EEVL-bSSEjv1wyM7IT7o4svuAKbsHUoA=w240-h480-rw" },
            { label: "Google Drive", url: "https://drive.google.com/", img: "https://play-lh.googleusercontent.com/t-juVwXA8lDAk8uQ2L6d6K83jpgQoqmK1icB_l9yvhIAQ2QT_1XbRwg5IpY08906qEw=w240-h480-rw" },
            { label: "OneDrive", url: "https://onedrive.live.com/?id=root&cid=0C6CCA416C0AEF80", img: "https://play-lh.googleusercontent.com/6AWr-qrhGT0ohjw0koq3bM8GHEFg1gTurald4FjCDg2RulTp4y_VVsYWUtw7Fo6lsQo=s48-rw" },
        ]
    },
    {
        title: "AI",
        buttons: [
            { label: "Perplexity", url: "https://www.perplexity.ai/", img: "https://play-lh.googleusercontent.com/6STp0lYx2ctvQ-JZpXA1LeAAZIlq6qN9gpy7swLPlRhmp-hfvZePcBxqwVkqN2BH1g=s48-rw" },
            { label: "ChatGPT", url: "https://chatgpt.com/", img: "https://play-lh.googleusercontent.com/lmG9HlI0awHie0cyBieWXeNjpyXvHPwDBb8MNOVIyp0P8VEh95AiBHtUZSDVR3HLe3A=w240-h480-rw" },
            { label: "Gemini", url: "https://gemini.google.com/app", img: "https://play-lh.googleusercontent.com/Pkwn0AbykyjSuCdSYCbq0dvOqHP-YXcbBLTZ8AOUZhvnRuhUnZ2aJrw_YCf6kVMcZ4PM=w240-h480-rw" },
            { label: "DeepL", url: "https://www.deepl.com/en/translator", img: "https://play-lh.googleusercontent.com/0IH4L3pX-jqQXKYCDmxTM5t3Tvak2cb_zUuIs9nKCHPeOqkaRJ_bRTq1qKawsSvunw=w240-h480-rw" },
            { label: "deepseek", url: "https://chat.deepseek.com/", img: "https://play-lh.googleusercontent.com/d2zqBFBEymSZKaVg_dRo1gh3hBFn7_Kl9rO74xkDmnJeLgDW0MoJD3cUx0QzZN6jdsg=w240-h480-rw" },
            { label: "Copilot", url: "https://copilot.microsoft.com/", img: "https://play-lh.googleusercontent.com/p8R1lAZI5_WCOzmvBYnOQasCWcjc9d2vM7z4PaVku8b9AfxGhqQqM0ldJ8KULHblVj-g=w240-h480-rw" },
            { label: "NotebookLM", url: "https://notebooklm.google.com/", img: "https://pbs.twimg.com/profile_images/1861084152054849547/uKBhfKBo_400x400.jpg" },

        ]
    },
    {
        title: "Games",
        buttons: [
            { label: "HoyoLab", url: "https://www.hoyolab.com/home", img: "https://play-lh.googleusercontent.com/rkfVCuPdNJwhNj4-_jfueW56NM4fFohqVF-Y_ynFesGQVy-Jco84Opxp_UPxpeC5EeaH=s48-rw" },
            { label: "MTG Deckstats", url: "https://deckstats.net/", img: "https://pbs.twimg.com/profile_images/1170359141312974848/Dx2dTRcl_400x400.jpg" },
            { label: "Chess.com", url: "https://www.chess.com/daily-chess-puzzle", img: "https://play-lh.googleusercontent.com/a7R5nyeaX8lIEWdBOxjlvbyq9LcFwh3XMvNtBPEKR3LPGgdvgGrec4sJwn8tUaaSkw=s48-rw" },
            { label: "Epic Games", url: "https://store.epicgames.com/de/", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYIn8lRMcFqpozaGneuqfI8-3cgRtKMUk9uw&s" },
            { label: "Prime Gaming", url: "https://gaming.amazon.com/home", img: "https://cdn-1.webcatalog.io/catalog/amazon-prime-gaming/amazon-prime-gaming-icon-filled-256.webp?v=1714773207214" },
            { label: "Steam", url: "https://store.steampowered.com/", img: "https://play-lh.googleusercontent.com/52_DMY5417awaEgJf3_9mWgEuO2t1JfkGab8kM-LD6l5u6cGm_1-GsoQ_IyWFHdbkA=w240-h480-rw" },
            { label: "itch.io", url: "https://itch.io/my-purchases", img: "https://static-00.iconduck.com/assets.00/itch-io-icon-2048x2048-i6hzclad.png" },
        ]
    },
    {
        title: "Education",
        buttons: [
            { label: "Udemy", url: "https://www.udemy.com/home/my-courses/learning/", img: "https://play-lh.googleusercontent.com/dsCkmJE2Fa8IjyXERAcwc5YeQ8_NvbZ4_OI8LgqyjILpXUfS5YhEcnAMajKPrZI-og=s48-rw" },
            { label: "Duolingo", url: "https://www.duolingo.com/learn", img: "https://play-lh.googleusercontent.com/xAps4eknm7glMBG8HkYnDaInFYadN-5l2wumOQB3tzdf_JYerNLYphUma4A8kjD07Zh0=w240-h480-rw" },
            { label: "Mimo", url: "https://mimo.org/web/library", img: "https://play-lh.googleusercontent.com/qPfmmEDFhGVmIXIKpmfbQeH6vXygXotzj6ied-j2el0YIB36fApN32XoVDrGoMQZ11Q=s48-rw" },
            { label: "Free Japanese Lessons", url: "https://freejapaneselessons.com/", img: "https://cdn-icons-png.flaticon.com/512/6091/6091254.png" },
            { label: "Tolino", url: "https://webreader.mytolino.com/library/", img: "https://play-lh.googleusercontent.com/gj2xFcVsPRfjeAMMX0zG9_9TqcHeH30YbR3FdtPo2cHhcHbU6OGKsEqERriVuo8OCpg=s48-rw" },

        ]
    },
    {
        title: "Media",
        buttons: [
            { label: "Youtube", url: "https://www.youtube.com/", img: "https://play-lh.googleusercontent.com/6am0i3walYwNLc08QOOhRJttQENNGkhlKajXSERf3JnPVRQczIyxw2w3DxeMRTOSdsY=s48-rw" },
            { label: "Netflix", url: "https://www.netflix.com", img: "https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI=w240-h480-rw" },
            { label: "Crunchyroll", url: "https://www.crunchyroll.com/de/", img: "https://play-lh.googleusercontent.com/Fnor8mzNEsiWTfSTI_RXUmsaZW0eYw0RkIgIhSCphG4Y0ZgwC-zK2qzik-9VIxQDWQ=s48-rw" },
        
        ]
    },
    {
        title: "Shopping",
        buttons: [
            { label: "Temu", url: "https://www.temu.com", img: "https://play-lh.googleusercontent.com/Nz5sdWyh7jn4eTy_GSaRBDgaKhLC1pvYywC6fklDOlPGbopmeFN9NkqgKGjsvJMbKVEI=w240-h480-rw" },
            { label: "Etsy", url: "https://www.etsy.com", img: "https://play-lh.googleusercontent.com/giKCCPigafUbKQ1AkXVxSjQ1PggetEI96ORNKxxhQdvGAFhto71kO4zf7gZ9oOdLIQe5=w240-h480-rw" },
            { label: "Hockerty", url: "https://www.hockerty.at", img: "https://s3-eu-west-1.amazonaws.com/tpd/logos/5cdad622334459000156b02a/0x0.png" },
            { label: "Willhaben", url: "https://www.willhaben.at", img: "https://play-lh.googleusercontent.com/_35j5GWebpnajJ5jCHVEtvbBm6Xt5CrkeTZ2mWqX-p7e2iCvNSO3qMf6mDWF6x5ZPg=w240-h480-rw" },
            { label: "Amazon", url: "https://www.amazon.de", img: "https://play-lh.googleusercontent.com/1Ns1T_qN0pEXMvZeZ5lQNAR8z4blP7ce2J2Nn5doXvt2T1g_W7VMORdWHaApkOooupI=s48-rw" },
            { label: "Thalia", url: "https://www.thalia.at/", img: "https://play-lh.googleusercontent.com/Z2mljIDYihYbBWuyp-rcUAi-G-ThgexF1wekQboFfxkTBIoSEfj8M_6LdZJfwqMYhUk=w240-h480-rw" },

        ]
    },
    {
        title: "SocialMedia",
        buttons: [
            { label: "Pinterest", url: "https://at.pinterest.com/", img: "https://play-lh.googleusercontent.com/6CFQQ0b9r5fzF1v6f0gIirWsOGL7sGWkJifuUQxxhbCMcBx5aSG_cNXpjDKDn5c1jwjq=w240-h480-rw" },
            { label: "Reddit", url: "https://www.reddit.com", img: "https://play-lh.googleusercontent.com/6Bexlvoh-v0z0YnxzXo_U5e5A6UdAETe8pIYyQ2E2KfhVf2BK5J83pFXKZbt125FHHQ=w240-h480-rw" },
            { label: "Whatsapp", url: "https://web.whatsapp.com/", img: "https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w240-h480-rw" },
            { label: "Google Messages", url: "https://messages.google.com/web/conversations", img: "https://play-lh.googleusercontent.com/9AZOTXU_CpreTFAXUPAmJNkm8VGCb1C90fjJ9pHGcVmpGMDSTq3cUbaQJdBT9Tdp9A=w240-h480-rw" },
        
        ]
    },
];

const mainContainer = document.getElementById('main_container');

categories.forEach(category => {
    const categoryBox = document.createElement('div');
    categoryBox.className = 'main_container-box';

    const categoryTitle = document.createElement('p');
    categoryTitle.className = 'main_container-box-titel';
    categoryTitle.textContent = category.title;
    categoryBox.appendChild(categoryTitle);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    category.buttons.forEach(button => {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'button-wrapper';

        const buttonElement = document.createElement('button');
        buttonElement.className = 'button-kreis';
        buttonElement.style.backgroundImage = `url('${button.img}')`;
        buttonElement.onclick = () => window.open(button.url);
        buttonWrapper.appendChild(buttonElement);

        const buttonLabel = document.createElement('span');
        buttonLabel.className = 'button-label';
        buttonLabel.textContent = button.label;
        buttonWrapper.appendChild(buttonLabel);

        buttonContainer.appendChild(buttonWrapper);
    });

    categoryBox.appendChild(buttonContainer);
    mainContainer.appendChild(categoryBox);
});