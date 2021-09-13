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
        `SELECT * FROM bet.events WHERE date(Date) >= DATE(NOW() - INTERVAL 1 DAY) ORDER BY Date DESC LIMIT ?,?`,
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getByDate(date) {
    // var start = new Date(date).setHours(21);
    // start = start.toISOString();
    // var start = new Date('2021-09-01 21:00:00');
    // start.setUTCHours(0, 0, 0, 0);

    // var end = (new Date(date).setHours(-3)).toISOString();
    // var end = new Date('2021-09-02 21:00:00');
    // end.setUTCHours(23, 59, 59, 999);

    // var datse = '2021-09-02';

    const rows = await db.query(
        // `SELECT * FROM bet.events WHERE date BETWEEN DATE_ADD(DATE_ADD(?,interval -1 day),interval 21 hour) AND DATE_ADD(?,interval 21 hour) ORDER BY 1 DESC`,
        `SELECT * FROM bet.events WHERE date BETWEEN ? AND DATE_ADD(?,interval 24 hour) ORDER BY 1 DESC`,
        [date, date]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { date };

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
    getByDate,
    create,
    update,
    remove
}