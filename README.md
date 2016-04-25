# Meldio Civic Issue Tracker Example

This example illustrates how easy and fast it is to build a backend for a
civic issue tracker app using Meldio.

Meldio is an open source GraphQL backend for building delightful mobile and web
apps. See [our start building guide](https://www.meldio.com/start-building) for
detailed instructions on getting started with Meldio.

Need help?
  * [Join our Slack channel](https://meldio-slack.herokuapp.com)
  * [Ask a question on Stack Overflow](https://stackoverflow.com/questions/ask?tags=meldio)

## Installation and Setup

First, you will need to [install Meldio following these instructions](https://www.meldio.com/start-building#requirements)

Then, clone this example from Github using the following command:

```bash
git clone https://github.com/meldio/civic-issue-tracker.git
```

Next, you will need to create new Facebook and Google OAuth applications and
obtain App ID and Secret from both Facebook and Google.

To initialize Meldio, run the following command and follow the prompts.
Simply accept defaults and enter Facebook and Google OAuth App ID and Secret
when prompted for those.

```bash
cd civic-issue-tracker
meldio init
```

## Running the app
Start meldio from the `civic-issue-tracker` directory with:
```bash
meldio run
```

You can now access Meldio Query IDE at [http://localhost:9000/graphql](http://localhost:9000/graphql).

## Description

The app allows users to see a list of issues reported in their city or town,
promote issues (by liking them) and comment on the issues they care about.  In
addition, users can report new issues and close resolved issues.

## Mutations

The following mutations are provided:
* [addIssue](https://github.com/meldio/civic-issue-tracker/blob/master/mutations/addIssue.js) -
  adds a new issue and connects it to user's profile (and city once geolocation
  features are built into Meldio).  Returns `issueEdge` and `viewer` to allow
  the app to retrieve issue and current user data following the mutation.

* [editIssue](https://github.com/meldio/civic-issue-tracker/blob/master/mutations/editIssue.js) -
  allows owner of the issue to change headline, description or add a photo
  related to the issue. Returns `issue` to allow the app to retrieve the updated
  information.

* [closeIssue](https://github.com/meldio/civic-issue-tracker/blob/master/mutations/closeIssue.js) -
  allows owner of the issue to close the issue once it has been successfully
  resolved by the authorities. Returns `issue` to allow the app to retrieve the
  updated information.

* [addComment](https://github.com/meldio/civic-issue-tracker/blob/master/mutations/addComment.js) -
  Adds a comment to the issue identified by `issueId` parameter. Returns
  `commentEdge` to allow the app to retrieve the added comment information and
  `issue` to potentially refresh the aggregates on the issue (e.g. number of
  comments).

* [editComment](https://github.com/meldio/civic-issue-tracker/blob/master/mutations/editComment.js) -
  allows the user who made the comment to edit the text of the comment or
  potentially add picture or document attachments. Returns `comment` to allow
  the app to retrieve the updated comment information.

* [deleteComment](https://github.com/meldio/civic-issue-tracker/blob/master/mutations/deleteComment.js) -
  allows the user who made the comment to delete their comment. Returns
  `deletedCommentId` to allow the app to remove the comment and `issue` to
  potentially refresh the aggregates on the issue (e.g. number of comments).

* [like](https://github.com/meldio/civic-issue-tracker/blob/master/mutations/like.js) -
  allows users to promote an issue by liking it. Returns `likeEdge` to allow
  the app to add the like into the list and `issue` to potentially refresh the
  aggregates on the issue (e.g. number of likes).

* [unlike](https://github.com/meldio/civic-issue-tracker/blob/master/mutations/unlike.js) -
  allows the user to unlike an issue they previously liked. Returns
  `deletedLikeUserId` to allow the app to remove user's like from the list and
  `issue` to potentially refresh the aggregates on the issue.

* [tagAgency](https://github.com/meldio/civic-issue-tracker/blob/master/mutations/tagAgency.js) -
  allows users to tag civic agency or service that is responsible for addressing
  the issue.  Returns `agencyEdge` to allow the app to add the like into the
  list and `issue` to potentially refresh the aggregates on the issue.

* [untagAgency](https://github.com/meldio/civic-issue-tracker/blob/master/mutations/untagAgency.js) -
  allows the user to untag an agency they previously tagged. Returns
  `untaggedAgencyId` to allow the app to remove the agency tag from the list and
  `issue` to potentially refresh the aggregates on the issue.

## Mutation Usage Examples

#### Report a new issue:
```graphql
mutation AddIssue {
  addIssue(input: {
    category: MISSING_MANHOLE_COVER
    headline: "On south east corner of 46th & 2nd"
    description: "Manhole cover is missing on the south east corner of 46th street and 2nd avenue, right by the Starbucks entrance."
    location: [40.7522576, -73.9703193]
    photoUrl: "https://...url to your cdn..."
    clientMutationId: "1"
  }) {
    issueEdge {
      node {
        id
        category
        headline
        description
        location
        photoUrl
        status
        timestamp
      }
    }
  }
}
```

Mutations returns:
```json
{
  "data": {
    "addIssue": {
      "issueEdge": {
        "node": {
          "id": "-KGABwWFqW6FAQ5YSbb2-ZJJL5",
          "category": "MISSING_MANHOLE_COVER",
          "headline": "On south east corner of 46th & 2nd",
          "description": "Manhole cover is missing on the south east corner of 46th street and 2nd avenue, right by the Starbucks entrance.",
          "location": [
            40.7522576,
            -73.9703193
          ],
          "photoUrl": "https://...url to your cdn...",
          "status": "OPEN",
          "timestamp": "2016-04-25T02:16:05.445Z"
        }
      }
    }
  }
}
```

#### Add a comment to the issue
```graphql
mutation AddComment {
  addComment(input: {
    issueId: "-KGABwWFqW6FAQ5YSbb2-ZJJL5",
    text: "Phew, almost fell in it, thanks!"
		photoUrls: ["https://...cdn url..."]
    clientMutationId: "2"
  }) {
    commentEdge {
      node {
        id
        text
        documentUrls
        photoUrls
        timestamp
        editedTimestamp
        user {
          edges {
            node {
              id
              firstName
              lastName
              profilePictureUrl
            }
          }
        }
      }
    }
    issue {
      comments {
        count
      }
    }
  }
}
```

Mutations returns:
```json
{
  "data": {
    "addComment": {
      "commentEdge": {
        "node": {
          "id": "-KGADWP-bVxMtWqtgvI4-TFDD5EK",
          "text": "Phew, almost fell in it, thanks!",
          "documentUrls": null,
          "photoUrls": [
            "https://...cdn url..."
          ],
          "timestamp": "2016-04-25T02:22:58.680Z",
          "editedTimestamp": null,
          "user": {
            "edges": [
              {
                "node": {
                  "id": "-KGABu6mnxLorkH4Y0yw-kJ5I",
                  "firstName": "N",
                  "lastName": "S",
                  "profilePictureUrl": "https://scontent.xx.fbcdn.net/..."
                }
              }
            ]
          }
        }
      },
      "issue": {
        "comments": {
          "count": 2
        }
      }
    }
  }
}
```

#### Like an issue:
```graphql
mutation Like {
  like(input: {
    issueId: "-KGABwWFqW6FAQ5YSbb2-ZJJL5",
    clientMutationId: "3"
  }) {
    likeEdge {
      node {
        id
        firstName
        lastName
      }
    }
    issue {
      likes {
        count
      }
    }
  }
}
```

Mutations returns:
```json
{
  "data": {
    "like": {
      "likeEdge": {
        "node": {
          "id": "-KGABu6mnxLorkH4Y0yw-kJ5I",
          "firstName": "N",
          "lastName": "S"
        }
      },
      "issue": {
        "likes": {
          "count": 1
        }
      }
    }
  }
}
```

#### Unlike an issue:
```graphql
mutation Unlike {
  unlike(input: {
    issueId: "-KGABwWFqW6FAQ5YSbb2-ZJJL5"
    clientMutationId: "4"
  }) {
    deletedLikeUserId,
    issue {
      likes {
        count
      }
    }
  }
}
```

Mutations returns:
```json
{
  "data": {
    "unlike": {
      "deletedLikeUserId": "-KGABu6mnxLorkH4Y0yw-kJ5I",
      "issue": {
        "likes": {
          "count": null
        }
      }
    }
  }
}
```

#### Delete a comment:
```graphql
mutation DeleteComment {
  deleteComment(input:{
    id: "-KGADWP-bVxMtWqtgvI4-TFDD5EK"
    clientMutationId:"5"
  }) {
    deletedCommentId
    issue {
      comments {
        count
      }
    }
  }
}
```

Mutations returns:
```json
{
  "data": {
    "deleteComment": {
      "deletedCommentId": "-KGADWP-bVxMtWqtgvI4-TFDD5EK",
      "issue": {
        "comments": {
          "count": 1
        }
      }
    }
  }
}
```

#### Tag an agency:
```graphql
mutation TagAgency{
  tagAgency(input: {
    issueId: "-KGABwWFqW6FAQ5YSbb2-ZJJL5"
    agencyId: "-KGAHVAEHGSrU1Ho23FQ-R75E3P" ## ConEd ID
    clientMutationId: "6"
  }) {
    agencyEdge {
      node {
        id
        name
        description
      }
    }
    issue {
      agencies {
        count
      }
    }
  }
}
```

Mutations returns:
```json
{
  "data": {
    "tagAgency": {
      "agencyEdge": {
        "node": {
          "id": "-KGAHVAEHGSrU1Ho23FQ-R75E3P",
          "name": "ConEdison",
          "description": "New York City Power Utility"
        }
      },
      "issue": {
        "agencies": {
          "count": 1
        }
      }
    }
  }
}
```


## Queries

#### List open issues for a city along with number of likes and comments, show latest first:
```graphql
query OpenIssues {
  cityByName(internalName: "New York, NY") {
    id
    city: displayName
    issues(
      filterBy: { node: { status: { eq: OPEN }}}
      orderBy: { node: { timestamp: DESCENDING }}
    ) {
    	edges {
        node {
          id
          category
          headline
          description
          location
          photoUrl
          timestamp
          user {
            edges {
              node {
                id
                firstName
                lastName
                profilePictureUrl
              }
            }
          }
          likes {
            count
          }
          comments {
            edges {
              node {
                id
                text
                timestamp
                user {
                  edges {
                    node {
                      id
                      firstName
                      lastName
                      profilePictureUrl
                    }
                  }
                }
              }
            }
          }
        }
      }
  	}
  }
}

```

#### Show a specific issue with a list of likes and comments:

```graphql
query IssueView($id: [ID!]!) {
	issue(id: $id) {
    id
    category
    headline
    description
    location
    photoUrl
    status
    timestamp
    closedTimestamp
    user {
      edges {
        node {
          id
          firstName
          lastName
          profilePictureUrl
        }
      }
    }
    agencies {
      edges {
        node {
          id
          name
        }
      }
    }
    comments {
      edges {
        node {
          id
          text
          timestamp
          documentUrls
          photoUrls
          user {
            edges {
              node {
                id
                firstName
                lastName
                profilePictureUrl
              }
            }
          }
        }
      }
    }
    likes {
      count
    }
  }
}
```

The query above expects `id` parameter:

```json
{
  "id": "-KGABwWFqW6FAQ5YSbb2-ZJJL5"
}
```

## License

This code is free software, licensed under the MIT license. See the `LICENSE` file for more details.
