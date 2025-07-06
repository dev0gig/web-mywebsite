document.addEventListener('DOMContentLoaded', () => {
    // Core elements
    const iframeLoader = document.getElementById('iframe-loader');
    const appDock = document.getElementById('app-dock');
    const settingsModal = document.getElementById('settings-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const notificationToast = document.getElementById('notification-toast');

    // --- Appdrawer Modal Elements ---
    const appdrawerModal = document.getElementById('appdrawer-modal');
    const appdrawerFrame = document.getElementById('frame-appdrawer');
    const appdrawerLoader = document.getElementById('appdrawer-loader');

    // Settings modal elements
    const backupAllBtn = document.getElementById('backup-all-btn');
    const restoreAllInput = document.getElementById('restore-all-input');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const themeRadios = document.querySelectorAll('input[name="theme"]');

    const mobileMenuFab = document.getElementById('mobile-menu-fab');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const mobileNavList = document.getElementById('mobile-nav-list');

    if (mobileMenuFab && mobileSidebar) {
        mobileMenuFab.addEventListener('click', () => {
            mobileSidebar.classList.toggle('open');
        });
    }
    if (closeSidebarBtn && mobileSidebar) {
        closeSidebarBtn.addEventListener('click', () => {
            mobileSidebar.classList.remove('open');
        });
    }
    // Optional: Sidebar schließen bei Klick außerhalb
    document.addEventListener('click', (e) => {
        if (
            mobileSidebar.classList.contains('open') &&
            !e.target.closest('#mobile-sidebar') &&
            !e.target.closest('#mobile-menu-fab')
        ) {
            mobileSidebar.classList.remove('open');
        }
    });

    // --- NAVIGATION SETUP ---
    const navItems = [
        { key: 'aurimea', target: 'frame-aurimea', href: 'components/aurimea/aurimea.html', icon: 'savings', text: 'AuriMea' },
        { key: 'appdrawer', href: 'components/appdrawer/appdrawer.html', icon: 'apps', text: 'Appdrawer' },
        { key: 'readlater', target: 'frame-readlater', href: 'components/readlater/readlater.html', icon: 'bookmark', text: 'ReadlateR' },
        { key: 'rss', target: 'frame-rss', href: 'components/rss-reader/rss-reader.html', icon: 'rss_feed', text: 'RSS Reader' },
        { key: 'memomea', target: 'frame-memomea', href: 'components/memomea/memomea.html', icon: 'book_ribbon', text: 'MemoMea' },
        { key: 'actamea', target: 'frame-actamea', href: 'components/actamea/actamea.html', icon: 'edit_note', text: 'ActaMea' },
        { key: 'widgets', target: 'frame-widgets', href: 'components/widgets-collection/widgets-collection.html', icon: 'widgets', text: 'Widgets' },
        { key: 'unicorn', href: 'unicorn/work-tools.html', icon: 'business_center', text: 'Unicorn', isExternal: true },
        { key: 'settings', target: 'settings-modal', icon: 'settings', text: 'Einstellungen' }
    ];

    // --- NEU: Suchfunktion ---
    const performSearch = () => {
        const input = document.getElementById('dock-search-input');
        const query = input.value.trim();
        if (query) {
            const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(url, '_blank', 'noopener,noreferrer');
            input.value = ''; // Feld nach der Suche leeren
            input.blur(); // Fokus vom Feld nehmen
        }
    };

    // --- MODAL & TOAST FUNCTIONS ---
    const toggleAppdrawer = () => {
        const isHidden = appdrawerModal.classList.contains('hidden');
        const appdrawerLink = document.querySelector('.dock-link[data-key="appdrawer"]');

        if (isHidden) {
            if (!appdrawerFrame.src) {
                appdrawerLoader.classList.remove('hidden');
                appdrawerFrame.addEventListener('load', () => {
                    const savedTheme = localStorage.getItem('theme') || 'system';
                    applyThemeToFrame(appdrawerFrame, savedTheme);
                    appdrawerLoader.classList.add('hidden');
                }, { once: true });
                appdrawerFrame.src = appdrawerFrame.dataset.src;
            }
            appdrawerModal.classList.remove('hidden');
            modalOverlay.classList.remove('hidden'); // Overlay anzeigen
            appdrawerLink?.classList.add('active');
            // Fokus auf das Suchfeld im Iframe setzen
            setTimeout(() => {
                appdrawerFrame.contentWindow.postMessage({ type: 'focusSearch' }, '*');
            }, 100); // Kleine Verzögerung, um sicherzustellen, dass der Iframe bereit ist
        } else {
            appdrawerModal.classList.add('hidden');
            modalOverlay.classList.add('hidden'); // Overlay ausblenden
            appdrawerLink?.classList.remove('active');
        }
    };

    const openConfirmModal = (title, text, onConfirm) => {
        const confirmModal = document.getElementById('confirm-modal');
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
    };

    const closeConfirmModal = () => {
        document.getElementById('confirm-modal').classList.add('hidden');
    };

    document.getElementById('confirm-modal-cancel-btn').addEventListener('click', closeConfirmModal);

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

    const openSettingsModal = () => {
        settingsModal.classList.remove('hidden');
        modalOverlay.classList.remove('hidden');
    };
    const closeSettingsModal = () => {
        settingsModal.classList.add('hidden');
        modalOverlay.classList.add('hidden');
    };

    // --- DATA MANAGEMENT FUNCTIONS ---
    const createAndDownloadZip = (backupData) => {
        const zip = new JSZip();
        let filesAdded = 0;
        for (const key in backupData) {
            if (backupData[key] !== null && backupData[key] !== undefined) {
                zip.file(`${key}.json`, JSON.stringify(backupData[key], null, 2));
                filesAdded++;
            }
        }
        if (filesAdded === 0) {
            showToast('Keine Daten zum Sichern gefunden.', 'info');
            return;
        }
        zip.generateAsync({ type: "blob" })
            .then(content => {
                const link = document.createElement('a');
                const date = new Date().toISOString().slice(0, 10);
                link.href = URL.createObjectURL(content);
                link.download = `dashboard-backup-${date}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
                showToast('Backup erfolgreich heruntergeladen!', 'success');
            })
            .catch(err => {
                console.error('Zip generation failed:', err);
                showToast('Backup-Erstellung fehlgeschlagen.', 'error');
            });
    };

    const backupAllData = async () => {
        showToast('Backup wird gestartet...', 'info', 0);
        const framesToBackup = Array.from(document.querySelectorAll('.content-iframe')).filter(f => f.dataset.key && f.dataset.key !== 'widgets');
        if (framesToBackup.length === 0) {
            showToast('Keine Apps zum Sichern gefunden.', 'info');
            return;
        }
        const loadingPromises = framesToBackup.map(frame => new Promise((resolve, reject) => {
            if (frame.src && frame.contentWindow) resolve(frame);
            else {
                frame.addEventListener('load', () => resolve(frame), { once: true });
                frame.addEventListener('error', () => reject(new Error(`Failed to load ${frame.dataset.key}`)), { once: true });
                frame.src = frame.dataset.src;
            }
        }));
        try {
            await Promise.race([Promise.all(loadingPromises), new Promise((_, reject) => setTimeout(() => reject(new Error('Iframe loading timed out')), 10000))]);
            let backupData = {};
            let expectedResponses = framesToBackup.length;
            let receivedResponses = 0;
            const backupTimeoutId = setTimeout(() => {
                window.removeEventListener('message', messageListener);
                const missingKeys = framesToBackup.map(f => f.dataset.key).filter(k => !Object.keys(backupData).includes(k));
                if (missingKeys.length > 0) showToast('Backup-Timeout. Folgende Apps haben nicht geantwortet: ' + missingKeys.join(', '), 'error', 8000);
                if (Object.keys(backupData).length > 0) createAndDownloadZip(backupData);
            }, 10000);
            const messageListener = (event) => {
                const { type, key, data } = event.data;
                if (type === 'backupDataResponse') {
                    if (key) backupData[key] = data;
                    receivedResponses++;
                    if (receivedResponses === expectedResponses) {
                        clearTimeout(backupTimeoutId);
                        window.removeEventListener('message', messageListener);
                        createAndDownloadZip(backupData);
                    }
                }
            };
            window.addEventListener('message', messageListener);
            framesToBackup.forEach(frame => frame.contentWindow?.postMessage({ type: 'getBackupData' }, '*'));
        } catch (error) {
            console.error('Backup failed:', error);
            showToast(`Fehler beim Laden der Apps für das Backup: ${error.message}`, 'error');
        }
    };

    const restoreAllData = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const zip = await JSZip.loadAsync(e.target.result);
                let restoredCount = 0;
                for (const filename of Object.keys(zip.files)) {
                    if (filename.endsWith('.json')) {
                        const key = filename.replace('.json', '');
                        const frame = document.querySelector(`.content-iframe[data-key="${key}"]`);
                        if (frame) {
                            const content = await zip.file(filename).async('string');
                            const dataToRestore = JSON.parse(content);
                            const sendMessageOnLoad = () => {
                                frame.contentWindow.postMessage({ type: 'restoreBackupData', data: dataToRestore }, '*');
                                frame.removeEventListener('load', sendMessageOnLoad);
                            };
                            if (!frame.src) {
                                frame.addEventListener('load', sendMessageOnLoad);
                                frame.src = frame.dataset.src;
                            } else {
                                sendMessageOnLoad();
                            }
                            restoredCount++;
                        }
                    }
                }
                showToast(`${restoredCount} App(s) erfolgreich wiederhergestellt. Die Seiten werden neu geladen.`, 'success');
                setTimeout(() => window.location.reload(), 2000);
            } catch (err) {
                console.error('Restore failed:', err);
                showToast('Wiederherstellung fehlgeschlagen. Ist es eine gültige Backup-Datei?', 'error');
            }
        };
        reader.readAsArrayBuffer(file);
        restoreAllInput.value = '';
    };

    const deleteAllData = () => {
        openConfirmModal(
            'Alle Daten löschen?',
            'Möchten Sie wirklich ALLE Anwendungsdaten aus Ihrem Browser löschen? Diese Aktion kann nicht rückgängig gemacht werden!',
            () => {
                localStorage.clear();
                showToast('Alle Daten wurden gelöscht. Die Seite wird neu geladen.', 'success');
                setTimeout(() => window.location.reload(), 1500);
            }
        );
    };

    // --- THEME MANAGEMENT ---
    function applyThemeToFrame(frame, theme) {
        let effectiveTheme = (theme === 'system') ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
        if (frame.contentWindow) {
            frame.contentWindow.postMessage(`set-theme-${effectiveTheme}`, '*');
        }
    }

    function applyTheme(theme) {
        let effectiveTheme = (theme === 'system') ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
        document.documentElement.setAttribute('data-theme', effectiveTheme);
        document.querySelectorAll('iframe').forEach(frame => {
            if (frame.src) applyThemeToFrame(frame, theme);
        });
    }

    // --- CORE NAVIGATION LOGIC ---
    function activateTab(frameId) {
        const targetFrame = document.getElementById(frameId);
        const currentActiveFrame = document.querySelector('.content-iframe.active');

        if (!targetFrame || (currentActiveFrame && currentActiveFrame.id === frameId)) {
            return;
        }

        currentActiveFrame?.classList.remove('active');
        document.querySelectorAll('.dock-link.active').forEach(l => l.classList.remove('active'));

        const targetLink = document.querySelector(`#app-dock [data-target="${frameId}"]`);
        targetLink?.classList.add('active');

        if (!targetFrame.src) {
            iframeLoader.style.backgroundColor = getComputedStyle(document.body).getPropertyValue('--bg-color');
            iframeLoader.classList.remove('hidden');

            targetFrame.addEventListener('load', () => {
                setTimeout(() => {
                    iframeLoader.classList.add('hidden');
                    targetFrame.classList.add('active');
                }, 500);

                const savedTheme = localStorage.getItem('theme') || 'system';
                applyThemeToFrame(targetFrame, savedTheme);
            }, { once: true });

            targetFrame.src = targetFrame.dataset.src;
        } else {
            targetFrame.classList.add('active');
        }
        if (!appdrawerModal.classList.contains('hidden')) {
            toggleAppdrawer();
        }
    }

    function handleNavLinkClick(e) {
        const target = e.currentTarget;

        if (target.dataset.key === 'appdrawer') {
            e.preventDefault();
            toggleAppdrawer();
        } else if (target.dataset.key === 'settings') {
            e.preventDefault();
            openSettingsModal();
        } else if (target.dataset.external) {
            // Let it open in a new tab
        } else {
            e.preventDefault();
            const targetFrameId = target.dataset.target;
            if (!targetFrameId) return;

            localStorage.setItem('lastActiveTab', targetFrameId);
            activateTab(targetFrameId);
        }
    }

    const renderAppDock = () => {
        appDock.innerHTML = '';

        const appdrawerItem = navItems.find(item => item.key === 'appdrawer');
        const settingsItem = navItems.find(item => item.key === 'settings');
        const middleItems = navItems.filter(item => item.key !== 'appdrawer' && item.key !== 'settings');

        const createDockElement = (item) => {
            const element = document.createElement(item.isExternal ? 'a' : 'button');
            element.className = 'dock-link';
            element.dataset.key = item.key;
            element.title = item.text;

            if (item.isExternal) {
                element.href = item.href;
                element.target = '_blank';
                element.rel = 'noopener noreferrer';
            } else {
                if (item.target) {
                    element.dataset.target = item.target;
                }
                element.addEventListener('click', handleNavLinkClick);
            }

            element.innerHTML = `<span class="material-symbols-outlined">${item.icon}</span>`;
            return element;
        };

        // --- UMSTRUKTURIERT ---

        // Group 1: Linke Gruppe (Appdrawer & Suche)
        const leftGroup = document.createElement('div');
        leftGroup.className = 'dock-left-group';

        if (appdrawerItem) {
            leftGroup.appendChild(createDockElement(appdrawerItem));
        }

        const searchContainer = document.createElement('div');
        searchContainer.id = 'dock-search-container';
        const searchInput = document.createElement('input');
        searchInput.type = 'search';
        searchInput.id = 'dock-search-input';
        searchInput.placeholder = 'Google Suche...';
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') performSearch();
        });
        const searchBtn = document.createElement('button');
        searchBtn.id = 'dock-search-btn';
        searchBtn.title = 'Suchen';
        searchBtn.innerHTML = `<span class="material-symbols-outlined">travel_explore</span>`;
        searchBtn.addEventListener('click', performSearch);
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchBtn);
        leftGroup.appendChild(searchContainer);

        appDock.appendChild(leftGroup);


        // Group 2: Mittlere Gruppe ( unverändert)
        const centerGroup = document.createElement('div');
        centerGroup.className = 'dock-center-group';
        middleItems.forEach(item => {
            centerGroup.appendChild(createDockElement(item));
        });
        appDock.appendChild(centerGroup);


        // Group 3: Rechte Gruppe (ohne Suche)
        const rightGroup = document.createElement('div');
        rightGroup.className = 'dock-right-group';

        const clockElement = document.createElement('div');
        clockElement.id = 'dock-clock';
        rightGroup.appendChild(clockElement);

        if (settingsItem) {
            rightGroup.appendChild(createDockElement(settingsItem));
        }

        appDock.appendChild(rightGroup);
    };
    
    function handleMobileNavLinkClick(e) {
        handleNavLinkClick(e);
        if (mobileSidebar.classList.contains('open')) {
            mobileSidebar.classList.remove('open');
        }
    }
    
    const renderMobileSidebar = () => {
        if (!mobileNavList) return;
        mobileNavList.innerHTML = '';
    
        navItems.forEach(item => {
            const element = document.createElement(item.isExternal ? 'a' : 'button');
            element.className = 'mobile-nav-link flex items-center w-full p-4 text-lg rounded-lg transition-colors';
            element.dataset.key = item.key;
            element.title = item.text;
    
            if (item.isExternal) {
                element.href = item.href;
                element.target = '_blank';
                element.rel = 'noopener noreferrer';
            } else {
                if (item.target) {
                    element.dataset.target = item.target;
                }
                element.addEventListener('click', handleMobileNavLinkClick);
            }
    
            element.innerHTML = `
                <span class="material-symbols-outlined mr-4">${item.icon}</span>
                <span>${item.text}</span>
            `;
            mobileNavList.appendChild(element);
        });
    };

    // --- CLOCK FUNCTION ---
    const startClock = () => {
        const clockElement = document.getElementById('dock-clock');
        if (!clockElement) return;

        const updateTime = () => {
            const now = new Date();
            const dateOptions = {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            };
            const timeOptions = {
                hour: '2-digit',
                minute: '2-digit'
            };
            const dateString = now.toLocaleDateString('de-AT', dateOptions);
            const timeString = now.toLocaleTimeString('de-AT', timeOptions);

            clockElement.textContent = `${dateString}, ${timeString}`;
        };

        updateTime();
        setInterval(updateTime, 10000);
    };


    // --- INITIALIZATION ---
    renderAppDock();
    renderMobileSidebar();
    startClock();

    // Event Listeners for settings
    closeModalBtn.addEventListener('click', closeSettingsModal);
    modalOverlay.addEventListener('click', () => {
        if (!settingsModal.classList.contains('hidden')) {
            closeSettingsModal();
        }
        if (!appdrawerModal.classList.contains('hidden')) {
            toggleAppdrawer();
        }
    });
    backupAllBtn.addEventListener('click', backupAllData);
    restoreAllInput.addEventListener('change', restoreAllData);
    deleteAllBtn.addEventListener('click', deleteAllData);

    // Theme setup
    themeRadios.forEach(radio => radio.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        localStorage.setItem('theme', selectedTheme);
        applyTheme(selectedTheme);
    }));
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (localStorage.getItem('theme') === 'system') applyTheme('system'); });

    // Set initial state from localStorage
    const savedTheme = localStorage.getItem('theme') || 'system';
    document.querySelector(`input[name="theme"][value="${savedTheme}"]`)?.setAttribute('checked', 'true');
    applyTheme(savedTheme);

    let lastActiveTabId = localStorage.getItem('lastActiveTab');
    if (!lastActiveTabId || lastActiveTabId === 'frame-appdrawer') {
        lastActiveTabId = 'frame-widgets';
    }
    activateTab(lastActiveTabId);

    // Die alten Event-Listener zum Schließen bei Klick außerhalb werden durch das Overlay überflüssig und können entfernt werden.

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});