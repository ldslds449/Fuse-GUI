const csv_input = document.getElementById('csv-input');
const item_table = document.getElementById('item-table');
const search_btn = document.getElementById('search-btn');
const reset_btn = document.getElementById('reset-btn');

const row_count_label = document.getElementById('row-count-label');
const select_count_label = document.getElementById('select-count-label');
const hide_count_label = document.getElementById('hide-count-label');

const table_search_btn = document.getElementById('table-search-btn');
const table_search_field = document.getElementById('table-search-field');
const table_sell_select_btn = document.getElementById('table-sell-select-btn');
const table_fuse_select_btn = document.getElementById('table-fuse-select-btn');

const table_show_all_btn = document.getElementById('table-show-all-btn');
const table_select_all_btn = document.getElementById('table-select-all-btn');
const table_delete_all_btn = document.getElementById('table-delete-all-btn');

const command_modal = document.getElementById('command-modal');
const command_text = document.getElementById('command-text');
const command_close_btn = document.getElementById('command-close-btn');
const command_copy_btn = document.getElementById('command-copy-btn');
const command_auto_hide_checkbox = document.getElementById('command-auto-hide-checkbox');

const message_toast = document.getElementById('message-toast');
const message_text = document.getElementById('message-text');

const select_hp = document.getElementById('select-hp');
const select_def = document.getElementById('select-def');
const select_str = document.getElementById('select-str');
const select_int = document.getElementById('select-int');
const select_dex = document.getElementById('select-dex');
const select_stats_checkbox = [select_hp, select_def, select_str, select_int, select_dex];

const stats_count = document.getElementById('stats-count');
const stats_count_relation = document.getElementById('stats-count-relation');
const stats_min = document.getElementById('stats-min');
const stats_max = document.getElementById('stats-max');

const select_a = document.getElementById('select-a');
const select_b = document.getElementById('select-b');
const select_c = document.getElementById('select-c');
const select_d = document.getElementById('select-d');
const select_e = document.getElementById('select-e');
const select_f = document.getElementById('select-f');
const select_rarity_checkbox = [select_a, select_b, select_c, select_d, select_e, select_f];

const select_rank_1 = document.getElementById('select-rank-1');
const select_rank_2 = document.getElementById('select-rank-2');
const select_rank_3 = document.getElementById('select-rank-3');
const select_rank_4 = document.getElementById('select-rank-4');
const select_rank_5 = document.getElementById('select-rank-5');
const select_rank_checkbox = [select_rank_1, select_rank_2, select_rank_3, select_rank_4, select_rank_5];

const select_bis_1 = document.getElementById('select-bis-1');
const select_bis_2 = document.getElementById('select-bis-2');
const select_bis_3 = document.getElementById('select-bis-3');
const select_bis_4 = document.getElementById('select-bis-4');
const select_bis_5 = document.getElementById('select-bis-5');
const select_bis_checkbox = [select_bis_1, select_bis_2, select_bis_3, select_bis_4, select_bis_5];

const STATS_INFO = {
    'HP': 0,
    'DEF': 1,
    'STR': 2,
    'INT': 3,
    'DEX': 4,
};

const BIS = {
    'A': {
        'dawnbow': 1,
        'galactic-tempest': 1,
        'mythrend': 1,
        'eldritch-helm': 1,
        'kagekabuto': 1,
        'mystshade': 1,
        'frostheart': 1,
        'phantom-mantle': 1,
        'storm-bulwark': 1,

        'duskbow': 2,
        'etherstorm': 2,
        'rift-cleaver': 2,
        'royal-ordinance': 2,
        'starquake': 2,
        'doomguard-helmet': 2,
        'firecap': 2,
        'hellmet': 2,
        'shadowcrest': 2,
        'celestium-shell': 2,
        'nebula-mail': 2,
        'starshield': 2,
        'subzero-mail': 2,

        'celestial-decree': 3,
        'aquavisor': 3,
        'divine-helm': 3,
        'earthcrown': 3,
        'arachnoplate': 3,
        'regalplate': 3,
        'whisper-shell': 3,

        'nebulawrath': 4,

    },
    'B': {
        'dragonplate': 1,
        'titanplate': 1,
        'regalith': 1,
        'valtarius': 1,
        'candycane': 1,
        'shadowstrike': 1,
        'twig': 1,

        'voidwalker-robe': 2,
        'malevolith': 2,

        'elemental-ward': 3,
        'frostforged-plate': 3,
        'necrotic-shell': 3,
        'ignis': 3,
        'nicht': 3,
        'mjolnir': 3,
        'soulrender': 3,
        'zantetsuken': 3,
        'olympian-helm': 3,

        'eldritch-robe': 4,
        'phoenix-mail': 4,
        'valkyrie-plate': 4,
        'phoenix-helm': 4,
        'underworld-crown': 4,
        'dragons-breath': 4,
        'starfall': 4,
        'voidcaller': 4,
        'frostbite': 4,

    },
    'C': {
        'draconic-skeletal': 1,
        'lionhide-cape': 1,
        'soul-crown': 1,
        'soul-cuirass': 1,
        'warlords-helmet': 1,
        'warlords-vest': 1,
        'lion-helm': 1,
        'titanium-helmet': 1,
        'abyssal-dagger': 1,
        'durandal': 1,
        'gramr': 1,

        'twilight-chestplate': 2,
        'twilight-mantle': 2,
        'harpe': 2,
        'eclipse-staff': 2,
        'corrupted-crown': 2,
        'corrupted-chestpiece': 2,

        'abysal-staff': 3,
        'gilded-helm': 3,
        'titanium-battleplate': 3,
        'vanquishers-crown': 3,
        'vanquishers-cuirass': 3,
        'void-cape': 3,
        'void-helm': 3,

        'destroyers-armor': 4,
        'godstaff': 4,

        'abyssal-staff': 5,
        'brutality-armor': 5,
        'brutality-helm': 5,
        'dragon-fang': 5,
        'excalibur': 5,
        'worldshaper': 5,

    },
    'D': {
        'frozen-breastplate': 1,
        'infernal-armor': 1,
        'skeletal-shortbow': 1,
        'peacekeeper-vest': 1,
        'celestial-helm': 1,
        'grimdark-helm': 1,
        'cosmic-staff': 1,
        'warp-edge': 1,

        'ancient-cuirass': 2,
        'crimson-warglaive': 2,
        'dragonheart-helm': 2,
        'ghost-reaver': 2,
        'dragonslayer-armor': 2,
        'mythril-chestplate': 2,
        'obsidian-armor': 2,
        'bloodmoon-helm': 2,
        'ember-helm': 2,
        'chaos-impaler': 2,
        'gold-spellblade': 2,

        'voidsteel-helm': 3,
        'devil-sting': 3,
        'frostbite-helm': 3,
        'golden-cuirass': 3,

        'abyssal-armor': 4,
        'skeletal-razor': 4,
        'vengeance-helm': 4,
        'shadowsteel-helm': 4,

        'ironbane-visor': 5,
        'silk-raiment': 5,
        'savage-reaver': 5,
        'runic-armor': 5,
        'gladiator-robe': 5,

    },
    'E': {
        'elderwood-staff': 1,
        'mithril-chestplate': 1,
        'steel-sword': 1,
        'warped-fang': 1,
        'bronze-helm': 1,
        'infernal-armor': 1,
        'ivory-vest': 1,
        'mithril-chestplate': 1,

        'viking-helm': 2,
        'obsidian-armor': 2,
        'gladiator-helm': 2,
        'heavy-crossbow': 2,
        'steel-dagger': 2,

        'bloody-sabre': 3,
        'cardinal-armor': 3,
        'woodland-armor': 3,
        'samurai-helm': 3,
        'spartan-helm': 3,
        'warrior-helm': 3,
        'ancient-greatstaff': 3,
        'infected-scalpel': 3,

        'steel-armor': 4,
        'briarwood-staff': 4,
        'oak-longbow': 4,
        'bladewind-mask': 4,
        'barbarian-helm': 4,
        'loyal-scaled-tunic': 4,

        'ivory-chestplate': 5,
        'solitudes-tunic': 5,
        'warbringer-helm': 5,
        'bronzed-cuirass': 5,
        'elderwood-armor': 5,
        'nightfall-visor': 5,

    },
    'F': {
        'bone-dagger': 1,
        'leather-coat': 1,
        'plainsteel-helm': 1,
        'tattered-tunic': 1,
        'wooden-helm': 1,

        'ironclad-helm': 2,
        'basic-sword': 2,
        'blunt-sword': 2,
        'bronze-dagger': 2,
        'cheap-wand': 2,
        'dull-blade': 2,
        'iron-armor': 2,
        'leather-cap': 2,
        'steel-helm': 2,
        'tattered-robe': 2,
        'wood-staff': 2,

        'beginner-armor': 3,
        'beginner-robe': 3,
        'iron-staff': 3,
        'knight-helm': 3,
        'rusted-helm': 3,

        'cloth-tunic': 4,
        'iron-helm': 4,
        'protective-helm': 4,
        'rusty-chainmail': 4,

        'apprentice-staff': 5,
        'beginner-helm': 5,
        'guard-helm': 5,
        'leather-chestplate': 5,
        'rusty-breastplate': 5,
        'stick': 5,

    }
};

const Type = {
    'A': {
        'dawnbow': 'Weapon',
        'galactic-tempest': 'Weapon',
        'mythrend': 'Weapon',
        'duskbow': 'Weapon',
        'etherstorm': 'Weapon',
        'rift-cleaver': 'Weapon',
        'royal-ordinance': 'Weapon',
        'starquake': 'Weapon',
        'celestial-decree': 'Weapon',
        'nebulawrath': 'Weapon',
        'eldritch-helm': 'Helmet',
        'kagekabuto': 'Helmet',
        'mystshade': 'Helmet',
        'doomguard-helmet': 'Helmet',
        'firecap': 'Helmet',
        'hellmet': 'Helmet',
        'shadowcrest': 'Helmet',
        'aquavisor': 'Helmet',
        'divine-helm': 'Helmet',
        'earthcrown': 'Helmet',
        'frostheart': 'Armor',
        'phantom-mantle': 'Armor',
        'storm-bulwark': 'Armor',
        'celestium-shell': 'Armor',
        'nebula-mail': 'Armor',
        'starshield': 'Armor',
        'subzero-mail': 'Armor',
        'arachnoplate': 'Armor',
        'regalplate': 'Armor',
        'whisper-shell': 'Armor',
    },
    'B': {
        'candycane': 'Weapon',
        'shadowstrike': 'Weapon',
        'twig': 'Weapon',
        'mjolnir': 'Weapon',
        'soulrender': 'Weapon',
        'zantetsuken': 'Weapon',
        'dragons-breath': 'Weapon',
        'starfall': 'Weapon',
        'voidcaller': 'Weapon',
        'frostbite': 'Weapon',
        'regalith': 'Helmet',
        'valtarius': 'Helmet',
        'malevolith': 'Helmet',
        'ignis': 'Helmet',
        'nicht': 'Helmet',
        'olympian-helm': 'Helmet',
        'phoenix-helm': 'Helmet',
        'underworld-crown': 'Helmet',
        'dragonplate': 'Armor',
        'titanplate': 'Armor',
        'voidwalker-robe': 'Armor',
        'elemental-ward': 'Armor',
        'frostforged-plate': 'Armor',
        'necrotic-shell': 'Armor',
        'eldritch-robe': 'Armor',
        'phoenix-mail': 'Armor',
        'valkyrie-plate': 'Armor',
    },
    'C': {
        'abyssal-dagger': 'Weapon',
        'durandal': 'Weapon',
        'gramr': 'Weapon',
        'eclipse-staff': 'Weapon',
        'harpe': 'Weapon',
        'abysal-staff': 'Weapon',
        'godstaff': 'Weapon',
        'abyssal-staff': 'Weapon',
        'dragon-fang': 'Weapon',
        'excalibur': 'Weapon',
        'lion-helm': 'Helmet',
        'soul-crown': 'Helmet',
        'titanium-helmet': 'Helmet',
        'warlords-helmet': 'Helmet',
        'corrupted-crown': 'Helmet',
        'twilight-mantle': 'Helmet',
        'gilded-helm': 'Helmet',
        'vanquishers-crown': 'Helmet',
        'void-helm': 'Helmet',
        'brutality-helm': 'Helmet',
        'draconic-skeletal': 'Armor',
        'lionhide-cape': 'Armor',
        'soul-cuirass': 'Armor',
        'warlords-vest': 'Armor',
        'corrupted-chestpiece': 'Armor',
        'twilight-chestplate': 'Armor',
        'titanium-battleplate': 'Armor',
        'vanquishers-cuirass': 'Armor',
        'void-cape': 'Armor',
        'destroyers-armor': 'Armor',
        'brutality-armor': 'Armor',
        'worldshaper': 'Armor',
    },
    'D': {
        'cosmic-staff': 'Weapon',
        'skeletal-shortbow': 'Weapon',
        'warp-edge': 'Weapon',
        'chaos-impaler': 'Weapon',
        'crimson-warglaive': 'Weapon',
        'ghost-reaver': 'Weapon',
        'gold-spellblade': 'Weapon',
        'devil-sting': 'Weapon',
        'skeletal-razor': 'Weapon',
        'savage-reaver': 'Weapon',
        'celestial-helm': 'Helmet',
        'grimdark-helm': 'Helmet',
        'bloodmoon-helm': 'Helmet',
        'dragonheart-helm': 'Helmet',
        'ember-helm': 'Helmet',
        'frostbite-helm': 'Helmet',
        'voidsteel-helm': 'Helmet',
        'shadowsteel-helm': 'Helmet',
        'vengeance-helm': 'Helmet',
        'ironbane-visor': 'Helmet',
        'frozen-breastplate': 'Armor',
        'infernal-armor': 'Armor',
        'peacekeeper-vest': 'Armor',
        'ancient-cuirass': 'Armor',
        'dragonslayer-armor': 'Armor',
        'mythril-chestplate': 'Armor',
        'obsidian-armor': 'Armor',
        'golden-cuirass': 'Armor',
        'abyssal-armor': 'Armor',
        'gladiator-robe': 'Armor',
        'runic-armor': 'Armor',
        'silk-raiment': 'Armor',
    },
    'E': {
        'elderwood-staff': 'Weapon',
        'steel-sword': 'Weapon',
        'warped-fang': 'Weapon',
        'heavy-crossbow': 'Weapon',
        'steel-dagger': 'Weapon',
        'ancient-greatstaff': 'Weapon',
        'bloody-sabre': 'Weapon',
        'infected-scalpel': 'Weapon',
        'briarwood-staff': 'Weapon',
        'oak-longbow': 'Weapon',
        'bronze-helm': 'Helmet',
        'gladiator-helm': 'Helmet',
        'viking-helm': 'Helmet',
        'samurai-helm': 'Helmet',
        'spartan-helm': 'Helmet',
        'warrior-helm': 'Helmet',
        'barbarian-helm': 'Helmet',
        'bladewind-mask': 'Helmet',
        'nightfall-visor': 'Helmet',
        'warbringer-helm': 'Helmet',
        'infernal-armor': 'Armor',
        'ivory-vest': 'Armor',
        'mithril-chestplate': 'Armor',
        'obsidian-armor': 'Armor',
        'cardinal-armor': 'Armor',
        'woodland-armor': 'Armor',
        'loyal-scaled-tunic': 'Armor',
        'steel-armor': 'Armor',
        'bronzed-cuirass': 'Armor',
        'elderwood-armor': 'Armor',
        'ivory-chestplate': 'Armor',
        'solitudes-tunic': 'Armor',
    },
    'F': {
        'bone-dagger': 'Weapon',
        'basic-sword': 'Weapon',
        'blunt-sword': 'Weapon',
        'bronze-dagger': 'Weapon',
        'cheap-wand': 'Weapon',
        'dull-blade': 'Weapon',
        'wood-staff': 'Weapon',
        'iron-staff': 'Weapon',
        'apprentice-staff': 'Weapon',
        'stick': 'Weapon',
        'plainsteel-helm': 'Helmet',
        'wooden-helm': 'Helmet',
        'ironclad-helm': 'Helmet',
        'leather-cap': 'Helmet',
        'rusted-helm': 'Helmet',
        'steel-helm': 'Helmet',
        'knight-helm': 'Helmet',
        'iron-helm': 'Helmet',
        'protective-helm': 'Helmet',
        'beginner-helm': 'Helmet',
        'guard-helm': 'Helmet',
        'leather-coat': 'Armor',
        'tattered-tunic': 'Armor',
        'iron-armor': 'Armor',
        'tattered-robe': 'Armor',
        'beginner-armor': 'Armor',
        'beginner-robe': 'Armor',
        'cloth-tunic': 'Armor',
        'rusty-chainmail': 'Armor',
        'leather-chestplate': 'Armor',
        'rusty-breastplate': 'Armor',
    },
}

var csv;  // original csv data
var table;  // csv data after filtering
var select_index = new Set();  // index location in csv data
var hide_index = new Set();  // index location in csv data

class Stats {
    data = new Array();
    count = new Array(5).fill(0);
    total = new Array(5).fill(0);
    detail = new Array(5).fill(null).map(() => new Array(0));
    constructor(stats) {
        const transform = {
            'health': 'HP',
            'defense': 'DEF',
            'strength': 'STR',
            'attack': 'STR',
            'intelligence': 'INT',
            'dexterity': 'DEX',
        };
        const stats_split = stats.split(', ');
        for (let i = 0; i < stats_split.length; ++i) {
            const name = transform[stats_split[i].split(':')[0]];
            const value = parseInt(stats_split[i].split(':')[1]);
            this.data.push({ name: name, value: value });
            this.count[STATS_INFO[name]] += 1;
            this.total[STATS_INFO[name]] += value;
            this.detail[STATS_INFO[name]].push(value);
        }
        // sort stat by name
        this.data.sort((a, b) => STATS_INFO[a.name] - STATS_INFO[b.name]);
    }
};

function sortTable(data) {
    data.sort(function (a, b) {
        if (a.bis != b.bis) {
            return a.bis - b.bis;
        }
        if (a.name != b.name) {
            return a.name.localeCompare(b.name);
        }
        if (a.rarity != b.rarity) {
            return a.rarity.localeCompare(b.rarity);
        }
        if (a.rank != b.rank) {
            return parseInt(b.rank) - parseInt(a.rank);
        }

        let sum_a = 0, sum_b = 0;
        for (let i = 0; i < select_stats_checkbox.length; ++i) {
            if (select_stats_checkbox[i].checked) {
                sum_a += a.stats.count[i];
                sum_b += b.stats.count[i];
            }
        }
        if (sum_a != sum_b) return sum_b - sum_a;

        for (let i = 0; i < select_stats_checkbox.length; ++i) {
            if (select_stats_checkbox[i].checked) {
                if (a.stats.count[i] != b.stats.count[i]) {
                    return b.stats.count[i] - a.stats.count[i];
                }
            }
        }

        return parseInt(a.id) - parseInt(b.id);
    });
    return data;
}

function showTable(data) {
    let table_body = item_table.getElementsByTagName('tbody')[0];

    // clean all rows
    const empty_tbody = document.createElement('tbody');
    table_body.parentNode.replaceChild(empty_tbody, table_body);
    table_body = empty_tbody;

    data = sortTable(data);

    let cur_row_color = 'var(--bs-table-color)';
    let cur_row_bg = 'var(--bs-table-bg)';
    let next_row_color = 'var(--bs-table-striped-color)';
    let next_row_bg = 'var(--bs-table-striped-bg)';

    const createColumn = function (text) {
        let col = document.createElement('span');
        col.style.display = 'inline';
        col.innerText = text;
        return col;
    };

    const insertColumn = function (row, column) {
        let cell = row.insertCell();
        cell.style.backgroundColor = cur_row_bg;
        cell.style.color = cur_row_color;
        cell.appendChild(column);
    }

    for (let i = 0; i < data.length; ++i) {
        const row = table_body.insertRow();

        if (i > 0 && data[i].name != data[i - 1].name) {
            [cur_row_color, cur_row_bg, next_row_color, next_row_bg] =
                [next_row_color, next_row_bg, cur_row_color, cur_row_bg];
        }

        // id
        insertColumn(row, createColumn(data[i].id));

        // name
        const name_col = createColumn(data[i].name);
        name_col.addEventListener('dblclick', (e) => {
            navigator.clipboard.writeText(data[i].name).then(function () {
                showToast('Copy successfully', false);
            }, function (err) {
                console.log(err);
                showToast('Copy failed', true);
            });
        });
        insertColumn(row, name_col);

        // type
        insertColumn(row, createColumn(data[i].type[0]));

        // rarity
        let rarity_col = createColumn(data[i].rarity);
        rarity_col.style.color = `var(--${data[i].rarity.toLowerCase()}-color)`;
        insertColumn(row, rarity_col);

        // rank
        let rank_col = createColumn(data[i].rank);
        rank_col.style.color = `var(--rank-${data[i].rank}-color)`;
        insertColumn(row, rank_col);

        // stats
        const stats = data[i].stats;
        const stats_container = document.createElement('div');

        const ordered_stats_data = Array.from(stats.data);
        ordered_stats_data.sort(function (a, b) {
            return Number(select_stats_checkbox[STATS_INFO[b.name]].checked) -
                Number(select_stats_checkbox[STATS_INFO[a.name]].checked);
        });

        for (let j = 0; j < ordered_stats_data.length; ++j) {
            let stats_col = createColumn(`${ordered_stats_data[j].name}:${ordered_stats_data[j].value}`);
            stats_col.style.color =
                select_stats_checkbox[STATS_INFO[ordered_stats_data[j].name]].checked ?
                    `var(--${ordered_stats_data[j].name.toLowerCase()}-color)` :
                    'var(--hide-color)';
            stats_col.style.marginLeft = '5px';
            stats_col.style.marginRight = '5px';
            stats_col.style.display = 'inline-block';
            stats_col.style.width = '70px';
            stats_col.style.textAlign = 'right';
            stats_container.appendChild(stats_col);
        }
        insertColumn(row, stats_container);

        // BIS
        let bis_val = BIS[data[i].rarity][data[i].name];
        bis_val = bis_val == undefined ? '' : String(bis_val); bis_val
        let bis_col = createColumn(bis_val);
        bis_col.style.color = `var(--bis-${bis_val}-color)`;
        insertColumn(row, bis_col);

        // action
        const action_container = document.createElement('div');
        const action_row_div = document.createElement('div');
        action_container.className = 'container-fluid';
        action_row_div.className = 'row gx-2';
        {
            const select_btn = document.createElement('button');
            const unselected_class = 'btn-outline-primary';
            const selected_class = 'btn-outline-danger';
            const unselected_text = 'Select';
            const selected_text = 'Delete';
            select_btn.type = 'button';
            select_btn.id = `item-${data[i].index}-select-btn`;
            select_btn.className = `btn btn-sm ${select_index.has(data[i].index) ? selected_class : unselected_class}`;
            select_btn.innerText = select_index.has(data[i].index) ? selected_text : unselected_text;
            select_btn.style.minWidth = '80px';
            select_btn.setAttribute('data-index', String(data[i].index));
            select_btn.toggleAttribute('data-selected', select_index.has(data[i].index));
            select_btn.onclick = function (e) {
                const target = e.target;
                if (target.getAttribute('data-selected') != null) {
                    select_index.delete(parseInt(target.getAttribute('data-index')));
                    target.classList.remove(selected_class);
                    target.classList.add(unselected_class);
                    target.innerHTML = unselected_text;
                } else {
                    select_index.add(parseInt(target.getAttribute('data-index')));
                    target.classList.remove(unselected_class);
                    target.classList.add(selected_class);
                    target.innerHTML = selected_text;
                }
                select_btn.toggleAttribute('data-selected');
                updateSelectValue();
            }

            const action_col_div = document.createElement('div');
            action_col_div.className = 'col-auto';
            action_col_div.appendChild(select_btn);
            action_row_div.appendChild(action_col_div);
        }
        {
            const hide_btn = document.createElement('button');
            hide_btn.type = 'button';
            hide_btn.id = `item-${data[i].index}-hide-btn`;
            hide_btn.className = `btn btn-sm btn-outline-warning`;
            hide_btn.innerText = 'Hide';
            hide_btn.style.minWidth = '80px';
            hide_btn.onclick = function (e) {
                hide_index.add(data[i].index);
                select_index.delete(data[i].index);
                updateSelectValue();
                updateHideValue();
                applyFilter();
            }

            const action_col_div = document.createElement('div');
            action_col_div.className = 'col-auto';
            action_col_div.appendChild(hide_btn);
            action_row_div.appendChild(action_col_div);
        }
        action_container.appendChild(action_row_div);
        insertColumn(row, action_container);
    }

    // row count
    updateRowValue();
}

function applyFilter() {
    const target_value = parseInt(stats_count.value);
    const target_min = parseInt(stats_min.value);
    const target_max = parseInt(stats_max.value);

    table = csv.filter(function (row) {
        // stats
        let sum = 0;
        for (let i = 0; i < select_stats_checkbox.length; ++i) {
            if (select_stats_checkbox[i].checked) {
                sum += row.stats.count[i];
                if (!row.stats.detail[i].every(
                    (x) => (target_min <= x) && (x <= target_max))
                ) return false;
            }
        }

        // check relation
        const relation = stats_count_relation.value;
        if (relation == '==') {
            if (sum != target_value) return false;
        } else if (relation == '>=') {
            if (sum < target_value) return false;
        } else if (relation == '<=') {
            if (sum > target_value) return false;
        }

        // rarity
        const item_rarity = row.rarity.charCodeAt(0) - 'A'.charCodeAt(0);
        if (!select_rarity_checkbox[item_rarity].checked) return false;

        // rank
        const item_rank = parseInt(row.rank);
        if (!select_rank_checkbox[item_rank - 1].checked) return false;

        // name
        const target_pattern = table_search_field.value.trim().toLowerCase();
        if (target_pattern.length > 0 && row.name.toLowerCase().indexOf(target_pattern) == -1) return false;

        // BIS
        if (!select_bis_checkbox[row.bis - 1].checked) return false;

        // hide
        if (hide_index.has(row.index)) return false;

        return true;
    });

    showTable(table);
}

function showToast(message, danger) {
    message_text.innerText = message;

    const danger_class = 'text-bg-danger';
    const success_class = 'text-bg-success';
    if (danger) {
        message_toast.classList.remove(success_class);
        message_toast.classList.add(danger_class);
    } else {
        message_toast.classList.remove(danger_class);
        message_toast.classList.add(success_class);
    }

    const toast = new bootstrap.Toast(message_toast);
    toast.show();
}

function updateRowValue() {
    row_count_label.innerText = `Row count: ${table.length}`;
}

function updateSelectValue() {
    select_count_label.innerText = `Select count: ${select_index.size}`;
}

function setSelectValue(val) {
    select_count_label.innerText = `Select count: ${val}`;
}

function updateHideValue() {
    hide_count_label.innerText = `Hide count: ${hide_index.size}`;
}

function getSellCommand() {
    if (select_index.size == 0) {
        return {
            success: false,
            error_message: 'You need to select at least 1 item',
            command: ''
        };
    }

    const selected_ids = Array.from(select_index).map((idx) => csv[idx].id);
    return {
        success: true,
        error_message: '',
        command: `$sell equipment ${selected_ids.join(',')}`
    };
}

function getFuseCommand() {
    if (select_index.size != 2) {
        if (select_index.size > 2) {
            return {
                success: false,
                error_message: 'You can only select 2 items',
                command: ''
            };
        } else {
            return {
                success: false,
                error_message: 'You need to select 2 items',
                command: ''
            };
        }
    }

    const select_index_arr = Array.from(select_index);
    const select_items = select_index_arr.map((idx) => csv[idx]);

    if ((select_items[0].name != select_items[1].name) ||
        (select_items[0].rarity != select_items[1].rarity) ||
        (select_items[0].rank != select_items[1].rank) ||
        (select_items[0].rank == '5')) {
        return {
            success: false,
            error_message: 'Selected items can not be fused',
            command: ''
        };
    }

    const selected_ids = select_index_arr.map((idx) => csv[idx].id);
    return {
        success: true,
        error_message: '',
        command: `$fuse item ${selected_ids.join(' ')}`
    };
}

function hideSelected() {
    const select_index_arr = Array.from(select_index);
    for (let i = 0; i < select_index_arr.length; ++i) {
        const hide_btn = document.getElementById(`item-${select_index_arr[i]}-hide-btn`);
        hide_btn.click();
    }
}

document.addEventListener('keypress', function onPress(event) {
    if (event.key === 'Enter') {
        search_btn.click();
    }
});

document.addEventListener('keypress', function onPress(event) {
    if (event.key === 'F' && event.shiftKey === true) {
        const fuse_cmd = getFuseCommand();
        if (fuse_cmd.success) {
            navigator.clipboard.writeText(fuse_cmd.command).then(function () {
                if (command_auto_hide_checkbox.checked) {
                    hideSelected();
                }
                showToast('Copy successfully', false);
            }, function (err) {
                console.log(err);
                showToast('Copy failed', true);
            });
        } else {
            showToast(fuse_cmd.error_message, true);
            return;
        }
    }
});

document.addEventListener('keypress', function onPress(event) {
    if (event.key === 'S' && event.shiftKey === true) {
        const sell_cmd = getSellCommand();
        if (sell_cmd.success) {
            navigator.clipboard.writeText(sell_cmd.command).then(function () {
                if (command_auto_hide_checkbox.checked) {
                    hideSelected();
                }
                showToast('Copy successfully', false);
            }, function (err) {
                console.log(err);
                showToast('Copy failed', true);
            });
        } else {
            showToast(sell_cmd.error_message, true);
            return;
        }
    }
});

csv_input.addEventListener('click', (event) => {
    csv_input.value = '';  // reset
});

csv_input.addEventListener('change', (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function () {
        const text = reader.result;
        const rows = text.split('\n').map(function (r) {
            r = r.trim();
            if (r[r.length - 1] == ',') return r.slice(0, -1);
            else return r;
        });

        // read the column name
        const col_names = rows[0].split(',').map((x) => x.trim());

        // deal with each row
        const csv = new Array();
        for (let i = 1; i < rows.length; ++i) {
            const row = rows[i];
            if (row.length == 0) continue;

            let element = {};
            let start = 0, now = 0, col_idx = 0;
            let quote = false;
            while (now <= row.length && col_idx < col_names.length) {
                if (now < row.length && row[now] == '"') {
                    quote = !quote;
                    if (quote) start = now + 1;
                }
                if (!quote && (now == row.length || row[now] == ',')) {
                    const value = row.slice(start, now).trim();
                    element[col_names[col_idx]] = value;
                    col_idx += 1;
                    start = now + 1;
                }
                now += 1;
            }
            element.index = i - 1;
            element.bis = BIS[element.rarity[0]][element.name.toLowerCase()];
            element.type = Type[element.rarity[0]][element.name.toLowerCase()];
            csv.push(element);
        }

        // add Stats attribute
        for (let i = 0; i < csv.length; ++i) {
            csv[i].stats = new Stats(csv[i].stats);
        }

        window.csv = csv;

        // reset all filters
        reset_btn.click();
    };
    reader.readAsText(file);
});

search_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }

    // clear selected
    select_index.clear();
    updateSelectValue();

    applyFilter();
});

reset_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }

    for (let i = 0; i < select_stats_checkbox.length; ++i) {
        select_stats_checkbox[i].checked = false;
    }
    stats_count_relation.value = '==';
    stats_count.value = 0;
    stats_min.value = 0;
    stats_max.value = 99999;

    for (let i = 0; i < select_rarity_checkbox.length; ++i) {
        select_rarity_checkbox[i].checked = true;
    }

    for (let i = 0; i < select_rank_checkbox.length; ++i) {
        select_rank_checkbox[i].checked = true;
    }

    for (let i = 0; i < select_bis_checkbox.length; ++i) {
        select_bis_checkbox[i].checked = true;
    }

    // clear
    table_search_field.value = '';
    select_index.clear();
    hide_index.clear();
    updateSelectValue();
    updateHideValue();

    applyFilter();
});

table_search_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }
    applyFilter();
});

table_show_all_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }

    hide_index.clear();
    updateHideValue();
    applyFilter();
});

table_select_all_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }

    for (let i = 0; i < table.length; ++i) {
        const btn = document.getElementById(`item-${table[i].index}-select-btn`);
        if (btn.getAttribute('data-selected') == null) {
            btn.click();
        }
    }
    setSelectValue(table.length);
});

table_delete_all_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }

    for (let i = 0; i < table.length; ++i) {
        const btn = document.getElementById(`item-${table[i].index}-select-btn`);
        if (btn.getAttribute('data-selected') != null) {
            btn.click();
        }
    }
    setSelectValue(0);
});

table_sell_select_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }

    const sell_cmd = getSellCommand();
    if (sell_cmd.success) {
        command_text.innerText = sell_cmd.command;
    } else {
        showToast(sell_cmd.error_message, true);
        return;
    }

    const modal = new bootstrap.Modal(command_modal);
    modal.show();
});

table_fuse_select_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }

    const fuse_cmd = getFuseCommand();
    if (fuse_cmd.success) {
        command_text.innerText = fuse_cmd.command;
    } else {
        showToast(fuse_cmd.error_message, true);
        return;
    }

    const modal = new bootstrap.Modal(command_modal);
    modal.show();
});

command_copy_btn.addEventListener('click', function () {
    navigator.clipboard.writeText(command_text.value).then(function () {
        if (command_auto_hide_checkbox.checked) {
            hideSelected();
        }
        command_close_btn.click();
    }, function (err) {
        console.log(err);
        showToast('Copy failed', true);
    });
});
