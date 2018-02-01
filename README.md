## Reformation

This is my new CMS. This may become a Lerna project so the title might change.

Nothing in here is stable. No abstraction currently exists, this IS the codebase for High for This - that will hopefully change soon.

### Database

You need a Mongo database named: `highforthis`

To import data:

```
sh ./src/server/graphql/database/restore
```

If you are ever missing a Settings record, in Mongo (replace `_id` with what you are missing):

```
db.settings.insertOne({ _id: "dashboard" })
```

### Startup

GraphQL: `yarn graphql-dev`  
Express: `yarn dev`

### Cron

Every 15 minutes, my YouTube playlists are imported / checked for orphans/deltas.
