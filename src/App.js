import React, { Component } from 'react';
import './App.css';
import {
  Accordion, Panel, PanelGroup, Button, ButtonToolbar, Modal,
  FormGroup, ControlLabel, FormControl, PanelHeading, ModalBody
} from 'react-bootstrap';

class App extends Component {

  state = {
    recipes: [],
    showAdd: false,
    showEdit: false,
    currentIndex: 0,
    newestRecipe: { recipeName: "", ingredients: [] }
  }
  //delete a recipe
  deleteRecipe(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
  }

  //Update newestRecipe.recipeName
  updateNewRecipe(recipeName, ingredients) {
    this.setState({ newestRecipe: { recipeName: recipeName, ingredients: ingredients } });
  }

  //save new recipe
  saveNewRecipe() {
    let recipes = this.state.recipes.slice();
    recipes.push({ recipeName: this.state.newestRecipe.recipeName, ingredients: this.state.newestRecipe.ingredients });
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
    this.setState({ newestRecipe: { recipeName: '', ingredients: [] } });
    this.close();
  }

  //closes a modal
  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false });
    }
   if (this.state.showEdit) {
      this.setState({ showEdit: false });
    }
  }


  //opens a modal
  open = (state, currentIndex) => {
    this.setState({ [state]: true });
    this.setState({ currentIndex });
  }

  //Updates recipeName
  updateRecipeName(recipeName, currentIndex){
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = {recipeName: recipeName, ingredients: recipes[currentIndex].ingredients};
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes});
  }

  //Update Ingredients
  updateIngredients(ingredients, currentIndex){
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = {recipeName: recipes[currentIndex].recipeName, ingredients: ingredients};
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes});
  }

  componentDidMount(){
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    this.setState({recipes});
  }


  render() {
    const { recipes, newestRecipe, currentIndex } = this.state;
    return (
      <div className="App ">
        <div className="background">
          <div>
            <h1>Recipe Book</h1>
            {recipes.length > 0 && (
              <div>
              <PanelGroup accordion id="accordion-example">
                {recipes.map((recipe, index) => (
                  <Panel eventKey={index} key={index}>
                    <Panel.Heading>
                      <Panel.Title toggle>{recipe.recipeName} </Panel.Title>
                    </Panel.Heading>

                    <Panel.Body collapsible>
                      <ol>
                        {recipe.ingredients.map((item) => (
                          <li key={item}>{item}</li>
                        ))}

                      </ol>
                      <ButtonToolbar>
                        <Button bsStyle="danger" onClick={(event) => this.deleteRecipe(index)} >Delete Recipe</Button>
                        <Button bsStyle="default" onClick={(event) => this.open("showEdit", index)} >edit Recipe</Button>
                      </ButtonToolbar>


                    </Panel.Body>
                  </Panel>


                ))}


              </PanelGroup>

              <Modal show={this.state.showEdit} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Edit Recipe
              </Modal.Title>
                  <Modal.Body>
                    <FormGroup controlId='formBasicText'>
                      <ControlLabel>
                        Recipe Name
                  </ControlLabel>
                      <FormControl
                        type='text'
                        value={recipes[currentIndex].recipeName}
                        placeholder='Enter Recipe Name'
                        onChange={(event) => this.updateRecipeName(event.target.value, currentIndex)}
                      ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='formControlsTextarea'>
                      <ControlLabel>
                        Ingredients
                  </ControlLabel>
                      <FormControl
                        type='textarea'
                        // value={newestRecipe.recipeName}
                        placeholder='Enter Ingredients(Seperate by commas)'
                        onChange={(event) => this.updateIngredients(event.target.value.split(','), currentIndex)}
                        value={recipes[currentIndex].ingredients}
                      ></FormControl>
                    </FormGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button bsStyle='primary' onClick={(event) => this.close()}>Close</Button>
                  </Modal.Footer>
                </Modal.Header>
              </Modal>
              </div>
           )}

          </div>



          <Modal show={this.state.showAdd} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Add Recipe</Modal.Title>
              <Modal.Body>
                <FormGroup controlId='formBasicText'>
                  <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={newestRecipe.recipeName}
                    placeholder="Enter recipe Name"
                    onChange={(event) => this.updateNewRecipe(event.target.value, newestRecipe.ingredients)}
                  ></FormControl>
                </FormGroup>

                <FormGroup controlId='formControlTextarea' >
                  <ControlLabel>Ingredients</ControlLabel>
                  <FormControl
                    type="textarea"
                    value={newestRecipe.ingredients}
                    placeholder="Enter ingredients (separated by commas)"
                    onChange={(event) => this.updateNewRecipe(newestRecipe.recipeName, event.target.value.split(','))}
                  ></FormControl>
                </FormGroup>
              </Modal.Body>
            </Modal.Header>

            <Modal.Footer>
              <Button bsStyle='primary' onClick={(event) => this.saveNewRecipe()} >Save Recipe</Button>
            </Modal.Footer>

          </Modal>


          <Button bsStyle="primary" onClick={(event) => this.open("showAdd", currentIndex)} >Add Recipe </Button>

        </div>
      </div>
    );
  }
}

export default App;
