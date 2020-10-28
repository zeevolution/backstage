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

export class EntityFields implements EntitiesRequestOption {
  static from(...fields: string[]): EntitiesRequestOption {
    const result = new EntityFields();
    for (const field of fields) {
      result.add(field);
    }
    return result;
  }

  private readonly fields: Set<string> = new Set();

  add(field: string) {
    this.fields.add(field);
  }

  apply(to: URLSearchParams): void {
    if (!this.fields.size) {
      return;
    }

    to.append('fields', Array.from(this.fields).join(','));
  }
}
