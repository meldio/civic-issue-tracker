export async function like({ issueId }) {
  const { Issue } = this.model;
  const viewer = this.viewer;
  const timestamp = new Date(this.timestamp).toISOString();

  const issue = Issue.node(issueId);
  const likeEdge = await issue.likes.addEdge(viewer, { timestamp });

  return { likeEdge, issue };
}
