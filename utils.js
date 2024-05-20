/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const csv_input = document.getElementById('csv-input');
const item_table = document.getElementById('item-table');
const search_btn = document.getElementById('search-btn');
const reset_btn = document.getElementById('reset-btn');
const row_count_label = document.getElementById('row-count-label');

const table_search_btn = document.getElementById('table-search-btn');
const table_search_field = document.getElementById('table-search-field');

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

const STATS_INFO = {
    'HP': 0,
    'DEF': 1,
    'STR': 2,
    'INT': 3,
    'DEX': 4,
};

var csv;  // original csv data

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
    }

    getShowString(idx) {
        return `${this.data[idx].name}:${this.data[idx].value}`;
    }
};

function sortTable(data) {
    data.sort(function (a, b) {
        if (a.name != b.name) {
            return a.name.localeCompare(b.name);
        }
        if (a.rarity != b.rarity) {
            return a.rarity.localeCompare(b.rarity);
        }
        if (a.rank != b.rank) {
            return parseInt(b.rank) - parseInt(a.rank);
        }
        if (a.level != b.level) {
            return parseInt(b.level) - parseInt(a.level);
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
    console.log(data);

    let cur_row_color = 'var(--bs-table-color)';
    let cur_row_bg = 'var(--bs-table-bg)';
    let next_row_color = 'var(--bs-table-striped-color)';
    let next_row_bg = 'var(--bs-table-striped-bg)';

    const createColumn = function (text) {
        let col = document.createElement('span');
        col.innerHTML = text;
        return col;
    };

    const insertColumn = function (row, column) {
        let cell = row.insertCell();
        cell.style.backgroundColor = cur_row_bg;
        cell.style.color = cur_row_color;
        cell.appendChild(column);
    }

    for (let i = 0; i < data.length; ++i) {
        if (i > 0 && data[i].name != data[i - 1].name) {
            [cur_row_color, cur_row_bg, next_row_color, next_row_bg] =
                [next_row_color, next_row_bg, cur_row_color, cur_row_bg];
        }

        const row = table_body.insertRow();

        // id
        insertColumn(row, createColumn(data[i].id));

        // name
        insertColumn(row, createColumn(data[i].name));

        // rarity
        let rarity_col = createColumn(data[i].rarity);
        rarity_col.style.color = `var(--${data[i].rarity.toLowerCase()}-color)`;
        insertColumn(row, rarity_col);

        // rank
        let rank_col = createColumn(data[i].rank);
        rank_col.style.color = `var(--rank-${data[i].rank}-color)`;
        insertColumn(row, rank_col);

        // level
        insertColumn(row, createColumn(data[i].level));

        const stats = data[i].stats;
        let container = document.createElement('div');
        for (let j = 0; j < stats.data.length; ++j) {
            let stats_col = createColumn(stats.getShowString(j));
            stats_col.style.color =
                select_stats_checkbox[STATS_INFO[stats.data[j].name]].checked ?
                    `var(--${stats.data[j].name.toLowerCase()}-color)` :
                    'var(--hide-color)';
            stats_col.style.marginLeft = '5px';
            stats_col.style.marginRight = '5px';
            stats_col.style.display = 'inline-block';
            stats_col.style.width = '70px';
            stats_col.style.textAlign = 'right';
            container.appendChild(stats_col);
        }
        insertColumn(row, container);
    }

    // row count
    row_count_label.innerHTML = `Row count: ${data.length}`;
}

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
            csv.push(element);
        }

        // add Stats attribute
        for (let i = 0; i < csv.length; ++i) {
            csv[i].stats = new Stats(csv[i].stats);
        }

        window.csv = csv;

        // draw table
        search_btn.click();
    };
    reader.readAsText(file);
});

search_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }

    const target_value = parseInt(stats_count.value);
    const target_min = parseInt(stats_min.value);
    const target_max = parseInt(stats_max.value);

    var table = csv.filter(function (row) {
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
        }

        // rarity
        const item_rarity = row.rarity.charCodeAt(0) - 'A'.charCodeAt(0);
        if (!select_rarity_checkbox[item_rarity].checked) return false;

        // rank
        const item_rank = parseInt(row.rank);
        if (!select_rank_checkbox[item_rank - 1].checked) return false;

        // name
        const target_pattern = table_search_field.value;
        if (target_pattern.length > 0 && row.name.indexOf(target_pattern) == -1) return false;

        return true;
    });

    showTable(table);
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

    table_search_field.value = '';  // clear

    search_btn.click();
});

table_search_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }
    search_btn.click();
});
