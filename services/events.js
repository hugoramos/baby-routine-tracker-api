const db = require('./db');
const helper = require('../utils/helper');
const config = require('../utils/config');

async function getById(id) {
    const data = await db.query(
        `SELECT * FROM bet.events WHERE ID = ?`,
        [id]
    );

    return {
        data
    }
}

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM bet.events ORDER BY 1 DESC LIMIT ?,?`,
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(event) {

    var now = new Date(new Date() - 3600 * 1000 * 3).toISOString();

    const result = await db.query(
        `INSERT INTO bet.events  (type, date, details) VALUES (?,?,?)`,
        [
            event.type,
            now,
            (event.details != undefined ? event.details : null)
        ]
    );

    let message = 'Error creating event ';

    if (result.affectedRows) {
        message = 'Event created successfully';
    }

    return { message };
}

async function update(id, event) {

    const rows = await db.query(
        `SELECT * FROM bet.events ORDER BY 1 DESC LIMIT ?,?`,
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);

    let message = data;
    // const result = await db.query(
    //     `UPDATE bet.events 
    //   SET type=?, date=?, details=?
    //   WHERE id=?`,
    //     [
    //         event.type, event.date,
    //         (event.details != undefined ? event.details : null), id
    //     ]
    // );

    // let message = 'Error updating event';

    // if (result.affectedRows) {
    //     message = 'event updated successfully';
    // }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM bet.events WHERE id=?`,
        [id]
    );

    let message = 'Error deleting event';

    if (result.affectedRows) {
        message = 'Event deleted successfully';
    }

    return { message };
}


module.exports = {
    getMultiple,
    create,
    update,
    remove
}