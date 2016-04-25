export async function closeIssue({ id }) {
  const { Issue } = this.model;
  const closedTimestamp = new Date(this.timestamp).toISOString();

  const status = 'CLOSED';
  const issue = await Issue.node(id).update({ status, closedTimestamp });

  return { issue };
}
