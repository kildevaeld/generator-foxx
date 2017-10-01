
<% if (collections.length) { %>
export const documentCollections = [<%- collections.map(m => `'${m}'`).join(', ')  %>];
<% } %>