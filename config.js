
module.exports = {
    title: "RethinkDB JS Driver Documentation",
    primaryColorTheme: "blue-grey",
    accentColorTheme: "light-blue",
    headings: [
        {
            "id": "accessing_reql",
            "displayname": "Accessing ReQL"
        }
    ],
    sections: [
        {
            "path": "r",
            "displayname": "r",
            "name": "r",
            "type": "Namespace",
            "heading": "accessing_reql",
            "markdown": require('./Markdown/Accessing ReQL/r.md')
        },
        {
            "path": "r.connect",
            "displayname": "r.connect()",
            "name": "r.connect()",
            "type": "Method",
            "heading": "accessing_reql",
            "markdown": require('./Markdown/Accessing ReQL/r.connect.md')
        },
        {
            "path": "conn.close",
            "displayname": "conn.close()",
            "name": "conn.close()",
            "type": "Method",
            "heading": "accessing_reql",
            "markdown": require('./Markdown/Accessing ReQL/conn.close.md')
        },
        {
            "path": "conn.reconnect",
            "displayname": "conn.reconnect()",
            "name": "conn.reconnect()",
            "type": "Method",
            "heading": "accessing_reql",
            "markdown": require('./Markdown/Accessing ReQL/conn.reconnect.md')
        },
        {
            "path": "conn.use",
            "displayname": "conn.use()",
            "name": "conn.use()",
            "type": "Method",
            "heading": "accessing_reql",
            "markdown": require('./Markdown/Accessing ReQL/conn.use.md')
        },
        {
            "path": "query.run",
            "displayname": "query.run()",
            "name": "query.run()",
            "type": "Method",
            "heading": "accessing_reql",
            "markdown": require('./Markdown/Accessing ReQL/query.run.md')
        }
    ]
};