# Cross-Site Data Transfer

An expiremental library for allowing sites to communicate across iframes.

Sites include the CSDT.js script in their page, then use it as an API to send or recieve information from other pages that also implement the CSDT script.

For a hypothetical example, a website might include an iframe to another site. CSDT could be used to transfer the identity of the user from the parent site to the child site, removing the need for them to login again.

Additionally, the sites can set up a [CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) with each other using [yjs](https://github.com/yjs/yjs) to synchronize data - allowing for easy to use, real-time coordination between the sites.
