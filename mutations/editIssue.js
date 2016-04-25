export async function editIssue({
  id,
  headline,
  description,
  photoUrl,
}) {
  const { Issue } = this.model;

  const issue = await Issue.node(id).update({
    headline,
    description,
    photoUrl,
  });

  return { issue };
}
