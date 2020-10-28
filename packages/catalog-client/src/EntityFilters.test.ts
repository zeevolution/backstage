/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { EntityFilters } from './EntityFilters';

describe('EntityFilters', () => {
  describe('fromFieldValues', () => {
    it('does nothing if no filters were given', () => {
      const filters = EntityFilters.fromFieldValues({});
      const result = new URLSearchParams();
      filters.apply(result);
      expect(result.toString()).toBe('');
    });

    it('adds and encodes all given fields', () => {
      const filters = EntityFilters.fromFieldValues({ a: '1', ö: 'å' });
      const result = new URLSearchParams();
      filters.apply(result);
      expect(result.toString()).toEqual('filter=a%3D1%2C%C3%B6%3D%C3%A5');
    });
  });

  describe('matchField', () => {
    it('does nothing if no filters were given', () => {
      const filters = new EntityFilters();
      const result = new URLSearchParams();
      filters.apply(result);
      expect(result.toString()).toBe('');
    });

    it('adds and encodes all given fields', () => {
      const filters = new EntityFilters();
      filters.matchField('foo', 'bar');
      filters.matchField('~', '&');
      const result = new URLSearchParams();
      filters.apply(result);
      expect(result.toString()).toEqual('filter=foo%3Dbar%2C%7E%3D%26');
    });
  });
});
