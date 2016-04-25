export async function deleteComment({ id }) {
  const { Comment, Issue } = this.model;

  const issueIds = await Comment.node(id).issue.nodeIds();
  const issue = Issue.node(issueIds[0]);

  const deletedCommentId = await Comment.node(id).delete();

  return { deletedCommentId, issue };
}
