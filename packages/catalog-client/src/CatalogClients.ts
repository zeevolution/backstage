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

import { Entity, EntityName } from '@backstage/catalog-model';
import {
  CatalogClient,
  EntitiesRequestOption,
  EntitiesResponse,
} from './types';
import fetch from 'cross-fetch';
import { Config } from '@backstage/config';
import { EntityFilters } from './EntityFilters';

/**
 * A client to communicate with the catalog.
 */
export class CatalogClients implements CatalogClient {
  /**
   * Construct a catalog client given the app config.
   *
   * @param config The root of the app config
   */
  static fromConfig(config: Config): CatalogClient {
    const backendBaseUrl = config.getString('backend.baseUrl');
    const baseUrl = `${backendBaseUrl}/catalog`;
    return new CatalogClients(baseUrl);
  }

  constructor(private readonly baseUrl: string) {}

  /**
   * Fetch entities that match the given set of options.
   *
   * @param options The options that apply to the fetch operation
   */
  async entities(
    ...options: EntitiesRequestOption[]
  ): Promise<EntitiesResponse> {
    const query = new URLSearchParams();
    for (const option of options) {
      option.apply(query);
    }

    const entities = (await this.get('/entities', query)) as Entity[];

    return {
      data: entities,
    };
  }

  /**
   * Fetch a single entity matching a given name triplet.
   *
   * @param name The kind-namespace-name triplet of the entity (case
   *             insensitive)
   * @returns An entity, or undefined if there was no entity that matches the
   *          given name
   */
  async entityByName(name: EntityName): Promise<Entity | undefined> {
    const matcher = EntityFilters.fromFieldValues({
      kind: name.kind,
      'metadata.namespace': name.namespace,
      'metadata.name': name.name,
    });

    const query = new URLSearchParams();
    matcher.apply(query);

    const entities = (await this.get('/entities', query)) as Entity[];

    if (!entities.length) {
      return undefined;
    }

    return entities[0];
  }

  // Perform a single GET
  private async get(path: string, query: URLSearchParams): Promise<unknown> {
    const queryString = query.toString();
    const url = `${this.baseUrl}${path}${queryString ? `?${queryString}` : ''}`;

    let response: Response;
    try {
      response = await fetch(url);
    } catch (e) {
      throw new Error(`Unable to read ${url}, ${e}`);
    }

    if (!response.ok) {
      throw new Error(
        `${url} could not be read, ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  }
}
