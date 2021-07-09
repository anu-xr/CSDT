# Cross-Site Data Transfer

An expiremental library for standardizing communication across iframes.

## About

- Sites create a `ConnectionManager` object, then use it as an API to send or recieve information from other pages that also implement it.

- [yjs](https://github.com/yjs/yjs#readme) can be used to synchronize data - allowing for easy to use, real-time coordination between the sites.

For an example of this library in action, check out [aframe-csdt-containers](https://github.com/anu-xr/aframe-csdt-containers).

## Security

This library allows for sites to essentially bypass cross-origin data restrictions, meaning security is a big issue. It is up to the implementation to sanitize data recieved from other sites.
