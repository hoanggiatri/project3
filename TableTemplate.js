'use strict';
class TableTemplate {
  static fillIn(tableId, dictionary, columnName) {
    const table = document.getElementById(tableId);
    const rows = table.rows;
    const headerRow = rows[0];

    for (let i = 0; i < headerRow.cells.length; i++) {
      const headerCell = headerRow.cells[i];
      headerCell.innerHTML = TableTemplate.replaceTemplateStrings(headerCell.innerHTML, dictionary);
    }

    if (columnName) {
      const columnIndex = TableTemplate.getColumnIndex(headerRow, columnName);

      if (columnIndex !== -1) {
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const cell = row.cells[columnIndex];
          cell.innerHTML = TableTemplate.replaceTemplateStrings(cell.innerHTML, dictionary);
        }
      }
    } else {
      // Process the entire table
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];

        for (let j = 0; j < row.cells.length; j++) {
          const cell = row.cells[j];
          cell.innerHTML = TableTemplate.replaceTemplateStrings(cell.innerHTML, dictionary);
        }
      }
    }

    table.style.visibility = 'visible';
  }

  static replaceTemplateStrings(str, dictionary) {
    return str.replace(/{{(.*?)}}/g, (match, property) => dictionary[property] || '');
  }

  static getColumnIndex(headerRow, columnName) {
    for (let i = 0; i < headerRow.cells.length; i++) {
      if (headerRow.cells[i].textContent === columnName) {
        return i;
      }
    }
    return -1;
  }
}