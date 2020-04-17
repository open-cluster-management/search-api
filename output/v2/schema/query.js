"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

const typeDef = exports.typeDef = `
# Search API - Queries
type Query {
  # Special query to search for applications and their related resources efficiently.
  # Optionally, pass name and namespace to filter the results.
  applications(name:String namespace: String): [Application]

  # Aggregated data from all applications.
  globalAppData: GlobalAppData

  # Search for resources.
  search(input: [SearchInput]): [SearchResult]

  # Get all values for the given property.
  # If a query is passed, then results will be filtered to only those matching the query.
  searchComplete(property: String!, query: SearchInput, limit: Int): [String]

  # Get all Properties available for search.
  searchSchema: JSON

  # Get saved search queries for the current user.
  savedSearches: [userSearch]
}

# Search API - Mutations
type Mutation {
  # Delete search query for the current user.
  deleteSearch(resource: JSON): JSON

  # Save a search query for the current user.
  saveSearch(resource: JSON): JSON
}
`;

const resolver = exports.resolver = {};
//# sourceMappingURL=query.js.map