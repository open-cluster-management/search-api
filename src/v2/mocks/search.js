/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// eslint-disable-next-line max-classes-per-file
import _ from 'lodash';
import RedisGraphConnector from '../connectors/redisGraph';

const resourceTemplate = {
  cluster: (id) => ({
    kind: 'cluster',
    name: `mock-cluster${id > 0 ? `-${id}` : ''}`,
    namespace: 'mock-mcm-cluster',
    status: 'ok',
    endpoint: '',
    nodes: 10,
    cpu: '30%',
    memory: '20%',
    storage: '10%',
  }),
  node: (id = 0) => ({
    kind: 'node',
    name: `mock-1.1.1.${id}`,
    cpus: 10,
    role: 'master',
  }),
  pod: (id) => ({
    kind: 'pod',
    name: `mock-cluster${id > 0 ? `-${id}` : ''}`,
    namespace: 'kube-system',
    restarts: 20,
    creationTimestamp: '2018-09-27 16:52:20 -0400 EDT',
    status: 'Running',
    hostIP: '179.160.35.59',
    podIP: '179.160.35.59',
  }),
};

// export function repeat(map, count) {
//   return new Array(count).fill(0).map(map);
// }

export const mockSearchResult = {
  /**
   * Mock search results.
   *
   * Pass the kind and amount of objects to mock.
   * For example, to mock a search that returns 2 clusters and 5 pods:
   *    { cluster: 2, pod:5 }
   */
  mock: (args) => {
    const mockResult = [];

    // Get items
    Object.keys(args).forEach((kind) => {
      for (let i = 0; i < args[kind]; i += 1) {
        const mockItem = { ...resourceTemplate[kind](i) };
        mockResult.push(mockItem);
      }
    });

    return mockResult;
  },
};

const MOCK_QUERIES = {
  /*
   * Application queries mocks.
   */
  runApplicationsQuery: [
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'app.created': '2020-01-23T13:56:32Z',
      'app.dashboard':
        'localhost/grafana/dashboard/db/app01-dashboard-via-federated-prometheus?namespace=sample',
      'app.label': 'label1=value1; label2=value2',
      'app.name': 'app01',
      'app.namespace': 'sample',
      'app.selfLink':
        '/apis/app.k8s.io/v1beta1/namespaces/sample/applications/app01',
    },
    {
      'app._uid': 'local-cluster/app-02-uid',
      'app.created': '2020-01-23T13:56:32Z',
      'app.dashboard':
        'localhost/grafana/dashboard/db/app02-dashboard-via-federated-prometheus?namespace=test',
      'app.name': 'app02',
      'app.namespace': 'test',
      'app.selfLink':
        '/apis/app.k8s.io/v1beta1/namespaces/test/applications/app02',
    },
  ],

  runAppClustersQuery: [
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      count: 5,
    },
  ],

  runAppHubSubscriptionsQuery: [
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'sub._uid': 'local-cluster/bdced01f-3bd4-11ea-a488-00000a100f99',
      'sub.channel': 'dev1/dev1',
      'sub.localPlacement': 'True',
    },
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'sub._uid': 'local-cluster/b218636d-3d5e-11ea-8ed1-00000a100f99',
      'sub.status': 'Propagated',
      'sub.channel': 'default/mortgage-channel',
      'sub.timeWindow': 'blocked',
    },
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'sub._uid': 'local-cluster/66426f24-3bd3-11ea-a488-00000a100f99',
      'sub.status': 'Propagated',
      'sub.channel': 'dev1/dev1',
      'sub.timeWindow': 'active',
    },
  ],

  runAppHubChannelsQuery: [
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'sub._uid': 'local-cluster/bdced01f-3bd4-11ea-a488-00000a100f99',
      'sub._gitbranch': 'master',
      'sub._gitpath': 'helloworld',
      'sub._gitcommit': 'd67d8e10dcfa41dddcac14952e9872e1dfece06f',
      'ch._uid': 'local-cluster/233dfffd-f421-44ee-811b-7f3352b2d728',
      'ch.type': 'Git',
      'ch.pathname': 'https://github.com/fxiang1/app-samples.git',
    },
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'sub._uid': 'local-cluster/b218636d-3d5e-11ea-8ed1-00000a100f99',
      'ch._uid': 'local-cluster/6c8dcb97-5e6e-4606-9b55-ae3eb05fcfb5',
      'ch.type': 'Namespace',
      'ch.pathname': 'sample-ns',
    },
    {
      'app._uid': 'local-cluster/app-02-uid',
      'sub._uid': 'local-cluster/66426f24-3bd3-11ea-a488-00000a100f99',
      'ch._uid': 'local-cluster/233dfffd-f421-44ee-811b-7f3352b2d728',
      'ch.type': 'HelmRepo',
      'ch.pathname':
        'http://multiclusterhub-repo.open-cluster-management.svc.cluster.local:3000/charts',
    },
  ],

  runAppPodsCountQuery: [
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'pod.status': 'Running',
    },
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'pod.status': 'Running',
    },
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'pod.status': 'Failed',
    },
  ],

  runAppRemoteSubscriptionsQuery: [
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'sub._uid': 'local-cluster/b218636d-3d5e-11ea-8ed1-00000a100f99',
      'sub.status': 'Subscribed',
    },
  ],

  /*
   * Subscription queries mocks.
   */
  runSubscriptionsQuery: [
    {
      'sub._uid': 'local-cluster/sub-01-uid',
      'sub.name': 'sub01',
      'sub.namespace': 'applications',
      'sub.created': '2020-08-20T14:16:05Z',
      'sub.selfLink': '/apis/apps.open-cluster-management.io/v1/namespaces/applications/sub01',
      'sub.status': 'Propagated',
      'sub.channel': 'git-ch-ns/git-ch',
      'sub.timeWindow': 'blocked',
      'sub.localPlacement': 'True',
    },
    {
      'sub._uid': 'local-cluster/sub-02-uid',
      'sub.name': 'sub02',
      'sub.namespace': 'test',
      'sub.created': '2020-08-20T14:17:05Z',
      'sub.selfLink': '/apis/apps.open-cluster-management.io/v1/namespaces/test/sub02',
      'sub.status': 'PropagationFailed',
      'sub.channel': 'object-ch-ns/object-ch',
      'sub.localPlacement': 'False',
    },
  ],

  runSubClustersQuery: [
    {
      'sub._uid': 'local-cluster/sub-01-uid',
      count: 0,
    },
    {
      'sub._uid': 'local-cluster/sub-02-uid',
      count: 3,
    },
  ],

  runSubAppsQuery: [
    {
      'sub._uid': 'local-cluster/sub-01-uid',
      count: 1,
    },
    {
      'sub._uid': 'local-cluster/sub-02-uid',
      count: 2,
    },
  ],

  /*
   * Global Application queries mocks.
   */
  runGlobalAppChannelsQuery: [
    { 'ch._uid': 'local-cluster/mock-channel-1-uid' },
    { 'ch._uid': 'local-cluster/mock-channel-2-uid' },
  ],

  runGlobalAppClusterCountQuery: [
    { 'app._uid': 'local-cluster/mock-cluster-1-uid' },
    { 'app._uid': 'local-cluster/mock-cluster-2-uid' },
  ],

  runGlobalAppHubSubscriptionsQuery: [
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'sub._uid': 'local-cluster/bdced01f-3bd4-11ea-a488-00000a100f99',
      'sub.channel': 'dev1/dev1',
    },
    {
      'app._uid': 'local-cluster/29a848d6-3de8-11ea-9f0f-00000a100f99',
      'sub._uid': 'local-cluster/b218636d-3d5e-11ea-8ed1-00000a100f99',
      'sub.status': 'Propagated',
      'sub.channel': 'default/mortgage-channel',
    },
  ],

  runGlobalAppRemoteSubscriptionsQuery: [
    {
      'sub._uid': 'cluster-1/mock-remote-subscription-2-uid',
      'sub.status': 'Subscribed',
    },
    {
      'sub._uid': 'cluster-2/mock-remote-subscription-2-uid',
      'sub.status': 'Propagated',
    },
  ],
};

export default class MockSearchConnector extends RedisGraphConnector {
  constructor(args) {
    super(args);

    this.g = {
      query: (queryString) => {
        throw new Error(`No mock data for query: ${queryString}`);
      },
    };

    // Set up query functions that use the actual query-building code in RedisGraphConnector
    // but return the result from static data in this file
    Object.entries(MOCK_QUERIES).forEach(([key, value]) => {
      this[key] = () => {
        /* eslint-disable class-methods-use-this */
        const query = new class extends MockSearchConnector {
          constructor() {
            super(args);
            this.g = {
              query: () => {
                const clonedValue = _.cloneDeep(value);
                const iterator = {
                  hasNext: () => clonedValue.length > 0,
                  next: () => {
                    const record = new Map();
                    Object.entries(clonedValue.shift()).forEach(([mapKey, mapValue]) => {
                      record.set(mapKey, mapValue);
                    });
                    return {
                      keys: () => Array.from(record.keys()),
                      get: (k) => record.get(k),
                    };
                  },
                };
                return iterator;
              },
            };
          }
        }();
        return RedisGraphConnector.prototype[key].call(query);
      };
    });
  }

  async isServiceAvailable() {
    return true;
  }

  // Search Query Mocks
  async runSearchQuery() {
    return mockSearchResult.mock({ cluster: 2, node: 3, pod: 5 });
  }

  async runSearchQueryCountOnly() {
    return 10;
  }

  async getAllProperties() {
    return ['kind', 'name', 'namespace', 'cpu', 'created'];
  }

  async getAllValues(property) {
    switch (property) {
      case 'kind':
        return ['cluster', 'application', 'deployable', 'compliance'];
      case 'namespace':
        return ['default', 'kube-system'];
      case 'cpu':
        return ['<', '>', '!='];
      case 'created':
        return ['hour', 'day', 'week', 'month', 'year'];
      default:
        return ['kind', 'name', 'namespace', 'cpu', 'created'];
    }
  }

  async findRelationships() {
    return [{
      kind: 'cluster',
      count: 1,
      items: [{
        _uid: '123', kind: 'cluster', name: 'mockCluster', namespace: 'mockCluster-ns',
      }],
    }];
  }

  async getRbacValues() {
    return { allowedResources: [], allowedNS: [] };
  }
}
