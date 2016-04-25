
export function permissions() {
  return {
    // logged in users can see all other user profiles, issues, cities,
    // agencies and comments
    async User() {
      if (this.viewer) { return this.model.User.filter({ }); }
    },

    async Issue() {
      if (this.viewer) { return this.model.Issue.filter({ }); }
    },

    async City() {
      if (this.viewer) { return this.model.City.filter({ }); }
    },

    async Agency() {
      if (this.viewer) { return this.model.Agency.filter({ }); }
    },

    async Comment() {
      if (this.viewer) { return this.model.Comment.filter({ }); }
    },


    // mutation permissions return true if viewer is allowed to execute mutation
    addIssue: userIsLoggedIn,
    editIssue: userOwnsIssue,
    closeIssue: userOwnsIssue,
    addComment: userIsLoggedIn,
    editComment: userMadeComment,
    deleteComment: userMadeComment,
    like: userIsLoggedIn,
    unlike: userLiked,
    tagAgency: userIsLoggedIn,
    untagAgency: userTagged,
  };
}

async function userIsLoggedIn() {
  const viewer = this.viewer;
  if (viewer) {
    return true;
  }
}

async function userOwnsIssue({ id }) {
  const viewer = this.viewer;
  if (viewer) {
    return viewer.issues.edge(id).exists();
  }
}

async function userMadeComment({ id }) {
  const viewer = this.viewer;
  if (viewer) {
    return viewer.comments.edge(id).exists();
  }
}

async function userLiked({ issueId }) {
  const viewer = this.viewer;
  if (viewer) {
    return viewer.likes.edge(issueId).exists();
  }
}

async function userTagged({ issueId, agencyId }) {
  const { Issue } = this.model;
  const viewer = this.viewer;
  if (viewer) {
    const edge = await Issue.node(issueId).agencies.edge(agencyId).get();
    return edge.user === viewer.id;
  }
}
