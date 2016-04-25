export async function tagAgency({ issueId, agencyId }) {
  const { Issue } = this.model;
  const viewer = this.viewer;
  const timestamp = new Date(this.timestamp).toISOString();

  const issue = Issue.node(issueId);
  const edgeProps = { timestamp, user: viewer.id };
  const agencyEdge = await issue.agencies.addEdge(agencyId, edgeProps);

  return { agencyEdge, issue };
}
