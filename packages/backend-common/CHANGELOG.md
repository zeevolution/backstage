# @backstage/backend-common

## 0.2.0
### Minor Changes

- 5249594c5: Add service discovery interface and implement for single host deployments
  
  Fixes #1847, #2596
  
  Went with an interface similar to the frontend DiscoveryApi, since it's dead simple but still provides a lot of flexibility in the implementation.
  
  Also ended up with two different methods, one for internal endpoint discovery and one for external. The two use-cases are explained a bit more in the docs, but basically it's service-to-service vs callback URLs.
  
  This did get me thinking about uniqueness and that we're heading towards a global namespace for backend plugin IDs. That's probably fine, but if we're happy with that we should leverage it a bit more to simplify the backend setup. For example we'd have each plugin provide its own ID and not manually mount on paths in the backend.
  
  Draft until we're happy with the implementation, then I can add more docs and changelog entry. Also didn't go on a thorough hunt for places where discovery can be used, but I don't think there are many since it's been pretty awkward to do service-to-service communication.
- 56e4eb589: Make CSP configurable to fix app-backend served app not being able to fetch
  
  See discussion [here on discord](https://discordapp.com/channels/687207715902193673/687235481154617364/758721460163575850)
- e37c0a005: Use localhost to fall back to IPv4 if IPv6 isn't available
- f00ca3cb8: Auto-create plugin databases
  
  Relates to #1598.
  
  This creates databases for plugins before handing off control to plugins.
  
  The list of plugins currently need to be hard-coded depending on the installed plugins. A later PR will properly refactor the code to provide a factory pattern where plugins specify what they need, and Knex instances will be provided based on the input.
- 6579769df: Add the ability to import components from Bitbucket Server to the service catalog
- 8c2b76e45: **BREAKING CHANGE**
  
  The existing loading of additional config files like `app-config.development.yaml` using APP_ENV or NODE_ENV has been removed.
  Instead, the CLI and backend process now accept one or more `--config` flags to load config files.
  
  Without passing any flags, `app-config.yaml` and, if it exists, `app-config.local.yaml` will be loaded.
  If passing any `--config <path>` flags, only those files will be loaded, **NOT** the default `app-config.yaml` one.
  
  The old behaviour of for example `APP_ENV=development` can be replicated using the following flags:
  
  ```bash
  --config ../../app-config.yaml --config ../../app-config.development.yaml
  ```
- 8afce088a: Use APP_ENV before NODE_ENV for determining what config to load
- 7bbeb049f: Change loadBackendConfig to return the config directly

### Patch Changes

- 440a17b39: Added new UrlReader interface for reading opaque data from URLs with different providers.
  
  This new URL reading system is intended as a replacement for the various integrations towards
  external systems in the catalog, scaffolder, and techdocs. It is configured via a new top-level
  config section called 'integrations'.
  
  Along with the UrlReader interface is a new UrlReaders class, which exposes static factory
  methods for instantiating readers that can read from many different integrations simultaneously.
- Updated dependencies [8c2b76e45]
- Updated dependencies [ce5512bc0]
  - @backstage/config-loader@0.2.0
  - @backstage/test-utils@0.1.1
