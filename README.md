# Cross-Site Data Transfer

An expiremental library for standardizing communication across iframes.

Sites include the `CSDT.js` script in their page, then use it as an API to send or recieve information from other pages that also implement the CSDT script.

Additionally, the sites can use [yjs](https://github.com/yjs/yjs) to synchronize data - allowing for easy to use, real-time coordination between the sites.

For an example of this library in action, check out [aframe-csdt-containers](https://github.com/open-hubs/aframe-csdt-containers).

## Security

This library allows for sites to essentially bypass cross-origin data restrictions, meaning security is a big issue. It is up to the implementation to avoid accepting data that could potentially be harmful - treat data received through CSDT as data inputted from the user.
