# edx-dev283x-ass2, Assessment 2

## How to execute the file

1. Checkout the source code:

```
git clone https://github.com/codescu-alexandru/edx-dev283x-ass2.git "folder/name/here"
```

2. Inside the `edx-dev283x-ass2` folder, open a command line and install all the required packages:

```
cd folder/name/here/
npm install
```

3. Run the script:

```
node server.js
```

4. Curl tests:

```
echo GET /posts, expected: {"posts": []}
curl -H "xauthor: testing" http://localhost:3003/posts

echo POST /posts, expected validation fails
curl -H "xauthor: testing" -H "Content-Type:application/json" -X POST http://localhost:3003/posts -d "{}"

echo POST /post, expected CREATED, blog entry returned
curl -H "xauthor: testing" -H "Content-Type:application/json" -X POST http://localhost:3003/posts -d "{\"title\":\"First blog entry\", \"content\":\"Blog content here\"}"

echo POST /post, expected CREATED, blog entry returned
curl -H "xauthor: testing" -H "Content-Type:application/json" -X POST http://localhost:3003/posts -d "{\"title\":\"Second blog entry\", \"content\":\"second content here\"}"

echo GET /posts, {"posts": [{}, {}]} - 2 elements
curl -H "xauthor: testing" http://localhost:3003/posts

echo PUT /posts/1, expected OK, blog entry returned, metadata information has edited flag equals true
curl -H "xauthor: testing" -H "Content-Type:application/json" -X PUT http://localhost:3003/posts/1 -d "{\"title\":\"Second blog entry\", \"content\":\"Second content here\"}"

echo GET /posts/0/comments, expected {"comments": []}
curl -H "xauthor: testing" http://localhost:3003/posts/0/comments

echo PUT /posts/0/comments, expected CREATED, {"commentId": 0}
curl -H "xauthor: testing" -H "Content-Type:application/json" -X POST http://localhost:3003/posts/0/comments -d "{\"comment\":\"First comment\"}"

echo GET /posts/0/comments, expected  {"comments": [{}]} - 1 element
curl -H "xauthor: testing" http://localhost:3003/posts/0/comments

echo POST /posts/0/comments, expected CREATED, {"commentId": 1}
curl -H "xauthor: testing" -H "Content-Type:application/json" -X POST http://localhost:3003/posts/0/comments -d "{\"comment\":\"Second comment\"}"

echo PUT /posts/0/comments/1, expected OK, {"comment": ...}
curl -H "xauthor: testing" -H "Content-Type:application/json" -X PUT http://localhost:3003/posts/0/comments/1 -d "{\"comment\":\"Second comment is here\"}"

echo GET /posts, expected {"posts": [{}, {}]} 2 posts with comments
curl -H "xauthor: testing" http://localhost:3003/posts/

echo DELETE /posts/0/comments/0
curl -H "xauthor: testing" http://localhost:3003/posts/0/comments/0 -X DELETE

echo GET /posts/0/comments, expected  {"comments": [{}]} - 1 element
curl -H "xauthor: testing" http://localhost:3003/posts/0/comments

echo DELETE /posts/0
curl -H "xauthor: testing" http://localhost:3003/posts/0 -X DELETE

echo GET /posts, expected {"posts": [{}]} - 1 element
curl -H "xauthor: testing" http://localhost:3003/posts/
```
