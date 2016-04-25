export async function addComment({issueId, text, documentUrls, photoUrls}) {
  const { Comment, Issue } = this.model;
  const viewer = this.viewer;
  const timestamp = new Date(this.timestamp).toISOString();

  const issue = Issue.node(issueId);
  const comment =
    await Comment.addNode({ text, documentUrls, photoUrls, timestamp });

  await viewer.comments.addEdge(comment);
  const commentEdge = await issue.comments.addEdge(comment);

  return { commentEdge, issue };
}
