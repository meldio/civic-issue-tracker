export async function addIssue({
  category,
  headline,
  description,
  location,
  photoUrl,
}) {
  const { Issue } = this.model;
  const viewer = this.viewer;
  const timestamp = new Date(this.timestamp).toISOString();

  const status = 'OPEN';
  const issue = await Issue.addNode({
    timestamp,
    status,
    category,
    headline,
    description,
    location,
    photoUrl,
  });
  const issueEdge = await viewer.issues.addEdge(issue);

  // TODO:
  // Once Meldio supports geolocation queries and mutations, tag the city
  // as follows:
  // const { City } = this.model;
  // const cities =
  //   await City.filter({ boundary: { contains: location } }).list();
  // await issue.city.addEdge(cities[0]);

  return { issueEdge, viewer };
}
