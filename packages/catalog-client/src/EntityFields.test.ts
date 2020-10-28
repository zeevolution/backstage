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

import { EntityFields } from './EntityFields';

describe('EntityFields', () => {
  describe('from', () => {
    it('does nothing if no fields were given', () => {
      const filters = EntityFields.from();
      const result = new URLSearchParams();
      filters.apply(result);
      expect(result.toString()).toBe('');
    });

    it('adds and encodes all given fields', () => {
      const filters = EntityFields.from('a.b', 'å.ö');
      const result = new URLSearchParams();
      filters.apply(result);
      expect(result.toString()).toEqual('fields=a.b%2C%C3%A5.%C3%B6');
    });
  });

  describe('add', () => {
    it('does nothing if no fields were given', () => {
      const filters = new EntityFields();
      const result = new URLSearchParams();
      filters.apply(result);
      expect(result.toString()).toBe('');
    });

    it('adds and encodes all given fields', () => {
      const filters = new EntityFields();
      filters.add('a.b');
      filters.add('ö');
      const result = new URLSearchParams();
      filters.apply(result);
      expect(result.toString()).toEqual('fields=a.b%2C%C3%B6');
    });
  });
});
