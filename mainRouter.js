const express = require('express')

const db = require('./data/db.js')

const router = express.Router()

router.post('/', (req, res) => {
  const newPosts = req.body

  if(newPosts.title && newPosts.contents) {
    db.insert(newPosts).then(post => {
      res.status(201).json(post)
    }).catch(err => {
      res.status(500).json({ message: 'There was an error while saving the post to the database'})
    })
  } else {
    res.status(400).json({ message: 'Please provide title and contents for the post.'})
  }
})

router.get('/', (req, res) => {
  db.find().then(post => {
    res.status(200).json(post)
  }).catch(err => {
    res.status(500).json({ message: 'The posts information could not be retrieved.' })
  })
})

router.get('/:id', (req, res) => {
  const {id} = req.params

  db.findById(id).then(post => {
    if(post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    }
  }).catch(err => {
    res.status(500).json({ message: 'The post information could not be retrieved.' })
  })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params

  db.remove(id).then(post => {
    if(post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    }
  }).catch(err => {
    res.status(500).json({ message: 'The post could not be removed' })
  })
})

router.put('/:id', (req, res) => {
  const {id} = req.params
  const changes = req.body

  if(changes.title && changes.content) {
    db.update(id, changes).then(post => {
      if(post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' })
      }
    }).catch(err => {
      res.status(500).json({ message: 'The post information could not be modified.' })
    })
  } else {
    res.status(400).json({ message: 'Please provide title and contents for the post.' })
  }
})

module.exports = router
