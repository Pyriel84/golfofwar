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
                orc: { image: 'images/enemies/orc.png', title: 'Un Orc Sauvage !', description: 'Un orc féroce brandit sa hache !', className: 'popup-combat' },
                troll: { image: 'images/enemies/troll.png', title: 'Un Troll Énorme !', description: 'Le troll grogne, prêt à attaquer !', className: 'popup-combat' },
                bandit: { image: 'images/enemies/bandit.png', title: 'Bandits !', description: 'Des bandits t\'attaquent pour ton or !', className: 'popup-combat' }
            },
            treasure: { image: 'images/events/tresor.png', title: 'Trésor Découvert !', description: 'Un coffre rempli d\'or étincelant !', className: 'popup-treasure' },
            levelup: { image: 'images/events/level-up.png', title: 'NIVEAU SUPÉRIEUR !', description: 'Tu gagnes en puissance !', className: 'popup-level' },
            
            npc: {
                aldric: { image: 'images/npcs/aldric.png', title: 'Aldric le Forgeron', description: 'Le forgeron du village t\'appelle avec ses mains noircies par la suie...', className: 'modal-aldric' },
                gareth: { image: 'images/npcs/gareth.png', title: 'Gareth le Guerrier', description: 'Un guerrier expérimenté aux nombreuses cicatrices te fait signe...', className: 'modal-gareth' },
                marcus: { image: 'images/npcs/marcus.png', title: 'Marcus le Mage', description: 'Un mage mystérieux en robe violette t\'observe avec intérêt...', className: 'modal-marcus' },
                vera: { image: 'images/npcs/vera.png', title: 'Vera l\'Alchimiste', description: 'Une alchimiste aux yeux verts te sourit depuis son laboratoire...', className: 'modal-alchemist' }
            },
            
            events: {
                merchant: { image: 'images/events/merchant.png', title: 'Marchand Voyageur', description: 'Un marchand itinérant te propose des affaires !', className: 'popup-merchant' },
                shrine: { image: 'images/events/shrine.png', title: 'Sanctuaire Ancien', description: 'Un sanctuaire mystérieux pulse d\'une énergie divine...', className: 'popup-shrine' },
                bandits: { image: 'images/events/bandits.png', title: 'Embuscade !', description: 'Des bandits te bloquent le passage !', className: 'popup-danger' }
            }
        };

        const enemies = {
            goblin: { name: 'Gobelin', health: 35, maxHealth: 35, attack: 8, defense: 2, exp: 20, gold: [8, 18] },
            orc: { name: 'Orc', health: 55, maxHealth: 55, attack: 12, defense: 4, exp: 30, gold: [15, 30] },
            troll: { name: 'Troll', health: 85, maxHealth: 85, attack: 16, defense: 6, exp: 50, gold: [25, 50] },
            bandit: { name: 'Bandit', health: 40, maxHealth: 40, attack: 10, defense: 3, exp: 25, gold: [10, 25] }
        };

        const npcCharacters = {
            aldric: {
                name: 'Aldric le Forgeron',
                greeting: 'Salut, aventurier ! J\'ai du travail pour quelqu\'un de courageux...',
                farewell: 'Que tes armes restent toujours aiguisées !',
                quests: {
                    forgeQuest: {
                        title: "Matériaux de forge",
                        description: "Trouve {target} trésors pour mes créations",
                        type: "treasure",
                        target: 3,
                        rewards: { gold: 80, exp: 50 },
                        icon: "🔨",
                        completionText: "Parfait ! Ces matériaux feront d'excellentes armes !"
                    },
                    defenderQuest: {
                        title: "Défenseur du village",
                        description: "Élimine {target} menaces près du village",
                        type: "kill",
                        target: 5,
                        rewards: { gold: 100, exp: 60 },
                        icon: "⚔️",
                        completionText: "Tu as bien protégé notre village, merci !"
                    }
                }
            },
            
            gareth: {
                name: 'Gareth le Guerrier',
                greeting: 'Par mes cicatrices ! Un vrai guerrier ! Tu veux te tester ?',
                farewell: 'Combat avec honneur, jeune guerrier !',
                quests: {
                    warriorTrial: {
                        title: "L'épreuve du guerrier",
                        description: "Prouve ta valeur en tuant {target} ennemis",
                        type: "kill",
                        target: 8,
                        rewards: { gold: 120, exp: 80 },
                        icon: "🏆",
                        completionText: "Tu combats comme un vrai guerrier !"
                    },
                    scoutMission: {
                        title: "Mission de reconnaissance",
                        description: "Explore {target} zones dangereuses",
                        type: "explore",
                        target: 12,
                        rewards: { gold: 90, exp: 70 },
                        icon: "🗺️",
                        completionText: "Excellent travail de reconnaissance !"
                    }
                }
            },
            
            marcus: {
                name: 'Marcus le Mage',
                greeting: 'Les énergies mystiques m\'ont dit que tu viendrais...',
                farewell: 'Que la magie guide tes pas !',
                quests: {
                    magicResearch: {
                        title: "Recherche mystique",
                        description: "Découvre {target} trésors magiques",
                        type: "treasure",
                        target: 4,
                        rewards: { gold: 70, exp: 90 },
                        icon: "🔮",
                        completionText: "Ces artéfacts révèlent de grands secrets !"
                    }
                }
            },
            
            vera: {
                name: 'Vera l\'Alchimiste',
                greeting: 'Oh ! Un aventurier ! Parfait pour mes expériences !',
                farewell: 'Reviens vite, j\'aurai sûrement de nouvelles découvertes !',
                quests: {
                    potionTest: {
                        title: "Test d'efficacité",
                        description: "Utilise {target} potions pour mes recherches",
                        type: "potion",
                        target: 3,
                        rewards: { gold: 60, exp: 40 },
                        icon: "🧪",
                        completionText: "Excellent ! Mes potions fonctionnent parfaitement !"
                    }
                }
            }
        };

        const shopSystem = {
            mainShop: {
                name: "Boutique d'Aventurier",
                keeper: "Marchand Errant",
                items: {
                    smallPotion: { name: 'Petite Potion', price: 25, type: 'consumable', effect: 'heal', value: 35, description: 'Restaure 35 PV', icon: '🧪' },
                    mediumPotion: { name: 'Potion Moyenne', price: 50, type: 'consumable', effect: 'heal', value: 70, description: 'Restaure 70 PV', icon: '💉' },
                    largePotion: { name: 'Grande Potion', price: 100, type: 'consumable', effect: 'heal', value: 120, description: 'Restaure 120 PV', icon: '🍶' },
                    
                    ironSword: { name: 'Épée de Fer', price: 120, type: 'weapon', effect: 'attack', value: 8, description: 'Une épée solide', icon: '⚔️', requirement: { level: 2 } },
                    steelSword: { name: 'Épée d\'Acier', price: 300, type: 'weapon', effect: 'attack', value: 15, description: 'Épée de qualité supérieure', icon: '🗡️', requirement: { level: 5 } },
                    
                    leatherArmor: { name: 'Armure de Cuir', price: 100, type: 'armor', effect: 'defense', value: 6, description: 'Protection basique', icon: '🥼', requirement: { level: 1 } },
                    chainmail: { name: 'Cotte de Mailles', price: 220, type: 'armor', effect: 'defense', value: 12, description: 'Armure métallique', icon: '🦺', requirement: { level: 4 } },
                    
                    luckCharm: { name: 'Amulette de Chance', price: 180, type: 'special', effect: 'luck', value: 1, description: 'Augmente la chance', icon: '🍀', requirement: { level: 3 } }
                }
            }
        };

        const advancedEvents = {
            encounters: {
                merchant: {
                    chance: 15,
                    title: 'Marchand Voyageur',
                    description: 'Un marchand te propose des objets rares !',
                    icon: '🛒',
                    actions: ['trade', 'ignore'],
                    outcomes: {
                        trade: { gold: [-30, 80], items: ['Potion Rare'] },
                        ignore: { nothing: true }
                    }
                },
                
                shrine: {
                    chance: 10,
                    title: 'Sanctuaire Ancien',
                    description: 'Un sanctuaire mystique pulse d\'énergie divine...',
                    icon: '⛩️',
                    actions: ['pray', 'investigate', 'ignore'],
                    outcomes: {
                        pray: { blessing: true, max_health: 15 },
                        investigate: { chance_treasure: 60, chance_curse: 40 },
                        ignore: { nothing: true }
                    }
                },
                
                bandits: {
                    chance: 18,
                    title: 'Embuscade de Bandits !',
                    description: 'Des bandits te barrent la route !',
                    icon: '🏴‍☠️',
                    actions: ['fight', 'pay', 'sneak'],
                    outcomes: {
                        fight: { combat: 'bandit' },
                        pay: { gold: [-40, -20] },
                        sneak: { success: 65, fail_damage: 20 }
                    }
                }
            }
        };

        const reputationSystem = {
            aldric: { level: 0, points: 0, thresholds: [0, 100, 250, 500], ranks: ['Inconnu', 'Apprenti', 'Compagnon', 'Maître-Forgeron'] },
            gareth: { level: 0, points: 0, thresholds: [0, 80, 200, 400], ranks: ['Recrue', 'Soldat', 'Vétéran', 'Champion'] },
            marcus: { level: 0, points: 0, thresholds: [0, 120, 300, 600], ranks: ['Novice', 'Initié', 'Adepte', 'Sage'] },
            vera: { level: 0, points: 0, thresholds: [0, 90, 220, 450], ranks: ['Curieux', 'Assistant', 'Alchimiste', 'Maître'] }
        };

      // ========== CLASSE PRINCIPALE ==========
        class RPGGame {
            constructor() {
                this.state = GAME_STATES.EXPLORING;
                this.player = this.createDefaultPlayer();
                this.currentEnemy = null;
                this.activeQuests = [];
                this.completedQuests = [];
                this.metNPCs = [];
                this.playerEffects = {
                    blessing: 0,
                    luck: 0,
                    cursed: 0
                };
                
                this.initialize();
            }

            createDefaultPlayer() {
                return {
                    name: 'Héros',
                    health: 100,
                    maxHealth: 100,
                    gold: 100,
                    level: 1,
                    exp: 0,
                    maxExp: 100,
                    attack: 12,
                    defense: 6,
                    inventory: ['épée rouillée', 'Petite Potion', 'Petite Potion'],
                    equipment: {
                        weapon: 'épée rouillée',
                        armor: null,
                        accessory: null
                    },
                    stats: {
                        enemiesKilled: 0,
                        treasuresFound: 0,
                        explorations: 0,
                        potionsUsed: 0,
                        goldSpent: 0
                    }
                };
            }

            initialize() {
                this.setupEventListeners();
                this.updateUI();
                this.updateQuestDisplay();
                this.updateReputationDisplay();
                this.changeGameState(GAME_STATES.EXPLORING);
                this.showNameModal();
            }

            setupEventListeners() {
                document.getElementById('exploreBtn').addEventListener('click', () => this.handleExplore());
                document.getElementById('attackBtn').addEventListener('click', () => this.handleAttack());
                document.getElementById('fleeBtn').addEventListener('click', () => this.handleFlee());
                document.getElementById('useItemBtn').addEventListener('click', () => this.handleUseItem());
                document.getElementById('shopBtn').addEventListener('click', () => this.handleShop());
                document.getElementById('advancedShopBtn').addEventListener('click', () => this.showAdvancedShop());
                document.getElementById('questBtn').addEventListener('click', () => this.handleQuest());
                document.getElementById('restBtn').addEventListener('click', () => this.handleRest());
                document.getElementById('changeNameBtn').addEventListener('click', () => this.showNameModal());
                document.getElementById('inventoryBtn').addEventListener('click', () => this.showInventory());
                document.getElementById('skillsBtn').addEventListener('click', () => this.showSkills());
                document.getElementById('confirmNameBtn').addEventListener('click', () => this.setPlayerName());
                document.getElementById('saveBtn').addEventListener('click', () => this.saveGame());
                document.getElementById('loadBtn').addEventListener('click', () => this.loadGame());
                document.getElementById('resetBtn').addEventListener('click', () => this.handleReset());
                
                document.getElementById('playerNameInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.setPlayerName();
                });
            }

            updateUI() {
                document.getElementById('playerNameTitle').textContent = this.player.name;
                document.getElementById('playerHealth').textContent = this.player.health;
                document.getElementById('playerMaxHealth').textContent = this.player.maxHealth;
                document.getElementById('playerGold').textContent = this.player.gold;
                document.getElementById('playerLevel').textContent = this.player.level;
                document.getElementById('playerExp').textContent = this.player.exp;
                document.getElementById('playerMaxExp').textContent = this.player.maxExp;
                document.getElementById('playerAttack').textContent = this.player.attack;
                document.getElementById('playerDefense').textContent = this.player.defense;
                
                // Afficher seulement les objets les plus importants dans l'inventaire de base
                const importantItems = this.player.inventory.filter(item => 
                    !item.includes('Potion') || this.player.inventory.indexOf(item) < 3
                ).slice(0, 3);
                
                document.getElementById('playerInventory').textContent = 
                    importantItems.join(', ') + (this.player.inventory.length > 3 ? '...' : '') || 'Vide';
                
                const healthPercent = Math.max(0, (this.player.health / this.player.maxHealth) * 100);
                const expPercent = Math.max(0, (this.player.exp / this.player.maxExp) * 100);
                
                document.getElementById('healthFill').style.width = healthPercent + '%';
                document.getElementById('expFill').style.width = expPercent + '%';
            }

            updateEnemyUI() {
                const enemyInfo = document.getElementById('enemy-info');
                if (this.currentEnemy) {
                    document.getElementById('enemyName').textContent = this.currentEnemy.name;
                    document.getElementById('enemyHealth').textContent = this.currentEnemy.health;
                    document.getElementById('enemyMaxHealth').textContent = this.currentEnemy.maxHealth;
                    document.getElementById('enemyAttack').textContent = this.currentEnemy.attack;
                    document.getElementById('enemyDefense').textContent = this.currentEnemy.defense;
                    enemyInfo.style.display = 'block';
                } else {
                    enemyInfo.style.display = 'none';
                }
            }

            updateReputationDisplay() {
                const panel = document.getElementById('reputation-panel');
                panel.innerHTML = '';
                
                Object.keys(reputationSystem).forEach(npcKey => {
                    const rep = reputationSystem[npcKey];
                    const npc = npcCharacters[npcKey];
                    
                    if (rep.points > 0) {
                        const repDiv = document.createElement('div');
                        repDiv.className = 'reputation-item';
                        
                        const progress = rep.level < rep.ranks.length - 1 ? 
                            Math.min(100, ((rep.points - rep.thresholds[rep.level]) / (rep.thresholds[rep.level + 1] - rep.thresholds[rep.level])) * 100) : 100;
                        
                        repDiv.innerHTML = `
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
                                <span style="font-weight: bold;">${npc.name}</span>
                                <span style="font-size: 0.8em;">${rep.ranks[rep.level]}</span>
                            </div>
                            <div style="background: #2c3e50; height: 6px; border-radius: 3px; overflow: hidden;">
                                <div style="background: #9b59b6; height: 100%; width: ${progress}%; transition: width 0.3s ease;"></div>
                            </div>
                        `;
                        
                        panel.appendChild(repDiv);
                    }
                });
                
                if (panel.innerHTML === '') {
                    panel.innerHTML = '<p style="text-align: center; color: #999; font-size: 0.8em;">Aucune réputation établie</p>';
                }
            }

            showMessage(message) {
                document.getElementById('story').innerHTML = `<p>${message}</p>`;
            }

            addMessage(message) {
                document.getElementById('story').innerHTML += `<p>${message}</p>`;
                // Auto-scroll vers le bas
                const story = document.getElementById('story');
                story.scrollTop = story.scrollHeight;
            }

            showNotification(message) {
                const notification = document.createElement('div');
                notification.className = 'notification show';
                notification.textContent = message;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            document.body.removeChild(notification);
                        }
                    }, 300);
                }, 3000);
            }

            changeGameState(newState) {
                this.state = newState;
                this.updateButtonsForState(newState);
                
                if (newState !== GAME_STATES.COMBAT) {
                    this.currentEnemy = null;
                    this.updateEnemyUI();
                }
            }

            updateButtonsForState(state) {
                const buttons = ['exploreBtn', 'attackBtn', 'fleeBtn', 'useItemBtn', 'shopBtn', 'advancedShopBtn', 'questBtn', 'restBtn'];
                buttons.forEach(id => {
                    document.getElementById(id).style.display = 'none';
                });
                
                switch(state) {
                    case GAME_STATES.EXPLORING:
                        document.getElementById('exploreBtn').style.display = 'inline-block';
                        document.getElementById('shopBtn').style.display = 'inline-block';
                        document.getElementById('advancedShopBtn').style.display = 'inline-block';
                        document.getElementById('questBtn').style.display = 'inline-block';
                        document.getElementById('restBtn').style.display = 'inline-block';
                        if (this.hasUsableItems()) {
                            document.getElementById('useItemBtn').style.display = 'inline-block';
                        }
                        break;
                    case GAME_STATES.COMBAT:
                        document.getElementById('attackBtn').style.display = 'inline-block';
                        document.getElementById('fleeBtn').style.display = 'inline-block';
                        if (this.hasUsableItems()) {
                            document.getElementById('useItemBtn').style.display = 'inline-block';
                        }
                        break;
                }
            }

            hasUsableItems() {
                return this.player.inventory.some(item => 
                    item.includes('Potion') || item.includes('potion')
                );
            }

            // ========== SYSTÈME DE MODALS ==========
            ensureModalExists() {
                if (!document.getElementById('eventModal')) {
                    const modalHTML = `
                        <div id="eventModal" class="modal-overlay">
                            <div id="eventModalContent" class="modal-content">
                                <div class="modal-header">
                                    <h3 id="modalTitle" class="modal-title">Titre</h3>
                                    <button class="modal-close" onclick="document.getElementById('eventModal').style.display='none'">×</button>
                                </div>
                                <div class="modal-body">
                                    <div id="modalImageContainer" class="modal-image-container"></div>
                                    <p id="modalDescription" class="modal-description">Description</p>
                                </div>
                                <div class="modal-footer">
                                    <button class="modal-button" onclick="document.getElementById('eventModal').style.display='none'">Continuer</button>
                                </div>
                            </div>
                        </div>
                    `;
                    document.body.insertAdjacentHTML('beforeend', modalHTML);
                }
            }

            showEventModal(eventType, subType = null) {
                this.ensureModalExists();
                
                const overlay = document.getElementById('eventModal');
                const content = document.getElementById('eventModalContent');
                const imageContainer = document.getElementById('modalImageContainer');
                const title = document.getElementById('modalTitle');
                const description = document.getElementById('modalDescription');

                let eventData;
                
                if (subType && localImageEvents[eventType]?.[subType]) {
                    eventData = localImageEvents[eventType][subType];
                } else if (localImageEvents[eventType]) {
                    eventData = localImageEvents[eventType];
                } else {
                    eventData = {
                        title: 'Événement',
                        description: 'Quelque chose se passe !',
                        className: 'modal-content'
                    };
                }

                content.className = `modal-content ${eventData.className || ''}`;

                // ========== UTILISER VOS VRAIES IMAGES ==========
                if (eventData.image) {
                    // Essayer d'afficher l'image réelle
                    imageContainer.innerHTML = `
                        <img src="${eventData.image}" 
                             alt="${eventData.title}" 
                             style="max-width: 100%; max-height: 200px; border-radius: 15px; 
                                    border: 3px solid #f39c12; box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                                    object-fit: cover;"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div style="width: 100%; height: 150px; background: rgba(52, 73, 93, 0.8); 
                                    border-radius: 15px; display: none; align-items: center; 
                                    justify-content: center; border: 3px solid #f39c12; margin: 10px 0;">
                            <div style="text-align: center; color: #f39c12;">
                                <div style="font-size: 3.5em; margin-bottom: 8px;">${this.getEventEmoji(eventType, subType)}</div>
                                <div style="font-size: 1em; font-weight: bold;">${eventData.title}</div>
                            </div>
                        </div>
                    `;
                } else {
                    // Fallback avec emoji si pas d'image définie
                    const iconEmoji = this.getEventEmoji(eventType, subType);
                    imageContainer.innerHTML = `
                        <div style="width: 100%; height: 150px; background: rgba(52, 73, 93, 0.8); 
                                    border-radius: 15px; display: flex; align-items: center; 
                                    justify-content: center; border: 3px solid #f39c12; margin: 10px 0;">
                            <div style="text-align: center; color: #f39c12;">
                                <div style="font-size: 3.5em; margin-bottom: 8px;">${iconEmoji}</div>
                                <div style="font-size: 1em; font-weight: bold;">${eventData.title}</div>
                            </div>
                        </div>
                    `;
                }

                title.textContent = eventData.title;
                description.textContent = eventData.description;
                overlay.style.display = 'flex';
            }

            getEventEmoji(eventType, subType) {
                if (eventType === 'combat') return '⚔️';
                if (eventType === 'treasure') return '💰';
                if (eventType === 'levelup') return '⭐';
                if (subType === 'aldric') return '🔨';
                if (subType === 'gareth') return '⚔️';
                if (subType === 'marcus') return '🔮';
                if (subType === 'vera') return '🧪';
                if (eventType === 'events') {
                    if (subType === 'merchant') return '🛒';
                    if (subType === 'shrine') return '⛩️';
                    if (subType === 'bandits') return '🏴‍☠️';
                }
                return '📜';
            }

            showNameModal() {
                document.getElementById('nameModal').style.display = 'flex';
                document.getElementById('playerNameInput').value = this.player.name;
                document.getElementById('playerNameInput').focus();
            }

            hideNameModal() {
                document.getElementById('nameModal').style.display = 'none';
            }

            setPlayerName() {
                const nameInput = document.getElementById('playerNameInput');
                const cleanName = nameInput.value.trim();
                
                if (cleanName && cleanName.length <= 20) {
                    this.player.name = cleanName;
                    this.updateUI();
                    this.hideNameModal();
                    this.showMessage(`🌟 Bienvenue, ${this.player.name} ! Ton épique aventure commence maintenant...`);
                    this.showNotification(`Bienvenue, ${this.player.name} !`);
                } else {
                    alert('Veuillez entrer un nom valide (1-20 caractères) !');
                }
            }

            // ========== MÉCANIQUES DE JEU ==========
            getRandomEvent() {
                // Chance d'événement spécial
                if (Math.random() < 0.25) {
                    return this.getAdvancedEvent();
                }
                
                const events = ['enemy', 'treasure', 'nothing'];
                const weights = [45, 35, 20];
                
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

            getAdvancedEvent() {
                const events = Object.keys(advancedEvents.encounters);
                const totalChance = events.reduce((sum, key) => sum + advancedEvents.encounters[key].chance, 0);
                
                let random = Math.random() * totalChance;
                for (let key of events) {
                    random -= advancedEvents.encounters[key].chance;
                    if (random <= 0) {
                        return { type: 'advanced', key, ...advancedEvents.encounters[key] };
                    }
                }
                return 'nothing';
            }

            getRandomEnemy() {
                const enemyTypes = Object.keys(enemies);
                const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
                const baseEnemy = { ...enemies[randomType] };
                
                const multiplier = 1 + (this.player.level - 1) * 0.15;
                
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

            handleExplore() {
                this.player.stats.explorations++;
                const event = this.getRandomEvent();
                this.processEvent(event);
                this.checkQuestProgress();
            }

            processEvent(event) {
                if (typeof event === 'object' && event.type === 'advanced') {
                    this.processAdvancedEvent(event);
                } else {
                    switch(event) {
                        case 'enemy':
                            this.handleEnemyEncounter();
                            break;
                        case 'treasure':
                            this.handleTreasure();
                            break;
                        default:
                            this.handleNothing();
                    }
                }
            }

            processAdvancedEvent(event) {
                this.showEventModal('events', event.key);
                this.showMessage(`🌟 ${event.title}`);
                this.addMessage(event.description);
                
                if (event.actions) {
                    event.actions.forEach(action => {
                        const btn = document.createElement('button');
                        btn.textContent = this.getActionText(action);
                        btn.className = 'event-button';
                        
                        btn.addEventListener('click', () => {
                            this.resolveEventAction(event, action);
                            this.removeEventButtons();
                        });
                        
                        document.getElementById('story').appendChild(btn);
                    });
                }
            }

            getActionText(action) {
                const actionTexts = {
                    trade: '🛒 Commercer',
                    ignore: '🚶 Ignorer',
                    fight: '⚔️ Combattre',
                    pay: '💰 Payer',
                    sneak: '🤫 Se faufiler',
                    pray: '🙏 Prier',
                    investigate: '🔍 Enquêter'
                };
                
                return actionTexts[action] || action;
            }

            resolveEventAction(event, action) {
                const outcome = event.outcomes[action];
                
                if (outcome.combat) {
                    this.startSpecialCombat(outcome.combat);
                } else if (outcome.gold) {
                    const goldChange = Array.isArray(outcome.gold) ? 
                        Math.floor(Math.random() * (outcome.gold[1] - outcome.gold[0] + 1)) + outcome.gold[0] :
                        outcome.gold;
                    
                    this.player.gold = Math.max(0, this.player.gold + goldChange);
                    this.showMessage(`${goldChange > 0 ? 'Tu gagnes' : 'Tu perds'} ${Math.abs(goldChange)} pièces d'or !`);
                } else if (outcome.items) {
                    outcome.items.forEach(item => {
                        this.player.inventory.push(item);
                        this.showMessage(`Tu obtiens : ${item} !`);
                    });
                } else if (outcome.blessing) {
                    this.playerEffects.blessing += 5;
                    if (outcome.max_health) {
                        this.player.maxHealth += outcome.max_health;
                        this.player.health += outcome.max_health;
                    }
                    this.showMessage('✨ Tu ressens une bénédiction divine ! Ta santé maximale augmente !');
                } else if (outcome.success) {
                    if (Math.random() * 100 < outcome.success) {
                        this.showMessage('✅ Succès ! Tu réussis ton action avec brio.');
                    } else {
                        this.showMessage('❌ Échec ! Ton action ne se déroule pas comme prévu.');
                        if (outcome.fail_damage) {
                            this.player.health = Math.max(0, this.player.health - outcome.fail_damage);
                            this.showMessage(`Tu subis ${outcome.fail_damage} dégâts !`);
                        }
                    }
                } else if (outcome.chance_treasure) {
                    if (Math.random() * 100 < outcome.chance_treasure) {
                        const goldFound = Math.floor(Math.random() * 80) + 40;
                        this.player.gold += goldFound;
                        this.showMessage(`💰 Tu découvres un trésor caché ! +${goldFound} or !`);
                    } else if (outcome.chance_curse && Math.random() * 100 < outcome.chance_curse) {
                        this.playerEffects.cursed += 3;
                        this.showMessage('💀 Une malédiction t\'affecte ! Tes prochains combats seront plus difficiles...');
                    }
                } else if (outcome.nothing) {
                    this.showMessage('Tu décides de ne rien faire et continues ton chemin.');
                }
                
                this.updateUI();
            }

            startSpecialCombat(enemyType) {
                this.currentEnemy = this.getRandomEnemy();
                this.showMessage(`💥 Un ${this.currentEnemy.name} surgit pour t'attaquer !`);
                this.changeGameState(GAME_STATES.COMBAT);
                this.updateEnemyUI();
            }

            removeEventButtons() {
                document.querySelectorAll('.event-button').forEach(btn => {
                    if (btn.parentNode) btn.parentNode.removeChild(btn);
                });
            }

            handleEnemyEncounter() {
                this.currentEnemy = this.getRandomEnemy();
                const enemyType = Object.keys(enemies).find(key => 
                    enemies[key].name === this.currentEnemy.name
                );
                
                this.showEventModal('combat', enemyType);
                this.showMessage(`⚔️ ${this.currentEnemy.name} apparaît ! Prépare-toi au combat, ${this.player.name} !`);
                this.changeGameState(GAME_STATES.COMBAT);
                this.updateEnemyUI();
            }

            handleTreasure() {
                this.showEventModal('treasure');
                this.player.stats.treasuresFound++;
                
                const goldFound = Math.floor(Math.random() * 40) + 20;
                this.player.gold += goldFound;
                
                if (Math.random() < 0.3) {
                    const treasureItems = ['Gemme Précieuse', 'Cristal Magique', 'Amulette Antique'];
                    const foundItem = treasureItems[Math.floor(Math.random() * treasureItems.length)];
                    this.player.inventory.push(foundItem);
                    this.showMessage(`💎 ${this.player.name}, tu découvres un coffre ! ${goldFound} or et ${foundItem} !`);
                    this.showNotification(`+${goldFound} or + ${foundItem}`);
                } else {
                    this.showMessage(`💰 ${this.player.name}, tu découvres un coffre contenant ${goldFound} pièces d'or !`);
                    this.showNotification(`+${goldFound} or`);
                }
                this.updateUI();
                this.checkQuestProgress();
            }

            handleNothing() {
                const messages = [
                    `${this.player.name} avance prudemment dans les terres sauvages...`,
                    `Le vent souffle doucement à travers les arbres...`,
                    `Rien d'intéressant par ici, mais l'aventure continue...`,
                    `Tu entends des bruits étranges au loin mais ne trouves rien...`,
                    `Le paysage est magnifique, mais aucun trésor en vue...`
                ];
                this.showMessage(messages[Math.floor(Math.random() * messages.length)]);
            }

            handleAttack() {
                if (!this.currentEnemy) return;

                let playerDamage = Math.max(1, this.player.attack + Math.floor(Math.random() * 8) - this.currentEnemy.defense);
                
                // Appliquer les effets
                if (this.playerEffects.blessing > 0) {
                    playerDamage = Math.ceil(playerDamage * 1.2);
                    this.playerEffects.blessing--;
                }
                
                this.currentEnemy.health -= playerDamage;
                
                let message = `⚔️ ${this.player.name} attaque ${this.currentEnemy.name} et inflige ${playerDamage} dégâts !`;

                if (this.currentEnemy.health <= 0) {
                    this.player.stats.enemiesKilled++;
                    const expGained = this.currentEnemy.exp;
                    const goldGained = Math.floor(Math.random() * (this.currentEnemy.gold[1] - this.currentEnemy.gold[0] + 1)) + this.currentEnemy.gold[0];
                    
                    message += ` 💀 ${this.currentEnemy.name} est vaincu !`;
                    this.showMessage(message);
                    
                    this.player.gold += goldGained;
                    this.gainExp(expGained);
                    this.showNotification(`+${goldGained} or`);
                    
                    setTimeout(() => {
                        this.showMessage(`🎉 Victoire ${this.player.name} ! Tu peux continuer ton exploration.`);
                        this.changeGameState(GAME_STATES.EXPLORING);
                    }, 2000);
                } else {
                    let enemyDamage = Math.max(1, this.currentEnemy.attack + Math.floor(Math.random() * 5) - this.player.defense);
                    
                    // Malédiction
                    if (this.playerEffects.cursed > 0) {
                        enemyDamage = Math.ceil(enemyDamage * 1.3);
                        this.playerEffects.cursed--;
                    }
                    
                    this.player.health -= enemyDamage;
                    message += ` 💥 ${this.currentEnemy.name} contre-attaque et inflige ${enemyDamage} dégâts !`;
                    
                    this.showMessage(message);
                    this.updateEnemyUI();
                    this.updateUI();
                    
                    if (this.player.health <= 0) {
                        setTimeout(() => this.handleGameOver(), 1500);
                    }
                }
            }

            handleFlee() {
                const success = Math.random() > 0.3;
                
                if (success) {
                    this.showMessage(`🏃 ${this.player.name} s'échappe avec succès !`);
                    setTimeout(() => this.changeGameState(GAME_STATES.EXPLORING), 1500);
                } else {
                    const damage = Math.floor(Math.random() * 15) + 5;
                    this.player.health = Math.max(0, this.player.health - damage);
                    this.showMessage(`❌ ${this.player.name} essaie de fuir mais ${this.currentEnemy.name} l'attaque ! ${damage} dégâts !`);
                    this.updateUI();
                    
                    setTimeout(() => {
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
                    item.includes('Potion') || item.includes('potion')
                );
                
                if (potions.length === 0) {
                    this.showMessage(`${this.player.name}, tu n'as pas d'objet utilisable !`);
                    return;
                }

                const usedPotion = potions[0];
                const potionIndex = this.player.inventory.indexOf(usedPotion);
                this.player.inventory.splice(potionIndex, 1);
                
                this.player.stats.potionsUsed++;
                
                let healAmount = 35;
                if (usedPotion.includes('Moyenne')) healAmount = 70;
                else if (usedPotion.includes('Grande')) healAmount = 120;
                else if (usedPotion.includes('Rare')) healAmount = this.player.maxHealth;
                
                const oldHealth = this.player.health;
                this.player.health = Math.min(this.player.maxHealth, this.player.health + healAmount);
                const actualHeal = this.player.health - oldHealth;
                
                this.showMessage(`🧪 ${this.player.name}, tu utilises ${usedPotion} et récupères ${actualHeal} PV !`);
                this.showNotification(`+${actualHeal} PV`);
                this.updateUI();
                this.updateButtonsForState(this.state);
                this.checkQuestProgress();
            }

            handleShop() {
                this.showMessage(`🏪 Tu entres dans une petite boutique de village...`);
                setTimeout(() => this.showBasicShop(), 1000);
            }

            showBasicShop() {
                this.showMessage(`Marchand : "Bienvenue, ${this.player.name} ! J'ai quelques objets de base pour toi."`);
                
                const basicItems = {
                    smallPotion: { name: 'Petite Potion', price: 30, heal: 35 },
                    mediumPotion: { name: 'Potion Moyenne', price: 60, heal: 70 },
                    ironDagger: { name: 'Dague de Fer', price: 80, attack: 5 }
                };
                
                Object.keys(basicItems).forEach(key => {
                    const item = basicItems[key];
                    const canAfford = this.player.gold >= item.price;
                    
                    const btn = document.createElement('button');
                    btn.className = 'shop-button';
                    btn.textContent = `${item.name} - ${item.price} or${!canAfford ? ' (Trop cher)' : ''}`;
                    btn.disabled = !canAfford;
                    
                    if (canAfford) {
                        btn.addEventListener('click', () => {
                            this.player.gold -= item.price;
                            this.player.stats.goldSpent += item.price;
                            
                            if (item.heal) {
                                this.player.inventory.push(item.name);
                            } else if (item.attack) {
                                this.player.attack += item.attack;
                                this.player.inventory.push(item.name);
                            }
                            
                            this.showMessage(`✅ Tu achètes ${item.name} pour ${item.price} or !`);
                            this.updateUI();
                            this.removeShopButtons();
                            this.showBasicShop();
                        });
                    }
                    
                    document.getElementById('story').appendChild(btn);
                });
                
                const exitBtn = document.createElement('button');
                exitBtn.textContent = '🚪 Quitter';
                exitBtn.className = 'shop-button';
                exitBtn.style.background = '#e74c3c';
                exitBtn.addEventListener('click', () => {
                    this.removeShopButtons();
                    this.changeGameState(GAME_STATES.EXPLORING);
                    this.showMessage('Marchand : "Merci et bon voyage !"');
                });
                
                document.getElementById('story').appendChild(exitBtn);
            }

            showAdvancedShop() {
                const shop = shopSystem.mainShop;
                this.showMessage(`🏛️ Tu entres dans le ${shop.name} !`);
                this.addMessage(`${shop.keeper} : "Bienvenue, ${this.player.name} ! J'ai des objets de qualité pour les vrais aventuriers !"`);
                
                Object.keys(shop.items).forEach(itemKey => {
                    const item = shop.items[itemKey];
                    const canAfford = this.player.gold >= item.price;
                    const meetsRequirement = !item.requirement || (item.requirement.level <= this.player.level);
                    
                    const btn = document.createElement('button');
                    btn.className = 'shop-button';
                    
                    let buttonText = `${item.icon} ${item.name} - ${item.price} or`;
                    if (!canAfford) buttonText += ' (Trop cher)';
                    if (!meetsRequirement) buttonText += ` (Niveau ${item.requirement.level} requis)`;
                    
                    btn.textContent = buttonText;
                    btn.disabled = !canAfford || !meetsRequirement;
                    btn.title = item.description;
                    
                    if (canAfford && meetsRequirement) {
                        btn.addEventListener('click', () => {
                            this.buyAdvancedItem(item);
                            this.removeShopButtons();
                            this.showAdvancedShop();
                        });
                    }
                    
                    document.getElementById('story').appendChild(btn);
                });
                
                const exitBtn = document.createElement('button');
                exitBtn.textContent = '🚪 Quitter le marché';
                exitBtn.className = 'shop-button';
                exitBtn.style.background = '#e74c3c';
                exitBtn.addEventListener('click', () => {
                    this.removeShopButtons();
                    this.changeGameState(GAME_STATES.EXPLORING);
                    this.showMessage(`${shop.keeper} : "Merci de ta visite ! Reviens quand tu veux !"`);
                });
                
                document.getElementById('story').appendChild(exitBtn);
            }

            buyAdvancedItem(item) {
                this.player.gold -= item.price;
                this.player.stats.goldSpent += item.price;
                
                if (item.type === 'consumable') {
                    this.player.inventory.push(item.name);
                } else if (item.type === 'weapon') {
                    this.player.attack += item.value;
                    this.player.inventory.push(item.name);
                } else if (item.type === 'armor') {
                    this.player.defense += item.value;
                    this.player.inventory.push(item.name);
                } else if (item.type === 'special') {
                    this.player.inventory.push(item.name);
                    if (item.effect === 'luck') {
                        this.playerEffects.luck += item.value;
                    }
                }
                
                this.showMessage(`✅ Tu achètes ${item.name} pour ${item.price} or !`);
                this.showNotification(`${item.name} acheté !`);
                this.updateUI();
                this.checkQuestProgress();
            }

            removeShopButtons() {
                document.querySelectorAll('.shop-button').forEach(btn => {
                    if (btn.parentNode) btn.parentNode.removeChild(btn);
                });
            }

            showInventory() {
                this.showMessage(`🎒 Inventaire détaillé de ${this.player.name} :`);
                
                const itemCounts = {};
                this.player.inventory.forEach(item => {
                    itemCounts[item] = (itemCounts[item] || 0) + 1;
                });
                
                if (Object.keys(itemCounts).length === 0) {
                    this.addMessage('Ton inventaire est vide.');
                } else {
                    Object.keys(itemCounts).forEach(item => {
                        const count = itemCounts[item];
                        this.addMessage(`• ${item}${count > 1 ? ` (x${count})` : ''}`);
                    });
                }
                
                this.addMessage(`\n💰 Or total : ${this.player.gold}`);
                this.addMessage(`📊 Statistiques :`);
                this.addMessage(`• Ennemis vaincus : ${this.player.stats.enemiesKilled}`);
                this.addMessage(`• Trésors trouvés : ${this.player.stats.treasuresFound}`);
                this.addMessage(`• Explorations : ${this.player.stats.explorations}`);
                this.addMessage(`• Potions utilisées : ${this.player.stats.potionsUsed}`);
            }

            showSkills() {
                this.showMessage(`🎯 Compétences de ${this.player.name} :`);
                this.addMessage('💪 Combat :');
                this.addMessage(`• Attaque : ${this.player.attack}`);
                this.addMessage(`• Défense : ${this.player.defense}`);
                this.addMessage(`• Santé Max : ${this.player.maxHealth}`);
                
                this.addMessage('\n✨ Effets actifs :');
                if (this.playerEffects.blessing > 0) {
                    this.addMessage(`• Bénédiction : ${this.playerEffects.blessing} tours restants`);
                }
                if (this.playerEffects.luck > 0) {
                    this.addMessage(`• Chance améliorée : Niveau ${this.playerEffects.luck}`);
                }
                if (this.playerEffects.cursed > 0) {
                    this.addMessage(`• Malédiction : ${this.playerEffects.cursed} tours restants`);
                }
                
                if (this.playerEffects.blessing === 0 && this.playerEffects.luck === 0 && this.playerEffects.cursed === 0) {
                    this.addMessage('• Aucun effet actif');
                }
            }

            // ========== SYSTÈME DE QUÊTES PNJ ==========
            getRandomNPC() {
                const availableNPCs = Object.keys(npcCharacters).filter(npcKey => {
                    const lastEncounters = this.metNPCs.slice(-2);
                    return !lastEncounters.includes(npcKey);
                });
                
                if (availableNPCs.length === 0) {
                    return Object.keys(npcCharacters)[Math.floor(Math.random() * Object.keys(npcCharacters).length)];
                }
                
                return availableNPCs[Math.floor(Math.random() * availableNPCs.length)];
            }

            getQuestFromNPC(npcKey) {
                const npc = npcCharacters[npcKey];
                if (!npc) return null;
                
                const questKeys = Object.keys(npc.quests);
                const randomQuestKey = questKeys[Math.floor(Math.random() * questKeys.length)];
                const questTemplate = npc.quests[randomQuestKey];
                
                const alreadyActive = this.activeQuests.some(q => q.title === questTemplate.title);
                if (alreadyActive) {
                    return null;
                }
                
                return { ...questTemplate, npc: npcKey, questKey: randomQuestKey };
            }

            handleQuest() {
                this.showMessage(`🔍 ${this.player.name}, tu cherches des PNJ ayant besoin d'aide...`);
                
                setTimeout(() => {
                    const chance = Math.random();
                    if (chance < 0.85) {
                        const npcKey = this.getRandomNPC();
                        this.metNPCs.push(npcKey);
                        
                        if (this.metNPCs.length > 5) {
                            this.metNPCs.shift();
                        }
                        
                        this.showEventModal('npc', npcKey);
                        setTimeout(() => this.meetSpecificNPC(npcKey), 2500);
                    } else {
                        this.showMessage(`${this.player.name}, tu ne trouves personne ayant besoin d'aide pour le moment. Réessaie plus tard !`);
                    }
                }, 1500);
            }

            meetSpecificNPC(npcKey) {
                const npc = npcCharacters[npcKey];
                if (!npc) return;
                
                const availableQuest = this.getQuestFromNPC(npcKey);
                
                if (!availableQuest) {
                    this.showMessage(`${npc.name} : "Tu travailles déjà sur une de mes missions, ${this.player.name}. Termine-la d'abord !"`);
                    return;
                }
                
                this.showMessage(`👋 ${npc.name} s'approche de toi...`);
                
                setTimeout(() => {
                    this.showMessage(`${npc.name} : "${npc.greeting}"`);
                    
                    setTimeout(() => {
                        this.showMessage(`📋 Mission proposée: "${availableQuest.title}"`);
                        this.addMessage(`📝 ${availableQuest.description.replace('{target}', availableQuest.target)}`);
                        this.addMessage(`🎁 Récompenses: ${availableQuest.rewards.gold} or et ${availableQuest.rewards.exp} XP`);
                        
                        this.createQuestButtons(availableQuest, npc);
                    }, 1500);
                }, 1000);
            }

            createQuestButtons(quest, npc) {
                const acceptBtn = document.createElement('button');
                acceptBtn.textContent = '✅ Accepter la mission';
                acceptBtn.className = 'event-button';
                acceptBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                
                const declineBtn = document.createElement('button');
                declineBtn.textContent = '❌ Refuser poliment';
                declineBtn.className = 'event-button';
                declineBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
                
                acceptBtn.addEventListener('click', () => {
                    this.activeQuests.push(quest);
                    this.updateReputation(quest.npc, 20);
                    this.showMessage(`${npc.name} : "Excellent ! Je savais que je pouvais compter sur toi, ${this.player.name} !"`);
                    this.showNotification(`Nouvelle mission de ${npc.name} !`);
                    this.updateQuestDisplay();
                    this.removeQuestButtons();
                    
                    setTimeout(() => {
                        this.showMessage(`${npc.name} : "${npc.farewell}"`);
                    }, 1500);
                });
                
                declineBtn.addEventListener('click', () => {
                    this.showMessage(`${npc.name} : "Je comprends, ${this.player.name}. Peut-être une autre fois..."`);
                    setTimeout(() => {
                        this.showMessage(`${npc.name} : "${npc.farewell}"`);
                    }, 1500);
                    this.removeQuestButtons();
                });
                
                document.getElementById('story').appendChild(acceptBtn);
                document.getElementById('story').appendChild(declineBtn);
            }

            removeQuestButtons() {
                document.querySelectorAll('.event-button').forEach(btn => {
                    if (btn.textContent.includes('Accepter') || btn.textContent.includes('Refuser')) {
                        if (btn.parentNode) btn.parentNode.removeChild(btn);
                    }
                });
            }

            updateQuestDisplay() {
                const activeQuestsDiv = document.getElementById('active-quests');
                activeQuestsDiv.innerHTML = '';
                
                if (!Array.isArray(this.activeQuests) || this.activeQuests.length === 0) {
                    activeQuestsDiv.innerHTML = '<p style="text-align: center; color: #999; font-size: 0.9em;">Aucune quête active. Cherche des PNJ pour obtenir des missions !</p>';
                    return;
                }

                this.activeQuests.forEach((quest, index) => {
                    if (!quest || typeof quest !== 'object') return;
                    
                    const questDiv = document.createElement('div');
                    questDiv.className = `quest-item ${quest.completed ? 'quest-complete' : ''}`;
                    
                    let borderColor = '#3498db';
                    if (quest.npc) {
                        switch(quest.npc) {
                            case 'aldric': borderColor = '#34495e'; break;
                            case 'gareth': borderColor = '#e67e22'; break;
                            case 'marcus': borderColor = '#9b59b6'; break;
                            case 'vera': borderColor = '#1abc9c'; break;
                        }
                    }
                    
                    questDiv.style.borderLeftColor = borderColor;
                    
                    const progress = this.getQuestProgress(quest);
                    const progressText = quest.completed ? 'TERMINÉE ✅' : `${progress}/${quest.target}`;
                    
                    const npcName = quest.npc && npcCharacters[quest.npc] ? 
                        `<div style="font-size: 0.75em; opacity: 0.8; margin-bottom: 3px;">📜 ${npcCharacters[quest.npc].name}</div>` : '';
                    
                    questDiv.innerHTML = `
                        ${npcName}
                        <div style="font-weight: bold; font-size: 1em; margin-bottom: 2px;">${quest.icon || '📜'} ${quest.title || 'Quête'}</div>
                        <div style="margin: 2px 0; font-size: 0.85em;">${(quest.description || '').replace('{target}', quest.target || 0)}</div>
                        <div style="font-size: 0.8em; margin: 2px 0;">Progrès: ${progressText}</div>
                        <div style="font-size: 0.75em; opacity: 0.8;">💰 ${quest.rewards?.gold || 0} or • ⭐ ${quest.rewards?.exp || 0} XP</div>
                    `;
                    
                    if (quest.completed) {
                        const claimBtn = document.createElement('button');
                        claimBtn.textContent = '🎁 Réclamer';
                        claimBtn.style.cssText = `
                            margin-top: 8px;
                            background: linear-gradient(135deg, #f39c12, #e67e22);
                            color: white;
                            border: none;
                            padding: 6px 12px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-weight: bold;
                            font-size: 0.8em;
                        `;
                        
                        claimBtn.addEventListener('click', () => this.claimQuestReward(index));
                        questDiv.appendChild(claimBtn);
                    }
                    
                    activeQuestsDiv.appendChild(questDiv);
                });
            }

            getQuestProgress(quest) {
                if (!quest?.type || !this.player.stats) return 0;
                
                switch(quest.type) {
                    case 'kill': return this.player.stats.enemiesKilled || 0;
                    case 'treasure': return this.player.stats.treasuresFound || 0;
                    case 'explore': return this.player.stats.explorations || 0;
                    case 'potion': return this.player.stats.potionsUsed || 0;
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
                        this.showNotification(`🎉 Quête terminée: ${quest.title}`);
                        this.showMessage(`🎊 ${this.player.name}, tu as terminé la quête "${quest.title}" ! Tu peux maintenant réclamer ta récompense !`);
                    }
                });
                this.updateQuestDisplay();
            }

            claimQuestReward(questIndex) {
                if (questIndex < 0 || questIndex >= this.activeQuests.length) return;
                
                const quest = this.activeQuests[questIndex];
                if (!quest || !quest.completed || !quest.rewards) return;
                
                if (quest.npc) {
                    this.showEventModal('npc', quest.npc);
                    this.updateReputation(quest.npc, 30);
                }
                
                this.player.gold += quest.rewards.gold || 0;
                this.gainExp(quest.rewards.exp || 0);
                
                let rewardMessage = `💰 ${this.player.name}, tu réclames ta récompense pour "${quest.title}" : ${quest.rewards.gold} or et ${quest.rewards.exp} XP !`;
                
                if (quest.npc && npcCharacters[quest.npc]) {
                    const npc = npcCharacters[quest.npc];
                    rewardMessage = `${npc.name} : "${quest.completionText || 'Merci pour ton aide !'}"`;
                    this.addMessage(`🎁 Tu reçois ${quest.rewards.gold} or et ${quest.rewards.exp} XP !`);
                }
                
                this.showMessage(rewardMessage);
                this.showNotification(`🎁 Récompense réclamée !`);
                
                this.resetQuestStats(quest.type);
                this.completedQuests.push(quest);
                this.activeQuests.splice(questIndex, 1);
                
                this.updateUI();
                this.updateQuestDisplay();
                this.updateReputationDisplay();
            }

            updateReputation(npcKey, points) {
                if (!reputationSystem[npcKey]) return;
                
                const rep = reputationSystem[npcKey];
                rep.points += points;
                
                const newLevel = rep.thresholds.findIndex(threshold => rep.points < threshold) - 1;
                if (newLevel > rep.level && newLevel < rep.ranks.length) {
                    rep.level = newLevel;
                    const newRank = rep.ranks[newLevel];
                    
                    this.showMessage(`🎉 Ta réputation avec ${npcCharacters[npcKey].name} augmente !`);
                    this.addMessage(`🏆 Nouveau rang : ${newRank}`);
                    this.showNotification(`Réputation améliorée !`);
                }
                
                this.updateReputationDisplay();
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
                }
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
                this.player.maxExp = Math.floor(this.player.maxExp * 1.3);
                this.player.maxHealth += 25;
                this.player.health = this.player.maxHealth;
                this.player.attack += 3;
                this.player.defense += 2;

                this.showEventModal('levelup');
                this.showNotification(`🌟 NIVEAU ${this.player.level} !`);
                this.showMessage(`🎉 Félicitations ${this.player.name} ! Tu atteins le niveau ${this.player.level} !`);
                this.addMessage(`💪 Tes statistiques ont augmenté ! (+25 PV Max, +3 ATK, +2 DEF)`);
            }

            handleRest() {
                if (this.player.health === this.player.maxHealth) {
                    this.showMessage(`${this.player.name}, tu es déjà en pleine forme !`);
                    return;
                }
                
                const cost = 15;
                if (this.player.gold < cost) {
                    this.showMessage(`${this.player.name}, il te faut ${cost} pièces d'or pour te reposer dans une auberge.`);
                    return;
                }
                
                this.player.gold -= cost;
                this.player.stats.goldSpent += cost;
                this.player.health = this.player.maxHealth;
                
                // Nettoyer les effets négatifs
                this.playerEffects.cursed = 0;
                
                this.showMessage(`😴 ${this.player.name} se repose dans une auberge confortable pour ${cost} or. Santé entièrement restaurée !`);
                this.showNotification('💤 Repos complet !');
                this.updateUI();
                this.checkQuestProgress();
            }

            handleGameOver() {
                this.showMessage(`💀 ${this.player.name} est mort... Ton aventure héroïque se termine ici.`);
                this.addMessage('⚰️ Mais tout grand héros peut renaître de ses cendres...');
                this.changeGameState(GAME_STATES.GAME_OVER);
                
                setTimeout(() => {
                    if (confirm('Veux-tu revivre et recommencer ton aventure ?')) {
                        this.handleReset();
                    }
                }, 3000);
            }

            handleReset() {
                if (this.state !== GAME_STATES.GAME_OVER && !confirm('Êtes-vous sûr de vouloir recommencer votre aventure ?')) {
                    return;
                }
                
                this.player = this.createDefaultPlayer();
                this.activeQuests = [];
                this.completedQuests = [];
                this.metNPCs = [];
                this.currentEnemy = null;
                this.playerEffects = { blessing: 0, luck: 0, cursed: 0 };
                
                // Reset réputation
                Object.keys(reputationSystem).forEach(key => {
                    reputationSystem[key].level = 0;
                    reputationSystem[key].points = 0;
                });
                
                this.updateUI();
                this.updateQuestDisplay();
                this.updateReputationDisplay();
                this.changeGameState(GAME_STATES.EXPLORING);
                this.showNameModal();
                this.showNotification('🔄 Nouvelle aventure commencée !');
            }

            saveGame() {
                try {
                    const saveData = {
                        player: this.player,
                        activeQuests: this.activeQuests,
                        completedQuests: this.completedQuests,
                        metNPCs: this.metNPCs,
                        playerEffects: this.playerEffects,
                        reputation: reputationSystem,
                        version: '2.0'
                    };
                    localStorage.setItem('goldOfWarAdvancedSave', JSON.stringify(saveData));
                    this.showNotification('💾 Partie sauvegardée !');
                    this.showMessage('💾 Ta progression a été sauvegardée avec succès !');
                } catch(error) {
                    console.error('Erreur sauvegarde:', error);
                    this.showNotification('❌ Erreur de sauvegarde !');
                }
            }

            loadGame() {
                try {
                    const save = localStorage.getItem('goldOfWarAdvancedSave');
                    if (!save) {
                        this.showNotification('❌ Aucune sauvegarde trouvée !');
                        return;
                    }
                    
                    const saveData = JSON.parse(save);
                    
                    this.player = { ...this.createDefaultPlayer(), ...saveData.player };
                    this.activeQuests = saveData.activeQuests || [];
                    this.completedQuests = saveData.completedQuests || [];
                    this.metNPCs = saveData.metNPCs || [];
                    this.playerEffects = saveData.playerEffects || { blessing: 0, luck: 0, cursed: 0 };
                    
                    // Charger la réputation
                    if (saveData.reputation) {
                        Object.keys(saveData.reputation).forEach(key => {
                            if (reputationSystem[key]) {
                                reputationSystem[key] = { ...reputationSystem[key], ...saveData.reputation[key] };
                            }
                        });
                    }
                    
                    this.updateUI();
                    this.updateQuestDisplay();
                    this.updateReputationDisplay();
                    this.changeGameState(GAME_STATES.EXPLORING);
                    this.showNotification('📁 Partie chargée !');
                    this.showMessage(`📁 Sauvegarde chargée ! ${this.player.name}, ton aventure reprend où tu l'avais laissée...`);
                    
                } catch (error) {
                    console.error('Erreur chargement:', error);
                    this.showNotification('❌ Erreur de chargement !');
                    this.showMessage('❌ Impossible de charger la sauvegarde. Le fichier pourrait être corrompu.');
                }
            }
        }

        // ========== INITIALISATION GLOBALE ==========
        let gameInstance = null;

        function initializeGame() {
            try {
                if (gameInstance) {
                    // Nettoyage de l'instance précédente si elle existe
                    gameInstance = null;
                }
                gameInstance = new RPGGame();
                
                // Pour le debug (optionnel)
                window.game = gameInstance;
                console.log('🎮 Gold of War initialisé avec succès !');
                
            } catch (error) {
                console.error('❌ Erreur lors de l\'initialisation:', error);
                alert('Erreur lors du chargement du jeu. Vérifiez la console pour plus de détails.');
            }
        }

        // Nettoyage à la fermeture de la page
        window.addEventListener('beforeunload', () => {
            if (gameInstance) {
                try {
                    gameInstance.saveGame();
                } catch (error) {
                    console.log('Sauvegarde automatique échouée:', error);
                }
            }
        });

        // Démarrage du jeu
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeGame);
        } else {
            initializeGame();
        }

        // ========== FONCTIONS UTILITAIRES GLOBALES ==========
        
        // Fonction pour fermer les modals en cliquant à l'extérieur
        document.addEventListener('click', function(event) {
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Gestion des touches clavier
        document.addEventListener('keydown', function(event) {
            if (!gameInstance) return;
            
            // Touches de raccourci
            switch(event.key) {
                case 'e':
                case 'E':
                    if (gameInstance.state === GAME_STATES.EXPLORING) {
                        const exploreBtn = document.getElementById('exploreBtn');
                        if (exploreBtn && exploreBtn.style.display !== 'none') {
                            exploreBtn.click();
                        }
                    }
                    break;
                case 'a':
                case 'A':
                    if (gameInstance.state === GAME_STATES.COMBAT) {
                        const attackBtn = document.getElementById('attackBtn');
                        if (attackBtn && attackBtn.style.display !== 'none') {
                            attackBtn.click();
                        }
                    }
                    break;
                case 'f':
                case 'F':
                    if (gameInstance.state === GAME_STATES.COMBAT) {
                        const fleeBtn = document.getElementById('fleeBtn');
                        if (fleeBtn && fleeBtn.style.display !== 'none') {
                            fleeBtn.click();
                        }
                    }
                    break;
                case 'q':
                case 'Q':
                    if (gameInstance.state === GAME_STATES.EXPLORING) {
                        const questBtn = document.getElementById('questBtn');
                        if (questBtn && questBtn.style.display !== 'none') {
                            questBtn.click();
                        }
                    }
                    break;
                case 's':
                case 'S':
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault();
                        gameInstance.saveGame();
                    } else if (gameInstance.state === GAME_STATES.EXPLORING) {
                        const shopBtn = document.getElementById('shopBtn');
                        if (shopBtn && shopBtn.style.display !== 'none') {
                            shopBtn.click();
                        }
                    }
                    break;
                case 'Escape':
                    // Fermer les modals avec Échap
                    const openModals = document.querySelectorAll('.modal-overlay[style*="flex"]');
                    openModals.forEach(modal => {
                        modal.style.display = 'none';
                    });
                    break;
            }
        });

        // Fonction pour afficher les contrôles
        function showControls() {
            const helpText = `
🎮 CONTRÔLES CLAVIER :
• E - Explorer
• A - Attaquer (en combat)
• F - Fuir (en combat)
• Q - Chercher des quêtes
• S - Boutique
• Ctrl+S - Sauvegarder
• Échap - Fermer les fenêtres

🎯 CONSEILS :
• Terminez les quêtes pour gagner de l'expérience et de l'or
• Améliorez votre réputation avec les PNJ pour débloquer de nouveaux services
• Gardez des potions dans votre inventaire pour les combats difficiles
• Explorez régulièrement pour découvrir des événements spéciaux
• N'hésitez pas à vous reposer quand votre santé est faible

⚔️ Bonne aventure !
            `;
            
            if (gameInstance) {
                gameInstance.showMessage(helpText);
            } else {
                alert(helpText);
            }
        }

        // Ajouter un bouton d'aide
        setTimeout(() => {
            const helpBtn = document.createElement('button');
            helpBtn.textContent = '❓ Aide';
            helpBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: linear-gradient(135deg, #3498db, #2980b9);
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                z-index: 999;
                font-size: 0.9em;
            `;
            helpBtn.addEventListener('click', showControls);
            document.body.appendChild(helpBtn);
        }, 2000);

        // Console de debug pour les développeurs
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`
🛠️  MODE DEBUG ACTIVÉ 🛠️
Commandes disponibles dans la console :
• game.player - Voir les stats du joueur
• game.player.gold = 1000 - Modifier l'or
• game.player.level = 10 - Modifier le niveau
• game.gainExp(100) - Ajouter de l'expérience
• game.showAdvancedShop() - Ouvrir la boutique avancée
• game.updateReputation('aldric', 100) - Améliorer la réputation
            `);
        }
