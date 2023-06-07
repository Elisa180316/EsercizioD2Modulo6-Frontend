import React from 'react'
import Card from 'react-bootstrap/Card';




export const SingleCard = ({title, content, author, rate, img}) => {
  // console.log(content)
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {content.slice(0,40)}
        </Card.Text>
        <Card.Title>{author}</Card.Title>
        <Card.Title>{rate}</Card.Title>
      </Card.Body>
      
    </Card>
  )
}



export default SingleCard