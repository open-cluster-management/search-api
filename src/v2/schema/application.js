/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */
// Copyright Contributors to the Open Cluster Management project
import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Application {
    _uid: String
    apiVersion: String
    created: String

    # Grafana dashboard for this application.
    dashboard: String

    # Labels from kubernetes resource in this format: ["label1=value1", "label2=value2]
    labels: [String]

    name: String
    namespace: String

    # Name of ManagedCluster where Application resource resides
    cluster: String

    # Number of application deployments on local and remote clusters.
    clusterCount: JSON

    # Hub channels associated with this application
    hubChannels: [JSON]

    # Hub subscriptions associated with this application.
    # Hub subscriptions are those contained by an application AND with _hubClusterResource=true
    hubSubscriptions: [Subscription]

    # ArgoCD ApplicationSet
    applicationSet: String

    # ArgoCD destination properties
    destinationName: String
    destinationServer: String
    destinationCluster: String
    destinationNamespace: String

    # ArgoCD source properties
    repoURL: String
    path: String
    chart: String
    targetRevision: String
  }

  type Subscription {
    _uid: String
    name: String
    namespace: String
    created: String
    channel: String
    appCount: Int
    clusterCount: JSON
    timeWindow: String
    localPlacement: Boolean
    status: String
  }

  type PlacementRule {
    _uid: String
    name: String
    namespace: String
    created: String
    clusterCount: JSON
    replicas: Int
  }

  type Channel {
    _uid: String
    name: String
    namespace: String
    created: String
    type: String
    pathname: String
    localPlacement: Boolean
    subscriptionCount: Int
    clusterCount: JSON
  }
`;

export const resolver = {
  Query: {
    applications: (parent, { name, namespace }, { appModel }) => appModel.resolveApplications({ name, namespace }),
    subscriptions: (parent, { name, namespace }, { appModel }) => appModel.resolveSubscriptions({ name, namespace }),
    placementRules: (parent, { name, namespace }, { appModel }) => appModel.resolvePlacementRules({ name, namespace }),
    channels: (parent, { name, namespace }, { appModel }) => appModel.resolveChannels({ name, namespace }),
  },
  Application: {
    _uid: (parent) => parent['app._uid'],
    apiVersion: (parent) => `${parent['app.apigroup']}/${parent['app.apiversion']}`,
    created: (parent) => parent['app.created'],
    dashboard: (parent) => parent['app.dashboard'],
    labels: (parent) => (parent['app.label'] ? parent['app.label'].split(';').map((l) => l.trim()) : []),
    name: (parent) => parent['app.name'],
    namespace: (parent) => parent['app.namespace'],
    cluster: (parent) => parent['app.cluster'],
    clusterCount: (parent, args, { appModel }) => appModel.resolveAppClustersCount(parent['app._uid']),
    hubChannels: (parent, args, { appModel }) => appModel.resolveAppHubChannels(parent['app._uid']),
    hubSubscriptions: (parent, args, { appModel }) => appModel.resolveAppHubSubscriptions(parent['app._uid']),
    applicationSet: (parent) => parent['app.applicationSet'],
    destinationName: (parent) => parent['app.destinationName'],
    destinationServer: (parent) => parent['app.destinationServer'],
    destinationCluster: (parent, args, { appModel }) => appModel.resolveAppDestinationCluster(parent),
    destinationNamespace: (parent) => parent['app.destinationNamespace'],
    repoURL: (parent) => parent['app.repoURL'],
    path: (parent) => parent['app.path'],
    chart: (parent) => parent['app.chart'],
    targetRevision: (parent) => parent['app.targetRevision'],

  },
  Subscription: {
    _uid: (parent) => parent['sub._uid'],
    name: (parent) => parent['sub.name'],
    namespace: (parent) => parent['sub.namespace'],
    created: (parent) => parent['sub.created'],
    timeWindow: (parent) => parent['sub.timeWindow'],
    localPlacement: (parent) => parent['sub.localPlacement'] === 'true',
    status: (parent) => parent['sub.status'],
    channel: (parent) => parent['sub.channel'],
    appCount: (parent, args, { appModel }) => appModel.resolveSubAppsCount(parent['sub._uid']),
    clusterCount: (parent, args, { appModel }) => appModel.resolveSubClustersCount(parent['sub._uid']),
  },
  PlacementRule: {
    _uid: (parent) => parent['pr._uid'],
    name: (parent) => parent['pr.name'],
    namespace: (parent) => parent['pr.namespace'],
    created: (parent) => parent['pr.created'],
    replicas: (parent) => parent['pr.replicas'],
    clusterCount: (parent, args, { appModel }) => appModel.resolvePRClustersCount(parent['pr._uid']),
  },
  Channel: {
    _uid: (parent) => parent['ch._uid'],
    name: (parent) => parent['ch.name'],
    namespace: (parent) => parent['ch.namespace'],
    created: (parent) => parent['ch.created'],
    type: (parent) => parent['ch.type'],
    pathname: (parent) => parent['ch.pathname'],
    localPlacement: (parent, args, { appModel }) => appModel.resolveChannelLocalPlacement(parent['ch._uid']),
    subscriptionCount: (parent, args, { appModel }) => appModel.resolveChannelSubsCount(parent['ch._uid']),
    clusterCount: (parent, args, { appModel }) => appModel.resolveChannelClustersCount(parent['ch._uid']),
  },
};
