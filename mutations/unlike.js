export async function unlike({ issueId }) {
  const { Issue } = this.model;
  const viewer = this.viewer;

  const issue = Issue.node(issueId);
  const deletedLikeUserId = await issue.likes.edge(viewer.id).delete();

  return { deletedLikeUserId, issue };
}
