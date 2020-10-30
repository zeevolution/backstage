# @backstage/plugin-catalog

## 0.2.0
### Minor Changes

- 28edd7d29: Create backend plugin through CLI
- 368fd8243: Created EntityNotFound component for catalog which displays the 404 page when entity is not found.
  
  Fixes #2266
- 6d97d2d6f: The InfoCard variant `'height100'` is deprecated. Use variant `'gridItem'` instead.
  
  When the InfoCard is displayed as a grid item within a grid, you may want items to have the same height for all items.
  Set to the `'gridItem'` variant to display the InfoCard with full height suitable for Grid:
  `<InfoCard variant="gridItem">...</InfoCard>`
  
  Changed the InfoCards in '@backstage/plugin-github-actions', '@backstage/plugin-jenkins', '@backstage/plugin-lighthouse'
  to pass an optional variant to the corresponding card of the plugin.
  
  As a result the overview content of the EntityPage shows cards with full height suitable for Grid.
- f0aa01bcc: Add client side paging for catalog table
- 8b9c8196f: Locations registered through the catalog client now default to the 'url' type. The type selection dropdown in the register-component form has been removed.
- 0b956f21b: The URL path for a catalog entity has changed,
  
  - from: `/catalog/:kind/:optionalNamespaceAndName`
  - to: `/catalog/:namespace/:kind/:name`
  
  Redirects are in place, so disruptions for users should not happen.

### Patch Changes

- 0aecfded0: handle the case where no entities are available to show
- 60d40892c: Remove "in default" in component name
- 97c2cb19b: update the EntityNotFound component
- Updated dependencies [28edd7d29]
- Updated dependencies [819a70229]
- Updated dependencies [3a4236570]
- Updated dependencies [ae5983387]
- Updated dependencies [0d4459c08]
- Updated dependencies [482b6313d]
- Updated dependencies [e0be86b6f]
- Updated dependencies [f70a52868]
- Updated dependencies [12b5fe940]
- Updated dependencies [8351ad79b]
- Updated dependencies [fb74f1db6]
- Updated dependencies [1c60f716e]
- Updated dependencies [144c66d50]
- Updated dependencies [a768a07fb]
- Updated dependencies [b79017fd3]
- Updated dependencies [6d97d2d6f]
- Updated dependencies [5adfc005e]
- Updated dependencies [93a3fa3ae]
- Updated dependencies [782f3b354]
- Updated dependencies [c5ef12926]
- Updated dependencies [2713f28f4]
- Updated dependencies [406015b0d]
- Updated dependencies [82759d3e4]
- Updated dependencies [ac8d5d5c7]
- Updated dependencies [fa56f4615]
- Updated dependencies [ebca83d48]
- Updated dependencies [aca79334f]
- Updated dependencies [c0d5242a0]
- Updated dependencies [b3d57961c]
- Updated dependencies [1c8c43756]
- Updated dependencies [3beb5c9fc]
- Updated dependencies [754e31db5]
- Updated dependencies [57b54c8ed]
- Updated dependencies [1611c6dbc]
  - @backstage/plugin-scaffolder@0.2.0
  - @backstage/plugin-techdocs@0.2.0
  - @backstage/core@0.2.0
  - @backstage/catalog-model@0.2.0
  - @backstage/theme@0.2.0
