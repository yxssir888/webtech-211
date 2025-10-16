const { v4: uuidv4 } = require('uuid');

const db = {
  articles: [
    {
      id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      title: 'My article',
      content: 'Content of the article.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    {
      id: '8ec0bd7f-11c0-43da-975e-2a8ad9ebae0c',
      title: 'Second Article',
      content: 'Content of the second article.',
      date: '05/10/2022',
      author: 'John Doe'
    }
  ],
  comments: [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      timestamp: 1664835049,
      content: 'Content of the comment.',
      articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      author: 'Bob McLaren'
    },
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6e',
      timestamp: 1664835050,
      content: 'Another great comment!',
      articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      author: 'Alice Smith'
    }
  ]
};

module.exports = { db, uuidv4 };
