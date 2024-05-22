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

const STATS_INFO = {
    'HP': 0,
    'DEF': 1,
    'STR': 2,
    'INT': 3,
    'DEX': 4,
};

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
    // console.log(data);

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
                select_count_label.innerHTML = `Select count: ${select_index.size}`;
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
                table_body.removeChild(row);
                hide_count_label.innerText = `Hide count: ${hide_index.size}`;
                row_count_label.innerText = `Row count: ${data.length - hide_index.size}`;
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
    row_count_label.innerHTML = `Row count: ${data.length}`;
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
        const target_pattern = table_search_field.value;
        if (target_pattern.length > 0 && row.name.indexOf(target_pattern) == -1) return false;

        // hide
        if (hide_index.has(row.index)) return false;

        return true;
    });

    showTable(table);
}

function showToast(message) {
    message_text.innerText = message;
    const toast = new bootstrap.Toast(message_toast);
    toast.show();
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
            element.index = i - 1;
            csv.push(element);
        }

        // add Stats attribute
        for (let i = 0; i < csv.length; ++i) {
            csv[i].stats = new Stats(csv[i].stats);
        }

        window.csv = csv;

        // draw table
        applyFilter();
    };
    reader.readAsText(file);
});

search_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }

    // clear selected
    select_index.clear();
    hide_count_label.innerText = `Hide count: 0`;

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

    table_search_field.value = '';  // clear
    select_index.clear();  // clear
    hide_index.clear();

    hide_count_label.innerText = `Hide count: 0`;

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
    hide_count_label.innerText = 'Hide count: 0';
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
    select_count_label.innerHTML = `Select count: ${table.length}`;
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
    select_count_label.innerHTML = `Select count: 0`;
});

table_sell_select_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }

    if (select_index.size == 0) {
        showToast('You need to select at least 1 item');
        return;
    }

    const selected_ids = Array.from(select_index).map((idx) => csv[idx].id)
    command_text.innerText = `$sell equipment ${selected_ids.join(',')}`;

    const modal = new bootstrap.Modal(command_modal);
    modal.show();
});

table_fuse_select_btn.addEventListener('click', function () {
    if (csv == undefined) {
        return;
    }

    if (select_index.size != 2) {
        if (select_index.size > 2) {
            showToast('You can only select 2 items');
        } else {
            showToast('You need to select 2 items');
        }
        return;
    }

    const select_index_arr = Array.from(select_index);
    const select_items = select_index_arr.map((idx) => csv[idx]);

    if ((select_items[0].name != select_items[1].name) ||
        (select_items[0].rarity != select_items[1].rarity) ||
        (select_items[0].rank != select_items[1].rank) ||
        (select_items[0].rank == '5')) {
        showToast('Selected items can not be fused');
        return;
    }

    const selected_ids = select_index_arr.map((idx) => csv[idx].id)
    command_text.innerText = `$fuse item ${selected_ids.join(' ')}`;

    const modal = new bootstrap.Modal(command_modal);
    modal.show();
});

command_copy_btn.addEventListener('click', function () {
    navigator.clipboard.writeText(command_text.value).then(function () {
        if (command_auto_hide_checkbox.checked) {
            const select_index_arr = Array.from(select_index);
            for (let i = 0; i < select_index_arr.length; ++i) {
                const hide_btn = document.getElementById(`item-${select_index_arr[i]}-hide-btn`);
                hide_btn.click();
            }
        }
        command_close_btn.click();
    }, function (err) {
        console.log(err);
        showToast('Copy failed');
    });
});
