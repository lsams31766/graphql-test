// graphql1.js
var express = require('express')
var express_graphql = require('express-graphql')
var {buildSchema} = require('graphql')

// GraphQL Schema
var schema = buildSchema(`
	type Query {
		course(id: Int!): Course
		courses(topic: String): [Course]
	}

	type Mutation {
		updateCourseTopic(id: Int!, topic: String!): Course 
	}

	type Course {
		id: Int
		title: String
		author: String
		description: String
		topic: String
		url: String
	}
`)

var coursesData = [
	{
		id: 1,
		title: 'The comple Node.js course',
		author: 'Andrew Meed',
		description: 'Great book',
		topic: 'Node.js',
		url: 'https://codingthesmartway.com/courses/nodejs'
	},
	{
		id: 2,
		title: 'The comple Python course',
		author: 'Andrew Jones',
		description: 'Another great book',
		topic: 'Python',
		url: 'https://codingthesmartway.com/courses/nodejs'
	},
	{
		id: 3,
		title: 'Another comple Node.js course',
		author: 'Bill Meed',
		description: 'Good book',
		topic: 'Node.js',
		url: 'https://codingthesmartway.com/courses/nodejs2'
	},
	{
		id: 4,
		title: 'The comple Golang course',
		author: 'Joe Meed',
		description: 'A book',
		topic: 'Go',
		url: 'https://codingthesmartway.com/courses/go'
	}
]

var getCourse = function(args) {
	var id = args.id 
	return coursesData.filter(course => {
		return course.id == id
	})[0]
}

var getCourses = function(args) {
	if (args.topic) {
		var topic = args.topic 
		return coursesData.filter(course => course.topic === topic)
	} else {
		return coursesData
	}
}

var updateCourseTopic = function({id, topic}) {
	coursesData.map(course => {
		if (course.id === id) {
			course.topic = topic 
			return course
		}
	})
	return coursesData.filter(course => course.id ===id)[0]
}
 
// Root resolver
var root = {
	course: getCourse,
	courses: getCourses,
	updateCourseTopic: updateCourseTopic
}

// Create an express server and a GraphQL Endpoint 
var app = express()
app.use('/graphql', express_graphql({
	schema: schema,
	rootValue: root,
	graphiql: true
}))

app.listen(4000, () =>
	console.log('Express GraphQL Server now running on localhost:4000/graphql')
)

