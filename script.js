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
    const mobileSidebarOverlay = document.getElementById('mobile-sidebar-overlay');
    const mobileNavList = document.getElementById('mobile-nav-list');

    const openMobileSidebar = () => {
        mobileSidebar.classList.add('open');
        mobileSidebarOverlay.classList.remove('hidden');
    };

    const closeMobileSidebar = () => {
        mobileSidebar.classList.remove('open');
        mobileSidebarOverlay.classList.add('hidden');
    };

    if (mobileMenuFab) {
        mobileMenuFab.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileSidebar.classList.contains('open')) {
                closeMobileSidebar();
            } else {
                openMobileSidebar();
            }
        });
    }

    if (mobileSidebarOverlay) {
        mobileSidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    // --- NAVIGATION SETUP ---
    const navItems = [
        { key: 'appdrawer', href: 'components/appdrawer/appdrawer.html', icon: 'assets/icons/appdrawer.svg', text: 'Appdrawer' },
        { key: 'aurimea', target: 'frame-aurimea', href: 'components/aurimea/aurimea.html', icon: 'assets/icons/aurimea.svg', text: 'AuriMea' },
        { key: 'readlater', target: 'frame-readlater', href: 'components/readlater/readlater.html', icon: 'assets/icons/readlater.svg', text: 'ReadlateR' },
        { key: 'rss', target: 'frame-rss', href: 'components/rss-reader/rss-reader.html', icon: 'assets/icons/rss.svg', text: 'RSS Reader' },
        { key: 'memomea', target: 'frame-memomea', href: 'components/memomea/memomea.html', icon: 'assets/icons/memomea.svg', text: 'MemoMea' },
        { key: 'actamea', target: 'frame-actamea', href: 'components/actamea/actamea.html', icon: 'assets/icons/notes.svg', text: 'ActaMea' },
        { key: 'agenda', target: 'frame-agenda', href: 'components/agenda/agenda.html', icon: 'assets/icons/agenda.svg', text: 'Agenda' },
        { key: 'habitmea', target: 'frame-habitmea', href: 'components/habitmea/habitmea.html', icon: 'assets/icons/habitmea.svg', text: 'HabitMea' },
        { key: 'widgets', target: 'frame-widgets', href: 'components/widgets-collection/widgets-collection.html', icon: 'assets/icons/widgets.svg', text: 'Widgets' },
        { key: 'unicorn', href: 'unicorn/work-tools.html', icon: 'assets/icons/unicorn.svg', text: 'Unicorn', isExternal: true },
        { key: 'settings', target: 'settings-modal', icon: 'assets/icons/settings.svg', text: 'Einstellungen' }
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
        showToast('Backup wird gestartet...', 'info', 0); // Show indefinite toast

        const contentFrames = Array.from(document.querySelectorAll('.content-iframe')).filter(f => f.dataset.key && f.dataset.key !== 'widgets' && f.dataset.key !== 'agenda');
        const appdrawerIframe = document.getElementById('frame-appdrawer');
        const framesToBackup = [...contentFrames];
        if (appdrawerIframe) {
            framesToBackup.push(appdrawerIframe);
        }

        if (framesToBackup.length === 0) {
            showToast('Keine Apps zum Sichern gefunden.', 'info');
            return;
        }

        let backupData = {};
        const failedApps = [];

        for (const frame of framesToBackup) {
            const key = frame.dataset.key;
            showToast(`Sichere ${key}...`, 'info', 0);

            try {
                // 1. Load iframe if not already loaded
                if (!frame.src) {
                    await new Promise((resolve, reject) => {
                        frame.addEventListener('load', resolve, { once: true });
                        frame.addEventListener('error', () => reject(new Error(`Failed to load ${key}`)), { once: true });
                        frame.src = frame.dataset.src;
                        setTimeout(() => reject(new Error(`Timeout loading ${key}`)), 8000); // 8-second timeout per frame
                    });
                }

                // Special handling for habitmea to wait for its API
                if (key === 'habitmea') {
                    await new Promise((resolve, reject) => {
                        const interval = 100;
                        const timeout = 5000;
                        let elapsedTime = 0;
                        const checkApi = setInterval(() => {
                            if (frame.contentWindow && frame.contentWindow.HabitMeaAPI) {
                                clearInterval(checkApi);
                                resolve();
                            } else {
                                elapsedTime += interval;
                                if (elapsedTime >= timeout) {
                                    clearInterval(checkApi);
                                    reject(new Error(`Timeout waiting for HabitMeaAPI on ${key}`));
                                }
                            }
                        }, interval);
                    });
                }

                // 2. Request backup data and wait for its specific response
                await new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(() => {
                        window.removeEventListener('message', specificMessageListener);
                        reject(new Error(`Timeout waiting for backup response from ${key}`));
                    }, 5000); // 5-second timeout for response

                    const specificMessageListener = (event) => {
                        const { type, key: responseKey, data } = event.data;
                        if (type === 'backupDataResponse' && responseKey === key) {
                            if (data) {
                                backupData[key] = data;
                                console.log(`Backup data received for: ${key}`);
                            }
                            clearTimeout(timeoutId);
                            window.removeEventListener('message', specificMessageListener);
                            resolve();
                        }
                    };
                    
                    window.addEventListener('message', specificMessageListener);
                    frame.contentWindow?.postMessage({ type: 'backupDataRequest' }, '*');
                });

            } catch (error) {
                console.error(`Failed to backup ${key}:`, error);
                failedApps.push(key);
            }
        }

        // 3. Create ZIP file
        if (Object.keys(backupData).length > 0) {
            createAndDownloadZip(backupData);
        } else {
            showToast('Keine Daten zum Sichern gefunden.', 'info');
        }

        if (failedApps.length > 0) {
            showToast(`Backup abgeschlossen. Fehler bei: ${failedApps.join(', ')}`, 'error', 8000);
        } else if (Object.keys(backupData).length > 0) {
            showToast('Backup erfolgreich abgeschlossen!', 'success');
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
                        let frame = document.querySelector(`.content-iframe[data-key="${key}"]`);
                        if (!frame && key === 'appdrawer') {
                            frame = document.getElementById('frame-appdrawer');
                        }
                        if (frame) {
                            const content = await zip.file(filename).async('string');
                            const dataToRestore = JSON.parse(content);
                            const sendMessageOnLoad = async () => {
                                if (key === 'habitmea') {
                                    await new Promise((resolve, reject) => {
                                        const interval = 100;
                                        const timeout = 5000;
                                        let elapsedTime = 0;
                                        const checkApi = setInterval(() => {
                                            if (frame.contentWindow && frame.contentWindow.HabitMeaAPI) {
                                                clearInterval(checkApi);
                                                resolve();
                                            } else {
                                                elapsedTime += interval;
                                                if (elapsedTime >= timeout) {
                                                    clearInterval(checkApi);
                                                    reject(new Error(`Timeout waiting for HabitMeaAPI on ${key}`));
                                                }
                                            }
                                        }, interval);
                                    });
                                }
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

            element.innerHTML = `<img src="${item.icon}" alt="${item.text}" class="dock-icon">`;
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
            closeMobileSidebar();
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
                <img src="${item.icon}" alt="${item.text}" class="mobile-nav-icon mr-4">
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
    function preloadAppdrawer() {
        if (appdrawerFrame && !appdrawerFrame.src) {
            console.log('Preloading Appdrawer...');
            appdrawerFrame.addEventListener('load', () => {
                const savedTheme = localStorage.getItem('theme') || 'system';
                applyThemeToFrame(appdrawerFrame, savedTheme);
                console.log('Appdrawer preloaded.');
            }, { once: true });
            appdrawerFrame.src = appdrawerFrame.dataset.src;
        }
    }

    renderAppDock();
    renderMobileSidebar();
    startClock();
    preloadAppdrawer(); // Appdrawer im Hintergrund laden

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
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.querySelector(`input[name="theme"][value="${savedTheme}"]`)?.setAttribute('checked', 'true');
    applyTheme(savedTheme);

    let lastActiveTabId = localStorage.getItem('lastActiveTab');
    if (!lastActiveTabId || lastActiveTabId === 'frame-appdrawer') {
        lastActiveTabId = 'frame-actamea';
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