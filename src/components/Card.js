import React from 'react'
import Item from './Item'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

export default function Column({
  column,
  MoveKanban,
  RemoveKanban
}) {
  return (
    <div>
      <Card className="column">
        <div className="card">
          <div className="p-1">
            <CardHeader
              title={column.name}
              className={column.name}
            />
            <CardContent>
              {column.cards.map((card, cardIndex) => (
                <div className="py-1">
                  <Item
                    key={cardIndex}
                    MoveKanban={() => MoveKanban(cardIndex)}
                    RemoveKanban={() => RemoveKanban(cardIndex)}
                    card={card}
                    columnName={column.name}
                    actionButton={column.actionButton}
                  />
                </div>
              ))}
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}