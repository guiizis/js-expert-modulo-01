import FluentSQLBuilder from "@guiziis/fluentsql";
import database from './database/data.js'

const result = FluentSQLBuilder.for(database)
               .where({registered: /^(2020|2019)/})
               .select(['category'])
               .limit(3)
               .countBy('category')
               .build()

console.log(result)