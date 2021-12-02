import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

export default function Item({
  card,
  columnName,
  MoveKanban,
  RemoveKanban,
  actionButton
}) {
  return (
    <div class="card">
      {card &&
        <Card>
          <CardContent>
            {card.name}
          </CardContent>
          <CardActions>
            {columnName === 'Done' ?
              <Button variant="contained"
                color="error"
                onClick={RemoveKanban}>
                {actionButton}
              </Button>
              :
              <Button variant="contained"
                onClick={MoveKanban}>
                {actionButton}
              </Button>
            }
          </CardActions>
        </Card>
      }
    </div>
  )
} 