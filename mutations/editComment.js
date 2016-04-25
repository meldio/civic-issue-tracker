export async function editComment({ id, text, documentUrls, photoUrls }) {
  const { Comment } = this.model;
  const editedTimestamp = new Date(this.timestamp).toISOString();

  const comment = await Comment
    .node(id)
    .update({
      text,
      documentUrls,
      photoUrls,
      editedTimestamp
    });

  return { comment };
}
