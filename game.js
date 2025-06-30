// ========== CONSTANTES ET VARIABLES ==========
const GAME_STATES = {
    EXPLORING: 'exploring',
    COMBAT: 'combat',
    SHOPPING: 'shopping',
    GAME_OVER: 'game_over'
};

const localImageEvents = {
    combat: {
        goblin: {
            image: 'images/enemies/gobelin.png',
            title: 'Un Goblin Apparaît !',
            description: 'Un goblin sournois sort de derrière un rocher !',
            className: 'popup-combat'
        },
        dragon: {
            image: 'images/enemies/dragon.png', 
            title: 'DRAGON ANCIEN !',
            description: 'Le dragon rugit, ses écailles brillent !',
            className: 'popup-combat'
        },
        orc: {
            image: 'images/enemies/orc.png',
            title: 'Un Orc Sauvage !',
            description: 'Un orc féroce brandit sa hache !',
            className: 'popup-combat'
        },
        troll: {
            image: 'images/enemies/troll.png',
            title: 'Un Troll Énorme !',
            description: 'Le troll grogne, prêt à attaquer !',
            className: 'popup-combat'
        },
        skeleton: {
            image: 'images/enemies/squelette.png',
            title: 'Un Squelette Errant !',
            description: 'Un squelette hante les lieux, prêt à attaquer !',
            className: 'popup-combat'
        },
    },
    treasure: {
        image: 'images/events/tresor.png',
        title: 'Trésor Découvert !',
        description: 'Un coffre rempli d\'or étincelant !',
        className: 'popup-treasure'
    },
    levelup: {
        image: 'images/events/level-up.png',
        title: 'NIVEAU SUPÉRIEUR !',
        description: 'Tu gagnes en puissance !',
        className: 'popup-level'
    },
    potion: {
        image: 'images/events/potion.png',
        title: 'Potion Trouvée !',
        description: 'Une potion mystérieuse qui pourrait t\'aider !',
        className: 'popup-item'
    },                  
    merchant: {
        image: 'images/events/merchant.png',
        title: 'Marchand Mystérieux !',
        description: 'Un marchand apparaît et te propose des objets !',
        className: 'popup-merchant'
    },
    trap: {
        image: 'images/events/trap.png',
        title: 'Piège Mortel !',
        description: 'Tu tombes dans un piège ! Fais attention !',
        className: 'popup-trap'
    },
    rest: {
        image: 'images/events/repos.png',
        title: 'Repos Bien Mérité !',
        description: 'Tu trouves un endroit paisible pour te reposer.',
        className: 'popup-rest'
    },
    nothing: {
        image: 'images/locations/depart.png',
        title: 'Rien Trouvé !',
        description: 'Tu fouilles les lieux, mais ne trouves rien d\'utile.',
        className: 'popup-nothing'
    },
    boss: {
        image: 'images/enemies/boss.png',
        title: 'Un Boss Apparait !',
        description: 'Un puissant boss se dresse devant toi !',
        className: 'popup-boss'
    },
    game_over: {
        image: 'images/events/game-over.png',
        title: 'Jeu Terminé !',
        description: 'Tu as perdu... Recommence ton aventure !',
        className: 'popup-game-over'
    },
    marcus: {
        image: 'images/npcs/marcus.png',
        title: 'Roi Marcus',
        description: 'Le roi Marcus t\'accueille dans son château.',
        className: 'popup-marcus'
    },
    alchemist: {
        image: 'images/npcs/vera.png',
        title: 'Alchimiste Vera',
        description: 'L\'alchimiste Vera t\'offre des potions.',
        className: 'popup-alchemist'
    },
    aldric: {
        image: 'images/npcs/aldric.png',
        title: 'Maître Aldric',
        description: 'Le maître Aldric te confie une mission.',
        className: 'popup-aldric'
    },
    gareth: {
        image: 'images/npcs/gareth.png',
        title: 'Capitaine Gareth',
        description: 'Le capitaine Gareth t\'invite à combattre les monstres.',
        className: 'popup-gareth'
    },
    quest_given: {
        image: 'images/events/quest-given.png',
        title: 'Nouvelle Mission !',
        description: 'Un PNJ t\'a confié une mission importante !',
        className: 'popup-quest'
    },
    quest_completed: {
        image: 'images/events/quest-completed.png',
        title: 'Mission Accomplie !',
        description: 'Tu as terminé ta mission avec succès !',
        className: 'popup-quest-complete'
    },
    quest_reward: {
        image: 'images/events/quest-reward.png',
        title: 'Récompense Obtenue !',
        description: 'Tu récupères ta récompense bien méritée !',
        className: 'popup-reward'
    },
    no_quest: {
        image: 'images/events/no-quest.png',
        title: 'Aucune Mission',
        description: 'Personne n\'a besoin d\'aide pour le moment.',
        className: 'popup-nothing'
    }
};

let currentGameState = GAME_STATES.EXPLORING;
let currentEnemy = null;

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
        description: 'Le chef des gobelins te défie !',
        rareItem: {
            name: 'Épée du Capitaine',
            type: 'weapon',
            attack: 8,
            special: 'goblinSlayer',
            description: '+50% dégâts contre les gobelins'
        },
        pattern: 'aggressive',
        phase2Trigger: 0.3,
        defeatMessage: 'Le Capitaine Gobelin tombe ! Tu prouves ta valeur !'
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
            special: 'regeneration',
            description: 'Régénère 5 PV par tour'
        },
        pattern: 'healing',
        healAmount: 25,
        defeatMessage: 'Le Gardien retourne dormir dans la forêt éternelle.'
    },
    15: {
        name: 'Sorcier des Ombres',
        health: 180,
        maxHealth: 180,
        attack: 35,
        defense: 6,
        exp: 200,
        gold: [75, 125],
        image: 'skeleton',
        title: 'BOSS DE NIVEAU 15',
        description: 'Un sorcier maléfique maîtrise les ombres !',
        rareItem: {
            name: 'Orbe des Ombres',
            type: 'accessory',
            attack: 5,
            special: 'lifesteal',
            description: 'Vole 25% des dégâts infligés en PV'
        },
        pattern: 'magical',
        magicAttackChance: 0.4,
        defeatMessage: 'Les ombres se dispersent, la lumière revient !'
    },
    20: {
        name: 'Dragon Adolescent',
        health: 350,
        maxHealth: 350,
        attack: 40,
        defense: 15,
        exp: 300,
        gold: [100, 200],
        image: 'dragon',
        title: 'BOSS DE NIVEAU 20',
        description: 'Un jeune dragon défend son territoire !',
        rareItem: {
            name: 'Écaille de Dragon',
            type: 'shield',
            defense: 12,
            special: 'fireResistance',
            description: 'Résiste aux attaques de feu'
        },
        pattern: 'fire',
        fireAttackDamage: 60,
        defeatMessage: 'Le dragon s\'envole, reconnaissant ta force !'
    }
};

// Variables pour gérer les boss
let currentBossData = null;
let bossPhase = 1;
let bossTurnCounter = 0;

// Joueur
let player = {
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
    stats: {
        enemiesKilled: 0,
        treasuresFound: 0,
        explorations: 0,
        potionsUsed: 0,
        goldSpent: 0
    }
};

// Système de quêtes
let activeQuests = [];
let completedQuests = [];

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
    reachLevel: {
        title: "Ascension",
        description: "Atteins le niveau {target}",
        type: "level",
        target: 3,
        rewards: { gold: 100, exp: 50 },
        icon: "⭐"
    },
    explore: {
        title: "Grand explorateur",
        description: "Explore {target} fois",
        type: "explore",
        target: 10,
        rewards: { gold: 60, exp: 40 },
        icon: "🗺️"
    },
    usePotions: {
        title: "Alchimiste",
        description: "Utilise {target} potions",
        type: "potion",
        target: 3,
        rewards: { gold: 30, exp: 20 },
        icon: "🧪"
    },
    spendGold: {
        title: "Grand dépensier",
        description: "Dépense {target} pièces d'or",
        type: "spend",
        target: 200,
        rewards: { gold: 80, exp: 35 },
        icon: "💸"
    }
};

const questGivers = [
    {
        name: "Maître Aldric",
        dialogue: "Jeune aventurier, j'ai une mission importante pour toi !",
        quests: ["killEnemies", "reachLevel"]
    },
    {
        name: "Roi Marcus",
        dialogue: "Mon royaume a besoin d'un héros courageux !",
        quests: ["collectTreasures", "explore"]
    },
    {
        name: "Alchimiste Vera",
        dialogue: "Mes potions ont besoin d'être testées !",
        quests: ["usePotions", "spendGold"]
    },
    {
        name: "Capitaine Gareth",
        dialogue: "Les monstres menacent nos routes commerciales !",
        quests: ["killEnemies", "explore"]
    }
];

const enemies = {
    goblin: { name: 'Gobelin', health: 30, maxHealth: 30, attack: 8, defense: 2, exp: 15, gold: [5, 15] },
    orc: { name: 'Orc', health: 50, maxHealth: 50, attack: 12, defense: 4, exp: 25, gold: [10, 25] },
    troll: { name: 'Troll', health: 80, maxHealth: 80, attack: 15, defense: 6, exp: 40, gold: [20, 40] },
    dragon: { name: 'Dragon', health: 150, maxHealth: 150, attack: 25, defense: 10, exp: 100, gold: [50, 100] },
    skeleton: { name: 'Squelette', health: 40, maxHealth: 40, attack: 10, defense: 3, exp: 20, gold: [8, 20] }
};

const shopItems = {
    potion: { name: 'Potion de soin', price: 15, effect: 'heal', value: 40 },
    sword: { name: 'Épée en acier', price: 80, effect: 'attack', value: 5 },
    armor: { name: 'Armure de cuir', price: 120, effect: 'defense', value: 3 },
    bigPotion: { name: 'Grande potion', price: 35, effect: 'heal', value: 80 }
};

const itemSellPrices = {
    'Potion de soin': 7,
    'Grande potion': 17,
    'Épée en acier': 40,
    'Armure de cuir': 60,
    'épée rouillée': 2,
    'Épée de fer': 25,
    'Bouclier en bois': 15,
    'Amulette de chance': 30,
    'Gemme précieuse': 50
};

let domElements = {};

// ========== SYSTÈME DE DIFFICULTÉ EXPONENTIELLE ==========

function getDifficultyMultiplier(playerLevel) {
    const baseMultiplier = Math.pow(1.15, playerLevel - 1);
    const linearComponent = 1 + (playerLevel - 1) * 0.1;
    const finalMultiplier = (baseMultiplier * 0.7) + (linearComponent * 0.3);
    return Math.max(1.0, finalMultiplier);
}

function getRewardMultiplier(playerLevel) {
    const baseMultiplier = Math.pow(1.08, playerLevel - 1);
    const linearComponent = 1 + (playerLevel - 1) * 0.05;
    const finalMultiplier = (baseMultiplier * 0.6) + (linearComponent * 0.4);
    return Math.max(1.0, finalMultiplier);
}

function rollForEliteEnemy() {
    if (player.level >= 3 && Math.random() < 0.1) {
        return true;
    }
    return false;
}

function createEliteEnemy(baseEnemy) {
    const eliteMultiplier = 1.5 + (player.level * 0.1);
    
    return {
        ...baseEnemy,
        name: `${baseEnemy.name.replace(' (Niv. ' + player.level + ')', '')} Élite`,
        health: Math.ceil(baseEnemy.health * eliteMultiplier),
        maxHealth: Math.ceil(baseEnemy.maxHealth * eliteMultiplier),
        attack: Math.ceil(baseEnemy.attack * eliteMultiplier),
        defense: Math.ceil(baseEnemy.defense * eliteMultiplier),
        exp: Math.ceil(baseEnemy.exp * 1.8),
        gold: [
            Math.ceil(baseEnemy.gold[0] * 2),
            Math.ceil(baseEnemy.gold[1] * 2)
        ]
    };
}

function getDifficultyFlavorText() {
    const level = player.level;
    
    if (level <= 2) {
        return "Les créatures locales ne sont pas très menaçantes.";
    } else if (level <= 5) {
        return "Les ennemis commencent à devenir plus coriaces...";
    } else if (level <= 10) {
        return "⚠️ Les monstres de cette région sont redoutables !";
    } else if (level <= 15) {
        return "🔥 Les créatures ici sont des prédateurs expérimentés !";
    } else if (level <= 20) {
        return "💀 Tu affronte maintenant des monstres légendaires !";
    } else {
        return "👹 Tu entres dans des territoires où seuls les héros mythiques osent s'aventurer !";
    }
}

function showScalingInfo() {
    const diffMult = getDifficultyMultiplier(player.level);
    const rewardMult = getRewardMultiplier(player.level);
    
    if (player.level > 1) {
        return `<div style="background: #2c3e50; padding: 10px; border-radius: 5px; margin: 10px 0; border-left: 4px solid #e74c3c;">
            <strong>⚠️ Difficulté Niveau ${player.level}</strong><br>
            Ennemis: <span style="color: #e74c3c;">x${diffMult.toFixed(2)} plus forts</span><br>
            Récompenses: <span style="color: #f39c12;">x${rewardMult.toFixed(2)} plus élevées</span>
        </div>`;
    }
    return '';
}

function showCombatPreview(enemy) {
    const playerPower = player.attack + player.defense;
    const enemyPower = enemy.attack + enemy.defense;
    const powerRatio = enemyPower / playerPower;
    
    let difficultyText = "";
    let difficultyColor = "#2ecc71";
    
    if (powerRatio < 0.8) {
        difficultyText = "Facile";
        difficultyColor = "#2ecc71";
    } else if (powerRatio < 1.2) {
        difficultyText = "Équilibré";
        difficultyColor = "#f39c12";
    } else if (powerRatio < 1.8) {
        difficultyText = "Difficile";
        difficultyColor = "#e67e22";
    } else {
        difficultyText = "Très Difficile";
        difficultyColor = "#e74c3c";
    }
    
    return `<div style="background: #34495e; padding: 8px; border-radius: 5px; margin: 5px 0;">
        <strong>Analyse de combat:</strong><br>
        Difficulté estimée: <span style="color: ${difficultyColor};">${difficultyText}</span><br>
        ${getDifficultyFlavorText()}
    </div>`;
}

function getHighLevelEvent() {
    if (player.level < 10) return null;
    
    const highLevelEvents = [
        {
            name: 'ancient_guardian',
            chance: 0.05,
            condition: () => player.level >= 10,
            description: "Un Gardien Ancien se réveille !",
            effect: () => {
                const guardian = {
                    name: 'Gardien Ancien',
                    health: 200 + (player.level * 15),
                    maxHealth: 200 + (player.level * 15),
                    attack: 20 + (player.level * 2),
                    defense: 10 + player.level,
                    exp: 100 + (player.level * 10),
                    gold: [50 + (player.level * 5), 100 + (player.level * 10)]
                };
                
                currentEnemy = guardian;
                showEventModal('boss');
                showMessage("Un Gardien Ancien émane une aura de puissance millénaire !");
                addMessage(showCombatPreview(guardian));
                changeGameState(GAME_STATES.COMBAT);
                updateEnemyUI();
            }
        },
        {
            name: 'treasure_hoard',
            chance: 0.03,
            condition: () => player.level >= 15,
            description: "Tu découvres un trésor de dragon abandonné !",
            effect: () => {
                const goldFound = 100 + (player.level * 20);
                const expGained = 50 + (player.level * 5);
                
                player.gold += goldFound;
                gainExp(expGained);
                
                showEventModal('treasure');
                showMessage(`Un trésor colossal ! Tu gagnes ${goldFound} or et ${expGained} XP !`);
                showNotification(`TRÉSOR LÉGENDAIRE !`);
            }
        }
    ];
    
    for (const event of highLevelEvents) {
        if (event.condition() && Math.random() < event.chance) {
            return event;
        }
    }
    
    return null;
}

// ========== FONCTIONS UTILITAIRES ==========
function initializeDOMElements() {
    const elementIds = [
        'exploreBtn', 'attackBtn', 'fleeBtn', 'useItemBtn', 'shopBtn', 
        'questBtn', 'restBtn', 'saveBtn', 'loadBtn', 'resetBtn', 'changeNameBtn',
        'story', 'enemy-info', 'active-quests', 'playerName', 'playerNameTitle',
        'playerHealth', 'playerMaxHealth', 'playerGold', 'playerLevel', 'playerExp', 
        'playerMaxExp', 'playerAttack', 'playerDefense', 'playerInventory',
        'healthFill', 'expFill', 'enemyName', 'enemyHealth', 'enemyMaxHealth',
        'enemyAttack', 'enemyDefense', 'nameModal', 'playerNameInput', 'confirmNameBtn'
    ];
    
    elementIds.forEach(id => {
        domElements[id] = document.getElementById(id);
        if (!domElements[id]) {
            console.warn(`Élément DOM manquant: ${id}`);
        }
    });
}

function safeGetElement(id) {
    return domElements[id] || document.getElementById(id) || null;
}

function showMessage(message) {
    const story = safeGetElement('story');
    if (story) {
        story.innerHTML = `<p>${message}</p>`;
    }
}

function addMessage(message) {
    const story = safeGetElement('story');
    if (story) {
        story.innerHTML += `<p>${message}</p>`;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ========== GESTION DE L'INVENTAIRE ==========
function formatInventoryDisplay() {
    if (player.inventory.length === 0) {
        return 'Vide';
    }
    
    const itemCounts = {};
    player.inventory.forEach(item => {
        itemCounts[item] = (itemCounts[item] || 0) + 1;
    });
    
    const formattedItems = Object.entries(itemCounts).map(([itemName, count]) => {
        if (count === 1) {
            return itemName;
        } else {
            return `${itemName} x${count}`;
        }
    });
    
    return formattedItems.join(', ');
}

function getItemCount(itemName) {
    return player.inventory.filter(item => item === itemName).length;
}

function getUniqueItems() {
    return [...new Set(player.inventory)];
}

function hasUsableItems() {
    return player.inventory.some(item => 
        item.includes('potion') || item.includes('Potion')
    );
}

function updateUI() {
    const elements = [
        ['playerName', player.name],
        ['playerNameTitle', player.name],
        ['playerHealth', player.health],
        ['playerMaxHealth', player.maxHealth],
        ['playerGold', player.gold],
        ['playerLevel', player.level],
        ['playerExp', player.exp],
        ['playerMaxExp', player.maxExp],
        ['playerAttack', player.attack],
        ['playerDefense', player.defense],
        ['playerInventory', formatInventoryDisplay()]
    ];
    
    elements.forEach(([id, value]) => {
        const element = safeGetElement(id);
        if (element) {
            element.textContent = value;
        }
    });
    
    const healthPercent = (player.health / player.maxHealth) * 100;
    const expPercent = (player.exp / player.maxExp) * 100;
    
    const healthFill = safeGetElement('healthFill');
    const expFill = safeGetElement('expFill');
    
    if (healthFill) healthFill.style.width = healthPercent + '%';
    if (expFill) expFill.style.width = expPercent + '%';
}

function updateEnemyUI() {
    const enemyInfo = safeGetElement('enemy-info');
    if (!enemyInfo) return;
    
    if (currentEnemy) {
        const elements = [
            ['enemyName', currentEnemy.name],
            ['enemyHealth', currentEnemy.health],
            ['enemyMaxHealth', currentEnemy.maxHealth],
            ['enemyAttack', currentEnemy.attack],
            ['enemyDefense', currentEnemy.defense]
        ];
        
        elements.forEach(([id, value]) => {
            const element = safeGetElement(id);
            if (element) {
                element.textContent = value;
            }
        });
        
        enemyInfo.style.display = 'block';
    } else {
        enemyInfo.style.display = 'none';
    }
}

// ========== GESTION DES ÉTATS DE JEU (FONCTION CORRIGÉE) ==========
function changeGameState(newState) {
    console.log('Changement d\'état:', currentGameState, '->', newState);
    
    const oldState = currentGameState;
    currentGameState = newState;
    
    // Nettoyer l'interface précédente
    hideAllButtons();
    
    // Afficher les boutons appropriés pour le nouvel état
    showButtonsForState(newState);
    
    // Gestion spéciale pour les transitions
    if (newState === GAME_STATES.COMBAT) {
        updateEnemyUI();
        console.log('Mode combat activé - Ennemi:', currentEnemy?.name);
    } else if (oldState === GAME_STATES.COMBAT && newState !== GAME_STATES.COMBAT) {
        // Sortie du combat - nettoyer seulement si ce n'est pas un boss
        if (!currentBossData) {
            currentEnemy = null;
        }
        updateEnemyUI();
    }
}

function hideAllButtons() {
    const buttonIds = ['exploreBtn', 'attackBtn', 'fleeBtn', 'useItemBtn', 'shopBtn', 'questBtn', 'restBtn'];
    buttonIds.forEach(id => {
        const btn = safeGetElement(id);
        if (btn) btn.style.display = 'none';
    });
}

function showButtonsForState(state) {
    console.log(`Affichage des boutons pour l'état: ${state}`);
    
    hideAllButtons();
    
    switch(state) {
        case GAME_STATES.EXPLORING: {
            const exploringButtons = ['exploreBtn', 'shopBtn', 'questBtn', 'restBtn'];
            exploringButtons.forEach(id => {
                const btn = safeGetElement(id);
                if (btn) {
                    btn.style.display = 'inline-block';
                    btn.style.visibility = 'visible';
                }
            });
            
            if (hasUsableItems()) {
                const useItemBtn = safeGetElement('useItemBtn');
                if (useItemBtn) {
                    useItemBtn.style.display = 'inline-block';
                    useItemBtn.style.visibility = 'visible';
                }
            }
            break;
        }
        
        case GAME_STATES.COMBAT: {
            console.log('Configuration des boutons de combat');
            
            const combatButtons = [
                { id: 'attackBtn', required: true },
                { id: 'fleeBtn', required: true },
                { id: 'useItemBtn', required: hasUsableItems() }
            ];
            
            combatButtons.forEach(({ id, required }) => {
                if (required) {
                    const btn = safeGetElement(id);
                    if (btn) {
                        btn.style.display = 'inline-block';
                        btn.style.visibility = 'visible';
                        console.log(`Bouton ${id} affiché`);
                    } else {
                        console.error(`Bouton ${id} introuvable !`);
                    }
                }
            });
            
            // Double vérification pour les boutons de combat
            setTimeout(() => {
                const attackBtn = safeGetElement('attackBtn');
                const fleeBtn = safeGetElement('fleeBtn');
                
                if (attackBtn && attackBtn.style.display === 'none') {
                    console.warn('Forçage de l\'affichage du bouton d\'attaque');
                    attackBtn.style.display = 'inline-block';
                    attackBtn.style.visibility = 'visible';
                }
                
                if (fleeBtn && fleeBtn.style.display === 'none') {
                    console.warn('Forçage de l\'affichage du bouton de fuite');
                    fleeBtn.style.display = 'inline-block';
                    fleeBtn.style.visibility = 'visible';
                }
            }, 50);
            break;
        }
    }
}

// ========== SYSTÈME DE MODALS ==========
function ensureModalExists() {
    if (!document.getElementById('eventModal')) {
        const modalHTML = `
            <div id="eventModal" class="modal-overlay">
                <div id="eventModalContent" class="modal-content">
                    <div class="modal-header">
                        <h3 id="modalTitle" class="modal-title">Titre de l'événement</h3>
                        <button class="modal-close" onclick="closeEventModal()">×</button>
                    </div>
                    <div class="modal-body">
                        <div id="modalImageContainer" class="modal-image-container"></div>
                        <p id="modalDescription" class="modal-description">Description de l'événement</p>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-button" onclick="closeEventModal()">Continuer l'aventure</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

function showEventModal(eventType, subType = null) {
    ensureModalExists();
    
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
        console.error('Image non trouvée:', eventType, subType);
        return;
    }

    content.className = 'modal-content';
    if (eventData.className) {
        content.classList.add(eventData.className.replace('popup-', 'modal-'));
    }

    try {
        imageContainer.innerHTML = `<img src="${eventData.image}" alt="${eventData.title}" class="modal-image" onerror="handleModalImageError(this)">`;
        title.textContent = eventData.title;
        description.textContent = eventData.description;
        overlay.style.display = 'flex';
    } catch (error) {
        console.error('Erreur lors de l\'affichage du modal:', error);
    }
}

function closeEventModal() {
    const overlay = document.getElementById('eventModal');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function handleModalImageError(img) {
    img.style.display = 'none';
    
    const eventType = img.alt || '';
    let emoji = '🖼️';
    let bgColor = '#34495e';
    
    if (eventType.includes('combat') || eventType.includes('Goblin') || eventType.includes('Dragon')) {
        emoji = '⚔️';
        bgColor = '#e74c3c';
    } else if (eventType.includes('trésor') || eventType.includes('Trésor')) {
        emoji = '💰';
        bgColor = '#f39c12';
    } else if (eventType.includes('niveau') || eventType.includes('NIVEAU')) {
        emoji = '⭐';
        bgColor = '#9b59b6';
    } else if (eventType.includes('Mission') || eventType.includes('quête')) {
        emoji = '📜';
        bgColor = '#3498db';
    } else if (eventType.includes('Marcus')) {
        emoji = '👑';
        bgColor = '#9b59b6';
    } else if (eventType.includes('Vera') || eventType.includes('Alchimiste')) {
        emoji = '🧪';
        bgColor = '#1abc9c';
    } else if (eventType.includes('Aldric')) {
        emoji = '🧙‍♂️';
    } else if (eventType.includes('Gareth')) {
        emoji = '🛡️';
        bgColor = '#e67e22';
    }
    
    img.parentNode.innerHTML += `
        <div style="width: 100%; height: 200px; background: ${bgColor}; border-radius: 15px; 
            display: flex; align-items: center; justify-content: center; border: 3px solid #f39c12; margin: 10px 0;">
            <div style="text-align: center; color: #f39c12;">
                <div style="font-size: 4em; margin-bottom: 10px;">${emoji}</div>
                <div style="font-size: 1.2em; font-weight: bold;">Événement</div>
            </div>
        </div>
    `;
}

// ========== GESTION DU NOM DU JOUEUR ==========
function showNameModal() {
    const modal = safeGetElement('nameModal');
    if (modal) {
        modal.style.display = 'flex';
        const input = safeGetElement('playerNameInput');
        if (input) input.focus();
    }
}

function hideNameModal() {
    const modal = safeGetElement('nameModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function setPlayerName() {
    const nameInput = safeGetElement('playerNameInput');
    if (!nameInput) return;
    
    const newName = nameInput.value.trim();
    
    if (newName && newName.length > 0) {
        player.name = newName;
        updateUI();
        hideNameModal();
        showMessage(`Bienvenue, ${player.name} ! Ton aventure commence maintenant...`);
        showNotification(`Bienvenue, ${player.name} !`);
    } else {
        alert('Veuillez entrer un nom valide !');
        nameInput.focus();
    }
}

// ========== SYSTÈME DE BOSS (CORRIGÉ) ==========

// CSS pour l'animation du bouton de boss
const bossButtonCSS = `
@keyframes bossButtonPulse {
    0% { transform: scale(1); box-shadow: 0 0 20px rgba(231, 76, 60, 0.7); }
    50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(231, 76, 60, 1); }
    100% { transform: scale(1); box-shadow: 0 0 20px rgba(231, 76, 60, 0.7); }
}
`;

// Ajouter le CSS si il n'existe pas déjà
if (!document.getElementById('bossButtonCSS')) {
    const style = document.createElement('style');
    style.id = 'bossButtonCSS';
    style.textContent = bossButtonCSS;
    document.head.appendChild(style);
}

function checkForLevelBoss(newLevel) {
    if (levelBosses[newLevel] && !player.defeatedBosses.includes(newLevel)) {
        console.log(`Boss de niveau ${newLevel} détecté !`);
        
        setTimeout(() => {
            if (currentGameState === GAME_STATES.EXPLORING) {
                triggerLevelBoss(newLevel);
            } else {
                changeGameState(GAME_STATES.EXPLORING);
                setTimeout(() => {
                    triggerLevelBoss(newLevel);
                }, 500);
            }
        }, 1000);
        return true;
    }
    return false;
}

function getLevelBossScaled(level) {
    if (!levelBosses[level]) return null;
    
    const baseBoss = { ...levelBosses[level] };
    const difficultyMultiplier = getDifficultyMultiplier(player.level);
    const rewardMultiplier = getRewardMultiplier(player.level);
    
    const bossMultiplier = 1 + (difficultyMultiplier - 1) * 0.8;
    
    return {
        ...baseBoss,
        health: Math.ceil(baseBoss.health * bossMultiplier),
        maxHealth: Math.ceil(baseBoss.maxHealth * bossMultiplier),
        attack: Math.ceil(baseBoss.attack * bossMultiplier),
        defense: Math.ceil(baseBoss.defense * Math.sqrt(bossMultiplier)),
        exp: Math.ceil(baseBoss.exp * rewardMultiplier),
        gold: [
            Math.ceil(baseBoss.gold[0] * rewardMultiplier),
            Math.ceil(baseBoss.gold[1] * rewardMultiplier)
        ]
    };
}

function triggerLevelBoss(level) {
    console.log(`Déclenchement du boss de niveau ${level}`);
    
    const bossData = getLevelBossScaled(level);
    if (!bossData) {
        console.error(`Pas de données pour le boss de niveau ${level}`);
        return;
    }
    
    // Configurer l'ennemi boss AVANT de changer l'état
    currentEnemy = {
        name: bossData.name,
        health: bossData.health,
        maxHealth: bossData.maxHealth,
        attack: bossData.attack,
        defense: bossData.defense,
        exp: bossData.exp,
        gold: bossData.gold
    };
    
    // Configurer les données du boss
    currentBossData = { ...levelBosses[level] };
    bossPhase = 1;
    bossTurnCounter = 0;
    
    console.log('Boss configuré:', currentEnemy);
    console.log('Données boss:', currentBossData);
    
    // Afficher le modal du boss
    showEventModal('boss');
    
    // Message d'introduction
    showMessage(`🔥 ${bossData.title} 🔥`);
    addMessage(`${bossData.description}`);
    addMessage(`💀 ${bossData.name} possède ${bossData.health} PV et une ${bossData.rareItem.name} légendaire !`);
    
    if (player.level > 1) {
        addMessage(showScalingInfo());
    }
    
    addMessage(showCombatPreview(currentEnemy));
    
    // Ajouter un bouton pour commencer le combat
    const startCombatBtn = document.createElement('button');
    startCombatBtn.textContent = '⚔️ COMMENCER LE COMBAT !';
    startCombatBtn.className = 'boss-start-button';
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
        transition: all 0.3s ease;
        animation: bossButtonPulse 1.5s ease-in-out infinite;
    `;
    
    startCombatBtn.addEventListener('click', () => {
        console.log('Bouton de combat de boss cliqué !');
        
        // Supprimer le bouton
        if (startCombatBtn.parentNode) {
            startCombatBtn.parentNode.removeChild(startCombatBtn);
        }
        
        // Fermer le modal
        closeEventModal();
        
        // Démarrer immédiatement le combat
        startBossCombat();
    });
    
    const story = safeGetElement('story');
    if (story) {
        story.appendChild(startCombatBtn);
    }
}

function startBossCombat() {
    console.log('Démarrage du combat de boss');
    
    if (!currentEnemy || !currentBossData) {
        console.error('Erreur: Données de boss manquantes', { currentEnemy, currentBossData });
        return;
    }
    
    // Forcer l'état de combat
    currentGameState = GAME_STATES.COMBAT;
    console.log('État changé vers:', currentGameState);
    
    // Mettre à jour l'interface
    updateEnemyUI();
    showButtonsForState(GAME_STATES.COMBAT);
    
    // Message de début de combat
    showMessage(`💥 Le combat contre ${currentEnemy.name} commence !`);
    addMessage(`⚔️ Choisis ton action : Attaquer, Fuir ou utiliser un objet !`);
    
    // Debug : vérifier l'état des boutons
    setTimeout(() => {
        const attackBtn = safeGetElement('attackBtn');
        const fleeBtn = safeGetElement('fleeBtn');
        const useItemBtn = safeGetElement('useItemBtn');
        
        console.log('État des boutons après démarrage du combat:');
        console.log('- Attaque:', attackBtn?.style.display, attackBtn?.offsetParent !== null);
        console.log('- Fuite:', fleeBtn?.style.display, fleeBtn?.offsetParent !== null);
        console.log('- Objet:', useItemBtn?.style.display, useItemBtn?.offsetParent !== null);
        
        // Forcer l'affichage si nécessaire
        if (attackBtn) {
            attackBtn.style.display = 'inline-block';
            attackBtn.style.visibility = 'visible';
        }
        if (fleeBtn) {
            fleeBtn.style.display = 'inline-block';
            fleeBtn.style.visibility = 'visible';
        }
        if (hasUsableItems() && useItemBtn) {
            useItemBtn.style.display = 'inline-block';
            useItemBtn.style.visibility = 'visible';
        }
    }, 100);
}

function bossAttackLogic() {
    if (!currentBossData || !currentEnemy) return false;
    
    bossTurnCounter++;
    let specialAttackUsed = false;
    let damageToPlayer = 0;
    let attackMessage = '';
    
    switch(currentBossData.pattern) {
        case 'aggressive':
            if (bossTurnCounter % 3 === 0) {
                damageToPlayer = Math.max(1, (currentEnemy.attack * 1.5) - player.defense);
                attackMessage = `${currentEnemy.name} utilise CHARGE BRUTALE et inflige ${damageToPlayer} dégâts !`;
                specialAttackUsed = true;
            }
            if (currentEnemy.health <= currentEnemy.maxHealth * currentBossData.phase2Trigger && bossPhase === 1) {
                bossPhase = 2;
                currentEnemy.attack += 10;
                attackMessage += ` ${currentEnemy.name} entre en RAGE ! Son attaque augmente !`;
            }
            break;
            
        case 'healing':
            if (bossTurnCounter % 4 === 0) {
                const healAmount = currentBossData.healAmount;
                currentEnemy.health = Math.min(currentEnemy.maxHealth, currentEnemy.health + healAmount);
                attackMessage = `${currentEnemy.name} se régénère et récupère ${healAmount} PV !`;
                specialAttackUsed = true;
                updateEnemyUI();
            }
            break;
            
        case 'magical':
            if (Math.random() < currentBossData.magicAttackChance) {
                damageToPlayer = currentEnemy.attack;
                attackMessage = `${currentEnemy.name} lance MISSILE MAGIQUE (ignore l'armure) et inflige ${damageToPlayer} dégâts !`;
                specialAttackUsed = true;
            }
            break;
            
        case 'fire':
            if (bossTurnCounter % 3 === 0) {
                damageToPlayer = currentBossData.fireAttackDamage;
                attackMessage = `${currentEnemy.name} crache du FEU DRACONIQUE et inflige ${damageToPlayer} dégâts !`;
                specialAttackUsed = true;
            }
            break;
    }
    
    if (specialAttackUsed && damageToPlayer > 0) {
        player.health = Math.max(0, player.health - damageToPlayer);
        updateUI();
    }
    
    if (specialAttackUsed && attackMessage) {
        setTimeout(() => {
            addMessage(attackMessage);
            updateEnemyUI();
        }, 1000);
        return true;
    }
    
    return false;
}

function defeatLevelBoss() {
    if (!currentBossData) return;
    
    const bossLevel = Object.keys(levelBosses).find(level => 
        levelBosses[level].name === currentBossData.name
    );
    
    player.defeatedBosses.push(parseInt(bossLevel));
    
    const rareItem = currentBossData.rareItem;
    player.inventory.push(rareItem.name);
    
    if (rareItem.attack) player.attack += rareItem.attack;
    if (rareItem.defense) player.defense += rareItem.defense;
    
    showMessage(currentBossData.defeatMessage);
    addMessage(`🎁 Tu obtiens l'objet légendaire : ${rareItem.name} !`);
    addMessage(`📜 ${rareItem.description}`);
    
    const bonusGold = Math.floor(Math.random() * 100) + 50;
    player.gold += bonusGold;
    addMessage(`💰 Bonus de boss : +${bonusGold} or !`);
    
    showNotification(`🏆 BOSS VAINCU ! ${rareItem.name} obtenu !`);
    
    setTimeout(() => {
        showEventModal('quest_reward');
    }, 2000);
    
    // Nettoyer les données du boss
    currentBossData = null;
    bossPhase = 1;
    bossTurnCounter = 0;
    currentEnemy = null;
    
    updateUI();
    updateEnemyUI();
    
    // Retourner à l'exploration après un délai
    setTimeout(() => {
        changeGameState(GAME_STATES.EXPLORING);
        showMessage(`${player.name}, tu peux maintenant continuer ton exploration avec ta nouvelle puissance !`);
    }, 4000);
}

// Fonction de debug pour forcer un combat de boss (à utiliser en console)
function debugTriggerBoss(level = 5) {
    console.log(`Debug: Déclenchement forcé du boss de niveau ${level}`);
    
    if (!levelBosses[level]) {
        console.error(`Pas de boss pour le niveau ${level}`);
        return;
    }
    
    changeGameState(GAME_STATES.EXPLORING);
    triggerLevelBoss(level);
}

// ========== MÉCANIQUES DE JEU ==========
function getRandomEnemyScaled() {
    const enemyTypes = Object.keys(enemies);
    const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const baseEnemy = { ...enemies[randomType] };
    
    const difficultyMultiplier = getDifficultyMultiplier(player.level);
    const rewardMultiplier = getRewardMultiplier(player.level);
    
    const scaledEnemy = {
        ...baseEnemy,
        health: Math.ceil(baseEnemy.health * difficultyMultiplier),
        maxHealth: Math.ceil(baseEnemy.maxHealth * difficultyMultiplier),
        attack: Math.ceil(baseEnemy.attack * difficultyMultiplier),
        defense: Math.ceil(baseEnemy.defense * Math.sqrt(difficultyMultiplier)),
        exp: Math.ceil(baseEnemy.exp * rewardMultiplier),
        gold: [
            Math.ceil(baseEnemy.gold[0] * rewardMultiplier),
            Math.ceil(baseEnemy.gold[1] * rewardMultiplier)
        ]
    };
    
    if (player.level > 1) {
        scaledEnemy.name = `${baseEnemy.name} (Niv. ${player.level})`;
    }
    
    return scaledEnemy;
}

function getRandomEnemy() {
    let enemy = getRandomEnemyScaled();
    
    if (rollForEliteEnemy()) {
        enemy = createEliteEnemy(enemy);
        showNotification("💀 ENNEMI ÉLITE !");
    }
    
    return enemy;
}

function getRandomEvent() {
    const highLevelEvent = getHighLevelEvent();
    if (highLevelEvent) {
        highLevelEvent.effect();
        return 'special';
    }
    
    const combatChanceBoost = Math.min(player.level * 2, 10);
    
    const events = ['enemy', 'treasure', 'merchant', 'nothing', 'rest', 'potion', 'trap', 'boss', 'levelUp'];
    const baseWeights = [30, 20, 10, 15, 8, 10, 12, 3, 2];
    
    const adjustedWeights = [...baseWeights];
    adjustedWeights[0] += combatChanceBoost;
    adjustedWeights[3] -= combatChanceBoost / 2;
    
    const totalWeight = adjustedWeights.reduce((sum, weight) => sum + weight, 0);
    const random = Math.random() * totalWeight;
    let cumulative = 0;
    
    for (let i = 0; i < events.length; i++) {
        cumulative += adjustedWeights[i];
        if (random < cumulative) {
            return events[i];
        }
    }
    return 'nothing';
}

function handleEnemyEncounter() {
    currentEnemy = getRandomEnemy();
    const enemyType = Object.keys(enemies).find(key => 
        enemies[key].name === currentEnemy.name.replace(/ \(Niv\. \d+\)/, '').replace(' Élite', '')
    );
    
    showEventModal('combat', enemyType);
    
    let message = `${currentEnemy.name} apparaît ! Prépare-toi au combat, ${player.name} !`;
    
    if (player.level > 1) {
        message += showScalingInfo();
    }
    
    message += showCombatPreview(currentEnemy);
    
    showMessage(message);
    changeGameState(GAME_STATES.COMBAT);
    updateEnemyUI();
}

function gainExp(amount) {
    if (amount <= 0) return;
    
    player.exp += amount;
    showNotification(`+${amount} EXP`);
    
    if (player.exp >= player.maxExp) {
        levelUp();
    }
    updateUI();
    checkQuestProgress();
}

function levelUp() {
    player.level++;
    player.exp = Math.max(0, player.exp - player.maxExp);
    player.maxExp = Math.floor(player.maxExp * 1.2);
    player.maxHealth += 20;
    player.health = player.maxHealth;
    player.attack += 2;
    player.defense += 1;

    showEventModal('levelup');
    showNotification(`NIVEAU ${player.level} !`);
    
    let message = `Félicitations ${player.name} ! Tu atteins le niveau ${player.level} ! Tes statistiques ont augmenté !`;
    
    if (player.level > 1) {
        message += showScalingInfo();
    }
    
    showMessage(message);
    
    // Vérifier s'il y a un boss pour ce niveau
    const hasBoss = checkForLevelBoss(player.level);
    if (hasBoss) {
        addMessage(`⚠️ ATTENTION ! Un boss légendaire a senti ta puissance et vient te défier !`);
        addMessage(`🔥 Prépare-toi pour un combat épique !`);
    }
    
    checkQuestProgress();
}

// ========== SYSTÈME DE QUÊTES ==========
function updateQuestDisplay() {
    const activeQuestsDiv = safeGetElement('active-quests');
    if (!activeQuestsDiv) return;
    
    activeQuestsDiv.innerHTML = '';
    
    if (activeQuests.length === 0) {
        activeQuestsDiv.innerHTML = '<p style="text-align: center; color: #999;">Aucune quête active. Cherche des PNJ pour obtenir des missions !</p>';
        return;
    }

    activeQuests.forEach((quest, index) => {
        const questDiv = document.createElement('div');
        questDiv.className = `quest-item ${quest.completed ? 'quest-complete' : ''}`;
        
        const progress = getQuestProgress(quest);
        const progressText = quest.completed ? 'TERMINÉE' : `${progress}/${quest.target}`;
        
        let difficultyIndicator = '';
        if (quest.target > quest.originalTarget) {
            const multiplier = quest.target / quest.originalTarget;
            difficultyIndicator = ` <span style="color: #e74c3c; font-weight: bold;">(x${multiplier.toFixed(1)})</span>`;
        }
        
        questDiv.innerHTML = `
            <div class="quest-title">${quest.icon} ${quest.title}${difficultyIndicator}</div>
            <div class="quest-progress">${quest.description.replace('{target}', quest.target)} - ${progressText}</div>
            <div class="quest-reward">Récompense: ${quest.rewards.gold} or, ${quest.rewards.exp} XP</div>
        `;
        
        if (quest.completed) {
            const claimBtn = document.createElement('button');
            claimBtn.textContent = '🎁 Réclamer récompense';
            claimBtn.style.marginTop = '8px';
            claimBtn.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
            claimBtn.style.border = '2px solid #f1c40f';
            claimBtn.style.color = 'white';
            claimBtn.style.padding = '8px 16px';
            claimBtn.style.borderRadius = '8px';
            claimBtn.style.cursor = 'pointer';
            claimBtn.style.fontWeight = 'bold';
            claimBtn.style.fontSize = '0.9em';
            claimBtn.style.transition = 'all 0.3s ease';
            claimBtn.style.animation = 'questButtonGlow 2s ease-in-out infinite';
            
            claimBtn.addEventListener('mouseenter', () => {
                claimBtn.style.transform = 'scale(1.05)';
                claimBtn.style.background = 'linear-gradient(135deg, #e67e22, #d35400)';
                claimBtn.style.animation = 'none';
            });
            
            claimBtn.addEventListener('mouseleave', () => {
                claimBtn.style.transform = 'scale(1)';
                claimBtn.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
                claimBtn.style.animation = 'questButtonGlow 2s ease-in-out infinite';
            });
            
            claimBtn.addEventListener('click', () => claimQuestReward(index));
            questDiv.appendChild(claimBtn);
        }
        
        activeQuestsDiv.appendChild(questDiv);
    });
}

function getQuestProgress(quest) {
    if (!quest?.type) return 0;
    
    switch(quest.type) {
        case 'kill': return player.stats.enemiesKilled || 0;
        case 'treasure': return player.stats.treasuresFound || 0;
        case 'level': return player.level || 1;
        case 'explore': return player.stats.explorations || 0;
        case 'potion': return player.stats.potionsUsed || 0;
        case 'spend': return player.stats.goldSpent || 0;
        default: return 0;
    }
}

function checkQuestProgress() {
    activeQuests.forEach(quest => {
        if (!quest.completed) {
            const progress = getQuestProgress(quest);
            if (progress >= quest.target) {
                quest.completed = true;
                setTimeout(() => {
                    showEventModal('quest_completed');
                }, 800);
                showNotification(`Quête terminée: ${quest.title}`);
                showMessage(`${player.name}, tu as terminé la quête "${quest.title}" ! Tu peux maintenant réclamer ta récompense !`);
            }
        }
    });
    updateQuestDisplay();
}

const claimQuestReward = questIndex => {
    if (questIndex < 0 || questIndex >= activeQuests.length) return;
    
    const quest = activeQuests[questIndex];
    if (quest.completed) {
        setTimeout(() => {
            showEventModal('quest_reward');
        }, 300);
        
        player.gold += quest.rewards.gold;
        gainExp(quest.rewards.exp);
        
        showMessage(`${player.name}, tu réclames ta récompense pour "${quest.title}" : ${quest.rewards.gold} or et ${quest.rewards.exp} XP !`);
        showNotification(`Récompense réclamée !`);
        
        resetQuestStats(quest.type);
        
        completedQuests.push(quest);
        activeQuests.splice(questIndex, 1);
        
        updateUI();
        updateQuestDisplay();
        
        setTimeout(() => {
            addMessage("");

            const continueBtn = document.createElement('button');
            continueBtn.textContent = '🚀 Continuer l\'aventure';
            continueBtn.className = 'quest-continue-button';
            continueBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            continueBtn.style.border = '2px solid #f1c40f';
            continueBtn.style.color = 'white';
            continueBtn.style.padding = '12px 24px';
            continueBtn.style.borderRadius = '8px';
            continueBtn.style.cursor = 'pointer';
            continueBtn.style.fontWeight = 'bold';
            continueBtn.style.fontSize = '1em';
            continueBtn.style.margin = '10px auto';
            continueBtn.style.display = 'block';
            continueBtn.style.transition = 'all 0.3s ease';
            
            continueBtn.addEventListener('mouseenter', () => {
                continueBtn.style.transform = 'scale(1.05)';
                continueBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
            });
            
            continueBtn.addEventListener('mouseleave', () => {
                continueBtn.style.transform = 'scale(1)';
                continueBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            });
            
            continueBtn.addEventListener('click', () => {
                if (continueBtn.parentNode) {
                    continueBtn.parentNode.removeChild(continueBtn);
                }
                
                changeGameState(GAME_STATES.EXPLORING);
                showMessage(`${player.name}, tu reprends ton exploration avec tes nouvelles récompenses !`);
            });
            
            const story = safeGetElement('story');
            if (story) {
                story.appendChild(continueBtn);
            }
        }, 1000); 
    }
};

function createQuest(templateKey) {
    const template = questTemplates[templateKey];
    if (!template) return null;
    
    const levelMultiplier = Math.pow(2, player.level - 1);
    const adjustedTarget = Math.floor(template.target * levelMultiplier);
    
    return {
        ...template,
        target: adjustedTarget,
        originalTarget: template.target, 
        completed: false,
        startTime: Date.now()
    };
}

function getAvailableQuest() {
    const availableTemplates = Object.keys(questTemplates).filter(key => {
        const alreadyActive = activeQuests.some(q => q.title === questTemplates[key].title);
        const recentlyCompleted = completedQuests.some(q => 
            q.title === questTemplates[key].title && 
            Date.now() - q.startTime < 300000
        );
        return !alreadyActive && !recentlyCompleted;
    });
    
    if (availableTemplates.length === 0) return null;
    
    const randomTemplate = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
    return createQuest(randomTemplate);
}

function resetQuestStats(questType) {
    switch(questType) {
        case 'kill':
            player.stats.enemiesKilled = 0;
            showNotification('Compteur d\'ennemis remis à zéro');
            break;
        case 'treasure':
            player.stats.treasuresFound = 0;
            showNotification('Compteur de trésors remis à zéro');
            break;
        case 'explore':
            player.stats.explorations = 0;
            showNotification('Compteur d\'explorations remis à zéro');
            break;
        case 'potion':
            player.stats.potionsUsed = 0;
            showNotification('Compteur de potions remis à zéro');
            break;
        case 'spend':
            player.stats.goldSpent = 0;
            showNotification('Compteur d\'or dépensé remis à zéro');
            break;
        case 'level':
            break;
        default:
            console.warn('Type de quête inconnu:', questType);
    }
}

function meetQuestGiver() {
    const giver = questGivers[Math.floor(Math.random() * questGivers.length)];
    const availableQuest = getAvailableQuest();
    
    let npcImageKey;
    switch(giver.name) {
        case 'Roi Marcus':
            npcImageKey = 'marcus';
            break;
        case 'Alchimiste Vera':
            npcImageKey = 'alchemist';
            break;
        case 'Capitaine Gareth':
            npcImageKey = 'gareth';
            break;
        case 'Maître Aldric':
        default:
            npcImageKey = 'aldric';
            break;
    }
    
    showEventModal(npcImageKey);
    
    if (!availableQuest) {
        setTimeout(() => {
            showEventModal('no_quest');
        }, 2000);
        showMessage(`${giver.name} : "${giver.dialogue}" Mais tu as déjà assez de missions pour le moment, ${player.name}. Reviens plus tard !`);
        return;
    }
    
    showMessage(`${giver.name} : "${giver.dialogue}"`);
    
    setTimeout(() => {
        let difficultyMessage = '';
        if (availableQuest.target > availableQuest.originalTarget) {
            const multiplier = availableQuest.target / availableQuest.originalTarget;
            difficultyMessage = ` <span style="color: #e74c3c;">(Difficulté x${multiplier.toFixed(1)} - Niveau ${player.level})</span>`;
        }
        
        showMessage(`Mission proposée: "${availableQuest.title}"${difficultyMessage} - ${availableQuest.description.replace('{target}', availableQuest.target)}`);
        addMessage(`<strong>Récompenses:</strong> ${availableQuest.rewards.gold} or et ${availableQuest.rewards.exp} XP`);
        
        if (availableQuest.target > availableQuest.originalTarget) {
            addMessage(`<em>Les objectifs des quêtes augmentent avec ton niveau ! Plus tu es fort, plus les défis sont grands.</em>`);
        }
        
        const acceptBtn = document.createElement('button');
        acceptBtn.textContent = '✅ Accepter la mission';
        acceptBtn.className = 'npc-button';
        acceptBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        
        const declineBtn = document.createElement('button');
        declineBtn.textContent = '❌ Refuser';
        declineBtn.className = 'npc-button';
        declineBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        
        acceptBtn.addEventListener('click', () => {
            setTimeout(() => {
                showEventModal('quest_given');
            }, 500);
            activeQuests.push(availableQuest);
            showMessage(`Mission acceptée ! ${player.name}, tu peux voir tes quêtes actives dans le panneau ci-dessus.`);
            showNotification('Nouvelle mission !');
            updateQuestDisplay();
            removeNPCButtons();
        });
        
        declineBtn.addEventListener('click', () => {
            showMessage(`${giver.name} : "Dommage ${player.name}... Peut-être une autre fois !"`);
            removeNPCButtons();
        });
        
        const story = safeGetElement('story');
        if (story) {
            story.appendChild(acceptBtn);
            story.appendChild(declineBtn);
        }
    }, 3000);
}

function removeNPCButtons() {
    document.querySelectorAll('.npc-button').forEach(btn => {
        if (btn.parentNode) {
            btn.parentNode.removeChild(btn);
        }
    });
}

// ========== MAGASIN AVEC SCALING ==========
function removeShopButtons() {
    document.querySelectorAll('.shop-button').forEach(btn => {
        if (btn.parentNode) {
            btn.parentNode.removeChild(btn);
        }
    });
}

function closeShop() {
    removeShopButtons();
    changeGameState(GAME_STATES.EXPLORING);
    showMessage(`${player.name}, tu quittes le magasin. Bonne aventure !`);
}

function getSellPrice(itemName) {
    return itemSellPrices[itemName] || 1;
}

function getSellableItems() {
    const nonConsumables = player.inventory.filter(item => 
        !item.includes('potion') && !item.includes('Potion')
    );
    
    const consumables = player.inventory.filter(item => 
        item.includes('potion') || item.includes('Potion')
    );
    
    if (nonConsumables.length === 1 && nonConsumables[0] === 'épée rouillée') {
        return consumables;
    }
    
    return player.inventory;
}

function sellItem(itemName) {
    const itemIndex = player.inventory.indexOf(itemName);
    if (itemIndex === -1) {
        showMessage(`${player.name}, tu n'as pas cet objet !`);

        const backBtn = document.createElement('button');
        backBtn.textContent = 'Retour au magasin';
        backBtn.className = 'shop-button';
        backBtn.addEventListener('click', () => {
            removeShopButtons();
            openShop();
        });
        const story = safeGetElement('story');
        if (story) {
            story.appendChild(backBtn);
        }

        return;
    }
    
    const sellPrice = getSellPrice(itemName);
    player.inventory.splice(itemIndex, 1);
    player.gold += sellPrice;
    player.stats.goldSpent -= sellPrice;
    
    const remainingCount = getItemCount(itemName);
    let message = `${player.name}, tu vends ${itemName} pour ${sellPrice} pièces d'or !`;
    
    if (remainingCount > 0) {
        message += ` (Il te reste ${itemName} x${remainingCount})`;
    }
    
    showMessage(message);
    showNotification(`+${sellPrice} or`);
    updateUI();
    
    setTimeout(() => {
        showSellInterface();
    }, 1000);
}

function showSellInterface() {
    removeShopButtons();
    
    const sellableItems = getSellableItems();
    
    if (sellableItems.length === 0) {
        showMessage(`${player.name}, tu n'as rien à vendre !`);
        
        const backBtn = document.createElement('button');
        backBtn.textContent = 'Retour au magasin';
        backBtn.className = 'shop-button';
        backBtn.addEventListener('click', () => {
            removeShopButtons();
            openShop();
        });
        
        const story = safeGetElement('story');
        if (story) {
            story.appendChild(backBtn);
        }
        return;
    }
    
    showMessage(`${player.name}, voici ce que tu peux vendre (prix de vente à 50%) :`);
    
    const itemCounts = {};
    sellableItems.forEach(item => {
        itemCounts[item] = (itemCounts[item] || 0) + 1;
    });
    
    Object.keys(itemCounts).forEach(itemName => {
        const count = itemCounts[itemName];
        const sellPrice = getSellPrice(itemName);
        
        const btn = document.createElement('button');
        
        if (count === 1) {
            btn.textContent = `Vendre ${itemName} - ${sellPrice} or`;
        } else {
            btn.textContent = `Vendre ${itemName} x${count} - ${sellPrice} or chacun`;
        }
        
        btn.className = 'shop-button shop-sell-item';
        
        btn.addEventListener('click', () => {
            sellItem(itemName);
        });
        
        const story = safeGetElement('story');
        if (story) {
            story.appendChild(btn);
        }
    });
    
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Retour au magasin';
    backBtn.className = 'shop-button';
    backBtn.addEventListener('click', () => {
        removeShopButtons();
        openShop();
    });
    
    const story = safeGetElement('story');
    if (story) {
        story.appendChild(backBtn);
    }
}

function getScaledShopPrices() {
    const priceMultiplier = 1 + (player.level - 1) * 0.15;
    
    const scaledItems = {};
    Object.entries(shopItems).forEach(([key, item]) => {
        scaledItems[key] = {
            ...item,
            price: Math.ceil(item.price * priceMultiplier)
        };
    });
    
    return scaledItems;
}

function openShop() {
    changeGameState(GAME_STATES.SHOPPING);
    showMessage(`Bienvenue au magasin, ${player.name} ! Tu as ${player.gold} pièces d'or.`);
    
    const buyBtn = document.createElement('button');
    buyBtn.textContent = '🛒 Acheter des objets';
    buyBtn.className = 'shop-button shop-main-button';
    buyBtn.addEventListener('click', showBuyInterface);
    
    const sellBtn = document.createElement('button');
    sellBtn.textContent = '💰 Vendre des objets';
    sellBtn.className = 'shop-button shop-main-button';
    sellBtn.addEventListener('click', showSellInterface);
    
    const exitBtn = document.createElement('button');
    exitBtn.textContent = '🚪 Quitter le magasin';
    exitBtn.className = 'shop-button';
    exitBtn.addEventListener('click', closeShop);
    
    const story = safeGetElement('story');
    if (story) {
        story.appendChild(buyBtn);
        story.appendChild(sellBtn);
        story.appendChild(exitBtn);
    }
}

function showBuyInterface() {
    removeShopButtons();
    
    const scaledItems = getScaledShopPrices();
    const priceMultiplier = 1 + (player.level - 1) * 0.15;
    
    let message = `${player.name}, que veux-tu acheter ? Tu as ${player.gold} pièces d'or.`;
    
    if (player.level > 1) {
        message += `<br><small style="color: #e67e22;">⚠️ Prix ajustés au niveau ${player.level} (x${priceMultiplier.toFixed(2)})</small>`;
    }
    
    showMessage(message);

    Object.keys(scaledItems).forEach(itemKey => {
        const item = scaledItems[itemKey];
        const btn = document.createElement('button');
        btn.textContent = `${item.name} (${item.price} or)`;
        btn.className = 'shop-button';
        btn.disabled = player.gold < item.price;
        
        btn.addEventListener('click', () => {
            if (player.gold >= item.price) {
                player.gold -= item.price;
                player.stats.goldSpent += item.price;
                
                if (item.effect === 'heal') {
                    player.inventory.push(item.name);
                } else if (item.effect === 'attack') {
                    player.attack += item.value;
                    player.inventory.push(item.name);
                } else if (item.effect === 'defense') {
                    player.defense += item.value;
                    player.inventory.push(item.name);
                }
                
                showMessage(`${player.name}, tu achètes ${item.name} pour ${item.price} or !`);
                showNotification("Achat effectué !");
                updateUI();
                
                setTimeout(() => {
                    showBuyInterface();
                }, 1000);
                checkQuestProgress();
            }
        });
        
        const story = safeGetElement('story');
        if (story) {
            story.appendChild(btn);
        }
    });
    
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Retour au magasin';
    backBtn.className = 'shop-button';
    backBtn.addEventListener('click', () => {
        removeShopButtons();
        openShop();
    });
    
    const story = safeGetElement('story');
    if (story) {
        story.appendChild(backBtn);
    }
}

// ========== UTILISATION D'OBJETS AMÉLIORÉE ==========
function useItemImproved() {
    const potions = player.inventory.filter(item => item.includes('potion') || item.includes('Potion'));
    
    if (potions.length === 0) {
        showMessage(`${player.name}, tu n'as pas d'objet utilisable !`);
        return;
    }

    const potionCounts = {};
    potions.forEach(potion => {
        potionCounts[potion] = (potionCounts[potion] || 0) + 1;
    });

    if (Object.keys(potionCounts).length === 1) {
        const usedPotion = potions[0];
        const potionIndex = player.inventory.indexOf(usedPotion);
        player.inventory.splice(potionIndex, 1);
        
        player.stats.potionsUsed++;
        
        let healAmount = 40;
        if (usedPotion.includes('Grande')) {
            healAmount = 80;
        }
        
        const oldHealth = player.health;
        player.health = Math.min(player.maxHealth, player.health + healAmount);
        const actualHeal = player.health - oldHealth;
        
        const remainingCount = getItemCount(usedPotion);
        let message = `${player.name}, tu utilises ${usedPotion} et récupères ${actualHeal} PV !`;
        
        if (remainingCount > 0) {
            message += ` (Il te reste ${usedPotion} x${remainingCount})`;
        }
        
        showMessage(message);
        showNotification(`+${actualHeal} PV`);
        updateUI();
        showButtonsForState(currentGameState);
        checkQuestProgress();
    } else {
        showMessage(`${player.name}, quelle potion veux-tu utiliser ?`);
        
        Object.entries(potionCounts).forEach(([potionName, count]) => {
            const btn = document.createElement('button');
            btn.textContent = `${potionName} x${count}`;
            btn.className = 'use-item-button';
            btn.style.margin = '5px';
            btn.style.padding = '10px';
            btn.style.backgroundColor = '#3498db';
            btn.style.color = 'white';
            btn.style.border = 'none';
            btn.style.borderRadius = '5px';
            btn.style.cursor = 'pointer';
            
            btn.addEventListener('click', () => {
                const potionIndex = player.inventory.indexOf(potionName);
                player.inventory.splice(potionIndex, 1);
                
                player.stats.potionsUsed++;
                
                let healAmount = 40;
                if (potionName.includes('Grande')) {
                    healAmount = 80;
                }
                
                const oldHealth = player.health;
                player.health = Math.min(player.maxHealth, player.health + healAmount);
                const actualHeal = player.health - oldHealth;
                
                const remainingCount = getItemCount(potionName);
                let message = `${player.name}, tu utilises ${potionName} et récupères ${actualHeal} PV !`;
                
                if (remainingCount > 0) {
                    message += ` (Il te reste ${potionName} x${remainingCount})`;
                }
                
                showMessage(message);
                showNotification(`+${actualHeal} PV`);
                updateUI();
                showButtonsForState(currentGameState);
                checkQuestProgress();
                
                document.querySelectorAll('.use-item-button').forEach(button => {
                    if (button.parentNode) {
                        button.parentNode.removeChild(button);
                    }
                });
            });
            
            const story = safeGetElement('story');
            if (story) {
                story.appendChild(btn);
            }
        });
    }
}

// ========== ÉVÉNEMENTS DE JEU ==========
function setupEventListeners() {
    // Gestion du nom
    const confirmNameBtn = safeGetElement('confirmNameBtn');
    if (confirmNameBtn) {
        confirmNameBtn.addEventListener('click', setPlayerName);
    }

    const nameInput = safeGetElement('playerNameInput');
    if (nameInput) {
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                setPlayerName();
            }
        });
    }

    const changeNameBtn = safeGetElement('changeNameBtn');
    if (changeNameBtn) {
        changeNameBtn.addEventListener('click', () => {
            const input = safeGetElement('playerNameInput');
            if (input) {
                input.value = player.name;
            }
            showNameModal();
        });
    }

    // Explorer
    const exploreBtn = safeGetElement('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            player.stats.explorations++;
            const event = getRandomEvent();

            switch(event) {
                case 'enemy':
                    handleEnemyEncounter();
                    break;

                case 'treasure':
                    showEventModal('treasure');
                    player.stats.treasuresFound++;
                    
                    if (Math.random() < 0.3) {
                        const treasureItems = ['Épée de fer', 'Bouclier en bois', 'Amulette de chance', 'Gemme précieuse'];
                        const foundItem = treasureItems[Math.floor(Math.random() * treasureItems.length)];
                        player.inventory.push(foundItem);
                        
                        const goldFound = Math.floor(Math.random() * 20) + 10;
                        player.gold += goldFound;
                        showMessage(`${player.name}, tu découvres un coffre contenant ${goldFound} pièces d'or et ${foundItem} !`);
                        showNotification(`+${goldFound} or + ${foundItem}`);
                    } else {
                        const goldFound = Math.floor(Math.random() * 30) + 10;
                        player.gold += goldFound;
                        showMessage(`${player.name}, tu découvres un coffre contenant ${goldFound} pièces d'or !`);
                        showNotification(`+${goldFound} or`);
                    }
                    updateUI();
                    break;

                case 'merchant':
                    showEventModal('merchant');
                    showMessage(`${player.name}, un marchand mystérieux apparaît et disparaît, laissant derrière lui une petite bourse...`);
                    const merchantGold = Math.floor(Math.random() * 20) + 5;
                    player.gold += merchantGold;
                    showNotification(`+${merchantGold} or`);
                    updateUI();
                    break;

                case 'potion':
                    showEventModal('potion');
                    const potionTypes = ['Potion de soin', 'Grande potion'];
                    const foundPotion = potionTypes[Math.floor(Math.random() * potionTypes.length)];
                    player.inventory.push(foundPotion);
                    showMessage(`${player.name}, tu trouves une ${foundPotion} cachée dans les buissons !`);
                    showNotification(`Objet trouvé !`);
                    updateUI();
                    break;

                case 'trap':
                    showEventModal('trap');
                    const damage = Math.floor(Math.random() * 15) + 5;
                    player.health = Math.max(0, player.health - damage);
                    showMessage(`${player.name}, tu tombes dans un piège ! Tu perds ${damage} PV !`);
                    showNotification(`-${damage} PV`);
                    updateUI();
                    
                    if (player.health <= 0) {
                        hideAllButtons();
                        showEventModal('game_over');
                        showMessage(`${player.name} est mort... Ton aventure se termine ici.`);
                        changeGameState(GAME_STATES.GAME_OVER);
                    }
                    break;

                case 'rest':
                    showEventModal('rest');
                    const healAmount = Math.floor(player.maxHealth * 0.3);
                    player.health = Math.min(player.maxHealth, player.health + healAmount);
                    showMessage(`${player.name}, tu trouves un endroit paisible pour te reposer. Tu récupères ${healAmount} PV.`);
                    showNotification(`+${healAmount} PV`);
                    updateUI();
                    break;

                case 'levelUp':
                    showEventModal('levelup');
                    gainExp(50);
                    showMessage(`${player.name}, tu sens une étrange énergie t'envahir...`);
                    break;

                case 'special':
                    // Géré par getHighLevelEvent()
                    break;

                default:
                    const messages = [
                        `${player.name} avance dans un brouillard épais...`,
                        `${player.name}, un aigle survole les environs...`,
                        `${player.name}, le vent souffle doucement à travers les arbres...`,
                        `${player.name}, les ombres dansent autour de toi...`
                    ];
                    showMessage(messages[Math.floor(Math.random() * messages.length)]);
            }
            
            checkQuestProgress();
        });
    }

    // Combat
    const attackBtn = safeGetElement('attackBtn');
    if (attackBtn) {
        attackBtn.addEventListener('click', function handleAttack() {
            console.log('Attaque lancée !');
            
            if (!currentEnemy) {
                showMessage('Erreur : Aucun ennemi à combattre !');
                return;
            }

            const playerDamage = Math.max(1, player.attack + Math.floor(Math.random() * 5) - currentEnemy.defense);
            currentEnemy.health -= playerDamage;
            
            let message = `${player.name} attaque ${currentEnemy.name} et inflige ${playerDamage} dégâts !`;

            if (currentEnemy.health <= 0) {
                player.stats.enemiesKilled++;
                const expGained = currentEnemy.exp;
                const goldGained = Math.floor(Math.random() * (currentEnemy.gold[1] - currentEnemy.gold[0] + 1)) + currentEnemy.gold[0];
                
                message += ` ${currentEnemy.name} est vaincu !`;
                showMessage(message);
                
                player.gold += goldGained;
                gainExp(expGained);
                showNotification(`+${goldGained} or`);
                
                hideAllButtons();
                
                if (currentBossData) {
                    console.log('Boss vaincu !');
                    setTimeout(() => {
                        defeatLevelBoss();
                        setTimeout(() => {
                            showMessage(`Tu peux maintenant continuer ton exploration !`);
                            changeGameState(GAME_STATES.EXPLORING);
                            checkQuestProgress();
                        }, 3000);
                    }, 2000);
                } else {
                    console.log('Ennemi normal vaincu');
                    setTimeout(() => {
                        showMessage(`Victoire ${player.name} ! Tu peux continuer ton exploration.`);
                        changeGameState(GAME_STATES.EXPLORING);
                        checkQuestProgress();
                    }, 2000);
                }
            } else {
                let enemyUsedSpecial = false;
                
                if (currentBossData && typeof bossAttackLogic === 'function') {
                    console.log('Tentative d\'attaque spéciale de boss');
                    enemyUsedSpecial = bossAttackLogic();
                }
                
                if (!enemyUsedSpecial) {
                    const enemyDamage = Math.max(1, currentEnemy.attack + Math.floor(Math.random() * 3) - player.defense);
                    player.health -= enemyDamage;
                    message += ` ${currentEnemy.name} contre-attaque et inflige ${enemyDamage} dégâts à ${player.name} !`;
                }
                
                showMessage(message);
                updateEnemyUI();
                updateUI();
                
                if (player.health <= 0) {
                    hideAllButtons();
                    setTimeout(() => {
                        showEventModal('game_over');
                        showMessage(`${player.name} est mort... Ton aventure se termine ici.`);
                        changeGameState(GAME_STATES.GAME_OVER);
                    }, 1500);
                }
            }
        });
    }

    const fleeBtn = safeGetElement('fleeBtn');
    if (fleeBtn) {
        fleeBtn.addEventListener('click', () => {
            const success = Math.random() > 0.25;
            
            if (success) {
                showMessage(`${player.name} prend la fuite avec succès !`);
                setTimeout(() => {
                    changeGameState(GAME_STATES.EXPLORING);
                }, 1500);
            } else {
                const damage = Math.floor(Math.random() * 10) + 3;
                player.health = Math.max(0, player.health - damage);
                showMessage(`${player.name} essaie de fuir mais ${currentEnemy.name} t'inflige ${damage} dégâts ! Tu réussis finalement à t'échapper.`);
                showNotification(`-${damage} PV`);
                updateUI();
                
                setTimeout(() => {
                    if (player.health <= 0) {
                        hideAllButtons();
                        setTimeout(() => {
                            showEventModal('game_over');
                            showMessage(`${player.name} est mort... Ton aventure se termine ici.`);
                            changeGameState(GAME_STATES.GAME_OVER);
                        }, 500);
                    } else {
                        changeGameState(GAME_STATES.EXPLORING);
                    }
                }, 2000);
            }
        });
    }

    // Utilisation d'objets
    const useItemBtn = safeGetElement('useItemBtn');
    if (useItemBtn) {
        useItemBtn.addEventListener('click', useItemImproved);
    }

    // Quêtes
    const questBtn = safeGetElement('questBtn');
    if (questBtn) {
        questBtn.addEventListener('click', () => {
            showMessage(`${player.name}, tu cherches des PNJ ayant besoin d'aide...`);
            
            setTimeout(() => {
                const chance = Math.random();
                if (chance < 0.7) {
                    meetQuestGiver();
                } else {
                    showEventModal('no_quest');
                    showMessage(`${player.name}, tu ne trouves personne ayant besoin d'aide pour le moment. Essaie de nouveau plus tard !`);
                }
            }, 1500);
        });
    }

    // Repos
    const restBtn = safeGetElement('restBtn');
    if (restBtn) {
        restBtn.addEventListener('click', () => {
            if (player.health === player.maxHealth) {
                showMessage(`${player.name}, tu es déjà en pleine forme !`);
                return;
            }
            
            const cost = 10;
            if (player.gold < cost) {
                showMessage(`${player.name}, il te faut 10 pièces d'or pour te reposer dans une auberge.`);
                return;
            }
            
            player.gold -= cost;
            player.stats.goldSpent += cost;
            player.health = player.maxHealth;
            showMessage(`${player.name} se repose dans une auberge confortable pour 10 or. Santé restaurée !`);
            showNotification("Santé restaurée !");
            updateUI();
            checkQuestProgress();
        });
    }

    // Magasin
    const shopBtn = safeGetElement('shopBtn');
    if (shopBtn) {
        shopBtn.addEventListener('click', () => {
            if (document.querySelector('.shop-button')) {
                showMessage("Le magasin est déjà ouvert !");
                return;
            }
            
            openShop();
        });
    }

    // Sauvegarde/Chargement
    const saveBtn = safeGetElement('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const saveData = {
                player: player,
                activeQuests: activeQuests,
                completedQuests: completedQuests
            };
            try {
                localStorage.setItem('goldOfWarSave', JSON.stringify(saveData));
                showNotification('Partie sauvegardée !');
            } catch(e) {
                console.error('Erreur de sauvegarde:', e);
                showNotification('Erreur de sauvegarde !');
            }
        });
    }

    const loadBtn = safeGetElement('loadBtn');
    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            try {
                const save = localStorage.getItem('goldOfWarSave');
                if (save) {
                    const saveData = JSON.parse(save);
                    
                    if (saveData.player) {
                        player = { ...player, ...saveData.player };
                        activeQuests = saveData.activeQuests || [];
                        completedQuests = saveData.completedQuests || [];
                        
                        if (!player.stats) {
                            player.stats = {
                                enemiesKilled: 0,
                                treasuresFound: 0,
                                explorations: 0,
                                potionsUsed: 0,
                                goldSpent: 0
                            };
                        }
                    } else {
                        player = { ...player, ...saveData };
                        if (!player.stats) {
                            player.stats = {
                                enemiesKilled: 0,
                                treasuresFound: 0,
                                explorations: 0,
                                potionsUsed: 0,
                                goldSpent: 0
                            };
                        }
                        activeQuests = [];
                        completedQuests = [];
                    }
                    
                    updateUI();
                    updateQuestDisplay();
                    changeGameState(GAME_STATES.EXPLORING);
                    showNotification('Partie chargée !');
                    showMessage(`Sauvegarde chargée ! ${player.name}, ton aventure reprend...`);
                } else {
                    showNotification('Aucune sauvegarde trouvée !');
                }
            } catch(e) {
                console.error('Erreur de chargement:', e);
                showNotification('Erreur de chargement !');
            }
        });
    }

    const resetBtn = safeGetElement('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir recommencer une nouvelle partie ?')) {
                player = {
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
                    stats: {
                        enemiesKilled: 0,
                        treasuresFound: 0,
                        explorations: 0,
                        potionsUsed: 0,
                        goldSpent: 0
                    }
                };
                activeQuests = [];
                completedQuests = [];
                updateUI();
                updateQuestDisplay();
                changeGameState(GAME_STATES.EXPLORING);
                showNameModal();
                showNotification('Nouvelle partie !');
            }
        });
    }
}

// ========== INITIALISATION ==========
function initializeGame() {
    initializeDOMElements();
    setupEventListeners();
    updateUI();
    updateQuestDisplay();
    changeGameState(GAME_STATES.EXPLORING);
    showNameModal();
}

// Attendre que le DOM soit chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGame);
} else {
    initializeGame();
}

console.log('🎮 Jeu Gold of War initialisé avec succès !');
console.log('💡 Fonctions de debug disponibles :');
console.log('   - debugTriggerBoss(niveau) : Force un boss à apparaître');
console.log('   - player : Accès aux données du joueur');
console.log('   - currentGameState : État actuel du jeu');