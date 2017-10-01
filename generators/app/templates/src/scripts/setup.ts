import { db } from '@arangodb';
<% if (collections.length) { %>
import { documentCollections } from '../constants';
<% } %>

<% if (collections.length) { %>
for (let collectionName of documentCollections) {
    collectionName = module.context.collectionName(collectionName);
    if (!db._collection(collectionName)) {
        db._createDocumentCollection(collectionName);
    } else if (module.context.isProduction) {
        console.debug(`collection ${collectionName} already exists. Leaving it untouched.`)
    }
}
<% } %>

/*for (const localName of Edges.all()) {
    if (!db._collection(localName)) {
        db._createEdgeCollection(localName);
    } else if (module.context.isProduction) {
        console.debug(`collection ${localName} already exists. Leaving it untouched.`)
    }
}*/
