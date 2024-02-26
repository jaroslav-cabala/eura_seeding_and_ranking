"use client";

import { PropsWithChildren, useState } from "react";
import { DndContext, DragEndEvent, UniqueIdentifier, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useGetPlayersSortedByPointsOfTwoBestResults } from "../../api/useGetPlayersSortedByPointsOfTwoBestResults";

export default function CreateTournament() {
  // const containers = [...Array(32).keys()].map((k) => k.toString());
  const [isDropped, setIsDropped] = useState(false);
  // const draggableMarkup = [...Array(32).keys()]
  //   .map((k) => k.toString())
  //   .map((id) => (
  //     <Draggable key={id} id={`draggable-${id}`}>
  //       Drag me
  //     </Draggable>
  //   ));

  // return (
  //   <div className="container mx-auto p-5">
  //     <div className="space-y-1 grid grid-cols-8">
  //       <DndContext onDragEnd={handleDragEnd}>
  //         <div className="space-y-1">{parent === null ? draggableMarkup : null}</div>
  //         <div className="space-y-1">
  //           {containers.map((id) => (
  //             // We updated the Droppable component so it would accept an `id`
  //             // prop and pass it to `useDroppable`
  //             <Droppable key={id} id={id}>
  //               {parent === id ? draggableMarkup : "Drop here"}
  //             </Droppable>
  //           ))}
  //         </div>
  //       </DndContext>
  //     </div>
  //   </div>
  // );

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;

    if (over && over.id === "tournament-teams") {
      setIsDropped(true);
    }
  }

  const players = useGetPlayersSortedByPointsOfTwoBestResults();
  const availablePlayersMarkup = (
    <List>
      <ListSubheader>Available players</ListSubheader>
      {players.map((player) => (
        <DraggableListItem key={player.playerId} id={player.playerId}>
          <ListItemButton>
            <ListItemText primary={player.name} />
            <ListItemText primary={player.points} />
          </ListItemButton>
        </DraggableListItem>
      ))}
    </List>
  );

  const tournamentMarkup = (
    <Grid container spacing={1}>
      <Grid xs={12}>Number of teams: {}</Grid>
      <Grid>
        <Container>
          <Box sx={{ bgcolor: "#cfe8fc", height: "100vh", width: "50vh" }}>
            <Droppable id="tournament-teams">{isDropped ? "dropped" : "Drop here"}</Droppable>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {availablePlayersMarkup}
      {tournamentMarkup}
    </DndContext>
  );
}

type DroppableProps = PropsWithChildren & { id: string };

function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    backgroundColor: isOver ? "lightgreen" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

type DraggableProps = PropsWithChildren & { id: string };

function DraggableListItem(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <ListItem disablePadding dense ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </ListItem>
  );
}
