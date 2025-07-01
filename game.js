       // Fonction utilitaire pour fermer le modal d'événement
        function closeEventModal() {
            const modal = document.getElementById('eventModal');
            if (modal) {
                modal.style.display = 'none';
            }
        }

        // ========== CONSTANTES ==========
        const GAME_STATES = {
            EXPLORING: 'exploring',
            COMBAT: 'combat',
            SHOPPING: 'shopping',
            GAME_OVER: 'game_over'
        };

const localImageEvents = {
    combat: {
        goblin: { image: 'images/enemies/gobelin.png', title: 'Un Goblin Apparaît !', description: 'Un goblin sournois sort de derrière un rocher !', className: 'popup-combat' },
        dragon: { image: 'images/enemies/dragon.png', title: 'DRAGON ANCIEN !', description: 'Le dragon rugit, ses écailles brillent !', className: 'popup-combat' },
        orc: { image: 'images/enemies/orc.png', title: 'Un Orc Sauvage !', description: 'Un orc féroce brandit sa hache !', className: 'popup-combat' },
        troll: { image: 'images/enemies/troll.png', title: 'Un Troll Énorme !', description: 'Le troll grogne, prêt à attaquer !', className: 'popup-combat' },
        skeleton: { image: 'images/enemies/squelette.png', title: 'Un Squelette Errant !', description: 'Un squelette hante les lieux, prêt à attaquer !', className: 'popup-combat' }
    },
    treasure: { image: 'images/events/tresor.png', title: 'Trésor Découvert !', description: 'Un coffre rempli d\'or étincelant !', className: 'popup-treasure' },
    
    // ========== NOUVELLES ENTRÉES POUR LES QUÊTES ==========
    quest: {
        npc_found: { 
            image: 'images/events/npc.png', 
            title: 'PNJ Rencontré !', 
            description: 'Un personnage t\'approche avec une mission !', 
            className: 'popup-quest' 
        },
        quest_available: { 
            image: 'images/events/quest.png', 
            title: 'Nouvelle Mission !', 
            description: 'Une nouvelle quête t\'attend !', 
            className: 'popup-quest' 
        },
        quest_completed: { 
            image: 'images/events/quest-complete.png', 
            title: 'Quête Terminée !', 
            description: 'Tu as accompli ta mission avec succès !', 
            className: 'popup-quest-complete' 
        },
        quest_reward: { 
            image: 'images/events/reward.png', 
            title: 'Récompense !', 
            description: 'Tu réclames ta récompense bien méritée !', 
            className: 'popup-reward' 
        }
    },
    
    levelup: { image: 'images/events/level-up.png', title: 'NIVEAU SUPÉRIEUR !', description: 'Tu gagnes en puissance !', className: 'popup-level' },
    // ... reste du code existant
};


        const enemies = {
            goblin: { name: 'Gobelin', health: 30, maxHealth: 30, attack: 8, defense: 2, exp: 15, gold: [5, 15] },
            orc: { name: 'Orc', health: 50, maxHealth: 50, attack: 12, defense: 4, exp: 25, gold: [10, 25] },
            troll: { name: 'Troll', health: 80, maxHealth: 80, attack: 15, defense: 6, exp: 40, gold: [20, 40] },
            dragon: { name: 'Dragon', health: 150, maxHealth: 150, attack: 25, defense: 10, exp: 100, gold: [50, 100] },
            skeleton: { name: 'Squelette', health: 40, maxHealth: 40, attack: 10, defense: 3, exp: 20, gold: [8, 20] }
        };

        const shopItems = {
            potion: { name: 'Potion de soin', price: 15, effect: 'heal', value: 40, classes: ['all'] },
            bigPotion: { name: 'Grande potion', price: 35, effect: 'heal', value: 80, classes: ['all'] },
            ironSword: { name: 'Épée en fer', price: 80, effect: 'attack', value: 5, classes: ['all'] },
            steelSword: { name: 'Épée en acier', price: 150, effect: 'attack', value: 8, classes: ['all'] },
            plateArmor: { name: 'Armure de plates', price: 200, effect: 'defense', value: 6, classes: ['all'] },
            ironShield: { name: 'Bouclier en fer', price: 90, effect: 'defense', value: 4, classes: ['all'] }
        };

        const levelBosses = {
            5: {
                name: 'Capitaine Gobelin',
                health: 120,
                maxHealth: 120,
                attack: 18,
                defense: 8,
                exp: 75,
                gold: [30, 60],
                image: 'goblin',
                title: 'BOSS DE NIVEAU 5',
                description: 'Le chef des gobelins te défie ! Il porte un casque trois fois trop grand.',
                rareItem: {
                    name: 'Épée du Capitaine',
                    type: 'weapon',
                    attack: 8,
                    description: 'Une épée légendaire du capitaine gobelin'
                },
                defeatMessage: 'Le Capitaine Gobelin tombe ! Son casque roule pathétiquement par terre.'
            },
            10: {
                name: 'Gardien de la Forêt',
                health: 200,
                maxHealth: 200,
                attack: 25,
                defense: 12,
                exp: 150,
                gold: [50, 100],
                image: 'troll',
                title: 'BOSS DE NIVEAU 10',
                description: 'L\'ancien gardien de la forêt se réveille !',
                rareItem: {
                    name: 'Armure d\'Écorce',
                    type: 'armor',
                    defense: 8,
                    description: 'Une armure qui régénère la santé'
                },
                defeatMessage: 'Le Gardien retourne dormir paisiblement.'
            }
        };

        const questTemplates = {
            killEnemies: {
                title: "Chasseur de monstres",
                description: "Élimine {target} ennemis",
                type: "kill",
                target: 5,
                rewards: { gold: 50, exp: 30 },
                icon: "⚔️"
            },
            collectTreasures: {
                title: "Chasseur de trésors",
                description: "Trouve {target} trésors",
                type: "treasure",
                target: 3,
                rewards: { gold: 40, exp: 25 },
                icon: "💰"
            },
            explore: {
                title: "Grand explorateur",
                description: "Explore {target} fois",
                type: "explore",
                target: 10,
                rewards: { gold: 60, exp: 40 },
                icon: "🗺️"
            }
        };

        // ========== GESTIONNAIRE PRINCIPAL ==========
        class RPGGame {
            constructor() {
                this.state = GAME_STATES.EXPLORING;
                this.player = this.createDefaultPlayer();
                this.currentEnemy = null;
                this.currentBossData = null;
                this.activeQuests = [];
                this.completedQuests = [];
                
                // Gestion des ressources
                this.timers = new Set();
                this.eventListeners = new Map();
                this.domElements = {};
                
                this.initialize();
            }

            createDefaultPlayer() {
                return {
                    name: 'Héros',
                    health: 100,
                    maxHealth: 100,
                    gold: 50,
                    level: 1,
                    exp: 0,
                    maxExp: 100,
                    attack: 10,
                    defense: 5,
                    inventory: ['épée rouillée'],
                    defeatedBosses: [],
                    class: null,
                    skills: [],
                    stats: {
                        enemiesKilled: 0,
                        treasuresFound: 0,
                        explorations: 0,
                        potionsUsed: 0,
                        goldSpent: 0
                    }
                };
            }

            // ========== GESTION DOM ==========
            initializeDOMElements() {
                const elementIds = [
                    'exploreBtn', 'attackBtn', 'fleeBtn', 'useItemBtn', 'shopBtn', 
                    'questBtn', 'restBtn', 'saveBtn', 'loadBtn', 'resetBtn', 'changeNameBtn',
                    'story', 'enemy-info', 'active-quests', 'playerName', 'playerNameTitle', 
                    'playerHealth', 'playerMaxHealth', 'playerGold', 'playerLevel', 
                    'playerExp', 'playerMaxExp', 'playerAttack', 'playerDefense', 
                    'playerInventory', 'healthFill', 'expFill', 'enemyName', 'enemyHealth', 
                    'enemyMaxHealth', 'enemyAttack', 'enemyDefense', 'nameModal', 
                    'playerNameInput', 'confirmNameBtn'
                ];
                
                elementIds.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        this.domElements[id] = element;
                    }
                });
            }

            safeGetElement(id) {
                return this.domElements[id] || document.getElementById(id) || null;
            }

            // ========== GESTION DES ÉVÉNEMENTS ==========
            addEventListener(element, event, handler) {
                if (!element) return;
                
                const boundHandler = handler.bind(this);
                element.addEventListener(event, boundHandler);
                
                const key = `${element.id || Math.random()}-${event}`;
                this.eventListeners.set(key, { element, event, handler: boundHandler });
            }

            setupEventListeners() {
                // Boutons principaux
                this.addEventListener(this.safeGetElement('exploreBtn'), 'click', this.handleExplore);
                this.addEventListener(this.safeGetElement('attackBtn'), 'click', this.handleAttack);
                this.addEventListener(this.safeGetElement('fleeBtn'), 'click', this.handleFlee);
                this.addEventListener(this.safeGetElement('useItemBtn'), 'click', this.handleUseItem);
                this.addEventListener(this.safeGetElement('shopBtn'), 'click', this.handleShop);
                this.addEventListener(this.safeGetElement('questBtn'), 'click', this.handleQuest);
                this.addEventListener(this.safeGetElement('restBtn'), 'click', this.handleRest);
                this.addEventListener(this.safeGetElement('saveBtn'), 'click', this.saveGame);
                this.addEventListener(this.safeGetElement('loadBtn'), 'click', this.loadGame);
                this.addEventListener(this.safeGetElement('resetBtn'), 'click', this.handleReset);
                this.addEventListener(this.safeGetElement('changeNameBtn'), 'click', this.showNameModal);
                this.addEventListener(this.safeGetElement('confirmNameBtn'), 'click', this.setPlayerName);

                // Entrée nom
                this.addEventListener(this.safeGetElement('playerNameInput'), 'keypress', (e) => {
                    if (e.key === 'Enter') this.setPlayerName();
                });
            }

            // ========== GESTION DES TIMERS ==========
            setTimeout(callback, delay) {
                const timer = setTimeout(() => {
                    this.timers.delete(timer);
                    try { callback(); } catch (error) { console.error('Timer error:', error); }
                }, delay);
                this.timers.add(timer);
                return timer;
            }

            cleanup() {
                this.timers.forEach(timer => clearTimeout(timer));
                this.timers.clear();
                this.eventListeners.forEach(({ element, event, handler }) => {
                    element.removeEventListener(event, handler);
                });
                this.eventListeners.clear();
            }

            // ========== INTERFACE UTILISATEUR ==========
            updateUI() {
                const elements = [
                    ['playerName', this.player.name],
                    ['playerNameTitle', this.player.name],
                    ['playerHealth', this.player.health],
                    ['playerMaxHealth', this.player.maxHealth],
                    ['playerGold', this.player.gold],
                    ['playerLevel', this.player.level],
                    ['playerExp', this.player.exp],
                    ['playerMaxExp', this.player.maxExp],
                    ['playerAttack', this.player.attack],
                    ['playerDefense', this.player.defense],
                    ['playerInventory', this.player.inventory.join(', ') || 'Vide']
                ];
                
                elements.forEach(([id, value]) => {
                    const element = this.safeGetElement(id);
                    if (element) element.textContent = value;
                });
                
                // Barres de progression
                const healthPercent = Math.max(0, Math.min(100, (this.player.health / this.player.maxHealth) * 100));
                const expPercent = Math.max(0, Math.min(100, (this.player.exp / this.player.maxExp) * 100));
                
                const healthFill = this.safeGetElement('healthFill');
                const expFill = this.safeGetElement('expFill');
                
                if (healthFill) healthFill.style.width = healthPercent + '%';
                if (expFill) expFill.style.width = expPercent + '%';
            }

            updateEnemyUI() {
                const enemyInfo = this.safeGetElement('enemy-info');
                if (!enemyInfo) return;
                
                if (this.currentEnemy) {
                    const elements = [
                        ['enemyName', this.currentEnemy.name],
                        ['enemyHealth', this.currentEnemy.health],
                        ['enemyMaxHealth', this.currentEnemy.maxHealth],
                        ['enemyAttack', this.currentEnemy.attack],
                        ['enemyDefense', this.currentEnemy.defense]
                    ];
                    
                    elements.forEach(([id, value]) => {
                        const element = this.safeGetElement(id);
                        if (element) element.textContent = value;
                    });
                    
                    enemyInfo.style.display = 'block';
                } else {
                    enemyInfo.style.display = 'none';
                }
            }

            updateQuestDisplay() {
                const activeQuestsDiv = this.safeGetElement('active-quests');
                if (!activeQuestsDiv) return;
                
                activeQuestsDiv.innerHTML = '';
                
                if (!Array.isArray(this.activeQuests) || this.activeQuests.length === 0) {
                    activeQuestsDiv.innerHTML = '<p style="text-align: center; color: #999;">Aucune quête active. Cherche des PNJ pour obtenir des missions !</p>';
                    return;
                }

                this.activeQuests.forEach((quest, index) => {
                    if (!quest || typeof quest !== 'object') return;
                    
                    const questDiv = document.createElement('div');
                    questDiv.className = `quest-item ${quest.completed ? 'quest-complete' : ''}`;
                    questDiv.style.cssText = `
                        background: ${quest.completed ? '#27ae60' : '#34495e'};
                        color: white;
                        padding: 10px;
                        margin: 5px 0;
                        border-radius: 8px;
                        border-left: 4px solid #f39c12;
                    `;
                    
                    const progress = this.getQuestProgress(quest);
                    const progressText = quest.completed ? 'TERMINÉE' : `${progress}/${quest.target}`;
                    
                    questDiv.innerHTML = `
                        <div style="font-weight: bold;">${quest.icon || '📜'} ${quest.title || 'Quête'}</div>
                        <div>${(quest.description || '').replace('{target}', quest.target || 0)} - ${progressText}</div>
                        <div style="font-size: 0.9em; opacity: 0.8;">Récompense: ${quest.rewards?.gold || 0} or, ${quest.rewards?.exp || 0} XP</div>
                    `;
                    
                    if (quest.completed) {
                        const claimBtn = document.createElement('button');
                        claimBtn.textContent = '🎁 Réclamer récompense';
                        claimBtn.style.cssText = `
                            margin-top: 8px;
                            background: #f39c12;
                            color: white;
                            border: none;
                            padding: 8px 16px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-weight: bold;
                        `;
                        
                        claimBtn.addEventListener('click', () => this.claimQuestReward(index));
                        questDiv.appendChild(claimBtn);
                    }
                    
                    activeQuestsDiv.appendChild(questDiv);
                });
            }

            showMessage(message) {
                const story = this.safeGetElement('story');
                if (story) story.innerHTML = `<p>${this.escapeHtml(message)}</p>`;
            }

            addMessage(message) {
                const story = this.safeGetElement('story');
                if (story) story.innerHTML += `<p>${this.escapeHtml(message)}</p>`;
            }

            escapeHtml(text) {
                if (typeof text !== 'string') return '';
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }

            showNotification(message) {
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.textContent = message;
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: rgba(52, 152, 219, 0.9);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    font-weight: bold;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    z-index: 1000;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                `;
                
                document.body.appendChild(notification);
                
                this.setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                }, 100);
                
                this.setTimeout(() => {
                    notification.style.transform = 'translateX(400px)';
                    this.setTimeout(() => {
                        if (notification.parentNode) {
                            document.body.removeChild(notification);
                        }
                    }, 300);
                }, 3000);
            }

            showNameModal() {
                const modal = this.safeGetElement('nameModal');
                if (modal) {
                    modal.style.display = 'flex';
                    const input = this.safeGetElement('playerNameInput');
                    if (input) {
                        input.value = this.player.name;
                        input.focus();
                    }
                }
            }

            hideNameModal() {
                const modal = this.safeGetElement('nameModal');
                if (modal) modal.style.display = 'none';
            }

            // ========== SYSTÈME DE MODALS ==========
            showEventModal(eventType, subType = null) {
                this.ensureModalExists();
                
                const overlay = document.getElementById('eventModal');
                const content = document.getElementById('eventModalContent');
                const imageContainer = document.getElementById('modalImageContainer');
                const title = document.getElementById('modalTitle');
                const description = document.getElementById('modalDescription');

                if (!overlay || !content || !imageContainer || !title || !description) {
                    console.error('Impossible de créer les éléments du modal');
                    return;
                }

                let eventData;
                
                if (subType && localImageEvents[eventType]?.[subType]) {
                    eventData = localImageEvents[eventType][subType];
                } else if (localImageEvents[eventType]) {
                    eventData = localImageEvents[eventType];
                } else {
                    // Fallback si pas d'image
                    eventData = {
                        image: 'placeholder.png',
                        title: 'Événement',
                        description: 'Quelque chose se passe !',
                        className: 'popup-default'
                    };
                }

                try {
                    // Essayer d'afficher la vraie image d'abord
                    imageContainer.innerHTML = `
                        <img src="${eventData.image}" 
                             alt="${eventData.title}" 
                             style="max-width: 100%; max-height: 300px; border-radius: 15px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4); border: 3px solid #f39c12;"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <div style="width: 100%; height: 200px; background: #34495e; border-radius: 15px; 
                             display: none; align-items: center; justify-content: center; border: 3px solid #f39c12; margin: 10px 0;">
                            <div style="text-align: center; color: #f39c12;">
                                <div style="font-size: 4em; margin-bottom: 10px;">🎮</div>
                                <div style="font-size: 1.2em; font-weight: bold;">${eventData.title}</div>
                            </div>
                        </div>
                    `;
                    title.textContent = eventData.title;
                    description.textContent = eventData.description;
                    overlay.style.display = 'flex';
                } catch (error) {
                    console.error('Erreur lors de l\'affichage du modal:', error);
                }
            }

            ensureModalExists() {
                if (!document.getElementById('eventModal')) {
                    const modalHTML = `
                        <div id="eventModal" class="modal-overlay" style="
                            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                            background: rgba(0,0,0,0.8); display: none; align-items: center;
                            justify-content: center; z-index: 1000;">
                            <div id="eventModalContent" class="modal-content" style="
                                background: white; padding: 20px; border-radius: 15px;
                                max-width: 500px; margin: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                                <div class="modal-header">
                                    <h3 id="modalTitle" class="modal-title">Titre de l'événement</h3>
                                    <button class="modal-close" onclick="document.getElementById('eventModal').style.display='none'" style="
                                        float: right; background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
                                </div>
                                <div class="modal-body">
                                    <div id="modalImageContainer" class="modal-image-container"></div>
                                    <p id="modalDescription" class="modal-description">Description de l'événement</p>
                                </div>
                                <div class="modal-footer">
                                    <button class="modal-button" onclick="document.getElementById('eventModal').style.display='none'" style="
                                        background: #3498db; color: white; border: none; padding: 10px 20px;
                                        border-radius: 5px; cursor: pointer;">Continuer l'aventure</button>
                                </div>
                            </div>
                        </div>
                    `;
                    document.body.insertAdjacentHTML('beforeend', modalHTML);
                }
            }

            // ========== GESTION DES ÉTATS ==========
            changeGameState(newState) {
                this.state = newState;
                this.updateButtonsForState(newState);
                
                if (newState !== GAME_STATES.COMBAT) {
                    this.currentEnemy = null;
                    this.updateEnemyUI();
                }
            }

            updateButtonsForState(state) {
                this.hideAllButtons();
                
                switch(state) {
                    case GAME_STATES.EXPLORING:
                        this.showButtons(['exploreBtn', 'shopBtn', 'questBtn', 'restBtn']);
                        if (this.hasUsableItems()) {
                            this.showButtons(['useItemBtn']);
                        }
                        break;
                    case GAME_STATES.COMBAT:
                        this.showButtons(['attackBtn', 'fleeBtn']);
                        if (this.hasUsableItems()) {
                            this.showButtons(['useItemBtn']);
                        }
                        break;
                }
            }

            hideAllButtons() {
                const buttonIds = ['exploreBtn', 'attackBtn', 'fleeBtn', 'useItemBtn', 'shopBtn', 'questBtn', 'restBtn'];
                buttonIds.forEach(id => {
                    const btn = this.safeGetElement(id);
                    if (btn) btn.style.display = 'none';
                });
            }

            showButtons(buttonIds) {
                buttonIds.forEach(id => {
                    const btn = this.safeGetElement(id);
                    if (btn) btn.style.display = 'inline-block';
                });
            }

            hasUsableItems() {
                return this.player.inventory.some(item => 
                    item.includes('potion') || item.includes('Potion')
                );
            }

            // ========== MÉCANIQUES DE JEU ==========
            getRandomEvent() {
                // Plus de chance de boss aux niveaux spéciaux
                const bossChance = levelBosses[this.player.level] && !this.player.defeatedBosses.includes(this.player.level) ? 15 : 0;
                
                const events = ['enemy', 'treasure', 'merchant', 'nothing', 'rest', 'potion', 'trap', 'boss'];
                const weights = [30, 20, 10, 15, 8, 10, 5, bossChance];
                
                const random = Math.random() * 100;
                let cumulative = 0;
                
                for (let i = 0; i < events.length; i++) {
                    cumulative += weights[i];
                    if (random < cumulative) {
                        return events[i];
                    }
                }
                return 'nothing';
            }

            getRandomEnemy() {
                const enemyTypes = Object.keys(enemies);
                const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
                const baseEnemy = { ...enemies[randomType] };
                
                // Mise à l'échelle selon le niveau
                const multiplier = 1 + (this.player.level - 1) * 0.1;
                
                return {
                    ...baseEnemy,
                    health: Math.ceil(baseEnemy.health * multiplier),
                    maxHealth: Math.ceil(baseEnemy.maxHealth * multiplier),
                    attack: Math.ceil(baseEnemy.attack * multiplier),
                    defense: Math.ceil(baseEnemy.defense * Math.sqrt(multiplier)),
                    exp: Math.ceil(baseEnemy.exp * multiplier),
                    gold: [
                        Math.ceil(baseEnemy.gold[0] * multiplier),
                        Math.ceil(baseEnemy.gold[1] * multiplier)
                    ]
                };
            }

            gainExp(amount) {
                this.player.exp += amount;
                this.showNotification(`+${amount} EXP`);
                
                if (this.player.exp >= this.player.maxExp) {
                    this.levelUp();
                }
                this.updateUI();
                this.checkQuestProgress();
            }

            levelUp() {
                this.player.level++;
                this.player.exp = Math.max(0, this.player.exp - this.player.maxExp);
                this.player.maxExp = Math.floor(this.player.maxExp * 1.2);
                this.player.maxHealth += 20;
                this.player.health = this.player.maxHealth;
                this.player.attack += 2;
                this.player.defense += 1;

                this.showEventModal('levelup');
                this.showNotification(`NIVEAU ${this.player.level} !`);
                this.showMessage(`Félicitations ${this.player.name} ! Tu atteins le niveau ${this.player.level} ! Tes statistiques ont augmenté !`);
                
                // Vérifier s'il y a un boss pour ce niveau
                if (levelBosses[this.player.level] && !this.player.defeatedBosses.includes(this.player.level)) {
                    this.addMessage(`⚠️ ATTENTION ! Un boss légendaire a senti ta puissance et vient te défier !`);
                }
                
                this.checkQuestProgress();
            }

            // ========== SYSTÈME DE QUÊTES ==========
            getQuestProgress(quest) {
                if (!quest?.type || !this.player.stats) return 0;
                
                switch(quest.type) {
                    case 'kill': return this.player.stats.enemiesKilled || 0;
                    case 'treasure': return this.player.stats.treasuresFound || 0;
                    case 'level': return this.player.level || 1;
                    case 'explore': return this.player.stats.explorations || 0;
                    case 'potion': return this.player.stats.potionsUsed || 0;
                    case 'spend': return this.player.stats.goldSpent || 0;
                    default: return 0;
                }
            }

            checkQuestProgress() {
                if (!Array.isArray(this.activeQuests)) return;
                
                this.activeQuests.forEach(quest => {
                    if (!quest || quest.completed) return;
                    
                    const progress = this.getQuestProgress(quest);
                    if (progress >= (quest.target || 0)) {
                        quest.completed = true;
                        this.showNotification(`Quête terminée: ${quest.title}`);
                        this.showMessage(`${this.player.name}, tu as terminé la quête "${quest.title}" ! Tu peux maintenant réclamer ta récompense !`);
                    }
                });
                this.updateQuestDisplay();
            }

            claimQuestReward(questIndex) {
                if (questIndex < 0 || questIndex >= this.activeQuests.length) return;
                
                const quest = this.activeQuests[questIndex];
                if (!quest || !quest.completed || !quest.rewards) return;
                
                this.player.gold += quest.rewards.gold || 0;
                this.gainExp(quest.rewards.exp || 0);
                
                this.showMessage(`${this.player.name}, tu réclames ta récompense pour "${quest.title}" : ${quest.rewards.gold} or et ${quest.rewards.exp} XP !`);
                this.showNotification(`Récompense réclamée !`);
                
                // Remettre les stats à zéro pour ce type de quête
                this.resetQuestStats(quest.type);
                
                this.completedQuests.push(quest);
                this.activeQuests.splice(questIndex, 1);
                
                this.updateUI();
                this.updateQuestDisplay();
            }

            resetQuestStats(questType) {
                if (!this.player.stats) return;
                
                switch(questType) {
                    case 'kill':
                        this.player.stats.enemiesKilled = 0;
                        break;
                    case 'treasure':
                        this.player.stats.treasuresFound = 0;
                        break;
                    case 'explore':
                        this.player.stats.explorations = 0;
                        break;
                    case 'potion':
                        this.player.stats.potionsUsed = 0;
                        break;
                    case 'spend':
                        this.player.stats.goldSpent = 0;
                        break;
                }
            }

            createQuest(templateKey) {
                const template = questTemplates[templateKey];
                if (!template) return null;
                
                return {
                    ...template,
                    target: template.target,
                    originalTarget: template.target,
                    completed: false,
                    startTime: Date.now()
                };
            }

            getAvailableQuest() {
                const availableTemplates = Object.keys(questTemplates).filter(key => {
                    const alreadyActive = this.activeQuests.some(q => q.title === questTemplates[key].title);
                    return !alreadyActive;
                });
                
                if (availableTemplates.length === 0) return null;
                
                const randomTemplate = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
                return this.createQuest(randomTemplate);
            }

            // ========== SYSTÈME DE BOSS ==========
            checkForLevelBoss() {
                if (levelBosses[this.player.level] && !this.player.defeatedBosses.includes(this.player.level)) {
                    this.setTimeout(() => {
                        this.triggerLevelBoss(this.player.level);
                    }, 1000);
                    return true;
                }
                return false;
            }

            triggerLevelBoss(level) {
                const bossData = levelBosses[level];
                if (!bossData) return;
                
                this.currentEnemy = {
                    name: bossData.name,
                    health: bossData.health,
                    maxHealth: bossData.maxHealth,
                    attack: bossData.attack,
                    defense: bossData.defense,
                    exp: bossData.exp,
                    gold: bossData.gold
                };
                
                this.currentBossData = bossData;
                
                this.showEventModal('boss');
                this.showMessage(`🔥 ${bossData.title} 🔥`);
                this.addMessage(`${bossData.description}`);
                this.addMessage(`💀 ${bossData.name} possède ${bossData.health} PV et une ${bossData.rareItem.name} légendaire !`);
                
                // Bouton pour commencer le combat
                const startCombatBtn = document.createElement('button');
                startCombatBtn.textContent = '⚔️ COMMENCER LE COMBAT !';
                startCombatBtn.style.cssText = `
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                    border: 3px solid #f1c40f;
                    color: white;
                    padding: 15px 30px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 1.2em;
                    margin: 15px auto;
                    display: block;
                `;
                
                startCombatBtn.addEventListener('click', () => {
                    if (startCombatBtn.parentNode) {
                        startCombatBtn.parentNode.removeChild(startCombatBtn);
                    }
                    document.getElementById('eventModal').style.display = 'none';
                    this.startBossCombat();
                });
                
                const story = this.safeGetElement('story');
                if (story) {
                    story.appendChild(startCombatBtn);
                }
            }

            startBossCombat() {
                this.changeGameState(GAME_STATES.COMBAT);
                this.updateEnemyUI();
                this.showMessage(`💥 Le combat contre ${this.currentEnemy.name} commence !`);
                this.addMessage(`⚔️ Choisis ton action : Attaquer, Fuir ou utiliser un objet !`);
            }

            defeatLevelBoss() {
                if (!this.currentBossData) return;
                
                const bossLevel = Object.keys(levelBosses).find(level => 
                    levelBosses[level].name === this.currentBossData.name
                );
                
                this.player.defeatedBosses.push(parseInt(bossLevel));
                
                const rareItem = this.currentBossData.rareItem;
                this.player.inventory.push(rareItem.name);
                
                if (rareItem.attack) this.player.attack += rareItem.attack;
                if (rareItem.defense) this.player.defense += rareItem.defense;
                
                this.showMessage(this.currentBossData.defeatMessage);
                this.addMessage(`🎁 Tu obtiens l'objet légendaire : ${rareItem.name} !`);
                this.addMessage(`📜 ${rareItem.description}`);
                
                const bonusGold = Math.floor(Math.random() * 100) + 50;
                this.player.gold += bonusGold;
                this.addMessage(`💰 Bonus de boss : +${bonusGold} or !`);
                
                this.showNotification(`🏆 BOSS VAINCU ! ${rareItem.name} obtenu !`);
                
                this.currentBossData = null;
                this.currentEnemy = null;
                
                this.updateUI();
                this.updateEnemyUI();
                
                this.setTimeout(() => {
                    this.changeGameState(GAME_STATES.EXPLORING);
                    this.showMessage(`${this.player.name}, tu peux maintenant continuer ton exploration avec ta nouvelle puissance !`);
                }, 3000);
            }

            // ========== GESTIONNAIRES D'ÉVÉNEMENTS ==========
            handleExplore() {
                try {
                    this.player.stats.explorations++;
                    const event = this.getRandomEvent();
                    this.processEvent(event);
                    this.checkQuestProgress();
                } catch (error) {
                    console.error('Erreur exploration:', error);
                    this.showMessage('Erreur lors de l\'exploration...');
                }
            }

            processEvent(event) {
                switch(event) {
                    case 'enemy':
                        this.handleEnemyEncounter();
                        break;
                    case 'treasure':
                        this.handleTreasure();
                        break;
                    case 'merchant':
                        this.handleMerchant();
                        break;
                    case 'potion':
                        this.handlePotionFind();
                        break;
                    case 'trap':
                        this.handleTrap();
                        break;
                    case 'rest':
                        this.handleRestArea();
                        break;
                    case 'boss':
                        if (this.checkForLevelBoss()) {
                            // Boss déclenché
                        } else {
                            this.handleNothing();
                        }
                        break;
                    default:
                        this.handleNothing();
                }
            }

            handleEnemyEncounter() {
                this.currentEnemy = this.getRandomEnemy();
                const enemyType = Object.keys(enemies).find(key => 
                    enemies[key].name === this.currentEnemy.name
                );
                
                this.showEventModal('combat', enemyType);
                this.showMessage(`${this.currentEnemy.name} apparaît ! Prépare-toi au combat, ${this.player.name} !`);
                this.changeGameState(GAME_STATES.COMBAT);
                this.updateEnemyUI();
            }

            handleTreasure() {
                this.showEventModal('treasure');
                this.player.stats.treasuresFound++;
                
                const goldFound = Math.floor(Math.random() * 20) + 10;
                this.player.gold += goldFound;
                
                if (Math.random() < 0.3) {
                    const treasureItems = ['Épée de fer', 'Bouclier en bois', 'Amulette de chance', 'Gemme précieuse'];
                    const foundItem = treasureItems[Math.floor(Math.random() * treasureItems.length)];
                    this.player.inventory.push(foundItem);
                    this.showMessage(`${this.player.name}, tu découvres un coffre ! ${goldFound} or et ${foundItem} !`);
                    this.showNotification(`+${goldFound} or + ${foundItem}`);
                } else {
                    this.showMessage(`${this.player.name}, tu découvres un coffre contenant ${goldFound} pièces d'or !`);
                    this.showNotification(`+${goldFound} or`);
                }
                this.updateUI();
            }

            handleMerchant() {
                this.showEventModal('merchant');
                const merchantGold = Math.floor(Math.random() * 20) + 5;
                this.player.gold += merchantGold;
                this.showMessage(`${this.player.name}, un marchand mystérieux te donne ${merchantGold} pièces d'or !`);
                this.showNotification(`+${merchantGold} or`);
                this.updateUI();
            }

            handlePotionFind() {
                this.showEventModal('potion');
                const potionTypes = ['Potion de soin', 'Grande potion'];
                const foundPotion = potionTypes[Math.floor(Math.random() * potionTypes.length)];
                this.player.inventory.push(foundPotion);
                this.showMessage(`${this.player.name}, tu trouves une ${foundPotion} !`);
                this.showNotification('Objet trouvé !');
                this.updateUI();
            }

            handleTrap() {
                this.showEventModal('trap');
                const damage = Math.floor(Math.random() * 15) + 5;
                this.player.health = Math.max(0, this.player.health - damage);
                this.showMessage(`${this.player.name}, tu tombes dans un piège ! Tu perds ${damage} PV.`);
                this.showNotification(`-${damage} PV`);
                this.updateUI();
                
                if (this.player.health <= 0) {
                    this.handleGameOver();
                }
            }

            handleRestArea() {
                this.showEventModal('rest');
                const healAmount = Math.floor(this.player.maxHealth * 0.3);
                this.player.health = Math.min(this.player.maxHealth, this.player.health + healAmount);
                this.showMessage(`${this.player.name}, tu te reposes et récupères ${healAmount} PV.`);
                this.showNotification(`+${healAmount} PV`);
                this.updateUI();
            }

            handleNothing() {
                this.showEventModal('nothing');
                const messages = [
                    `${this.player.name} avance prudemment...`,
                    `Le vent souffle doucement...`,
                    `Rien d'intéressant par ici...`,
                    `Tu entends des bruits étranges au loin...`
                ];
                this.showMessage(messages[Math.floor(Math.random() * messages.length)]);
            }

            handleGameOver() {
                this.hideAllButtons();
                this.showEventModal('game_over');
                this.showMessage(`${this.player.name} est mort... Ton aventure se termine ici.`);
                this.changeGameState(GAME_STATES.GAME_OVER);
            }

            handleAttack() {
                if (!this.currentEnemy) return;

                const playerDamage = Math.max(1, this.player.attack + Math.floor(Math.random() * 5) - this.currentEnemy.defense);
                this.currentEnemy.health -= playerDamage;
                
                let message = `${this.player.name} attaque ${this.currentEnemy.name} et inflige ${playerDamage} dégâts !`;

                if (this.currentEnemy.health <= 0) {
                    this.player.stats.enemiesKilled++;
                    const expGained = this.currentEnemy.exp;
                    const goldGained = Math.floor(Math.random() * (this.currentEnemy.gold[1] - this.currentEnemy.gold[0] + 1)) + this.currentEnemy.gold[0];
                    
                    message += ` ${this.currentEnemy.name} est vaincu !`;
                    this.showMessage(message);
                    
                    this.player.gold += goldGained;
                    this.gainExp(expGained);
                    this.showNotification(`+${goldGained} or`);
                    
                    // Vérifier si c'est un boss
                    if (this.currentBossData) {
                        this.defeatLevelBoss();
                    } else {
                        this.setTimeout(() => {
                            this.showMessage(`Victoire ${this.player.name} ! Tu peux continuer ton exploration.`);
                            this.changeGameState(GAME_STATES.EXPLORING);
                        }, 2000);
                    }
                } else {
                    const enemyDamage = Math.max(1, this.currentEnemy.attack + Math.floor(Math.random() * 3) - this.player.defense);
                    this.player.health -= enemyDamage;
                    message += ` ${this.currentEnemy.name} contre-attaque et inflige ${enemyDamage} dégâts !`;
                    
                    this.showMessage(message);
                    this.updateEnemyUI();
                    this.updateUI();
                    
                    if (this.player.health <= 0) {
                        this.setTimeout(() => this.handleGameOver(), 1500);
                    }
                }
            }

            handleFlee() {
                const success = Math.random() > 0.25;
                
                if (success) {
                    this.showMessage(`${this.player.name} s'échappe avec succès !`);
                    this.setTimeout(() => this.changeGameState(GAME_STATES.EXPLORING), 1500);
                } else {
                    const damage = Math.floor(Math.random() * 10) + 3;
                    this.player.health = Math.max(0, this.player.health - damage);
                    this.showMessage(`${this.player.name} essaie de fuir mais ${this.currentEnemy.name} l'attaque ! ${damage} dégâts !`);
                    this.showNotification(`-${damage} PV`);
                    this.updateUI();
                    
                    this.setTimeout(() => {
                        if (this.player.health <= 0) {
                            this.handleGameOver();
                        } else {
                            this.changeGameState(GAME_STATES.EXPLORING);
                        }
                    }, 2000);
                }
            }

            handleUseItem() {
                const potions = this.player.inventory.filter(item => 
                    item.includes('potion') || item.includes('Potion')
                );
                
                if (potions.length === 0) {
                    this.showMessage(`${this.player.name}, tu n'as pas d'objet utilisable !`);
                    return;
                }

                const usedPotion = potions[0];
                const potionIndex = this.player.inventory.indexOf(usedPotion);
                this.player.inventory.splice(potionIndex, 1);
                
                this.player.stats.potionsUsed++;
                
                let healAmount = usedPotion.includes('Grande') ? 80 : 40;
                const oldHealth = this.player.health;
                this.player.health = Math.min(this.player.maxHealth, this.player.health + healAmount);
                const actualHeal = this.player.health - oldHealth;
                
                this.showMessage(`${this.player.name}, tu utilises ${usedPotion} et récupères ${actualHeal} PV !`);
                this.showNotification(`+${actualHeal} PV`);
                this.updateUI();
                this.updateButtonsForState(this.state);
            }

            handleShop() {
                this.changeGameState(GAME_STATES.SHOPPING);
                this.showMessage(`Bienvenue dans ma boutique, ${this.player.name} ! Tu as ${this.player.gold} pièces d'or.`);
                this.showShopInterface();
            }

            showShopInterface() {
                Object.keys(shopItems).forEach(itemKey => {
                    const item = shopItems[itemKey];
                    const btn = document.createElement('button');
                    
                    const canAfford = this.player.gold >= item.price;
                    btn.textContent = `${item.name} (${item.price} or)${canAfford ? '' : ' - Trop cher'}`;
                    btn.className = 'shop-button';
                    btn.disabled = !canAfford;
                    btn.style.cssText = `
                        margin: 5px;
                        padding: 10px 15px;
                        background: ${canAfford ? '#3498db' : '#95a5a6'};
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: ${canAfford ? 'pointer' : 'not-allowed'};
                        transition: all 0.3s ease;
                    `;
                    
                    if (canAfford) {
                        btn.addEventListener('mouseenter', () => {
                            btn.style.transform = 'scale(1.05)';
                        });
                        btn.addEventListener('mouseleave', () => {
                            btn.style.transform = 'scale(1)';
                        });
                    }
                    
                    btn.addEventListener('click', () => {
                        if (this.player.gold >= item.price) {
                            this.player.gold -= item.price;
                            this.player.stats.goldSpent += item.price;
                            
                            if (item.effect === 'heal') {
                                this.player.inventory.push(item.name);
                            } else if (item.effect === 'attack') {
                                this.player.attack += item.value;
                                this.player.inventory.push(item.name);
                            } else if (item.effect === 'defense') {
                                this.player.defense += item.value;
                                this.player.inventory.push(item.name);
                            }
                            
                            this.showMessage(`${this.player.name}, tu achètes ${item.name} pour ${item.price} or !`);
                            this.showNotification('Achat effectué !');
                            this.updateUI();
                            this.checkQuestProgress();
                            
                            this.setTimeout(() => {
                                this.removeShopButtons();
                                this.showShopInterface();
                            }, 1000);
                        }
                    });
                    
                    const story = this.safeGetElement('story');
                    if (story) story.appendChild(btn);
                });
                
                const exitBtn = document.createElement('button');
                exitBtn.textContent = '🚪 Quitter le magasin';
                exitBtn.className = 'shop-button';
                exitBtn.style.cssText = `
                    margin: 10px 5px;
                    padding: 10px 20px;
                    background: #e74c3c;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                `;
                exitBtn.addEventListener('click', () => {
                    this.removeShopButtons();
                    this.changeGameState(GAME_STATES.EXPLORING);
                    this.showMessage(`Au revoir, ${this.player.name} !`);
                });
                
                const story = this.safeGetElement('story');
                if (story) story.appendChild(exitBtn);
            }

            removeShopButtons() {
                document.querySelectorAll('.shop-button').forEach(btn => {
                    if (btn.parentNode) btn.parentNode.removeChild(btn);
                });
            }

            handleQuest() {
                this.showMessage(`${this.player.name}, tu cherches des PNJ ayant besoin d'aide...`);
                
                this.setTimeout(() => {
                    const chance = Math.random();
                    if (chance < 0.7) {
                        this.meetQuestGiver();
                    } else {
                        this.showMessage(`${this.player.name}, tu ne trouves personne ayant besoin d'aide pour le moment.`);
                    }
                }, 1500);
            }

            meetQuestGiver() {
                const availableQuest = this.getAvailableQuest();
                
                if (!availableQuest) {
                    this.showMessage(`Tu as déjà assez de missions pour le moment, ${this.player.name}. Reviens plus tard !`);
                    return;
                }
                
                this.showMessage(`Un PNJ t'approche : "J'ai une mission pour toi, ${this.player.name} !"`);
                
                this.setTimeout(() => {
                    this.showMessage(`Mission proposée: "${availableQuest.title}" - ${availableQuest.description.replace('{target}', availableQuest.target)}`);
                    this.addMessage(`Récompenses: ${availableQuest.rewards.gold} or et ${availableQuest.rewards.exp} XP`);
                    
                    const acceptBtn = document.createElement('button');
                    acceptBtn.textContent = '✅ Accepter la mission';
                    acceptBtn.style.cssText = `
                        background: #27ae60;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        margin: 5px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    `;
                    
                    const declineBtn = document.createElement('button');
                    declineBtn.textContent = '❌ Refuser';
                    declineBtn.style.cssText = `
                        background: #e74c3c;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        margin: 5px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    `;
                    
                    acceptBtn.addEventListener('click', () => {
                        this.activeQuests.push(availableQuest);
                        this.showMessage(`Mission acceptée ! ${this.player.name}, tu peux voir tes quêtes actives dans le panneau ci-dessus.`);
                        this.showNotification('Nouvelle mission !');
                        this.updateQuestDisplay();
                        this.removeQuestButtons();
                    });
                    
                    declineBtn.addEventListener('click', () => {
                        this.showMessage(`"Dommage ${this.player.name}... Peut-être une autre fois !"`);
                        this.removeQuestButtons();
                    });
                    
                    const story = this.safeGetElement('story');
                    if (story) {
                        story.appendChild(acceptBtn);
                        story.appendChild(declineBtn);
                    }
                }, 2000);
            }

            removeQuestButtons() {
                document.querySelectorAll('button').forEach(btn => {
                    if (btn.textContent.includes('Accepter') || btn.textContent.includes('Refuser')) {
                        if (btn.parentNode) btn.parentNode.removeChild(btn);
                    }
                });
            }

            handleRest() {
                if (this.player.health === this.player.maxHealth) {
                    this.showMessage(`${this.player.name}, tu es déjà en pleine forme !`);
                    return;
                }
                
                const cost = 10;
                if (this.player.gold < cost) {
                    this.showMessage(`${this.player.name}, il te faut 10 pièces d'or pour te reposer.`);
                    return;
                }
                
                this.player.gold -= cost;
                this.player.stats.goldSpent += cost;
                this.player.health = this.player.maxHealth;
                this.showMessage(`${this.player.name} se repose pour 10 or. Santé restaurée !`);
                this.showNotification('Santé restaurée !');
                this.updateUI();
                this.checkQuestProgress();
            }

            setPlayerName() {
                const nameInput = this.safeGetElement('playerNameInput');
                if (!nameInput) return;
                
                const cleanName = this.sanitizeName(nameInput.value);
                
                if (cleanName && cleanName !== 'Héros') {
                    this.player.name = cleanName;
                    this.updateUI();
                    this.hideNameModal();
                    this.showMessage(`Bienvenue, ${this.player.name} !`);
                    this.showNotification(`Bienvenue, ${this.player.name} !`);
                } else {
                    alert('Veuillez entrer un nom valide (1-20 caractères) !');
                    nameInput.focus();
                }
            }

            sanitizeName(name) {
                if (typeof name !== 'string') return 'Héros';
                const cleaned = name.replace(/[<>\"'&]/g, '').trim();
                return cleaned.length > 0 && cleaned.length <= 20 ? cleaned : 'Héros';
            }

            handleReset() {
                if (confirm('Êtes-vous sûr de vouloir recommencer ?')) {
                    this.cleanup();
                    this.player = this.createDefaultPlayer();
                    this.activeQuests = [];
                    this.completedQuests = [];
                    this.currentEnemy = null;
                    this.currentBossData = null;
                    this.updateUI();
                    this.updateQuestDisplay();
                    this.changeGameState(GAME_STATES.EXPLORING);
                    this.showNameModal();
                    this.showNotification('Nouvelle partie !');
                }
            }

            // ========== SAUVEGARDE ==========
            saveGame() {
                try {
                    const saveData = {
                        player: this.player,
                        activeQuests: this.activeQuests,
                        completedQuests: this.completedQuests
                    };
                    localStorage.setItem('goldOfWarSave', JSON.stringify(saveData));
                    this.showNotification('Partie sauvegardée !');
                } catch(error) {
                    console.error('Erreur sauvegarde:', error);
                    this.showNotification('Erreur de sauvegarde !');
                }
            }

            loadGame() {
                try {
                    const save = localStorage.getItem('goldOfWarSave');
                    if (!save) {
                        this.showNotification('Aucune sauvegarde trouvée !');
                        return;
                    }
                    
                    const saveData = JSON.parse(save);
                    
                    this.player = { ...this.createDefaultPlayer(), ...saveData.player };
                    this.activeQuests = saveData.activeQuests || [];
                    this.completedQuests = saveData.completedQuests || [];
                    
                    this.updateUI();
                    this.updateQuestDisplay();
                    this.changeGameState(GAME_STATES.EXPLORING);
                    this.showNotification('Partie chargée !');
                    this.showMessage(`Sauvegarde chargée ! ${this.player.name}, ton aventure reprend...`);
                    
                } catch (error) {
                    console.error('Erreur chargement:', error);
                    this.showNotification('Erreur de chargement !');
                }
            }

            // ========== INITIALISATION ==========
            initialize() {
                this.initializeDOMElements();
                this.setupEventListeners();
                this.updateUI();
                this.updateQuestDisplay();
                this.changeGameState(GAME_STATES.EXPLORING);
                this.showNameModal();
            }
        }

        // ========== INITIALISATION GLOBALE ==========
        let gameInstance = null;

        function initializeGame() {
            try {
                if (gameInstance) {
                    gameInstance.cleanup();
                }
                gameInstance = new RPGGame();
                
                // Pour le debug
                window.game = gameInstance;
                console.log('Jeu initialisé avec succès !');
                
            } catch (error) {
                console.error('Erreur initialisation:', error);
                alert('Erreur lors du chargement du jeu. Vérifiez la console pour plus de détails.');
            }
        }

        // Nettoyage à la fermeture
        window.addEventListener('beforeunload', () => {
            if (gameInstance) {
                gameInstance.cleanup();
            }
        });

        // Démarrage
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeGame);
        } else {
            initializeGame();
        }
