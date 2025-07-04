document.addEventListener('DOMContentLoaded', () => {

    // --- App Definitions ---
    const apps = [
        { id: 'appdrawer', name: 'Appdrawer', icon: 'assets/icons/appdrawer.svg', src: 'tabs/appdrawer.html', materialIcon: 'apps' },
        { id: 'widgets', name: 'Widgets', icon: 'assets/icons/widgets.svg', src: 'tabs/widgets-iframe.html', materialIcon: 'extension' },
        { id: 'readlater', name: 'ReadlateR', icon: 'assets/icons/readlater.svg', src: 'tabs/readlater.html', materialIcon: 'bookmark_border' },
        { id: 'rss', name: 'RSS Reader', icon: 'assets/icons/rss.svg', src: 'tabs/rss-reader.html', materialIcon: 'rss_feed' },
        { id: 'aurimea', name: 'AuriMea', icon: 'assets/icons/aurimea.svg', src: 'tabs/aurimea.html', materialIcon: 'graphic_eq' },
        { id: 'memomea', name: 'MemoMea', icon: 'assets/icons/memomea.svg', src: 'tabs/memomea.html', materialIcon: 'note_alt' },
        { id: 'actamea', name: 'ActaMea', icon: 'assets/icons/actamea.svg', src: 'tabs/actamea.html', materialIcon: 'checklist' },
        { id: 'unicorn', name: 'Unicorn', icon: 'assets/icons/unicorn.svg', url: 'unicorn/work-tools.html', external: true, materialIcon: 'smart_toy' },
    ];

    // --- Global State ---
    let currentLayout = null;
    let highestZIndex = 100;
    let iconPositions = {};
    let openWindows = new Set();
    let minimizedWindows = new Set();
    let clockIntervalId = null;
    let starfieldAnimationId = null;

    // --- DOM Elements ---
    const body = document.body;
    const notificationToast = document.getElementById('notification-toast');
    const modalOverlay = document.getElementById('modal-overlay');
    const settingsModal = document.getElementById('settings-modal');
    const confirmModal = document.getElementById('confirm-modal');
    const appDock = document.getElementById('app-dock');
    const contextMenu = document.getElementById('context-menu');

    // Sidebar elements
    const sidebarNavLinks = document.getElementById('sidebar-nav-links');
    const mobileNavLinksContainer = document.getElementById('mobile-nav-links');
    const mobileHeaderTitle = document.getElementById('mobile-header-title');
    const iframeWrapper = document.getElementById('iframe-wrapper');
    const iframeLoader = document.getElementById('iframe-loader');

    // Desktop elements
    const desktop = document.getElementById('desktop');
    const clockElement = document.getElementById('clock');
    const starfieldCanvasEl = document.getElementById('starfield-canvas');
    const topBarMenusContainer = document.getElementById('top-bar-menus');

    // --- Utility Functions ---
    const showToast = (message, type = 'success', duration = 3000) => {
        notificationToast.textContent = message;
        notificationToast.className = 'show';
        if (type === 'success') notificationToast.style.backgroundColor = '#22c55e';
        else if (type === 'error') notificationToast.style.backgroundColor = '#ef4444';
        else notificationToast.style.backgroundColor = '#525252';
        if (duration > 0) {
            setTimeout(() => { notificationToast.className = ''; }, duration);
        }
    };

    const openConfirmModal = (title, text, onConfirm) => {
        document.getElementById('confirm-modal-title').textContent = title;
        document.getElementById('confirm-modal-text').textContent = text;
        const confirmBtn = document.getElementById('confirm-modal-confirm-btn');
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        newConfirmBtn.addEventListener('click', () => {
            if (typeof onConfirm === 'function') onConfirm();
            closeConfirmModal();
        });
        confirmModal.classList.remove('hidden');
        modalOverlay.classList.remove('hidden');
    };

    const closeConfirmModal = () => {
        confirmModal.classList.add('hidden');
        if (settingsModal.classList.contains('hidden')) {
            modalOverlay.classList.add('hidden');
        }
    };

    const openSettingsModal = () => {
        settingsModal.classList.remove('hidden');
        modalOverlay.classList.remove('hidden');
    };

    const closeSettingsModal = () => {
        settingsModal.classList.add('hidden');
        if (confirmModal.classList.contains('hidden')) {
            modalOverlay.classList.add('hidden');
        }
    };

    // --- Theme & Layout Management ---
    const applyTheme = (theme) => {
        const effectiveTheme = (theme === 'system')
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : theme;

        document.documentElement.setAttribute('data-theme', effectiveTheme);

        if (currentLayout === 'desktop') {
            if (effectiveTheme === 'dark') {
                body.classList.add('dynamic-background');
            } else {
                body.classList.remove('dynamic-background');
            }
        } else {
            body.classList.remove('dynamic-background');
        }

        document.querySelectorAll('input[name="theme"]').forEach(radio => {
            radio.checked = radio.value === theme;
        });

        const themeDropdown = document.getElementById('theme-dropdown');
        if (themeDropdown) {
            themeDropdown.querySelectorAll('.dropdown-item').forEach(item => {
                item.classList.toggle('active', item.dataset.themeValue === theme);
            });
            const themeIcon = document.querySelector('#theme-menu-btn .material-icons-outlined');
            if (themeIcon) {
                themeIcon.textContent = effectiveTheme === 'dark' ? 'dark_mode' : 'light_mode';
            }
        }

        document.querySelectorAll('.content-iframe, .app-window iframe').forEach(frame => {
            if (frame.contentWindow && frame.src && frame.contentDocument.readyState === 'complete') {
                frame.contentWindow.postMessage(`set-theme-${effectiveTheme}`, '*');
            }
        });
    };

    const switchLayout = (layout) => {
        if (layout === currentLayout) return;

        if (window.innerWidth < 1024 && layout === 'desktop') {
            showToast('Desktop-Ansicht ist nur auf größeren Bildschirmen verfügbar.', 'info');
            const designSelect = document.querySelector('#nav-design-select');
            if (designSelect) designSelect.value = 'sidebar';
            return;
        }

        if (currentLayout === 'sidebar') {
            iframeWrapper.innerHTML = '<div id="iframe-loader" class="hidden absolute inset-0 z-10 flex items-center justify-center"><img src="assets/loading/zzz-loading.gif" alt="Ladeanimation" class="w-30"></div>';
        } else if (currentLayout === 'desktop') {
            if (clockIntervalId) clearInterval(clockIntervalId);
            if (starfieldAnimationId) cancelAnimationFrame(starfieldAnimationId);
            clockIntervalId = null;
            starfieldAnimationId = null;
            desktop.innerHTML = '';
        }

        currentLayout = layout;
        localStorage.setItem('navigationDesign', layout);
        body.className = `${layout}-layout`;

        if (layout === 'sidebar') {
            initSidebarView();
        } else {
            initDesktopView();
        }

        applyTheme(localStorage.getItem('theme') || 'system');
        renderAppDock();

        const designSelect = document.querySelector('#nav-design-select');
        if (designSelect) designSelect.value = layout;
    };

    // --- Data Management ---
    const backupAllData = async () => {
        try {
            const zip = new JSZip();

            // Backup localStorage
            const localStorageData = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                localStorageData[key] = localStorage.getItem(key);
            }
            zip.file("localStorage.json", JSON.stringify(localStorageData, null, 2));

            // Generate the zip file
            const content = await zip.generateAsync({ type: "blob" });

            // Create a download link and trigger the download
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            link.download = `axismea-backup-${timestamp}.zip`;
            document.body.appendChild(link);
            link.click();

            // Clean up the link object
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

            showToast('Backup wurde erfolgreich erstellt.', 'success');
        } catch (error) {
            console.error("Backup failed:", error);
            showToast('Backup fehlgeschlagen. Siehe Konsole für Details.', 'error');
        }
    };

    const restoreAllData = (event) => { /* Placeholder */ };

    const deleteAllData = () => {
        openConfirmModal(
            'Alle Daten löschen?',
            'Möchten Sie wirklich ALLE Anwendungsdaten aus Ihrem Browser löschen? Diese Aktion kann nicht rückgängig gemacht werden!',
            () => {
                const savedTheme = localStorage.getItem('theme');
                const savedDesign = localStorage.getItem('navigationDesign');

                localStorage.clear();

                // Restore essential settings
                if (savedTheme) localStorage.setItem('theme', savedTheme);
                if (savedDesign) localStorage.setItem('navigationDesign', savedDesign);

                showToast('Alle Anwendungsdaten wurden gelöscht. Seite wird neu geladen.', 'success');
                setTimeout(() => window.location.reload(), 1500);
            }
        );
    };

    // --- Sidebar View Logic ---
    const initSidebarView = () => {
        const userApps = JSON.parse(localStorage.getItem('userApps') || '[]');
        const allApps = [...apps, ...userApps];

        allApps.forEach(app => {
            if (app.src) {
                const iframe = document.createElement('iframe');
                iframe.id = `frame-${app.id}`;
                iframe.dataset.key = app.id;
                iframe.className = 'content-iframe';
                if (app.id === 'appdrawer') {
                    iframe.src = app.src;
                } else {
                    iframe.dataset.src = app.src;
                }
                iframeWrapper.appendChild(iframe);
            }
        });

        const lastActiveTabId = localStorage.getItem('lastActiveTab') || 'frame-appdrawer';
        activateSidebarTab(lastActiveTabId);
    };

    const activateSidebarTab = (frameId) => {
        const targetFrame = document.getElementById(frameId);
        if (!targetFrame) return;

        document.querySelector('.content-iframe.active')?.classList.remove('active');
        document.querySelectorAll('.sidebar-link.active').forEach(l => l.classList.remove('active'));

        const targetLink = document.querySelector(`[data-target="${frameId}"]`);
        if (targetLink) {
            document.querySelectorAll(`a[data-target="${frameId}"], button[data-target="${frameId}"]`).forEach(l => l.classList.add('active'));
            mobileHeaderTitle.textContent = targetLink.querySelector('.sidebar-text')?.textContent || 'Dashboard';
        }

        const loader = document.getElementById('iframe-loader');
        if (!targetFrame.src) {
            if (loader) loader.style.display = 'flex';
            targetFrame.src = targetFrame.dataset.src;
            targetFrame.addEventListener('load', () => {
                if (loader) loader.style.display = 'none';
                targetFrame.classList.add('active');
                applyTheme(localStorage.getItem('theme') || 'system');
            }, { once: true });
        } else {
            targetFrame.classList.add('active');
        }
        localStorage.setItem('lastActiveTab', frameId);
    };

    // --- Desktop View Logic ---
    const initDesktopView = () => {
        iconPositions = JSON.parse(localStorage.getItem('desktopIconPositions')) || {};
        createDesktopIcons();
        updateClock();
        clockIntervalId = setInterval(updateClock, 1000);
        setupStarfield();
        animateStarfield();
    };

    const updateClock = () => {
        if (!clockElement) return;
        const now = new Date();
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        const dateString = now.toLocaleDateString('de-DE', dateOptions);
        const timeString = now.toLocaleTimeString('de-DE', timeOptions);
        clockElement.textContent = `${dateString} | ${timeString}`;
    };

    const createDesktopIcons = () => {
        desktop.innerHTML = '';
        apps.forEach((app, index) => {
            const icon = document.createElement('div');
            icon.id = `icon-${app.id}`;
            icon.className = 'desktop-icon';
            icon.innerHTML = `<span class="material-icons-outlined">${app.materialIcon}</span><span>${app.name}</span>`;

            if (iconPositions[icon.id]) {
                icon.style.top = iconPositions[icon.id].top;
                icon.style.left = iconPositions[icon.id].left;
            } else {
                const topOffset = 50;
                const leftOffset = 20;
                const iconSpacingY = 120;
                const iconsPerCol = Math.floor((window.innerHeight - topOffset - 70) / iconSpacingY);
                const col = Math.floor(index / iconsPerCol);
                const row = index % iconsPerCol;
                icon.style.top = `${topOffset + row * iconSpacingY}px`;
                icon.style.left = `${leftOffset + col * 120}px`;
            }

            desktop.appendChild(icon);
            makeIconDraggable(icon, app);
        });
    };

    const makeIconDraggable = (icon, app) => {
        let isDragging = false;
        let wasDragged = false;
        let offsetX, offsetY;
        icon.onmousedown = (e) => {
            wasDragged = false;
            isDragging = true;
            offsetX = e.clientX - icon.offsetLeft;
            offsetY = e.clientY - icon.offsetTop;

            const onMouseMove = (moveEvent) => {
                if (isDragging) {
                    wasDragged = true;
                    icon.style.left = `${moveEvent.clientX - offsetX}px`;
                    icon.style.top = `${moveEvent.clientY - offsetY}px`;
                }
            };

            const onMouseUp = () => {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                if (wasDragged) {
                    iconPositions[icon.id] = { top: icon.style.top, left: icon.style.left };
                    localStorage.setItem('desktopIconPositions', JSON.stringify(iconPositions));
                }
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        icon.onclick = (e) => {
            if (!wasDragged) {
                if (app.external) window.open(app.url, '_blank');
                else createWindow(app);
            }
        };
    };

    const createWindow = (app) => {
        const existingWindow = document.getElementById(`window-${app.id}`);
        if (existingWindow) {
            existingWindow.style.zIndex = ++highestZIndex;
            return;
        }

        const appWindow = document.createElement('div');
        appWindow.id = `window-${app.id}`;
        appWindow.className = 'app-window';
        appWindow.style.width = '80vw';
        appWindow.style.height = '70vh';
        appWindow.style.top = '10vh';
        appWindow.style.left = '10vw';
        appWindow.style.zIndex = ++highestZIndex;

        const iframe = document.createElement('iframe');
        iframe.src = app.src;
        iframe.className = 'h-full w-full';
        iframe.allow = "geolocation *; microphone *; camera *";

        iframe.addEventListener('load', () => {
            const currentTheme = localStorage.getItem('theme') || 'system';
            const effectiveTheme = (currentTheme === 'system')
                ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                : currentTheme;
            if (iframe.contentWindow) {
                iframe.contentWindow.postMessage(`set-theme-${effectiveTheme}`, '*');
            }
        });

        appWindow.innerHTML = `
            <div class="app-window-header">
                <h3>${app.name}</h3>
                <button class="close-window-btn p-1" data-id="${app.id}">&times;</button>
            </div>
            <div class="app-window-content"></div>
        `;
        appWindow.querySelector('.app-window-content').appendChild(iframe);

        desktop.appendChild(appWindow);
        openWindows.add(app.id);
        renderAppDock();

        appWindow.querySelector('.close-window-btn').onclick = () => {
            appWindow.remove();
            openWindows.delete(app.id);
            renderAppDock();
        };
    };

    const setupStarfield = () => {
        if (!starfieldCanvasEl) return;
        const canvas = starfieldCanvasEl;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    const animateStarfield = () => { /* Placeholder for brevity */ };

    // --- App Dock Logic ---
    const renderAppDock = () => {
        appDock.innerHTML = '';

        const favoriteIds = JSON.parse(localStorage.getItem('favoriteApps') || '[]');
        const userApps = JSON.parse(localStorage.getItem('userApps') || '[]');
        const allApps = [...apps, ...userApps];

        let dockApps = [];
        if (currentLayout === 'sidebar') {
            dockApps = favoriteIds.map(id => allApps.find(app => app.id === id)).filter(Boolean);
        } else {
            const openAppIds = new Set([...openWindows, ...minimizedWindows]);
            const openOrFavoriteApps = new Set([...favoriteIds, ...openAppIds]);
            dockApps = [...openOrFavoriteApps].map(id => allApps.find(app => app.id === id)).filter(Boolean);
        }

        dockApps.forEach(app => {
            const item = document.createElement('a');
            item.href = '#';
            item.className = 'dock-app-item';
            item.title = app.name;
            item.innerHTML = `<div class="dock-app-icon-wrapper"><img src="${app.icon || app.iconUrl}" alt="${app.name} Icon" class="dock-app-icon"></div>`;

            if (currentLayout === 'desktop') {
                if (openWindows.has(app.id)) item.classList.add('open');
                if (minimizedWindows.has(app.id)) item.classList.add('minimized');
            }

            item.onclick = (e) => {
                e.preventDefault();
                // If the app has a 'url' property, it's an external link or a user-added favorite.
                // Open it in a new tab.
                if (app.url) {
                    window.open(app.url, '_blank');
                } else if (currentLayout === 'sidebar') {
                    // It's an internal app, activate its tab.
                    activateSidebarTab(`frame-${app.id}`);
                } else {
                    // It's an internal app in desktop mode, create a window.
                    createWindow(app);
                }
            };
            appDock.appendChild(item);
        });
    };

    // --- UI Population & Event Listeners Setup ---
    const populateAndBindUI = () => {
        // Populate Sidebar and Mobile Menu Nav Links
        let navLinksHTML = '';
        apps.forEach(app => {
            navLinksHTML += `
                <li>
                    <a href="${app.url || '#'}" ${app.external ? 'target="_blank" rel="noopener noreferrer"' : `data-target="frame-${app.id}"`} class="sidebar-link flex items-center p-3 rounded-lg">
                        <span class="material-icons-outlined flex-shrink-0 flex items-center justify-center">${app.materialIcon}</span>
                        <span class="sidebar-text font-medium">${app.name}</span>
                    </a>
                </li>`;
        });
        sidebarNavLinks.innerHTML = navLinksHTML;
        mobileNavLinksContainer.innerHTML = sidebarNavLinks.innerHTML + `<li><button data-action="open-settings" class="sidebar-link w-full flex items-center p-3 rounded-lg"><span class="material-icons-outlined flex-shrink-0 flex items-center justify-center">settings</span><span class="ml-3 font-medium">Einstellungen</span></button></li>`;

        // Populate Settings Modal
        document.getElementById('theme-settings').innerHTML = `
            <div><input type="radio" name="theme" id="theme-light" value="light" class="theme-radio-peer hidden"><label for="theme-light" class="theme-radio-label flex items-center justify-center w-full p-3 rounded-lg cursor-pointer"><span class="material-icons-outlined mr-2">light_mode</span><span>Light</span></label></div>
            <div><input type="radio" name="theme" id="theme-dark" value="dark" class="theme-radio-peer hidden"><label for="theme-dark" class="theme-radio-label flex items-center justify-center w-full p-3 rounded-lg cursor-pointer"><span class="material-icons-outlined mr-2">dark_mode</span><span>Dark</span></label></div>
            <div><input type="radio" name="theme" id="theme-system" value="system" class="theme-radio-peer hidden"><label for="theme-system" class="theme-radio-label flex items-center justify-center w-full p-3 rounded-lg cursor-pointer"><span class="material-icons-outlined mr-2">desktop_windows</span><span>System</span></label></div>`;

        document.getElementById('design-settings').innerHTML = `
            <div class="select-label relative flex items-center w-full p-3 rounded-lg">
                <span class="material-icons-outlined mr-2">view_sidebar</span>
                <select id="nav-design-select" class="select-input appearance-none w-full bg-transparent outline-none cursor-pointer text-[var(--text-color)]">
                    <option value="sidebar">Seitenleiste</option>
                    <option value="desktop">Desktop</option>
                </select>
            </div>`;

        document.getElementById('data-management-settings').innerHTML = `
            <button id="backup-btn" class="w-full text-white font-semibold rounded-md px-6 py-2.5 bg-blue-600 hover:bg-blue-700">Backup All</button>
            <input type="file" id="restore-input" class="hidden" accept=".zip">
            <label for="restore-input" class="w-full text-center block cursor-pointer text-white font-semibold rounded-md px-6 py-2.5 bg-green-600 hover:bg-green-700">Restore All</label>
            <button id="delete-btn" class="w-full text-white font-semibold rounded-md px-6 py-2.5 bg-red-600 hover:bg-red-700">Delete All</button>`;

        // Populate Top Bar Menus
        topBarMenusContainer.innerHTML = `
            <div class="top-bar-menu">
                <button id="theme-menu-btn" class="p-1 rounded-full hover:bg-gray-500/20">
                    <span class="material-icons-outlined">light_mode</span>
                </button>
                <div id="theme-dropdown" class="dropdown-menu hidden">
                    <div class="dropdown-item" data-theme-value="light"><span class="material-icons-outlined mr-2">light_mode</span><span>Light</span></div>
                    <div class="dropdown-item" data-theme-value="dark"><span class="material-icons-outlined mr-2">dark_mode</span><span>Dark</span></div>
                    <div class="dropdown-item" data-theme-value="system"><span class="material-icons-outlined mr-2">desktop_windows</span><span>System</span></div>
                </div>
            </div>
            <div class="top-bar-menu">
                <button id="design-menu-btn" class="p-1 rounded-full hover:bg-gray-500/20">
                    <span class="material-icons-outlined">view_sidebar</span>
                </button>
                <div id="design-dropdown" class="dropdown-menu hidden">
                    <div class="dropdown-item" data-design-value="desktop"><span class="material-icons-outlined mr-2">grid_view</span><span>Desktop</span></div>
                    <div class="dropdown-item" data-design-value="sidebar"><span class="material-icons-outlined mr-2">view_sidebar</span><span>Seitenleiste</span></div>
                </div>
            </div>
             <div class="top-bar-menu">
                <button id="data-menu-btn" class="p-1 rounded-full hover:bg-gray-500/20">
                    <span class="material-icons-outlined">storage</span>
                </button>
                <div id="data-dropdown" class="dropdown-menu hidden">
                   <div id="backup-btn-top" class="dropdown-item"><span class="material-icons-outlined mr-2">file_download</span><span>Backup All</span></div>
                   <label for="restore-input-top" class="dropdown-item cursor-pointer"><span class="material-icons-outlined mr-2">file_upload</span><span>Restore All</span></label>
                   <input type="file" id="restore-input-top" class="hidden" accept=".zip">
                   <div class="dropdown-separator"></div>
                   <div id="delete-btn-top" class="dropdown-item text-red-500 hover:!bg-red-500 hover:!text-white"><span class="material-icons-outlined mr-2">delete</span><span>Delete All</span></div>
                </div>
            </div>
        `;

        // Bind Event Listeners
        document.getElementById('close-modal-btn').addEventListener('click', closeSettingsModal);
        modalOverlay.addEventListener('click', () => { closeSettingsModal(); closeConfirmModal(); });

        document.querySelectorAll('input[name="theme"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                localStorage.setItem('theme', e.target.value);
                applyTheme(e.target.value);
            });
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (localStorage.getItem('theme') === 'system') applyTheme('system'); });
        document.getElementById('nav-design-select').addEventListener('change', (e) => switchLayout(e.target.value));

        document.getElementById('backup-btn').addEventListener('click', backupAllData);
        document.getElementById('restore-input').addEventListener('change', restoreAllData);
        document.getElementById('delete-btn').addEventListener('click', deleteAllData);

        document.getElementById('hamburger-btn').addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.add('open');
            document.getElementById('mobile-menu-overlay').classList.remove('hidden');
        });
        document.getElementById('close-mobile-menu-btn').addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.remove('open');
            document.getElementById('mobile-menu-overlay').classList.add('hidden');
        });

        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('a, button');
            const dropdownItem = e.target.closest('.dropdown-item');
            const topMenuBtn = e.target.closest('.top-bar-menu > button');

            if (topMenuBtn) {
                e.stopPropagation();
                const dropdown = topMenuBtn.nextElementSibling;
                const isHidden = dropdown.classList.contains('hidden');
                document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.add('hidden'));
                if (isHidden) dropdown.classList.remove('hidden');
                return;
            }

            if (dropdownItem) {
                const parentDropdown = dropdownItem.closest('.dropdown-menu');
                if (parentDropdown.id === 'theme-dropdown') {
                    const theme = dropdownItem.dataset.themeValue;
                    localStorage.setItem('theme', theme);
                    applyTheme(theme);
                } else if (parentDropdown.id === 'design-dropdown') {
                    switchLayout(dropdownItem.dataset.designValue);
                } else if (parentDropdown.id === 'data-dropdown') {
                    if (dropdownItem.id === 'backup-btn-top') backupAllData();
                    else if (dropdownItem.id === 'delete-btn-top') deleteAllData();
                }
                parentDropdown.classList.add('hidden');
                return;
            }

            if (!e.target.closest('.top-bar-menu')) {
                document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.add('hidden'));
            }

            if (!link) return;

            if (link.dataset.action === 'open-settings') {
                e.preventDefault();
                openSettingsModal();
                if (document.getElementById('mobile-menu').classList.contains('open')) {
                    document.getElementById('mobile-menu').classList.remove('open');
                    document.getElementById('mobile-menu-overlay').classList.add('hidden');
                }
                return;
            }

            if (link.closest('#sidebar') || link.closest('#mobile-menu')) {
                if (link.dataset.target && !link.hasAttribute('target')) {
                    e.preventDefault();
                    activateSidebarTab(link.dataset.target);
                    if (document.getElementById('mobile-menu').classList.contains('open')) {
                        document.getElementById('mobile-menu').classList.remove('open');
                        document.getElementById('mobile-menu-overlay').classList.add('hidden');
                    }
                }
            }
        });

        document.getElementById('restore-input-top')?.addEventListener('change', restoreAllData);

        window.addEventListener('storage', (e) => {
            if (e.key === 'favoriteApps' || e.key === 'userApps') renderAppDock();
        });
    };

    // --- INITIALIZATION ---
    const initialize = () => {
        populateAndBindUI();

        const savedDesign = window.innerWidth < 1024 ? 'sidebar' : (localStorage.getItem('navigationDesign') || 'sidebar');
        const savedTheme = localStorage.getItem('theme') || 'system';

        const themeRadio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
        if (themeRadio) themeRadio.checked = true;

        const designSelect = document.getElementById('nav-design-select');
        if (designSelect) designSelect.value = savedDesign;

        switchLayout(savedDesign);
    };

    initialize();
});
