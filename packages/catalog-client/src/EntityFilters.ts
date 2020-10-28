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

import { EntitiesRequestOption } from './types';

export class EntityFilters implements EntitiesRequestOption {
  static fromFieldValues(
    fieldValues: Record<string, string>,
  ): EntitiesRequestOption {
    const result = new EntityFilters();
    for (const [key, value] of Object.entries(fieldValues)) {
      result.matchField(key, value);
    }
    return result;
  }

  private readonly fieldValues: Record<string, string[]> = {};

  matchField(key: string, value: string) {
    const values = this.fieldValues[key] ?? (this.fieldValues[key] = []);
    values.push(value);
  }

  apply(to: URLSearchParams): void {
    const parts: string[] = [];
    for (const [key, values] of Object.entries(this.fieldValues)) {
      for (const value of values) {
        parts.push(`${key}=${value}`);
      }
    }

    if (parts.length) {
      to.append('filter', parts.join(','));
    }
  }
}
