import React, { Component } from 'react';
import './App.css';
import Card from './components/Card'
import TextField from './components/TextField';
import { Button } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux'
import { ADD, MOVE, LOAD, REMOVE } from './actions'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Swal from "sweetalert2";


class App extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }
  }

  componentDidMount = () => this.props.load()

  notificationSuccess = () => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Task is saved!',
    })
  }

  AddKanban = () => {
    const card = { name: this.state.value }
    this.props.add(card, 0)
    this.setState(
      { value: '' }
    )
    this.notificationSuccess();
  }

  MoveKanban = (index, cardIndex) => {
    this.props.move(index, cardIndex)
  }

  RemoveKanban = (index, cardIndex) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.remove(index, cardIndex)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  ChangeTextKanban = (e) => {
    this.setState(
      { value: e.target.value }
    )
  }

  const onDragEnd = (result) => {
    const { draggableId, source, destination, type } = result;
    if ((!destination) || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    render() {
      if (!this.props.columns) return null
      return (
        <div>
          <Navbar />
          <div className="container">
            <Fade top>
              <h1 className="text-center mb-5 mt-5">Kanban Board - Febri Wijaya</h1>
              <div className="row justify-content-center my-4">
                <div className="Container-box">
                  <TextField value={this.state.value} onChange={this.ChangeTextKanban}></TextField>
                  <Button variant="contained" onClick={this.AddKanban} disabled={this.state.value === undefined || this.state.value === ''} >Save to Blacklog</Button>
                </div>
              </div>
            </Fade>
            <div className="Container-box">
              {this.props.columns.map((column, index) => (
                <Fade top delay={index * 500}>
                  <Card
                    MoveKanban={cardIndex => this.MoveKanban(index, cardIndex)}
                    RemoveKanban={cardIndex => this.RemoveKanban(index, cardIndex)}
                    column={column}
                    index={index}
                    key={index} />
                </Fade>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      );
    }

  }

  const mapStateToProps = (state) => {
    return {
      columns: state.columns
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    add: (card, index) => dispatch({ type: ADD, card, index }),
    move: (index, cardIndex) => dispatch({ type: MOVE, index, cardIndex }),
    remove: (index, cardIndex) => dispatch({ type: REMOVE, index, cardIndex }),
    load: () => dispatch({ type: LOAD }),
  })

  export default connect(mapStateToProps, mapDispatchToProps)(App);