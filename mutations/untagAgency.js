export async function untagAgency({ issueId, agencyId }) {
  const { Issue } = this.model;

  const issue = Issue.node(issueId);
  const untaggedAgencyId = await issue.agencies.edge(agencyId).delete();

  return { untaggedAgencyId, issue };
}
